import { createStatefulMachine } from '@avaragado/xstateful'
import { createReactMachine } from '@avaragado/xstateful-react'
import { Machine } from 'xstate'

const machineState = {
	key: 'clock',
	initial: 'Normal',
	states: {
		Normal: {
			on: {
				ALARM_ON: 'AlarmSet',
			},
		},
		AlarmSet: {
			initial: 'Set',
			on: {
				ALARM_OFF: 'Normal',
			},
			states: {
				Set: {
					on: { ALARM_TRIGGER: 'Ringing' },
				},
				Ringing: {
					activities: ['ring'],
					on: { SNOOZE: 'Snoozing' },
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
