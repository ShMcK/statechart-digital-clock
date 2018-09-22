import * as React from 'react'
import style from 'styled-components'

const Container = style.div`
    background-color:#cacaca;
	border-color:#cacaca;
`

const Digit = style.div`
    text-align:left;
	position:relative;
	width: 28px;
	height:50px;
	display:inline-block;
    margin:0 4px;
`

interface IProps {
	time: string
}

export default class Digits extends React.Component<IProps> {
	render() {
		return (
			<Container>
				<Digit />
			</Container>
		)
	}
}
