import PropTypes from 'prop-types'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

const Header = (props) => {

    const goToStock = () => {
        console.log('to Stock');
        window.location.href="../stock";
    }
    const goToHistory = () => {
        console.log('to History');
        window.location.href="../history";
    }
    const goToIndex = () => {
        console.log('log out');
        sessionStorage.clear();
        window.location.href="../";
    }
    return (
        <header className='header'>
            <h1>　　{props.title}</h1>
            <h4>NCCU Stock Market</h4>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& > *': {
                        m: 1,
                    },
                }}
            >
                <ButtonGroup variant="outlined" aria-label="text button group">
                    <Button  onClick={goToStock} size="small">當前股市</Button>
                    <Button  onClick={goToHistory} size="small">我的紀錄</Button>
                    <Button  onClick={goToIndex} size="small">登出</Button>
                </ButtonGroup></Box>
        </header >
    )
}

Header.defaultProps = {
    title: '',
}

Header.protoType = {
    title: PropTypes.string.isRequired,
}
export default Header
