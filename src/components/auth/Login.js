import React , { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import AuthContext from './AuthContext';

import '../style/Login.css';


const errorMessages = {
    'username': 'You must enter a username!',
    'password': 'You must enter a password!',
};

export default function Login(){
   
    const [redirect ,setRedirect] = useState(false);
    const [formData, setFormData] = useState({
        'username':'',
        'password':'',
    });
    const [formError, setFormError] = useState({
        'username':'',
        'password':'',
    });
    const [globalErrorMessage, setGlobalError] = useState('');
    const [isSuccessfull, setSuccessfull] = useState(false);
    const {setUser} = useContext(AuthContext)

    async function handleSumbit(e){
        e.preventDefault();

        setGlobalError('');
        setSuccessfull(false);

        const isInvalid = validateFormDate() ;

        if(!isInvalid){
          

            try{
               const res =  await axios.get('/users?username=' + formData['username'] + '&password=' + formData['password']);

                    if(res.data.length){
                        
                        setUser(res.data[0].username);
                        localStorage.setItem('user', res.data[0].username);
                        setSuccessfull(true);
                        setTimeout(()=> setRedirect(true),1000);
                    }else{
                        setGlobalError('The user doesn`t exists!');
                    }
    
            }catch(e){
                setGlobalError('');
              
            }
        }
    }
    
    function validateFormDate(){
        const inputs = ['username', 'password'];
        const newError = {...formError};
        let isInvalid = false ;

        for(const input of inputs){
            if(!formData[input]){
                newError[input] = errorMessages[input];
                isInvalid = true
            }
        }
        setFormError(newError);
        return isInvalid;
    }

    function handleInputChange(e){
        setFormData({
            ...formData,
            [e.currentTarget.id]:e.currentTarget.value
        });

        const newError ={
            ...formError,
            [e.currentTarget.id]:'',
        };

        setFormError(newError);
    }
    if(redirect){
        return <Redirect to = '/' />
    }
    return(

        <div className="login-box">
            <div className="left">
               <h1 className = "titleLogin"> Login </h1>
                    { (globalErrorMessage ?  
                        <div className="alert alert-danger" role="alert">
                            { globalErrorMessage }
                        </div>
                    : null) }

                    { (isSuccessfull ?  
                        <div className="alert alert-success" role="alert">
                            You have been successfully logged in!
                        </div>
                    : null) }
                    
                 <form onSubmit = { handleSumbit }> 
                    <div>   
                        <input 
                            onChange = { handleInputChange }
                            value = { formData.username }
                            className = {"inputUser " + (formError.username ? 'is-invalid' : '')}
                            id = "username"
                            type="text"
                            name="username"
                            placeholder="Username" 
                        />
                         <div className="invalid-feedback">
                                { formError.username }
                         </div>
                    </div> 
                        <input  
                            onChange = { handleInputChange }
                            value = { formData.password }
                            className = {"inputPassword " + (formError.username ? 'is-invalid' : '')}
                            id = "password"
                            type="password" 
                            name="password" 
                            placeholder="Password" 
                        />
                         <div className="invalid-feedback">
                                { formError.password }
                         </div>
                        
                        <button type="submit" className="buttonLogin" > Login </button> 
                  </form>
            </div>
            
            <div className="or">OR</div>
            <div className="right">
                <button className="social-signin facebook">Log in with facebook</button>
                <button className="social-signin twitter">Log in with Twitter</button>
                <button className="social-signin google">Log in with Google+</button>
            </div>
   
        </div>
    )
}
 
