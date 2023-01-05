import React from "react";
import SignUp from './component/SignUp';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


const SignupPage = () => {
    return (
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          Width: 450,
        }}>
          <br />
          <h4>NCCU Stock Market</h4><br />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              m: 3,
              maxWidth: 400,
              minWidth: 400,
              borderRadius: '12px',
              boxShadow: 2,
              margin: '5px',
              padding: '10px',
            }}
          >
            <br />
            <h2>立即註冊</h2>
            <SignUp onType={loginSummit} />
            {/*<a href="/signup">立即註冊</a>   */}
          </Box>
        </Box>
    );
};

const loginSummit = async (acc) => {
  console.log(acc);
  let payload = {
    user_name: acc.acc,
    password: acc.pwd
  }
  const res = await fetch(
    'http://localhost:3000/login', {
    method: "POST",
    body: JSON.stringify(payload),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }
  ).then((response) => {

    console.log(response.status);
    return response.json();
  }).then((response_json) => {
    if (response_json.msg === 'no user found') {
      alert('帳號錯誤');
      return;
    }
    else if (response_json.msg === 'password error') {
      alert('密碼錯誤');
      return;
    }
    else if (response_json.msg === 'found user') {
      alert('登入成功');
      sessionStorage.setItem('user_name', response_json.user_name);
      sessionStorage.setItem('user_id', response_json.user_id);
      window.location.href = "../history";
      return;
    }

  });
}


export default SignupPage;