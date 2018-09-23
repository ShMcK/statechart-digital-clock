import * as React from 'react'
import styles from 'styled-components'

const Container = styles.div`
	position: relative;
	font-family: 'Orbitron', sans-serif;
	color: white;
`

const Digit = styles.div`
	display: inline-block;
	width: ${({ children }) => (children === ':' ? '30px' : '100px')};
	text-align: center;
`

const Digits = styles.div`
	display: inline-block;
	font-size: 112px;
`

const Meridiem = styles.div`
	position: absolute;
	right: 0;
	bottom: 10;
	font-size: 20px;
	letter-spacing: 5px;
`

interface IState {
	time: Date
}

export default class Time extends React.Component<{}, IState> {
	state = { time: new Date() }
	componentDidMount() {
		this.ticker()
	}
	ticker = () => {
		setInterval(() => {
			this.setState({ time: new Date() })
		}, 1000)
	}
	time(type: string) {
		const timeArray: string[] = this.state.time[`get${type}`]()
			.toString()
			.split('')
		if (timeArray.length === 1) {
			timeArray.unshift('0')
		}
		return timeArray
	}
	get meridiem() {
		const hours = this.state.time.getHours()
		if (hours > 12) {
			return 'PM'
		}
		return 'AM'
	}
	render() {
		const digits = [
			...this.time('Hours'),
			':',
			...this.time('Minutes'),
			':',
			...this.time('Seconds'),
		]
		return (
			<Container>
				<Digits>
					{digits.map((digit, index) => (
						<Digit key={index}>{digit}</Digit>
					))}
				</Digits>
				<Meridiem>{this.meridiem}</Meridiem>
			</Container>
		)
	}
}
