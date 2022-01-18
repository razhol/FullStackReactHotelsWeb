import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";


function Filterorders(props) {

    const [stars, setStars] = useState("")
    const [price, setPrice] = useState(0)
    const [subword, setSubword] = useState("")
    
    const dispatch = useDispatch()

    const getHotelsIncludesSubString = async(word) => {
        
        if(word == ""){
            await dispatch({ type: "UPDATE", payload: props.orders })
        }
        else{
            let ClientsFiler = props.orders.filter(y => !! y.name ).filter(x => x.name.includes(word))

            await dispatch({ type: "UPDATE", payload: ClientsFiler })
        }

    }

    const getHoltelsUpToThisPrice =  async(price) => {
     let hotelsByPrice = props.orders.filter(x => x.ratesSummary.minPrice < price);
     await dispatch({ type: "UPDATE", payload: hotelsByPrice })
  }
  const backToFullHotelsList = async() => {
    await dispatch({ type: "UPDATE", payload: props.orders })
  }

  const filterByStarsDegree = async(starDegree) => {
    let hotelsByStarRating = props.orders.filter(x => x.starRating == starDegree);
    await dispatch({ type: "UPDATE", payload: hotelsByStarRating })
  }

  return (
    <div id = "filterOrders">
     
    <select onChange = {(e) => (filterByStarsDegree(e.target.value))}>
    <option >find by stars rating</option>  
     <option  value = "0">0</option>
     <option  value = "1">1</option>  
     <option  value = "2">2</option> 
     <option  value = "3">3</option> 
     <option  value = "4">4</option> 
     <option  value = "5">5</option> 
     </select> <br/>
      
    <input type = "text" class = "filterFiled" placeholder = "find by name" onChange = {(e) => getHotelsIncludesSubString(e.target.value)}></input> <br/>
     
    <input type = "text" class = "filterFiled" placeholder = "find by price" onChange = {(e) => setPrice(e.target.value)}></input> <br/>
    <input type = "button" class = "filterFiledButton" value = "find" onClick = {() => getHoltelsUpToThisPrice(price)}></input>
    <input type = "button" class = "filterFiledButton" value = "back to full list" onClick = {() => backToFullHotelsList()}></input>
    </div>
  );
}

export default Filterorders;
