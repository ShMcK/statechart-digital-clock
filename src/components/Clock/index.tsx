import * as React from 'react'

import { AlarmSetIndicator, Button, Display, Ring, Time } from './components'
import ClockMachine from './Machine'

const Clock = (props) => {
	let alarmTimer
	return (
		<ClockMachine.Provider>
			<Display>
				<Time />

				<ClockMachine.State is="AlarmGroup.Ringing">
					<AlarmSetIndicator ringing />}
				</ClockMachine.State>

				<ClockMachine.State is="AlarmGroup">
					<AlarmSetIndicator />
				</ClockMachine.State>

				<div style={{ position: 'absolute', top: -50 }}>
					<ClockMachine.State is="Normal">
						{({ transition }) => {
							const setAlarm = () => {
								console.log('transition', transition)
								transition('ALARM_ON')
								alarmTimer = setTimeout(() => {
									transition('RING_START')
								}, 3000)
							}
							return (
								<Button is="Normal" onClick={setAlarm} color="#49fb35">
									Set Alarm After 3 Seconds
								</Button>
							)
						}}
					</ClockMachine.State>

					<ClockMachine.State is="AlarmGroup.Ringing">
						{({ transition }) => {
							const snooze = () => {
								transition('SNOOZE_START')
								alarmTimer = setTimeout(() => {
									transition('SNOOZE_END')
								}, 3000)
							}
							return (
								<Button onClick={snooze} color="#FD5F00">
									Snooze For 3 Seconds
								</Button>
							)
						}}
					</ClockMachine.State>

					<ClockMachine.State is="AlarmGroup">
						{({ transition }) => {
							const unsetAlarm = () => {
								clearTimeout(alarmTimer)
								transition('ALARM_OFF')
							}
							return (
								<Button onClick={unsetAlarm} color="#DD0048">
									Cancel Alarm
								</Button>
							)
						}}
					</ClockMachine.State>

					<ClockMachine.State is="AlarmGroup.Ringing">
						<Ring />
					</ClockMachine.State>
				</div>
			</Display>
		</ClockMachine.Provider>
	)
}

export default Clock
