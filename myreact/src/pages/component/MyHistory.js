import PropTypes from 'prop-types'
import Button from './Button'
import Button2 from '@mui/material/Button';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';

const MyHistory = (props) => {

    const onClick = async () => {
        console.log('儲值');
        props.store_value(props.user_id)
    }
    return (
          <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            bgcolor: 'background.paper',
            overflow: 'hidden',
            borderRadius: '12px',
            boxShadow: 1,
            fontWeight: 'bold',
          }}
        >
          <Box
            component="img"
            sx={{
              height: 233,
              width: 350,
              maxHeight: { xs: 200, md: 150 },
              maxWidth: { xs: 200, md: 150 },
            }}
            alt="頭貼"
            src="https://imgur.com/MdUTCZ3.png"
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', md: 'flex-start' },
              m: 3,
              minWidth: { md: 350 },
            }}
          >
            <Box component="span" sx={{ fontSize: 24, mt: 1 }}>
              {props.user_name}
            </Box>
            <Box component="span" sx={{ color: 'primary.main', fontSize: 22 }}>
              $: {props.user_money}
            </Box>
            <Button2 variant="contained" onClick = {onClick} size="small">儲值</Button2>
          </Box>
        </Box>
    )
}

MyHistory.defaultProps = {
    user_name: '使用者名稱',
    user_money: '0',
}

MyHistory.protoType = {
    user_name: PropTypes.string.isRequired,
    user_money: PropTypes.string.isRequired,
}


export default MyHistory
