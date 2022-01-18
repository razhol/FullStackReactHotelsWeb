import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import Filterorders from './filterOrders'
import Validation from './ValidationFile'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {Container ,Row, Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from "react-redux";



function Searchotels(props) {


 
 const [hotels, setHotels] = useState([])
 const [showfilter, setShowfilter] = useState(false)
 const [showhistoryDiv, setShowhistoryDiv] = useState(false)
 const [searchotel, setSearchotel] = useState({})
 const [errorMessage, setErrorMessage] = useState("")
 const dispatch = useDispatch()
 const storeData = useSelector(state => state)

 useEffect(async () =>
 {

    await  dispatch({ type: "UPDATE", payload: JSON.parse(localStorage["hotelsList"])})
     if(JSON.parse(localStorage["hotelsList"]).length == 0){
      await setShowfilter(false)
     }
     else {
      await setShowfilter(true)
     }
    

 }, [])


 const moveOrder = async function(hotel) {
  let id = hotel.hotelId
  props.history.push("/orderhotel/" + id + "/" + JSON.parse(localStorage["date"]).checkin + "/" + JSON.parse(localStorage["date"]).checkout)
 }
 const  detailsOeder = function(hotel) {
   console.log(hotel)
   localStorage["orderSummary"] = JSON.stringify(hotel)
   localStorage["hotelsList"] = JSON.stringify(storeData.orders)
   props.history.push("/orderDetails")
 }

 const logOut = function(){
  props.history.push("/")
 }

const SearchByParams = async function() {
  
  let res = await axios.get("http://localhost:8000/hotels?city=" + searchotel.city + "&checkin=" + searchotel.checkin + "&checkout=" + searchotel.checkout + "&country=" + searchotel.country)
  console.log(res.data)
  if(res.data === "error"){
  setErrorMessage("city or country names or dates incorrect")
  await  dispatch({ type: "UPDATE", payload: []})
  await setShowfilter(false)
  }
  else{
    localStorage["date"] = JSON.stringify(searchotel)
    setErrorMessage("")
    setShowfilter(true)
    localStorage["hotelsList"] = JSON.stringify(res.data.hotels)
    await  dispatch({ type: "UPDATE", payload: res.data.hotels})
    await setHotels([...res.data.hotels]);
  }
}

  return (
    <div id="searchPage">
     <Button variant="primary"  id = "buttonHistory" onClick={() => setShowhistoryDiv(!showhistoryDiv)}>order history</Button>{' '} <br/>
     
    {showhistoryDiv && <div id = "searchHistory"> {localStorage["dataOrdersByUser"] ? JSON.parse(localStorage["dataOrdersByUser"]).map(x => {
      return <div key = {x._id}>
       <a href="" onClick = {() => detailsOeder(x)}>{x.hotelName}</a> {Validation.changeDateFormat(x.checkin)} -  {Validation.changeDateFormat(x.checkout)}
       </div>
     }) : "" } </div> }
  
     <br/>
     <Container id = "searchDiv">
     
     <Row id = "filterOrders">
     { showfilter &&  <Filterorders orders = {hotels} currentOrders = {storeData.orders}/> } <br/>
     </Row>
     <Row id = "searchHotel">
     <input type="text" placeholder = "Country" class = "SearchFileds" onChange={e => setSearchotel({...searchotel, country : e.target.value})} /><br/>
     <input type="text" placeholder = "City" class = "SearchFileds" onChange={e => setSearchotel({...searchotel, city : e.target.value})} /><br/>
      <input type="text" placeholder = "people count" class = "SearchFileds" onChange={e => setSearchotel({...searchotel, peopleCount : +e.target.value})} /><br/>
     Check in : <input type="date" placeholder ="checkIn" id = "checkIn" onChange={e => setSearchotel({...searchotel, checkin : e.target.value})} /><br/>
     Check out : <input type="date" id = "checkOut" onChange={e => setSearchotel({...searchotel, checkout : e.target.value})} /> <br/>
     <Button variant="primary" id = "searchButton"  onClick={() => SearchByParams()}>Search</Button>{' '} <br/>
     </Row>
     </Container>
       <p>{errorMessage}</p>
         <ul>
         { 
             storeData.orders.map((x,index) => {
                 
            return x.name == null ? "" : <div style = {{  marginBottom : "30px" , paddingRight: "100px" , marginLeft: '20px' , borderStyle : "solid" , borderColor:'blue' , display : 'flex' , flexDirection : 'row'}} key = {index}> 
            { <p style = {{ width : '700px' , marginRight : "20px" , paddingRight:"40px"}}>hotel name: {x.name}</p> }
            { <p style = {{ width : '280px' , marginRight : "70px", paddingRight:"40px"}}> stars: {x.starRating}</p> }
             price: <p style = {{ width : '280px' , marginRight : "70px", paddingRight:"80px"  }}>{x.ratesSummary.minPrice}</p> 
            <img style = {{marginLeft: '40px' , paddingRight:"40px"}} src = {x.thumbnailUrl}></img>
            <Button variant="primary" id = "orderHotel"  onClick={async() => {moveOrder(x)}}>order hotel</Button>{' '} <br/>
            </div>
        
            

         })
     }
         </ul>
    </div>
          
  );
}

export default Searchotels;