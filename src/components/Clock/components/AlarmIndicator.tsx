import * as React from 'react'
import styles, { keyframes } from 'styled-components'

const blink = keyframes`
	50% {
		opacity: 0;
	}
`

interface Props {
	ringing?: boolean
}

const Indicator = styles.div`
	position: absolute;
	bottom: -14px;
	left: 22px;
	animation: ${(props: Props) =>
		props.ringing ? `1s ${blink} ease-in-out infinite` : 'none'}
`

const AlarmIcon = () => (
	<svg
		width="20px"
		height="20px"
		viewBox="0 0 300 300"
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink">
		<g>
			<path
				d="M149.995,0C67.156,0,0,67.158,0,149.995s67.156,150,149.995,150s150-67.163,150-150S232.834,0,149.995,0z     M214.842,178.524H151.25c-0.215,0-0.415-0.052-0.628-0.06c-0.213,0.01-0.412,0.06-0.628,0.06    c-5.729,0-10.374-4.645-10.374-10.374V62.249c0-5.729,4.645-10.374,10.374-10.374s10.374,4.645,10.374,10.374v95.527h54.47    c5.729,0,10.374,4.645,10.374,10.374C225.212,173.879,220.571,178.524,214.842,178.524z"
				fill="#FFFFFF"
			/>
		</g>
	</svg>
)

const AlarmIndicator = (props: Props) => (
	<Indicator ringing={props.ringing || false}>
		<AlarmIcon />
	</Indicator>
)

export default React.memo(AlarmIndicator)
