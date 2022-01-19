import React from "react";
import Header from './component/Header';
import Login from './component/Login';
import Box from '@mui/material/Box';

const LoginPage = () => {
  return (
  
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          m: 3,
          minWidth: { md: 350 },
         
        }}
      > 
        <h4>NCCU Stock Market</h4><br/>
        <h2>帳號登入</h2>
        <Login onType={loginSummit} />
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
export default LoginPage;