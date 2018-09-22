/* styles from https://codepen.io/bsmith/pen/drElg?editors=1100 */

import * as React from 'react'
import styles from 'styled-components'

import ClockMachine from './Machine'
import Ring from './Ring'
import Time from './Time'

const Container = styles.div`
	height: 50px;
    width: 300px;
    position: relative;
    background-color: #272e38;
	color: #cacaca;
	border-radius: 8px;
`

const Display = styles.div`
    text-align: center;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
`

const AlarmSetIndicator = styles.div`
	position: absolute;
	top: 10px;
	right: 10px;
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background-color: red;
`
interface IState {
	time: Date
}

export default class Clock extends React.Component<{}, IState> {
	state = {
		time: new Date(),
	}
	transition: any
	snoozeTimer: any
	init = (props: any) => {
		this.transition = props.transition
		props.init()
		this.ticker()
	}
	ticker = () => {
		setInterval(() => {
			this.setState({ time: new Date() })
		}, 1000)
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
		}, 1000)
	}
	render() {
		return (
			<ClockMachine.Provider>
				<ClockMachine.Control onDidMount={this.init}>
					<Container>
						<Display>
							<Time time={this.state.time} />
							<ClockMachine.State
								is="AlarmSet"
								render={() => <AlarmSetIndicator />}
							/>
						</Display>
					</Container>

					<div>
						<ClockMachine.State
							is="Normal"
							render={() => <button onClick={this.setAlarm}>Set Alarm</button>}
						/>
						<ClockMachine.Activity
							is="ring"
							render={() => <button onClick={this.snooze}>Snooze</button>}
						/>
						<ClockMachine.State
							is="AlarmSet"
							render={() => (
								<button onClick={this.unsetAlarm}>Cancel Alarm</button>
							)}
						/>
						<ClockMachine.Activity is="ring" render={() => <Ring />} />
					</div>
				</ClockMachine.Control>
			</ClockMachine.Provider>
		)
	}
}
