import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import './ComponentStyles.css'
import {

  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBBtn

} from "mdbreact";

import TimePicker from 'react-time-picker';
import { Link } from 'react-router-dom';




function AdminPage() {

  const [data, setData] = useState([])//for maintaining all restaurant data from rest api

  const [modal, setModal] = useState(false)// for modal maintaing

  //bellow all states are used for maintaining inputs by user
  const [id, setId] = useState('')

  const [name, setName] = useState('')

  const [address, setAddress] = useState('')

  const [phone, setPhone] = useState('')

  const [opening, setOpening] = useState('')

  const [closing, setClosing] = useState('')

  const [flag, setFlag] = useState(false)

  const [menu, setMenu] = useState('');

  let valid = true;

  var link = "";


  //for modal open and close
  const toggleModal = () => {
    setModal(!modal)

  };




  //for deleting restuarant from database using api
  const delet = (id) => {

    if (window.confirm("Are you sure you want to delete")) {
      Axios.delete(`http://localhost:1337/restaurant/${id}`).then(response =>
        console.log(response))
    }
  }



  //for displaying existing update restaurant details on update screen
  const edit = (restaurant) => {

    setId(restaurant.id)
    setName(restaurant.name)
    setAddress(restaurant.restaurantDetail.address)
    setOpening(restaurant.restaurantDetail.opening)
    setClosing(restaurant.restaurantDetail.closing)
    setPhone(restaurant.restaurantDetail.phone)
    setMenu(JSON.parse(restaurant.restaurantDetail.menu))

    setFlag(true)

    toggleModal()
  }


  //getting image url & converting to binary format and providing data in string format
  const imgupload = async (e) => {
    const menuImg = e.target.files[0];//get image

    const binary = await convert(menuImg)//binary format
    setMenu(binary);

  }

  // for converting image url to binary format
  const convert = (menuImg) => {

    return new Promise((resolve, reject) => {

      const fileReader = new FileReader();

      fileReader.readAsDataURL(menuImg);//reading the url and coverting to binary data 

      fileReader.onload = () => {
        resolve(fileReader.result)
      };
      fileReader.onerror = ((error) => {
        reject(error)
      })


    })
  }


  //on submit the data get inserted to database or existing data get updated
  const submit = (event) => {
    event.preventDefault()

    let val = validation()//validation check

    if (val) {

      var obj = { name: name, address: address, opening: opening, closing: closing, phone: phone, menu: JSON.stringify(menu) }

      //for updating existing restaurant details
      if (flag) {

        Axios.put(`http://localhost:1337/restaurant/${id}`, obj).then(response =>
          console.log(response))

      }

      else {

        Axios.post('http://localhost:1337/restaurant', obj).then(response =>
          console.log(response)
        )
        setFlag(false)
      }
      toggleModal()


    }



  }



  //handler to maintain input values in state 
  const handler = (event) => {
    if (event.target.name == "name") {
      setName(event.target.value)
    }
    else if (event.target.name == "address") {
      setAddress(event.target.value)
    }

    else if (event.target.name == "opening") {
      setOpening(event.target.value)
    }

    else if (event.target.name == "closing") {
      setClosing(event.target.value)
    }

    else if (event.target.name == "phone") {
      setPhone(event.target.value)
    }
  }




  //on clicking add button add method changes the state values of defaults
  const add = () => {
    defaultData()
    toggleModal()
    setFlag(false)
  }



  //to changing states of restuarnt details to default values
  const defaultData = () => {
    setId('')
    setName('')
    setAddress('')
    setOpening('')
    setClosing('')
    setPhone('')
    setMenu('')

  }


  //validations to check data inserted are valid or not
  const validation = () => {

    //for restaurant name validation
    if (!name.match("[a-zA-Z]{2,}")) {
      alert("restaurant name must be provided")
      return false
    }

    // for mobile number validation
    else if (!phone.match("[789][0-9]{9}")) {
      alert("Invalid Number");
      return false
    }

    //for time validation
    else if (opening == "") {
      alert("Mention Opening time");
      return false
    }

    else if (closing == "") {
      alert("mention closing time");
      return false
    }


    return true
  }



  //for re-redering restaurant data on state change
  useEffect(() => {
    Axios.get('http://localhost:1337/restaurant').then(response =>
      setData(response.data))

  }, [delet, submit,toggleModal,flag])




  return (

    <div>

      <img src="https://img.icons8.com/ios-glyphs/30/000000/admin-settings-male.png" />

      <button className="btn btn-success add" onClick={add} >Add Restaurant</button>

      <Link to="/"><img src="https://img.icons8.com/ios-filled/50/000000/sign-in-form-password.png" /></Link>

      <table class="table table-striped">

        <thead>

          <tr>
            <th>Restaurant Name</th>
            <th>Timing</th>
            <th>Updated Time</th>
            <th colSpan="2">Actions</th>
          </tr>

        </thead>

        <tbody>

          {data.map(restaurant => (
            <tr key={restaurant.id}>
              <td>{restaurant.name}</td>
              <td>{restaurant.restaurantDetail.opening}-{restaurant.restaurantDetail.closing}</td>
              <td>{restaurant.updatedAt}</td>
              <td><button className="btn btn-outline-success" onClick={() => edit(restaurant)}>Edit</button></td>
              <td><button className="btn btn-outline-danger" onClick={() => delet(restaurant.id)}>Delete</button></td>
            </tr>
          ))}

        </tbody>

      </table>


      <MDBModal isOpen={modal} toggle={toggleModal}>
        <MDBModalHeader className="text-center" titleClass="w-100 font-weight-bold" toggle={toggleModal}>

          {flag ? "Update Restaurant" : "Add Restaurant"}

        </MDBModalHeader>

        <MDBModalBody>

          <form>

            <div class="form-group">
              <label>Restaurant Name</label>
              <input type="text" class="form-control" aria-describedby="emailHelp" value={name} name="name" onChange={handler} required />
            </div>

            <div class="form-group">
              <label>Address</label>
              <input type="text" class="form-control" value={address} name="address" onChange={handler} />
            </div>

            <div class="form-group">
              <label>Phone</label>
              <input type="text" class="form-control" value={phone} name="phone" onChange={handler} />
            </div>

            <div class="form-group">
              <label>Opening:</label>
              <TimePicker value={opening} onChange={setOpening} />
            </div>

            <div class="form-group">
              <label>Closing:</label>
              <TimePicker value={closing} onChange={setClosing} />
            </div>

            <div className="form-group">
              <label>Menu</label>
              <input type="file" onChange={(e) => { imgupload(e); }} accept="image/png, image/jpeg,image/jpg" /><br /><br />
              {menu!=''?<img src={menu} className="preview"/>:""}
            </div>

            {flag ? <button type="submit" class="btn btn-success btn-block" onClick={submit}>Update</button> : <button type="submit" class="btn btn-success btn-block" onClick={submit}>Add</button>}

          </form>

        </MDBModalBody>

        <MDBModalFooter className="justify-content-center">
          zonions @copyright by wishtree
        </MDBModalFooter>

      </MDBModal>

    </div>
  )
}

export default AdminPage
