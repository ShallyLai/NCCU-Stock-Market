import PropTypes from 'prop-types'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/AddCircle';

const UserInfo = (props) => {

  const onClick = async () => {
    console.log('儲值');
    props.store_value(props.user_id)
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        bgcolor: 'background.paper',
        overflow: 'hidden',
        borderRadius: '12px',
        boxShadow: 1,
        fontWeight: 'bold',
        margin: '5px',
        padding: '20px 10px',
        width: 250,   
      }}
    >
      <Box
        component="img"
        sx={{
          maxHeight: 200,
          maxWidth: 200,
          padding: '1px',
        }}
        alt="頭貼"
        src="https://i.imgur.com/zLjoyLI.jpg"
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          m: 3,
          margin: '5px'
        }}
      >
        <Box component="span" sx={{ fontSize: 24, mt: 1, margin: '5px' }}>
          {props.user_name}
        </Box>
        <Box component="span" sx={{ color: 'warning.main', fontSize: 20 }}>
         <b> $:  </b>{props.user_money}　
          <Button startIcon = {<AddIcon/>} variant="contained"  color= 'warning' onClick={onClick} size="small" sx={{  margin: '5px' }}>儲值</Button>
        </Box>
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
