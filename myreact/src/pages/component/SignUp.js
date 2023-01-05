import { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const SignUp = ({ onType }) => {
  const [acc, setAcc] = useState('')
  const [pwd, setPwd] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    if (!acc) { alert('請輸入帳號！'); return; }
    if (!pwd) { alert('請輸入密碼！'); return; }
    onType({ acc, pwd })
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <div className='form-control'>
          <TextField
            id="outlined-password-input"
            label="帳號"
            type="text"
            autoComplete="current-password"
            placeholder='輸入您的帳號'
            value={acc}
            onChange={(e) => setAcc(e.target.value)}
          />
        </div>
        <div className='form-control'>
          <TextField
            id="outlined-password-input"
            label="密碼"
            type="password"
            autoComplete="current-password"
            placeholder='輸入您的密碼'
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
        </div>
        <br/>
        <Button variant="contained" type='submit' size="large" >註冊</Button>
      </Stack>
    </form>
  )
}


export default SignUp