import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useLocation} from 'react-router-dom'


import HotelCard from './HotelCard';


function HotelList(){

 let[hotels , setHotels] = useState([]);
 


 function useQuery (){
  return new URLSearchParams(useLocation().search);
}

 const q = useQuery().get('q');

 useEffect(() => {
   getHotels();
  
 }, []);



 async function getHotels(){
  
    const res = await axios(`/popularity?$q = "name"`);
    setHotels(res.data); 
    
   }
  
     
   return(
        <div className= "row">    
          
           {  hotels
                .filter(hotel => q ?  hotel.country.includes(q) : true )
                .map(hotel =>  <HotelCard rooms ={ hotel } key ={hotel.id} />) 
                 }
 
        </div>
    )
}


export default HotelList;