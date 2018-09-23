import * as React from 'react'

export default class Ring extends React.Component {
	audio: any
	componentDidMount() {
		this.audio = new Audio(`${process.env.PUBLIC_URL}/assets/sounds/alarm.mp3`)
		this.audio.loop = true
		this.audio.play()
	}
	componentWillUnmount() {
		this.audio.pause()
		this.audio = null
	}
	render() {
		return null
	}
}
