import styles from 'styled-components'

export default styles.button`
    position: absolute;
    top: -50px;
    font-family: 'Orbitron', sans-serif;
    background-color: transparent;
    border: none;
    color: ${(props) => props.color || 'white'};
    left: ${(props) => (props.style && props.style.left) || 0};
    letter-spacing: 1px;
    :hover {
        text-shadow: 0px 0px 15px;
    }
`
