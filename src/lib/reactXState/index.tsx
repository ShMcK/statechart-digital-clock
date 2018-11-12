import * as React from 'react'
import { ActionObject, Machine, MachineConfig, matchesState } from 'xstate'
import { interpret } from 'xstate/lib/interpreter'

interface Props {
	name: string
	config: MachineConfig<any, any, any>
}

interface Value {
	actions: Array<ActionObject<any>>
	state: any
	transition(event: string): void
}

export default function reactXState({ name, config }: Props) {
	name = name || 'defaultName'

	// start machine
	const stateMachine = Machine<any, any, any>(config)
	const xsf = interpret(stateMachine)
	xsf.start()

	// track state machine updates
	let count = 0

	// create Provider/Consumer context
	const Context = React.createContext<Value>({
		actions: [],
		state: {},
		transition(event: string) {
			return
		},
	})

	/**
	 * Context Provider
	 *
	 */
	const Provider = (props) => {
		const [state, setState] = React.useState(stateMachine.initialState.value)

		let actions: Array<ActionObject<any>> = []

		const transition = (event: string) => xsf.send(event)

		React.useEffect(() => {
			xsf.onTransition((s) => {
				actions = s.actions
				if (s.changed) {
					count += 1
				}
				setState(s.value)
			})
			// turn off state machine on exit
			return () => xsf.stop()
		}, [])

		// execute statechart actions
		React.useEffect(
			() => {
				actions.forEach((action: ActionObject<any>) => {
					if (action.exec) {
						const context = null
						action.exec(context)
					}
				})
			},
			[count],
		)

		const value: Value = {
			actions,
			state,
			transition,
		}

		return <Context.Provider value={value}>{props.children}</Context.Provider>
	}
	Provider.displayName = `${name}Provider`

	/**
	 * Context Consumer
	 *
	 */
	const Consumer = Context.Consumer

	interface MachineContextProps {
		actions?: {
			[key: string]: () => void
		}
	}

	/**
	 * useMachineContext
	 *
	 * @param props MachineContextProps
	 */
	const useMachineContext = (props?: MachineContextProps) => {
		const { actions, state, transition } = React.useContext(Context)

		React.useMemo(
			() => {
				if (actions.length) {
					actions.forEach(({ type }) => {
						if (props && props.actions && props.actions[type]) {
							props.actions[type]()
						}
					})
				}
			},
			[count],
		)

		return {
			state,
			transition,
		}
	}

	interface StateProps {
		is: string
		children: any
	}

	/**
	 * State Component
	 *
	 * @param props StateProps
	 */
	const State = (props: StateProps) => {
		const { state, transition } = useMachineContext()
		const isMatch = matchesState(props.is, state)
		if (isMatch) {
			// allow for child functions
			if (typeof props.children === 'function') {
				return props.children({ state, transition })
			}
			// without child functions
			return props.children
		}
		// otherwise return null
		return null
	}
	State.displayName = `${name}StateWrapper`

	return {
		Provider,
		Consumer,
		useMachineContext,
		State,
	}
}
