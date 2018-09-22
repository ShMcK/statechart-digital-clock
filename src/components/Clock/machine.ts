import { createStatefulMachine } from '@avaragado/xstateful'
import { createReactMachine } from '@avaragado/xstateful-react'
import { Machine } from 'xstate'

const machineState = {
	key: 'clock',
	initial: 'Normal',
	states: {
		Normal: {
			on: {
				ALARM_TRIGGER: 'AlarmSet',
			},
		},
		AlarmSet: {
			initial: 'Ringing',
			on: {
				ALARM_OFF: 'Normal',
			},
			states: {
				Ringing: {
					activities: ['ring'],
					on: { SNOOZE: 'Snooze' },
				},
				Snooze: { on: { SNOOZE_END: 'Ringing' } },
			},
		},
	},
}

const machine = Machine(machineState)

const xsf = createStatefulMachine({ machine })

const log = ({ state, extstate: xs }: any) => {
	console.log(
		`state: ${JSON.stringify(state.value)}, extstate: ${JSON.stringify(
			xs,
			null,
			4,
		)}`,
	)
}

xsf.on('change', log)

xsf.on('transition', console.log)

export default createReactMachine(xsf)
