import * as React from 'react'

const Ring = () => {
	React.useEffect(() => {
		const audio = new Audio(`${process.env.PUBLIC_URL}/assets/sounds/alarm.mp3`)
		audio.loop = true
		audio.play()
		return () => {
			audio.pause()
		}
	}, [])
	return null
}

export default Ring
