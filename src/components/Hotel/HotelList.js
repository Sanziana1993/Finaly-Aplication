import React, { useState, useEffect } from 'react';
import axios from 'axios';


import HotelCard from './HotelCard';


function HotelList(){

 let[hotels , setHotels] = useState([]);

 useEffect(() => {
   getHotels();
   

 }, []);




 async function getHotels(){
   const res = await axios('/popularity')
    setHotels(res.data);
    console.log(res.data)
   

   }
 
   return(
        <div className= "row">
               
                  
           {hotels.map(hotel => <HotelCard rooms ={ hotel } key ={hotel.id} />) }
         
        </div>
    )
}


export default HotelList;