import * as React from 'react'

import AlarmMachine from './AlarmMachine'
import { AlarmIndicator, Button, Display, Time } from './components'

const Clock = () => (
	<AlarmMachine.Provider>
		<Display>
			<Time />

			<AlarmMachine.State is="Normal">
				{({ transition }) => (
					<Button onClick={() => transition('ALARM_ON')} color="#49fb35">
						Set Alarm After 3 Seconds
					</Button>
				)}
			</AlarmMachine.State>

			<AlarmMachine.State is="AlarmGroup.Ringing">
				{({ transition }) => (
					<Button
						style={{ left: 150 }}
						onClick={() => transition('SNOOZE_START')}
						color="#FD5F00">
						Snooze For 3 Seconds
					</Button>
				)}
			</AlarmMachine.State>

			<AlarmMachine.State is="AlarmGroup">
				{({ transition }) => (
					<Button onClick={() => transition('ALARM_OFF')} color="#DD0048">
						Cancel Alarm
					</Button>
				)}
			</AlarmMachine.State>

			<AlarmMachine.State is="AlarmGroup.Ringing">
				<AlarmIndicator ringing />
			</AlarmMachine.State>

			<AlarmMachine.State is="AlarmGroup" not="AlarmGroup.Ringing">
				<AlarmIndicator />
			</AlarmMachine.State>
		</Display>
	</AlarmMachine.Provider>
)

export default React.memo(Clock)
