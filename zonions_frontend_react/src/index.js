import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './Components/HomePage';
import RestaurantDetails from './Components/RestaurantDetails';
import AdminPage from './Components/AdminPage';
import AdminLogin from './Components/AdminLogin';

ReactDOM.render(
  //routing of react app
  <BrowserRouter>

    <App />

      <Route exact path='/' component={HomePage}/>
      <Route path='/details/:id' component={RestaurantDetails}/>
      <Route path='/admin' component={AdminPage}/>
      <Route path='/adminLogin' component={AdminLogin}/>

    </BrowserRouter>,
  
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
