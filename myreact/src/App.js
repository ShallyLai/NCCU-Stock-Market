import './App.css';
import React from 'react';
import Header from './component/Header';
import Login from './component/Login';


class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Header title='NCCU Stock Market' />
        <Login onType={loginSummit} />
      </div>
    );
  }
} 



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
  });
}
export default App;
