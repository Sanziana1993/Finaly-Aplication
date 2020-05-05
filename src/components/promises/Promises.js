import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import {useLocation, Link} from 'react-router-dom';


export default function Promises(){
    const [items ,setItems] = useState([]);
   
    
   
    function useQuery (){
        return new URLSearchParams(useLocation().search);
    }
    const q = useQuery().get('q') || '';

    async function makeRequest(){
        try {
            const res = await Axios('/popularity');
            setItems(res.data)
        
        }catch(err){
            console.warn(err);
        }
    }

    useEffect(() => {
         makeRequest();
       
    },[]);
    
    function search(item){
        const title = item.Titile.toLowerCase()
        return title.includes(q.toLocaleLowerCase)
    }
   
     if(items){

     
    return(
    <div>
        
          
            { items
                .filter(item => item.country.includes(q))
                .map(item => <Link key={item.id}>{ item.country}</Link>) 
                
            }
            
       
    </div>
    );
        }else{
            return 'Loading...'
        }
}