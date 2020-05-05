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
import Promises from './promises/Promises'



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
                        
                            <Header/>
        
                        <Route  exact path = '/'>
                            <HotelList/>
                        </Route>

                        <Route exact path = '/popularity/:hotelId'>
                            <HotelDetails/>
                        </Route> 
                             
                        <Route  path = '/popularity/edit/:hotelId'>
                            <EditHotel/>
                        </Route> 

                        <Route  path = '/popularity/update/:popularityId'>
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
                         
                       
                        

                </BrowserRouter>
            </AuthContext.Provider>
        </div>
    )
}

export default App;