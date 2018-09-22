import { createStatefulMachine, Reducer } from '@avaragado/xstateful'
import { createReactMachine } from '@avaragado/xstateful-react'
import { Machine } from 'xstate'

const activities = {
	snooze: Reducer.util.timeoutActivity({
		activity: 'snooze',
		ms: 250,
		event: 'SNOOZE_END',
	}),
}

console.log(activities)

const reducer = Reducer.map({
	...activities,
})

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
					on: { SNOOZE: 'Snoozing' },
				},
				Snoozing: {
					on: { SNOOZE_END: 'Ringing' },
					activities: ['snooze'],
				},
			},
		},
	},
}

const machine = Machine(machineState)

const xsf = createStatefulMachine({ machine, reducer })

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
