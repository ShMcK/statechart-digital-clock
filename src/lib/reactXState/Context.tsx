import * as React from 'react'
import { interpret } from 'xstate/lib/interpreter'
import stateWrapper from './State'
import { Action, MachineContextProps, Value } from './typings'

const defaultMachineContextProps = {
	actions: {},
}

export default ({ name, machine }) => {
	const Context = React.createContext(name)

	const listeners = new Map()

	const xsf = interpret(machine)
	xsf.start()

	let actions

	const Provider = (props) => {
		const [state, setState] = React.useState(machine.initialState.value)

		const transition = (event: string) => {
			const next = xsf.send(event)
			// update state
			actions = next.actions || []
			setState(next.value)
		}

		React.useEffect(() => {
			return () => xsf.stop()
		}, [])

		// execute statechart actions
		React.useEffect(() => {
			actions.forEach((action: Action) => {
				if (action.exec) {
					action.exec()
				}
			})
		}, [])

		const value: Value = {
			transition,
			state,
		}

		return <Context.Provider value={value}>{props.children}</Context.Provider>
	}

	const Consumer = Context.Consumer

	const useMachineContext = (
		props: MachineContextProps = defaultMachineContextProps,
	) => {
		const { state, transition } = React.useContext(Context)

		React.useEffect(() => {
			if (props.actions) {
				// @ts-ignore
				Object.entries(props.actions).forEach(([key, value]) => {
					listeners.set(key, value)
				})
			}
		}, [])

		return {
			state,
			transition,
		}
	}

	return {
		Provider,
		Consumer,
		useMachineContext,
		State: stateWrapper(useMachineContext),
	}
}
