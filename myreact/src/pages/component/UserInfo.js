import PropTypes from 'prop-types'
import Button2 from '@mui/material/Button';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';

const UserInfo = (props) => {

    const onClick = async () => {
        console.log('儲值');
        props.store_value(props.user_id)
    }
    return (
          <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            bgcolor: 'background.paper',
            overflow: 'hidden',
            borderRadius: '12px',
            boxShadow: 1,
            fontWeight: 'bold',
            margin: '5px',
          }}
        >
          <Box sx={{  height: 233,  width: 50 }}   />
          <Box
            component="img"
            sx={{
              height: 233,
              width: 350,
              maxHeight: { xs: 200, md: 150 },
              maxWidth: { xs: 200, md: 150 },
            }}
            alt="頭貼"
            src="https://i.imgur.com/zLjoyLI.jpg"
          />
           <Box sx={{  height: 233,  width: 50 }}   />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems:'flex-start',
              m: 3,
              minWidth: { md: 350 },
            }}
          >
            <Box component="span" sx={{ fontSize: 24, mt: 1 , margin: '5px' }}>
              {props.user_name}
            </Box>
            <Box component="span" sx={{ color: 'primary.main', fontSize: 22, margin: '5px' }}>
              $: {props.user_money}
            </Box>
            <Button2 variant="contained" onClick = {onClick} size="small" sx={{ margin: '5px' }}>儲值</Button2>
          </Box>
        </Box>
    )
}

UserInfo.defaultProps = {
    user_name: '使用者名稱',
    user_money: '0',
}

UserInfo.protoType = {
    user_name: PropTypes.string.isRequired,
    user_money: PropTypes.string.isRequired,
}


export default UserInfo
