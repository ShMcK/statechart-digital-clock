/* styles from https://codepen.io/bsmith/pen/drElg?editors=1100 */

import * as React from 'react'
import styles from 'styled-components'

import ClockMachine from './Machine'
import Ring from './Ring'
import Time from './Time'

const Container = styles.div`
	height: 80px;
    width: 400px;
    position: relative;
    background-color: #272e38;
	color: #cacaca;
	border-radius: 8px;
`

const Display = styles.div`
    text-align: center;
	padding: 0px 20px;
	position: relative;
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
	componentDidMount() {
		this.ticker()
	}
	ticker = () => {
		setInterval(() => {
			this.setState({ time: new Date() })
		}, 1000)
	}
	render() {
		const { time } = this.state
		return (
			<ClockMachine.Provider>
				<ClockMachine.Control onDidMount={(props: any) => props.init()}>
					<Container>
						<Display>
							<Time time={time} />
						</Display>
						<ClockMachine.State is="AlarmSet">
							<AlarmSetIndicator />
						</ClockMachine.State>
					</Container>

					<div>
						<ClockMachine.State
							is="Normal"
							render={({ transition }: any) => (
								<button onClick={() => transition('ALARM_TRIGGER')}>
									Set Alarm
								</button>
							)}
						/>
						<ClockMachine.Activity
							is="ring"
							render={({ transition }: any) => (
								<button onClick={() => transition('SNOOZE')}>Snooze</button>
							)}
						/>
						<ClockMachine.State
							is="AlarmSet"
							render={({ transition }: any) => (
								<button onClick={() => transition('ALARM_OFF')}>
									Cancel Alarm
								</button>
							)}
						/>
						<ClockMachine.Activity is="ring">
							<Ring />
						</ClockMachine.Activity>
					</div>
				</ClockMachine.Control>
			</ClockMachine.Provider>
		)
	}
}
