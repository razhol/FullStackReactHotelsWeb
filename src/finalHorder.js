import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';



function FinalHorder(props) {


  
    const saveDb =  async() => {
     
     let dataOrder = {name: JSON.parse(sessionStorage["hotelDetails"]).name , checkin : sessionStorage["checkin"],
     checkout: sessionStorage["checkout"] , numberOfGuests: JSON.parse(localStorage["date"]).peopleCount , totalprice : sessionStorage["price"], roomcount : JSON.parse(sessionStorage["roomCount"]),
     detailsPerson : JSON.parse(localStorage["fullDataUser"])};
    let save = await axios.post("http://localhost:8000/saveorder", dataOrder)
    if(save.data){
        sessionStorage["orderSummary"] = JSON.stringify(save.data) 
        props.history.push("/orderSummary")
    }
  }

  return (
    <div>
      <h3 id = "finalOrderTitle">Order details</h3>
        <div id = "finalOrderDiv">
     hotel name: {JSON.parse(sessionStorage["hotelDetails"]).name}  <br/>
     star rating: {JSON.parse(sessionStorage["hotelDetails"]).starRating}  <br/>
     check in : { sessionStorage["checkin"]}  <br/>
     check out : {sessionStorage["checkout"]}  <br/>
     total price: {sessionStorage["price"]}  <br/>
     Number of guests : {JSON.parse(localStorage["date"]).peopleCount}  <br/>
     {JSON.parse(sessionStorage["roomCount"]).map(x => {
        return <div>
          room name: {x.RomeName}  <br/>
           count: {x.count} <br/>
         </div>
       
     })}
          <Button id = "buttonOrderHotel" variant="primary"  onClick={async() => {saveDb()}}>order now</Button> <br/>
    </div>
    </div> 
  );
}

export default FinalHorder;
