import { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
const jsSHA = require("jssha");


const SignUp = ({ onType }) => {
  const [acc, setAcc] = useState('')
  const [pwd, setPwd] = useState('')
  const [pwd_check, setPwdCheck] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    if (!acc) { alert('請輸入帳號！'); return; }
    if (!pwd) { alert('請輸入密碼！'); return; }
    if (!pwd_check) { alert('請重複輸入密碼！'); return; }
    
    if (pwd != pwd_check){
      alert('輸入的兩個密碼不相符，請再試一次！'); 
      return;
    }

    //const shaObj = new jsSHA("SHA-512", "TEXT", { encoding: "UTF8" });
    //console.log(shaObj)
    /* .update() can be chained */
    //shaObj.update(pwd);
    //console.log(shaObj)
    //const hash = shaObj.getHash("HEX");
    //onType({ acc, hash })
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
            label="設定帳號"
            type="text"
            autoComplete="current-password"
            placeholder='設定您的帳號'
            value={acc}
            onChange={(e) => setAcc(e.target.value)}
          />
        </div>
        <div className='form-control'>
          <TextField
            id="outlined-password-input"
            label="設定密碼"
            type="password"
            autoComplete="current-password"
            placeholder='輸入您的密碼'
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
        </div>
        <div className='form-control'>
          <TextField
            id="outlined-password-input"
            label="確認密碼"
            type="password"
            autoComplete="current-password"
            placeholder='請再次輸入您的密碼'
            value={pwd_check}
            onChange={(e) => setPwdCheck(e.target.value)}
          />
        </div>
        <br/>
        <Button variant="contained" type='submit' size="large" >註冊</Button>
      </Stack>
    </form>
  )
}


export default SignUp