import * as React from 'react'
import styles from 'styled-components'

const Screen = styles.div`
	background-color: black;
	display: flex;
	height: 100vh;
	width: 100vw;
	justify-content: center;
	align-items: center;
`

const DisplayScreen = styles.div`
	position: relative;
`

const Display = ({ children }) => (
	<Screen>
		<DisplayScreen>{children}</DisplayScreen>
	</Screen>
)

export default React.memo(Display)
