import React, { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

import AuthContext from './AuthContext'

import '../style/Register.css'

const errorMesage = {
    'FName':'You must enter a Firt Name!',
    'LName':'You must enter a Last Name!',
    'email':'You must enter a email!',
    'username':'Please choose a username.',
    'password':'You must enter a password!',
    'retypePassword':'You must retype the password!',
    'different-passwords': 'You must enter the same password twice!'
};

function Register(){
    const [redirect, setRedirect] = useState(false);
    const [formData, setFormData] = useState({
        'FName':'',
        'LName':'',
        'email':'',
        'username':'',
        'password':'',
        'retypePassword':''
    });

    const [formError, setFormError] = useState({
        'FName':'',
        'LName':'',
        'email':'',
        'username':'',
        'password':'',
        'retypePassword':''

    });
    const [globalErrorMessage, setGlobalError] = useState('');
    const [isSuccessfull, setSuccessfull] = useState(false);
    const [isDirty , setDirty] = useState(false);
    const {setUser} = useContext(AuthContext);
    
   async function handleSubmit(e){
        e.preventDefault();
        setGlobalError('');
        const isInvalid = validateFormdata();
       
        if(!isInvalid){
            setDirty(false);
        
            try{
               const res =  await axios.post('/users', formData);
            
                    setUser(res.data.username);
                    localStorage.setItem('user',res.data.username);

                setSuccessfull(true);
                setTimeout(()=> setRedirect(true),1000);

            }catch(e){
                setGlobalError(e.response.data.message);
              
            }
        }
    }

    function validateFormdata(){
        const inputs =['FName','LName','email','username','password','retypePassword'];
        const newError = {...formError};
        let isInvalid = false;

        for (const input of inputs){
            if(!formData[input]) {
                newError[input] = errorMesage[input];
                isInvalid = true
            }
        }
        if(formData.password !== formData['retypePassword']) {
            newError['different-passwords'] = errorMesage['different-passwords'];
            isInvalid = true;
        }

        setFormError(newError);
        return isInvalid;
    }
    function handleInputChange(e){
        setDirty(true);

        setFormData({
            ...formData,
            [e.currentTarget.id]:e.currentTarget.value
        });
     
        const newError = { 
            ...formError, 
            [e.currentTarget.id]: '',
        };

        if(e.currentTarget.id === 'password' || e.currentTarget.id === 'retypePassword') {
            newError['different-passwords'] = '';
        }

        setFormError(newError);
    }

    if(redirect){
        return <Redirect to ='/'/>
    }
    return(
        <div className = "testbox">

            <h1 className = 'title_register'>Register</h1>

            { (globalErrorMessage ?  
                <div className="alert alert-danger" role="alert">
                    { globalErrorMessage }
                </div>
            : null) }

            { (isSuccessfull ?  
                <div className="alert alert-success" role="alert">
                    Your username was created successfully!
                </div>
            : null) }

            <form className = "formRegister" onSubmit = {handleSubmit}>

                <div className ="accounttype">
                    <label  htmlFor = "name" className = "name"> </label> 

                    <input 
                        onChange = {handleInputChange}
                        value={formData.FName}
                        type ="text" 
                        className = {"inputName " + (formError.FName ? 'is-invalid':'') } 
                        id="FName" 
                        placeholder = "First Name" 
                    />
                
                    <div className="invalid-feedback">
                        
                      {formError.FName } 
                    </div>

                    <input 
                        onChange = {handleInputChange}
                        value={formData.LName}
                        type ="text" 
                        className = {"inputName "+(formError.LName ? 'is-invalid':'')}
                        id="LName" 
                        placeholder = "Last Name"
                    />
                   <div className="invalid-feedback">
                        { formError.LName }
                    </div>
                </div>

                <div className ="accounttype">
                    <label htmlFor = "email" className ="email">  </label> 

                    <input
                        onChange = {handleInputChange}
                        value={formData.email} 
                        type ="email" 
                        className ={"inputemail " + (formError.email ? 'is-invalid':'')}
                        id="email"
                        placeholder = "Enter email"
                    />
                    <div className="invalid-feedback">
                        { formError.email }
                    </div>
                </div>

                <div className ="accounttype">
                    <label htmlFor = "username">  </label>

                    <input 
                        onChange = {handleInputChange}
                        value={formData.username} 
                        type= "text"
                        className = {"inputUserName " + (formError.username ? 'is-invalid':'')} 
                        id ="username" 
                        placeholder="Enter username"
                    />
                    <div className="invalid-feedback">
                        { formError.username }
                    </div>
                </div> 
               
                <div className ="accounttype">
                    <label htmlFor = "password">  </label>

                    <input 
                        onChange = {handleInputChange}
                        value = {formData.password}
                        type= "password" 
                        className = {"inputpassword " + (formError.password ? 'is-invalid':'')} 
                        id ="password" 
                        placeholder="Enter password"
                    />
                    <div className="invalid-feedback">
                        { formError.password }
                    </div>
                </div>
            
                <div className ="accounttype">
                    <label htmlFor = "retypePassword">  </label>
                    <input 
                        onChange = {handleInputChange}
                        value = {formData.retypePassword}
                        type= "password" 
                        className = {"retypePassword " + (formError.retypePassword || formError['different-passwords']   ? 'is-invalid':'')} 
                        id ="retypePassword" 
                        placeholder="Enter retype-password "
                    />
                    <div className="invalid-feedback">
                    { formError['retypePassword'] }
                    { formError['retypePassword'] ? <br /> : '' }
                    { formError['different-passwords'] }
                    </div>
                </div>
                
                <p>By clicking Register, you agree on our <Link to="/">terms and condition</Link>.</p>
                <button type = "submit" disabled={ !isDirty } className = "submitButton">Register </button>

            </form>
        </div>

    )
}
export default Register