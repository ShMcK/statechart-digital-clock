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

const Time = () => {
	const [time, setTime]: [Date, (time: Date) => void] = React.useState(
		new Date(),
	)

	React.useEffect(() => {
		setInterval(() => {
			setTime(new Date())
		}, 1000)
	}, [])

	const getTime = (type: string) => {
		const timeArray: string[] = time[`get${type}`]()
			.toString()
			.split('')
		if (timeArray.length === 1) {
			timeArray.unshift('0')
		}
		return timeArray
	}

	const digits = [
		...getTime('Hours'),
		':',
		...getTime('Minutes'),
		':',
		...getTime('Seconds'),
	]

	const meridiem = time.getHours() > 12 ? 'PM' : 'AM'

	return (
		<Container>
			<Digits>
				{digits.map((digit, index) => (
					<Digit key={index}>{digit}</Digit>
				))}
			</Digits>
			<Meridiem>{meridiem}</Meridiem>
		</Container>
	)
}

export default Time
