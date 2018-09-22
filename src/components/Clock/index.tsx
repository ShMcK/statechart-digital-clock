/* styles from https://codepen.io/bsmith/pen/drElg?editors=1100 */

import * as React from 'react'
import style from 'styled-components'

import Alarm from './Alarm'
import Digits from './Digits'
import Meridiem from './Meridiem'

const Container = style.div`
    width:370px;
	padding:40px;
	margin:100px auto 60px;
    position:relative;
    background-color:#272e38;
	color:#cacaca;
`

const Display = style.div`
    text-align:center;
	padding: 40px 20px 20px;
	border-radius:6px;
	position:relative;
	height: 54px;
`

export default class Clock extends React.Component {
	state = {
		time: 'X',
	}
	render() {
		const { time } = this.state
		return (
			<Container>
				<Display>
					<Digits time={time} />
					<Meridiem time={time} />
					<Alarm />
				</Display>
			</Container>
		)
	}
}
