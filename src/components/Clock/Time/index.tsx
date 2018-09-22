import * as React from 'react'
import styles from 'styled-components'

const Container = styles.div`
	font-family: 'Orbitron', sans-serif;
	letter-spacing: 4px;
`

interface IProps {
	time: Date
}

export default class Time extends React.Component<IProps> {
	time(type: string) {
		const timeArray: string[] = this.props.time[`get${type}`]()
			.toString()
			.split('')
		if (timeArray.length === 1) {
			timeArray.unshift('0')
		}
		return timeArray
	}
	get meridiem() {
		const hours = this.props.time.getHours()
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
				{digits.map((digit) => digit)} {this.meridiem}
			</Container>
		)
	}
}
