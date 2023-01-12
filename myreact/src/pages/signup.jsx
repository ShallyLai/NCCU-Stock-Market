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
          <h2>NCCU Stock Market</h2><br />
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
            <SignUp onType={signupSummit} />
            <a href="/">已經有帳號了嗎？立刻登入</a>
          </Box>
        </Box>
    );
};

const signupSummit = async (acc) => {
  console.log(acc);
  let payload = {
    user_name: acc.acc,
    //password:  acc.pwd
    password: acc.hash
  }
  const res = await fetch(
    'http://localhost:3000/signup', {
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
    if (response_json.msg === 'user name already used') {
      alert('此帳號已被註冊，請重新設定！');
      return;
    }
    else if (response_json.msg === 'signup success') {
      alert('註冊成功');
      // sessionStorage.setItem('user_name', response_json.user_name);
      // sessionStorage.setItem('user_id', response_json.user_id);
      window.location.href = "../";
      return;
    }

  });
}


export default SignupPage;