import React, { Component, useState } from 'react';
import {

  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBBtn

} from "mdbreact";


import AdminPage from './AdminPage';
import './ComponentStyles.css'
import { Route, useHistory } from 'react-router-dom';



function AdminLogin(props) {

  const [username, setUsername] = useState('')//for maintaining username

  const [password, setPassword] = useState('')// for maintaining password

  const history = useHistory()//for routing using push method



  //handler to get input values in states
  const handler = (event) => {
    if (event.target.name == "username") {
      setUsername(event.target.value)
    }

    if (event.target.name == "password") {
      setPassword(event.target.value)
    }
  }


  //to check username and password matching or not manually
  const submit = (event) => {


    if (username == "admin@gmail.com" && password == "Admin@123") {

      history.push({ pathname: '/admin' })

    }

    else {
      event.preventDefault()
      alert("Incorrect Username/Password")
    }
  }

  return (

    <div>

      <div className="row">

        <div className="col-lg-4"></div>

        <div className="col-lg-4 login">

          <form>

            <div class="form-group">
              <label>Email</label>
              <input type="email" class="form-control" name="username" aria-describedby="emailHelp" pattern="[a-zA-Z]{2,}" placeholder="Enter email" value={username} onChange={handler} />
            </div>

            <div class="form-group">
              <label>Password</label>
              <input type="password" class="form-control" placeholder="Password" name="password" value={password} onChange={handler} />
            </div>

            <button type="submit" class="btn btn-secondary btn-block" onClick={submit}>Login</button>

          </form>

        </div>

      </div>
    </div>
  )

}

export default AdminLogin
