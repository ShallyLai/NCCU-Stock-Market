import './App.css';
import React from 'react';
import Header from './component/Header';
import Login from './component/Login';


class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Header title='NCCU Stock Market' />
        <Login onType={login} />
      </div>
    );
  }
}

const login = (acc) =>{
  console.log(acc)
}

export default App;
