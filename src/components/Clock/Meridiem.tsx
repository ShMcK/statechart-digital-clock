import * as React from 'react'
import style from 'styled-components'

const Container = style.div`
    position: absolute;
    bottom: 20px;
    right: 20px;
    font-size: 12px;
`

interface IProps {
	time: string
}

export default class Meridiem extends React.Component<IProps> {
	render() {
		return <Container>AM</Container>
	}
}
