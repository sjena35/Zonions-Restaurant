import React, { useState, useEffect } from 'react';
import restaurantIcon from '../Icons/Rectangle.png'
import './ComponentStyles.css';
import '../App.css'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol } from 'mdbreact';
import Axios from 'axios';
import { NavLink, useHistory } from 'react-router-dom';
import restIcon from '../Icons/restIcon.png'

function HomePage() {


    let history = useHistory()//for routing pages

    const [restaurantData, setrestaurantData] = useState([])// for storing restaurants


    useEffect(() => {
        Axios.get('http://localhost:1337/restaurant').then(response =>
            setrestaurantData(response.data)
        )
    }, [])


    //pushing the selected restaurant id to details page
    const details = (id) => {
        history.push({ pathname: `/details/${id}` })
    }


    //contains restaurant names by iterating the data
    return (


        <div className="homepage">

            <MDBCol>

                {restaurantData.map(data => (

                    <MDBCard style={{ width: "11rem" }} className="card" key={data.id}>

                        <MDBCardImage className="img-fluid" src={restIcon} waves />

                        <MDBCardBody>
                            <p onClick={() => details(data.id)}><b>{data.name}</b></p>
                        </MDBCardBody>

                    </MDBCard>

                ))}

            </MDBCol>





        </div>
    )
}

export default HomePage
