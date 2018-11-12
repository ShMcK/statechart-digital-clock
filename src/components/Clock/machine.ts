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
					activities: ['ring'],
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

const actions = {}

const activities = {
	ring: () => {
		const audio = new Audio(`${process.env.PUBLIC_URL}/assets/sounds/alarm.mp3`)
		audio.loop = true
		audio.play()
		return () => {
			audio.pause()
		}
	},
}

export default reactXState({
	name: 'alarm',
	config,
	actions,
	activities,
})
