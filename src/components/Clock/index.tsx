import * as React from 'react'

import { AlarmSetIndicator, Button, Display, Ring, Time } from './components'
import ClockMachine from './Machine'

const Clock = (props) => (
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
					{({ transition }) => (
						<Button
							is="Normal"
							onClick={() => transition('ALARM_ON')}
							color="#49fb35">
							Set Alarm After 3 Seconds
						</Button>
					)}
				</ClockMachine.State>

				<ClockMachine.State is="AlarmGroup.Ringing">
					{({ transition }) => (
						<Button onClick={() => transition('SNOOZE_START')} color="#FD5F00">
							Snooze For 3 Seconds
						</Button>
					)}
				</ClockMachine.State>

				<ClockMachine.State is="AlarmGroup">
					{({ transition }) => (
						<Button onClick={() => transition('ALARM_OFF')} color="#DD0048">
							Cancel Alarm
						</Button>
					)}
				</ClockMachine.State>

				<ClockMachine.State is="AlarmGroup.Ringing">
					<Ring />
				</ClockMachine.State>
			</div>
		</Display>
	</ClockMachine.Provider>
)

export default Clock
