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

export default ({ children }) => (
	<Screen>
		<DisplayScreen>{children}</DisplayScreen>
	</Screen>
)
