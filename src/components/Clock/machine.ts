import { createStatefulMachine } from '@avaragado/xstateful'
import { createReactMachine } from '@avaragado/xstateful-react'
import { Machine } from 'xstate'

const machineState = {
	initial: 'Normal',
	states: {
		Normal: {
			on: {
				ALARM_ON: 'AlarmGroup',
			},
		},
		AlarmGroup: {
			initial: 'AlarmSet',
			on: {
				ALARM_OFF: 'Normal',
			},
			states: {
				AlarmSet: {
					on: { RING_START: 'Ringing' },
				},
				Ringing: {
					on: { SNOOZE_START: 'Snoozing' },
				},
				Snoozing: {
					on: { SNOOZE_END: 'Ringing' },
				},
			},
		},
	},
}

const machine = Machine(machineState)

const xsf = createStatefulMachine({ machine })

export default createReactMachine(xsf)
