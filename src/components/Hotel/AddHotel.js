import React, { useState} from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import '../style/AddHotel.css'


function AddHotel(){

    const [formHotel , setForm] = useState({
        'name' :' ',
         'imgUrl':'',
        'description':'',
        'price':'',
        'country':''
    });
    const [isSuccesfull , setSuccesfull] = useState(false);
    const [isDirty , setDirty] = useState(false);
    const[redirect ,setRedirect] = useState(false)
   
  
    async function handleSubmit(e){
        
            try{
                await axios.post ('/popularity', formHotel);
                
                setSuccesfull(true);
                setTimeout(()=> setRedirect(true),1000);
             

            }catch (e){
                console.warn(e);
            }   
    }

    function handleInputChange(e){
        setDirty(true);

        setForm({
            ...formHotel,
            [e.currentTarget.id]:e.currentTarget.value
        });
    }

   if(redirect){
       return <Redirect to ='/'/>
   }
    return(
        
            <div className="main">
                 <h3 className = 'titleCreate'>Add your hotel  </h3>

                {( isSuccesfull ?

                    <div className="alert alert-success" role="alert">
                       You have successfully added the hotel!
                     </div>
                  : null )} 
                
                 <form className ='formHotel' onSubmit = {handleSubmit}>
                        <div>
                             <label className = 'label' htmlFor="name">Name Hotel : </label>
                             <input 
                                onChange={ handleInputChange }
                                value = {formHotel.name}
                                className = 'AddNameHotel'
                                type="text" 
                                id="name"  
                               
                            />
                        </div>
                        <div>
                             <label className = 'label' htmlFor="photo"> Photo Hotel : </label>
                             <input 
                                onChange={ handleInputChange }
                                value = {formHotel.imgUrl}
                                className = 'AddNameHotel'
                                type="link" 
                                id="imgUrl"  
                               
                            />
                        </div>
                        <div>
                            <label className = 'label' htmlFor="Description">Description Hotel : </label>
                            <input 
                                onChange={ handleInputChange }
                                value = {formHotel.description}
                                className = 'AddDescriptionHotel'
                                type="text"
                                id="description"  
                                
                            />
                        </div>
                        <div>
                             <label className = 'label' htmlFor="price">The price per night : </label>
                             <input 
                                onChange={ handleInputChange }
                                value = {formHotel.price}
                                className = "AddPriceHotel"
                                type="text" 
                                id="price" 
                               
                                />
                        </div>
                        <div>
                             <label className = 'label' htmlFor="country">Enter to country :  </label>
                            <input 
                                onChange={ handleInputChange }
                                value = {formHotel.country}
                                className = 'AddCountryHotel'
                                type="country" 
                                id="country" 
                            />
                         </div>
                         <button type = "submit" disabled ={!isDirty} className = "addButton"> And Hotel </button>
                 </form>  
             </div>
    )
}

export default AddHotel