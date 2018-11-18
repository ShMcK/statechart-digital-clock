import * as React from 'react'

import { AlarmIndicator, Button, Display, Time } from './components'
import ClockMachine from './Machine'

const Clock = () => (
	<ClockMachine.Provider>
		<Display>
			<Time />

			<ClockMachine.State is="Normal">
				{({ transition }) => (
					<Button onClick={() => transition('ALARM_ON')} color="#49fb35">
						Set Alarm After 3 Seconds
					</Button>
				)}
			</ClockMachine.State>

			<ClockMachine.State is="AlarmGroup.Ringing">
				{({ transition }) => (
					<Button
						style={{ left: 150 }}
						onClick={() => transition('SNOOZE_START')}
						color="#FD5F00">
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
				<AlarmIndicator ringing />
			</ClockMachine.State>

			<ClockMachine.State is="AlarmGroup" not="AlarmGroup.Ringing">
				<AlarmIndicator />
			</ClockMachine.State>
		</Display>
	</ClockMachine.Provider>
)

export default React.memo(Clock)
