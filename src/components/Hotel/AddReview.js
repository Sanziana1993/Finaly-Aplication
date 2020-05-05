import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Axios from 'axios';
import { useParams } from 'react-router-dom';


function AddReview(){

const{popularityId} =useParams();
const[review , setReview] = useState(null);
const [formReview , setFormAdd] = useState({
    'review' : ''
});

const [isDirty , setisDirty] = useState(false);
async function getReviewbyID (id){
    try{
        const res = await Axios('reviews?popularityId ='+ id)
        setReview(res.data)
    }catch(e){
        console.warn(e)
    }
}

async function handleSubmit(e){
    
    try{
        await axios('reviews?popularityId ='  , {
            method :'POST',
            data :{ ...formReview}
        });

    
    }catch(e){
        console.warn(e);
    }
}

function handleInputChange(e){
    setisDirty(true);

    setFormAdd({
        ...formReview,
        [e.currentTarget.id] : e.currentTarget.value
    });
}
useEffect(() => {
    getReviewbyID(popularityId);
}, [popularityId])
    if(!review){
        return <h3>'Loading'</h3>
    }
    return(
        <div>
        <h1>Review hotel: </h1>
        <form className = 'formEdit' onSubmit ={handleSubmit}>
            <input
                onChange = { handleInputChange }
                value = {formReview.review}
                type = 'text'
                className = 'form-control '
                id = 'review'
                placeholder = "Enter review "
            />
            <button type = 'submit' className = 'buttonSave' disabled ={ !isDirty}>Save</button>
        </form>
    </div>
            
           
        )
}
 export default AddReview
