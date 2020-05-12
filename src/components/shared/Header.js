import React, { useContext , useState } from 'react';
import { Link , useHistory  } from 'react-router-dom';
import AuthContext from '../auth/AuthContext';


import '../style/Header.css';


function Header(props){

    const { user, setUser } = useContext(AuthContext);
    const [query ,setQuery] = useState('');
    const history = useHistory();
    let timeout = null;


    function handleLogout(e) {
        e.preventDefault();
        setUser(null);
        localStorage.removeItem('user');
    }

    function handleInputChange(e){
        if(timeout){
            clearTimeout(timeout);
        }

        setQuery(e.currentTarget.value);
        const value = e.currentTarget.value;

        timeout = setTimeout(() => history.push('/?q=' + value) , 400);
    }

    return (
      
         
            <nav className ="navbar">
                    <ul className = "ul" >
                        <li > <Link  to="/">Home </Link> </li>
                        <li > <Link  to="/about">About Us</Link></li>
                        <li>
                                { ( user ?   
                                <>
                                    <Link  to="/update">Add Hotel </Link> 
                                    <a href="/"  onClick={ handleLogout }> Logout , { user}</a> 
                                </>
                                   
                                :
                                    <>
                                       
                                        <Link className ="navbarLogin" to="/login">
                                            Login
                                        </Link>
                                        <Link className = "navbarRegister" to="/register">
                                            Register
                                        </Link>
                                    </>
                                )}
                         </li>
                         <li > 
                            <input 
                                onChange ={handleInputChange}
                                value = {query} 
                                placeholder = 'Search hotel by Country'
                                className ="search_city"
                             /> 
                         </li>
                    </ul> 
                </nav>
    )
}

export default Header;