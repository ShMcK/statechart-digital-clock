import * as React from 'react'
import styles from 'styled-components'

const Container = styles.div``

const DigitContainer = styles.div`
    text-align:left;
	position:relative;
	width: 28px;
	height:50px;
	display:inline-block;
	margin:0 4px;
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

export default class Digits extends React.Component<IProps> {
	time(type: string) {
		const timeArray: string[] = this.props.time[`get${type}`]()
			.toString()
			.split('')
		if (timeArray.length === 1) {
			timeArray.unshift('0')
		}
		return timeArray
	}

	render() {
		return (
			<Container>
				{this.time('Hours').map((digit) => (
					<Digit value={digit} />
				))}
				:
				{this.time('Minutes').map((digit) => (
					<Digit value={digit} />
				))}
				:
				{this.time('Seconds').map((digit) => (
					<Digit value={digit} />
				))}
			</Container>
		)
	}
}
