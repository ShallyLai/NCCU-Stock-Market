import PropTypes from 'prop-types'
import Button from './Button'

const Header = (props) => {

    const onClick = () => {
        console.log('click');
    }
    return (
        <header className='header'>
            <h1>{props.title}</h1>
            <Button color='red' text='Button' onClick = {onClick}/>
        </header>
    )
}

Header.defaultProps = {
    title: 'NCCU Stock Market',
}

Header.protoType ={
    title: PropTypes.string.isRequired,
}
export default Header
