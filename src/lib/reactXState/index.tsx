import * as React from 'react'
import { ActionObject, Machine, MachineConfig, matchesState } from 'xstate'
import { interpret } from 'xstate/lib/interpreter'

const capitalize = (str) => str.charAt(0).toUpperCase() + str.substr(1)

interface Props {
	name: string
	config: MachineConfig<any, any, any>
	actions?: {
		[key: string]: (exState?: any, action?: ActionObject<any>) => void
	}
	activities?: {
		[key: string]: (
			exState?: any,
			action?: ActionObject<any>,
		) => void | (() => void)
	}
}

interface Value {
	exState: any
	state: any
	setExState(state: any): void
	transition(event: string): void
}

export default function reactXState(props: Props) {
	const config = props.config || {}
	const name = props.name || 'defaultName'
	const machineActions = props.actions || {}
	const machineActivities = props.activities || {}

	// start machine
	const stateMachine = Machine<any, any, any>(config, {
		actions: machineActions,
		activities: machineActivities,
	})

	const xsf = interpret(stateMachine)
	xsf.start()

	// track state machine updates
	let count = 0
	let transition = (event: string) => {
		xsf.send(event)
	}

	// Devtools
	let unsubscribe
	let devTools: any
	if ((window as any).__REDUX_DEVTOOLS_EXTENSION__) {
		devTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__.connect({
			name,
		})
		devTools.init(stateMachine.initialState.value)

		unsubscribe = devTools.subscribe()

		transition = (event: string) => {
			const next = xsf.send(event)
			if (devTools) {
				devTools.send(event, next.value)
			}
		}
	}

	// create Provider/Consumer context
	const Context = React.createContext<Value>({
		state: {},
		exState: {},
		setExState(state: any) {
			return
		},
		transition,
	})

	/**
	 * Context Provider
	 *
	 */
	interface ProviderProps {
		children: React.ReactElement<any>
	}

	let currentActions: Array<ActionObject<any>> = []

	const Provider = ({ children }: ProviderProps) => {
		const [state, setState] = React.useState(stateMachine.initialState.value)
		const [exState, setExState] = React.useState(config.context || {})

		React.useEffect(() => {
			xsf.onTransition((s) => {
				currentActions = s.actions
				if (s.changed) {
					count += 1
					setState(s.value)
				}
			})
			// turn off state machine on exit
			return () => xsf.stop()
		}, [])

		// execute statechart actions
		React.useEffect(
			() => {
				currentActions.forEach((action: ActionObject<any>) => {
					if (action.exec) {
						action.exec(exState, action, { action })
					}
				})
			},
			[count],
		)

		// unsubscribe devtools on exit
		React.useEffect(
			() => {
				return unsubscribe
			},
			[count],
		)

		const value: Value = { state, transition, exState, setExState }

		return <Context.Provider value={value}>{children}</Context.Provider>
	}
	Provider.displayName = `${capitalize(name)}Provider`

	/**
	 * Context Consumer
	 *
	 */
	const Consumer = Context.Consumer

	interface UseMachineContextProps {
		actions?: { [key: string]: (exState: any) => void }
	}

	/**
	 * useMachineContext
	 *
	 */
	const useMachineContext = (contextProps?: UseMachineContextProps) => {
		const { state, exState, setExState } = React.useContext(Context)

		React.useMemo(
			() => {
				if (currentActions.length) {
					currentActions.forEach(({ type }) => {
						if (
							contextProps &&
							contextProps.actions &&
							contextProps.actions[type]
						) {
							contextProps.actions[type](exState)
						}
					})
				}
			},
			[count],
		)

		return { state, transition, exState, setExState }
	}

	interface StateProps {
		is?: string | string[]
		not?: string | string[]
		children: any
	}

	/**
	 * State Component
	 *
	 */
	const State = ({ is, not, children }: StateProps) => {
		if (!is && !not) {
			return null
		}

		const { state, exState, setExState } = useMachineContext()

		const findMatch = (field) =>
			Array.isArray(field)
				? field.some((val) => matchesState(val, state))
				: typeof field === 'string'
				? matchesState(field, state)
				: false

		const hasMatch = findMatch(is)
		const cantMatch = findMatch(not)

		if (hasMatch && !cantMatch) {
			// allow for child functions
			if (typeof children === 'function') {
				return children({
					state,
					transition,
					exState,
					setExState,
				})
			}
			// without child functions
			return children
		}
		// otherwise return null
		return null
	}
	State.displayName = `${capitalize(name)}StateWrapper`

	return { Provider, Consumer, useMachineContext, State }
}
