
import './App.css';
import { useState } from 'react';
import Validation from './ValidationFile'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';

function orderDetails(props) {

    const gotToHomePage =  async() => {
        props.history.push("/search")
    }


  return (
    <div>
    <Button id = "buttonBackHomePage" variant="primary"  onClick={() => gotToHomePage()}>move to home page</Button> 
    <div id = "finalOrderDiv">
    first name : {JSON.parse(localStorage["orderSummary"]).fname} <br/>
    last name : {JSON.parse(localStorage["orderSummary"]).lname} <br/>
    email: {JSON.parse(localStorage["orderSummary"]).email}   <br/>
    hotel name:  {JSON.parse(localStorage["orderSummary"]).hotelName} <br/>
    number of guests:  {JSON.parse(localStorage["orderSummary"]).numberOfGuests} <br/>
    check in: {Validation.changeDateFormat(JSON.parse(localStorage["orderSummary"]).checkin)} <br/>
    check out: {Validation.changeDateFormat(JSON.parse(localStorage["orderSummary"]).checkout)} <br/>
    price : {JSON.parse(localStorage["orderSummary"]).price} <br/>
    {JSON.parse(localStorage["orderSummary"]).roomcount.map(x=>{
        return <div>
          room name:  {x.RomeName} <br/>
          count: {x.count}
            </div>
    })}
    </div>
    </div>
  );
}

export default orderDetails;
