import { matchesState } from 'xstate'

const stateWrapper = (useMachineContext) => {
	interface Props {
		is: string
		children: any
	}

	const State = (props: Props) => {
		const { state, transition } = useMachineContext()
		const isMatch = matchesState(props.is, state)
		if (isMatch) {
			if (typeof props.children === 'function') {
				return props.children({ state, transition })
			}
			return props.children
		}
		return null
	}
	return State
}

export default stateWrapper
