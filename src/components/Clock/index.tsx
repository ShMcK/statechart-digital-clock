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
		this.transition('ALARM_ON')
		setTimeout(() => {
			this.transition('ALARM_TRIGGER')
		}, 3000)
	}
	unsetAlarm = () => {
		clearTimeout(this.snoozeTimer)
		this.transition('ALARM_OFF')
	}
	snooze = () => {
		this.transition('SNOOZE')
		this.snoozeTimer = setTimeout(() => {
			this.transition('SNOOZE_END')
		}, 3000)
	}
	render() {
		return (
			<ClockMachine.Provider>
				<ClockMachine.Control onDidMount={this.init}>
					<Display>
						<Time />

						<ClockMachine.State
							is="AlarmSet"
							render={({ state }: any) => (
								<AlarmSetIndicator ringing={state.activities.ring} />
							)}
						/>

						<div style={{ position: 'absolute', top: -50 }}>
							<ClockMachine.State
								is="Normal"
								render={() => (
									<button onClick={this.setAlarm}>
										Set Alarm After 3 Seconds
									</button>
								)}
							/>

							<ClockMachine.Activity
								is="ring"
								render={() => (
									<button onClick={this.snooze}>Snooze For 3 Seconds</button>
								)}
							/>

							<ClockMachine.State
								is="AlarmSet"
								render={() => (
									<button onClick={this.unsetAlarm}>Cancel Alarm</button>
								)}
							/>

							<ClockMachine.Activity is="ring" render={() => <Ring />} />
						</div>
					</Display>
				</ClockMachine.Control>
			</ClockMachine.Provider>
		)
	}
}
