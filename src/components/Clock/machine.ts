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
					after: {
						3000: 'Ringing',
					},
					on: { RING_START: 'Ringing' },
				},
				Ringing: {
					on: { SNOOZE_START: 'Snoozing' },
				},
				Snoozing: {
					after: {
						3000: 'Ringing',
					},
				},
			},
		},
	},
}

export default reactXState({
	name: 'alarm',
	config,
})
