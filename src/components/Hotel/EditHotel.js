import React, { useState, useEffect } from 'react';
import { useParams,Redirect } from 'react-router-dom';
import Axios from 'axios';

import '../style/EditHotel.css'



function EditPrice(){
    const{hotelId} = useParams();
    const [hotel ,setHotel] =useState(null);
    const [redirect , setRedirect] = useState(false);

    async function getHotelbyId(id){
        try{
            const res = await Axios('/popularity/'+ id);
            setHotel(res.data);
        }catch(e){
            console.warn(e)
        }
    }

    async function handleSubmit(e){
        e.preventDefault();

        try{
             await Axios('/popularity/' + hotelId ,{
                method:'PUT',
                data:{...hotel, 'price': hotel.price},
            });
            setRedirect(true)
        }catch(e){
            console.warn(e);
        }
    }

    function handleInputChange(e){
        setHotel({...hotel , 'price':e.currentTarget.value});

    }

    useEffect(() => {
        getHotelbyId(hotelId);
    }, [hotelId]);

    if(!hotel){
        return <h1>Loading...</h1>;
    }
    
    if(redirect){
        return <Redirect to = '/'/>
    }
    return(
     <div className = 'wrapperEdit'>
            <h1 className = 'titleEdit'>New Price !!!</h1>
            <form onSubmit = {handleSubmit}>
            <div>{hotel.name}</div>
            <p className = 'descriptionEdit'>
                Enter the new room price per night!
                Please enter the price in $!
            </p>
            <label htmlFor = 'price'>Price :</label>
            <input 
                onChange = {handleInputChange}
                value = {hotel.price}
                type = 'number'
                id = 'price'
            />
            <button type = 'submit'  >Save </button>
            </form>


      </div>
    )
}

export default EditPrice;