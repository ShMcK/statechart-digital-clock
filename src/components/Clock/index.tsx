import * as React from 'react'

import AlarmSetIndicator from './AlarmSetIndicator'
import Display from './Display'
import ClockMachine from './Machine'
import Ring from './Ring'
import Time from './Time'

interface IState {
	time: Date
}

export default class Clock extends React.Component<{}, IState> {
	transition: any
	snoozeTimer: any
	init = (props: any) => {
		this.transition = props.transition
		props.init()
	}
	setAlarm = () => {
		this.transition('ALARM_TRIGGER')
	}
	unsetAlarm = () => {
		clearTimeout(this.snoozeTimer)
		this.transition('ALARM_OFF')
	}
	snooze = () => {
		this.transition('SNOOZE')
		this.snoozeTimer = setTimeout(() => {
			this.transition('SNOOZE_END')
		}, 2000)
	}
	render() {
		/* 1 */
		return (
			<ClockMachine.Provider>
				{/* 2 */}
				<ClockMachine.Control onDidMount={this.init}>
					<Display>
						<Time />
						{/* 4 */}
						<ClockMachine.State
							is="AlarmSet"
							render={({ state }: any) => (
								<AlarmSetIndicator ringing={state.activities.ring} />
							)}
						/>
						<div style={{ position: 'absolute', top: -50 }}>
							{/* 3 */}
							<ClockMachine.State
								is="Normal"
								render={() => (
									<button type="primary" onClick={this.setAlarm}>
										Set Alarm
									</button>
								)}
							/>
							{/* 5 */}
							<ClockMachine.Activity
								is="ring"
								render={() => (
									<button onClick={this.snooze}>Snooze For 2 Seconds</button>
								)}
							/>
							{/* 7 */}
							<ClockMachine.State
								is="AlarmSet"
								render={() => (
									<button onClick={this.unsetAlarm}>Cancel Alarm</button>
								)}
							/>
							{/* 6 */}
							<ClockMachine.Activity is="ring" render={() => <Ring />} />
						</div>
					</Display>
				</ClockMachine.Control>
			</ClockMachine.Provider>
		)
	}
}
