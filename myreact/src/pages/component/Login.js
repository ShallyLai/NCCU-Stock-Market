import { useState } from 'react'

const Login = ({onType}) => {
  const [acc, setAcc] = useState('')
  const [pwd, setPwd] = useState('')

  const onSubmit = (e) =>{
    e.preventDefault()

    if(!acc){alert('Please type your Acc!');return;}
    onType({acc, pwd})
  }

    return (
      <form className='add-form' onSubmit={onSubmit}>
        <div className='form-control'>
          <label>帳號：</label>
          <input type='text' placeholder='輸入帳號'
           value={acc} onChange={(e) =>setAcc(e.target.value)}/>
        </div>
        <div className='form-control'>
          <label>密碼：</label>
          <input type='text' placeholder='輸入密碼'
           value={pwd} onChange={(e) =>setPwd(e.target.value)}/>
        </div>
        <input type='submit' value='登入'/>
      </form>
    )
  }


export default Login