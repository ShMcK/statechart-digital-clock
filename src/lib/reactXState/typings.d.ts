export interface Value {
	state: any
	transition(event: string): void
}

export interface MachineContextProps {
	actions?: {
		[key: string]: () => void
	}
}

export interface Action {
	type: string
	exec?: () => void
}
