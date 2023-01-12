import PropTypes from 'prop-types'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import LogoutIcon from '@mui/icons-material/Logout';
import StockIcon from '@mui/icons-material/Insights';
import HistoryIcon from '@mui/icons-material/ListAlt';

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
            <h2>&emsp;NCCU Stock Market</h2> 
            <h1>{props.title}</h1>
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
                <ButtonGroup variant="text" size="large" aria-label="text button group" >
                    <Button  startIcon = {<StockIcon/>} onClick={goToStock} sx={{width:'150px'}}><b>當前股市</b></Button>
                    <Button  startIcon = {<HistoryIcon/>} onClick={goToHistory} sx={{width:'150px'}}><b>我的紀錄</b></Button>
                    <Button  startIcon = {<LogoutIcon/>} onClick={goToIndex} sx={{width:'110px'}} ><b>登出</b></Button>
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
