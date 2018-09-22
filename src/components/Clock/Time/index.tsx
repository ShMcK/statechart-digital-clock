import * as React from 'react'
import styles from 'styled-components'

const Container = styles.div`
	font-family: 'Orbitron', sans-serif;
`

const DigitContainer = styles.div`
    text-align: left;
	position: relative;
	width: 28px;
	height: 50px;
	display: inline-block;
	margin: 0;
`

const Digit = ({ value }: { value: string }) => {
	return (
		<DigitContainer>
			<div>{value}</div>
		</DigitContainer>
	)
}

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
			return 'P M'
		}
		return 'A M'
	}
	render() {
		const digits = [
			...this.time('Hours'),
			':',
			...this.time('Minutes'),
			':',
			...this.time('Seconds'),
			' ',
		]
		return (
			<Container>
				{digits.map((digit) => (
					<Digit value={digit} />
				))}
				{this.meridiem}
			</Container>
		)
	}
}
