import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import './ComponentStyles.css'
import ModalImage from "react-modal-image";

function RestaurantDetails({ match }) {

    const [detail, setDetail] = useState({})//for details

    const [name, setName] = useState('')//for restaurant name

    const [menu, setMenu] = useState('')//for storing image to display


    //for re-rendering restaurant details on web page
    useEffect(() => {
        Axios.get(`http://localhost:1337/restaurant/${match.params.id}`).then(response => {
            setDetail(response.data.restaurantDetail)
            setMenu(JSON.parse(response.data.restaurantDetail.menu))
            setName(response.data.name)
        })
    }, [])

    //iterating at displaying data
    return (
        <div>

            <div className="details">

                <ul>
                    <li><h2>{name}</h2></li>
                    <li><img src="https://img.icons8.com/material/18/000000/worldwide-location--v1.png" />-<h6>{detail.address}</h6></li>
                    <li><img src="https://img.icons8.com/metro/18/000000/clock.png" />-<h6>{detail.opening} - {detail.closing}</h6></li>
                    <li><img src="https://img.icons8.com/android/18/000000/phone.png" />-<h6>{detail.phone}</h6></li>
                </ul>

                <ModalImage small={menu} large={menu} alt="Menu" className="menu" />;
                <hr/>
        </div>
        
        </div>
    )
}

export default RestaurantDetails
