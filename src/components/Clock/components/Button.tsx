import styles from 'styled-components'

export default styles.button`
    font-family: 'Orbitron', sans-serif;
    background-color: transparent;
    border: none;
    color: ${(props) => props.color || 'white'}
    letter-spacing: 1px;
    margin-right: 10px;
    :hover {
        text-shadow: 0px 0px 15px;
    }
`
