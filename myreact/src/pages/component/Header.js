import PropTypes from 'prop-types'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

const Header = (props) => {

    const goToStock = () => {
        console.log('click');
        window.location.href="../stock";
    }
    const goToHistory = () => {
        console.log('click');
        window.location.href="../history";
    }
    const goToIndex = () => {
        console.log('click');
        window.location.href="../";
    }
    return (
        <header className='header'>

            <h2>{props.title}</h2>
            <h4>NCCU Stock Market</h4><br />
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
                    <Button  onClick={goToHistory} size="small">歷史紀錄</Button>
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
