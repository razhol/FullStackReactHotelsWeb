import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';

function orderSummary(props) {
   
    const getToHomePage =  async() => {
    let email = JSON.parse(sessionStorage["orderSummary"]).detailsPerson.email
    let ordersByUser = await axios.get("http://localhost:8000/getOrdersByEmail/"+ email) 
    localStorage["dataOrdersByUser"] = JSON.stringify(ordersByUser.data)
    localStorage["hotelsList"] = JSON.stringify([])
    props.history.push("/search")
    }

  return (
    <div>
    <h3 id = "finalOrderTitle">order Summary</h3>
    <div id = "finalOrderDiv">
    first name : {JSON.parse(sessionStorage["orderSummary"]).detailsPerson.fname} <br/>
    last name : {JSON.parse(sessionStorage["orderSummary"]).detailsPerson.lname} <br/>
    email: {JSON.parse(sessionStorage["orderSummary"]).detailsPerson.email}   <br/>
    hotel name:  {JSON.parse(sessionStorage["orderSummary"]).name} <br/>
    number of guests:  {JSON.parse(sessionStorage["orderSummary"]).numberOfGuests} <br/>
    check in: {JSON.parse(sessionStorage["orderSummary"]).checkin} <br/>
    check out: {JSON.parse(sessionStorage["orderSummary"]).checkout} <br/>
    price : {JSON.parse(sessionStorage["orderSummary"]).totalprice} <br/>
    {JSON.parse(sessionStorage["orderSummary"]).roomcount.map(x=>{
        return <div>
          room name:  {x.RomeName} <br/>
          count: {x.count}
            </div>
    })}
     
    <Button id = "buttonOrderHotel" variant="primary"  onClick={() => getToHomePage()}>move to home page</Button> <br/>
    </div>
    </div>
  );
}

export default orderSummary;
