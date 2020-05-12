import React, { useEffect , useState} from 'react';
import Axios from 'axios';

import './style/Weather.css'



export default function Weater (){
  const [weaterTemp , setWeaterTemp] = useState([]);
 
  

 async  function getWeater() {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=Brasov,ro&appid=e5f46e3a031471b189651260ccc5ef45';
    const res = await Axios.get(url)
    setWeaterTemp(res.data.main.temp)
  
};

useEffect (() => {
  getWeater();
}, [])
  return (
    <article className = 'weather'>
      <p >
        The temperature in Brasov is :
       <span className = 'temp'> 
          {(weaterTemp-273.15).toFixed(1)} &deg;C 
       </span>
      </p>

    </article>
  )
}
