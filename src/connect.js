
import './App.css';
import {useEffect, useState } from 'react';
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';

function ConnectPage(props) {

  const [conectData, setConectData] = useState({})
  const [errMessage, setErrMessage] = useState("")

  useEffect(async () =>
  {
    if(localStorage.getItem("fullDataUser") !== null){
      console.log("asdas")
      localStorage["fullDataUser"] = JSON.stringify({}) 
    }
    
    if(localStorage.getItem("hotelsList") !== null){
      localStorage["hotelsList"] = JSON.stringify([]) 
      localStorage["date"] = JSON.stringify({}) 
    }
 
  }, [])

    const checkExistDb =  async() => {
      let result = await axios.post("http://localhost:8000/UserExistInDb", conectData)
      let res = result.data
      if(res == "user not exist"){
        setErrMessage(res)
      }
      else{
        let fullDetailsUser = await axios.get("http://localhost:8000/getFullDetailsByEmail/" + conectData.email)
        localStorage["fullDataUser"] = JSON.stringify(fullDetailsUser.data)
        console.log(res)
        if(res == "not existing orders for this user"){
          props.history.push("/search")
        }
        else{
          localStorage["dataOrdersByUser"] = JSON.stringify(res)
          props.history.push("/search")
        }
      }
    }


    

  return (
    <div>
       <h2 id = "loginTitle">Login Page</h2>
       email: <input type = "text" id = "email" onChange = {e =>setConectData({...conectData, email : e.target.value}) }></input> <br/>
       password:  <input type = "password" id = "password" onChange = {e =>setConectData({...conectData, password : e.target.value})}></input> <br/>
        <Button variant="primary"  id = "buttonLigin" onClick = {async() => {checkExistDb()}}>login</Button>{' '}
         <p id = "validLogin">{errMessage}</p>
         <a id = "newUserButton" href = "/createuser">create new user</a>
    </div>
  );
}

export default ConnectPage;
