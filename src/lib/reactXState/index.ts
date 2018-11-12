import { Machine } from 'xstate'
import createContext from './Context'

interface Props {
	name: string
	config: any
}

export default function reactXState({ name, config }: Props) {
	name = name || 'defaultName'

	const machine = Machine(config)

	return createContext({
		name,
		machine,
	})
}
