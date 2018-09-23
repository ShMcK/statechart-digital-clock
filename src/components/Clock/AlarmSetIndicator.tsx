import { Icon } from 'antd'
import * as React from 'react'
import styles, { keyframes } from 'styled-components'

const blink = keyframes`
	50% {
		opacity: 0;
	}
`

const Indicator = styles.div`
	position: absolute;
	bottom: -26px;
	left: 18px;
	animation: ${(props: { ringing: boolean }) =>
		props.ringing ? `1s ${blink} ease-in-out infinite` : 'none'}
`

const iconStyles = {
	color: 'white',
	fontSize: 22,
}

interface IProps {
	ringing: boolean
}

export default class AlarmSetIndicator extends React.Component<IProps> {
	static defaultProps = {
		ringing: false,
	}
	render() {
		return (
			<Indicator ringing={this.props.ringing}>
				<Icon type="clock-circle" theme="outlined" style={iconStyles} />
			</Indicator>
		)
	}
}
