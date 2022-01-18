
import './App.css';
import { useState } from 'react';
import axios from 'axios'
import Validation from './ValidationFile'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';

function CreateUser(props) {

  const [DataUser, setDataUser] = useState({fname : "" , lname : "" , email : "", password: ""})
  const [validationError, setValidationError] = useState("")

    const checkExistDb =  async() => {

      if(DataUser.fname == "" || DataUser.lname == "" || DataUser.email == "" || DataUser.password == ""){
        setValidationError("one filed or more empty")
      }
      else if(!Validation.isContainsOnlyLetters(DataUser.fname) || !Validation.isContainsOnlyLetters(DataUser.lname)){
        setValidationError("first name and last name should contains only letters")
      }
      else if(!Validation.isBetweenTwoAneNine(DataUser.fname) || !Validation.isBetweenTwoAneNine(DataUser.lname)){
        setValidationError("first name and last name length should be between 2 and 9")
      }
      else if(!Validation.isValidateEmail(DataUser.email)){
        setValidationError("email not valid")
      }
      else{
        let result = await axios.post("http://localhost:8000/createUser", DataUser)
        if(result.data == "created"){
          props.history.push("/")
        }
        else{
          setValidationError(result.data)
        }
      }
         
    
}


    

  return (
    <div>
       <h2 id = "newUserTitle">Create user page</h2>
       first name: <input class = "filedInput" type = "text" onChange = {e =>setDataUser({...DataUser, fname : e.target.value}) }></input> <br/>
       last name: <input class = "filedInput" type = "text" onChange = {e =>setDataUser({...DataUser, lname : e.target.value}) }></input> <br/>
       email: <input id = "emailInput" type = "text" onChange = {e =>setDataUser({...DataUser, email : e.target.value}) }></input> <br/>
       password: <input class = "filedInput" type = "text" onChange = {e =>setDataUser({...DataUser, password : e.target.value})}></input> <br/>
        <Button variant="primary"  id = "buttonNewUser" onClick = {async() => {checkExistDb()}}>create</Button>{' '}
        <p id = "validError">{validationError}</p>
    
         
    </div>
  );
}

export default CreateUser;
