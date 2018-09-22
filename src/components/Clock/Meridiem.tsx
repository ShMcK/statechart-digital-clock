import * as React from 'react'
import styles from 'styled-components'

const Container = styles.div`
    position: absolute;
    bottom: 20px;
    right: 20px;
    font-size: 12px;
`

interface IProps {
	time: Date
}

export default class Meridiem extends React.Component<IProps> {
	get meridiem() {
		const hours = this.props.time.getHours()
		if (hours > 12) {
			return 'PM'
		}
		return 'AM'
	}
	render() {
		return <Container>{this.meridiem}</Container>
	}
}
