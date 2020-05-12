import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import axios from 'axios'

import {apiUrl} from'../config';
import  Header  from './shared/Header';
import  HotelList from './Hotel/HotelList';
import HotelDetails from './Hotel/HotelDetails';
import Register from './auth/Register'
import Login from './auth/Login'
import AuthContext from './auth/AuthContext';
import AddHotel from './Hotel/AddHotel'
import AddReview from './Hotel/AddReview';
import EditHotel from'./Hotel/EditHotel';
import Weather from './Weather';
import Aboutus from './AboutUs';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style/App.css';


axios.defaults.baseURL = apiUrl ;


function App(){
 const [user, setUser] = useState(null);

 useEffect(() => {
    const user = localStorage.getItem('user');
    setUser(user);
 }, []);
 
   

    return (
        <div className = "walppaper">
            <AuthContext.Provider value ={{user , setUser}}>
                <BrowserRouter>
                         <h1 className = "WebsiteName" > Vacantion Tour </h1>
                        <Header/>
                          
                        <Route  exact path = '/'>
                           <Weather/> <HotelList/> 
                            
                        </Route>

                        <Route exact path = '/popularity/:hotelId'>
                            <HotelDetails/>
                        </Route> 
                             
                        <Route  path = '/popularity/edit/:hotelId'>
                            <EditHotel/>
                        </Route> 

                        <Route  path = '/popularity/update/:reviewId'>
                            <AddReview/>
                        </Route> 
                        
                        <Route path = '/update'>
                            <AddHotel/>
                        </Route>

                        <Route path = '/register'>
                            <Register/>   
                          
                        </Route>

                        <Route exact path = '/login'>
                            <Login/>
                             
                         </Route>
                         
                         <Route path = '/about'>
                            <Aboutus/>
                        </Route>

                </BrowserRouter>
            </AuthContext.Provider>
        </div>
    )
}

export default App;