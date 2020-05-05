import React from 'react';
import { Link } from 'react-router-dom';


import '../style/HotelCard.css'

function HotelCard({rooms}){
    
    return(
        <div className="card">
            
           <Link to = {'/popularity/' + rooms.id} className = "titleCard">  {rooms.name}</Link>
           

           <img  src={ rooms.imgUrl} alt=" Poster" />
      
   
         </div>
    );
}

export default HotelCard;