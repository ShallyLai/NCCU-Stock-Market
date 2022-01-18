import './App.css';
import React from 'react';

import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

//Pages
import LoginPage from "./pages/index";
import NotFoundPage from './pages/404';
import HistoryPage from './pages/history';
import StockPage from './pages/stock';
import TestPage from './pages/test_table';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage/>}></Route>
          <Route path="/history" element={<HistoryPage/>} ></Route>
          <Route path="/stock" element={<StockPage/>} ></Route>
          <Route path="/test" element={<TestPage/>} ></Route>
          <Route path="/404" element={<NotFoundPage/>} ></Route>
          <Route path="*" element={<Navigate to ="/404" />}/> 
        </Routes>
      </Router>
    );
  }
} 

export default App;