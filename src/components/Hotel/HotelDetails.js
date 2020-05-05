import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import AuthContext from '../auth/AuthContext';


import '../style/HotelDetails.css'



function HotelDetails(){
    const { hotelId } = useParams();
    const [hotel, setHotel] = useState(null);
    const [reviews , setReviews] = useState([]);

    const {user} = useContext(AuthContext);

    async function getHotelbyID(id) {
        try{
            const promises = [];
            promises.push(Axios('/popularity/' + id ).then(res=>res.data));
            promises.push(Axios('/reviews?popularityId =' + id).then(res=>res.data));

            const [hotel, reviews] = await Promise.all(promises);

            setReviews(reviews);
            setHotel(hotel);
            console.log(hotel, reviews)
            
            
        }catch(e){
            console.warn(e);
        }
        
        
    }
    
    useEffect(() => {
          getHotelbyID(hotelId);
    }, [hotelId]);

    async function handleClick(e){
        e.preventDefault();

        try{
             await Axios('/popularity/' + hotelId ,{
                method:'DELETE',
                data:{hotel},
            });
        }catch(e){
            console.warn(e);
        }
    }

  
    if(hotel){

        return (

        <div className ="wrapperDetails">
            <div>
                <h1 className="detailsTitle">{hotel.name} </h1>
                
                           {
                            (user ? 

                                <button onClick = {handleClick} >Delete Hotel</button>
                            : 
                                null
                            )}  
                </div>
                <img  src={ hotel.imgUrl} alt=" Poster" className ="poster" />
                
                <p className ="descrption">{hotel.description}</p>

                <p >
                    The price per night : 
                    <span className="priceDescription">{hotel.price} $ </span>
                
                        {
                            (user ? 

                                <Link to= {"/popularity/edit/" + hotel.id}  className = "buttonEdit">New Price</Link>
                            : 
                                null
                            )}  
                </p>
                <p>Situated in the best rated area in 
                    <span className = "country"> {hotel.country}</span>, 
                    this hotel has an excellent location score of  
                    <span className = "rating"> {hotel.rating}</span>.
                </p>   
                <div>
                    <span className = "Reviews"> Reviews 
                            {
                            (user ? 

                                <Link to= {"/popularity/update/" + hotel.id}  className = "buttonUpdate">+</Link>
                            : 
                                null
                            )} 
                     </span>

                            {reviews.map(review => <p key={review.id}>{review.body }</p>)}

        
                </div>
            
    
        </div>
        )
    } else{
        return <h1>Loading...</h1>
    }
}

export default HotelDetails;