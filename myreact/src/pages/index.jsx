import React from "react";
import Header from './component/Header';
import Login from './component/Login';

const LoginPage = () => {
    return (
        <div className="container">
            <Header title='NCCU Stock Market' />
            <Login onType={loginSummit} />
        </div>
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
        sessionStorage.setItem('user', acc.acc);
        return;
      }
  
    });
  }
  export default LoginPage;