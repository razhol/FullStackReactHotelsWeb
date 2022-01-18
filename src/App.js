import logo from './logo.svg';
import Searchotels from "./SearchHotels"
import {Link,Switch, Route} from 'react-router-dom'
import OrderHotel from './orederHotel'
import FinalHorder from './finalHorder'
import OrderSummary from './orderSummary'
import ConnectPage from './connect'
import CreateUser from './newUser'
import orderDetails from './orderDetails'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom'

import './App.css';



function App() {
  const location = useLocation();

  return (
    <div className="App">
      
<Navbar id = "nevBar"  bg="primary" variant="dark">
    <Container>
    <Navbar.Brand >{location.pathname == "/" || location.pathname == "/createuser" ? "" : "Hi " + JSON.parse(localStorage["fullDataUser"]).fname }</Navbar.Brand>
    <Nav className="me-auto">
    { location.pathname == "/" || location.pathname == "/createuser" ? <Nav.Link href="/">log in</Nav.Link> : <Nav.Link href="/">Log out</Nav.Link> }
    </Nav>
    </Container>
  </Navbar>
      
         <Link to={"/orderhotel"}></Link> <br/>
        <Link to={"/finalhorder"}></Link> <br/>
        <Link to={"/"}></Link> <br/>
  <Switch>
  <Route path= "/orderhotel/:id/:checkin/:checkout" component={OrderHotel} />
  <Route path= "/search" component={Searchotels} />
  <Route exact path= "/" component={ConnectPage}/>
  <Route path= "/finalhorder" component={FinalHorder} />
  <Route path= "/orderSummary" component={OrderSummary} />
  <Route path= "/createuser" component={CreateUser} />
  <Route path= "/orderDetails" component={ orderDetails} />
  
  </Switch>        
    </div>
  );
}

export default App;
