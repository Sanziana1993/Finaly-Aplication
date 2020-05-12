import React, { useContext,useState, useEffect } from 'react'
import { useParams , Redirect } from 'react-router-dom';
import axios from 'axios';

import AuthContext from '../auth/AuthContext';

import '../style/AddReview.css';


function AddReview(){

const{reviewId} = useParams();
const[review , setReview] = useState(null);
const [formReview , setFormAdd] = useState({
    'body' : '',
     
});
const [isDirty , setisDirty] = useState(false);
const [redirect , setRedirect] = useState(false);

const { user} = useContext(AuthContext);


async function getReviewbyID (id){
    try{
        const res = await axios.get('reviews?reviewId ='+ id)
        setReview(res.data)
       
    }catch(e){
        console.warn(e)
    }
}

async function handleSubmit(e){
    e.preventDefault();
    try{
        await axios('reviews?reviewId ='  , {
            method :'POST',
            data :{  body: formReview.body,
                     popularityId :reviewId}
                
        });
        setTimeout(()=> setRedirect(true),1000);
    }catch(e){
        console.warn(e);
    }
}

function handleInputChange(e){
    setisDirty(true);

    setFormAdd({
        formReview,
        [e.currentTarget.id] : e.currentTarget.value
    });
}

useEffect(() => {
    getReviewbyID(reviewId);
}, [reviewId])
       
if(redirect){
    return <Redirect to = '/' />
}
   if(!review){
       return <h3>Loading </h3>
   }
    return(
        <div className = "formReviewAdd">
        <h2 className = 'titleReview'> Review hotel </h2>
        <form className = 'formEdit' onSubmit ={handleSubmit}>
            <input
                onChange = { handleInputChange }
                value = {formReview.body}  
                type = 'text'
                className = 'form-control '
                id = 'body'
                placeholder = " Enter review and name"
            />
             Username: {user}
            <button type = 'submit' className = 'buttonSave' disabled ={ !isDirty}>Save</button>
        </form>
    </div>
            
           
        )
}
 export default AddReview
