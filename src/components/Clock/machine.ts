import reactXState from 'reactXState'

const config = {
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

export default reactXState({
	name: 'alarm',
	config,
})
