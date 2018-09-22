/* styles from https://codepen.io/bsmith/pen/drElg?editors=1100 */

import * as React from 'react'
import styles from 'styled-components'

import Alarm from './Alarm'
import Time from './Time'

const Container = styles.div`
    width: 400px;
	margin: 100px auto 60px;
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
interface IState {
	time: Date
}

export default class Clock extends React.Component<{}, IState> {
	state = {
		time: new Date(),
	}
	componentDidMount() {
		setInterval(() => {
			this.setState({ time: new Date() })
		}, 1000)
	}
	render() {
		const { time } = this.state
		return (
			<Container>
				<Display>
					<Time time={time} />
					<Alarm />
				</Display>
			</Container>
		)
	}
}
