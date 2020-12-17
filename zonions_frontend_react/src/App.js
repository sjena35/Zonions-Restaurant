
import { BrowserRouter, Link, NavLink, Route, useHistory } from 'react-router-dom';
import './App.css';
import HomePage from './Components/HomePage';
import RestaurantDetails from './Components/RestaurantDetails';
import zonions from './Icons/Zonions.svg';

import React, { useState } from 'react';
import { Modal, Button } from 'antd';





function App() {

  const history = useHistory()
  const [flag, setflag] = useState(true)
  const login = () => {
    history.push({ pathname: '/adminLogin' })
  }



  return (

    <div className="App">
      <div className="head">
        <Link to='/'><img src={zonions} alt='logo' className="zonions" /></Link>
        <Link to='/adminLogin'><button type="button" className="btn btn-dark btn-sm adminlogin" >Admin Login</button></Link>
      </div>
    </div>
  );
}

export default App;
