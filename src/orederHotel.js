
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios'
import {Carousel} from "react-bootstrap"
import { IFrame } from './iframe' 
import Image from 'react-bootstrap/Image'
import 'bootstrap/dist/css/bootstrap.min.css';
import LazyLoad from "react-lazyload";
import ModalImage from "react-modal-image";
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
// import { ImageGroup, Image } from 'react-fullscreen-image'


function OrderHotel(props) {

    const [hotelData, setHotelData] = useState({})
    const [roomData, setRoomData] = useState(false)
    const [choseRoom, setChoseRoom] = useState(false)
    const [itemNumber, SetItemNumber] = useState();
    const [orderSum, setOrderSum] = useState(0);
    const [prices, setPrices] = useState(0);
    const [temp, setTemp] = useState([]);
    const [roomsCount, setRoomsCount] = useState([]);
    const [roomsOccurency, setRoomsOccurency] = useState([]);
    const [sumOccurency, setSumOccurency] = useState(0);
    const [roomsOccurencySumByRoom, setRoomsOccurencySumByRoom] = useState([]);
    const [errMsg, SetErrMsg] = useState("");

    useEffect(async () =>
    {
        let id = props.match.params.id
        let checkin = props.match.params.checkin
        let checkout = props.match.params.checkout
        let res = await axios.get("http://localhost:8000/orderhotel?id=" + id + "&checkin=" + checkin + "&checkout=" + checkout)
        let prices = res.data.rooms.map(x => x.displayableRates[0].displayPrice);
        let maxOccupancy = res.data.rooms.map(x => x.displayableRates[0].originalRates[0].maxOccupancy);
        await setRoomsOccurency([...maxOccupancy])
        await setPrices([...prices])
      await setHotelData({...res.data});
    }, [])

    const passToFinalHorder = () =>  {
      let sum_rooms = 0
      for (let i = 0; i < roomsCount.length; i++) {
        sum_rooms += roomsCount[i].count;
      }
      if(orderSum == 0){
        SetErrMsg("please chose a room")
      }
      else if(JSON.parse(localStorage["date"]).peopleCount >sumOccurency){
        SetErrMsg("people count bigger then rooms occurency")
      }
      else if(JSON.parse(localStorage["date"]).peopleCount < sum_rooms){
        SetErrMsg("people count smaller then rooms count")
      }
      else{
        SetErrMsg("")
        if(orderSum > 0){
          setChoseRoom(false)
          sessionStorage["hotelDetails"] = JSON.stringify(hotelData);
          sessionStorage["checkin"] = props.match.params.checkin;
          sessionStorage["checkout"] = props.match.params.checkout;
          sessionStorage["price"] = orderSum;
          console.log(roomsCount)
          sessionStorage["roomCount"] = JSON.stringify(roomsCount)
          props.history.push("/finalhorder")
        }
        else {
          setChoseRoom(true)
        }
      }
     
}


    const moreDataAboutRoom = async function(item_number) {
      await SetItemNumber(item_number)
      setRoomData(!roomData)
    }

    const backToSearchPage = function(){
      props.history.push("/search")
    }

    const pricePerRooms = async function(e, index , roomName) {
        
        let fixedOccurency =  roomsOccurency[index] * e.target.value;
        console.log(roomsOccurency)
        let fixedPrice = prices[index] * e.target.value;
        let t = temp
        let RoomCount = roomsCount
        let RoomsOccurencySumByRoom = roomsOccurencySumByRoom
        let existRoom = RoomsOccurencySumByRoom.findIndex(x => x.index == index);
        if(existRoom == -1){
          RoomsOccurencySumByRoom.push({"index" : index ,"Occurency" : fixedOccurency})
        }
        else {
          RoomsOccurencySumByRoom[existRoom].Occurency = fixedOccurency
        }
        let sum_occurency = 0
        for (let i = 0; i < RoomsOccurencySumByRoom.length; i++) {
          sum_occurency += RoomsOccurencySumByRoom[i].Occurency;
        }
        console.log(sum_occurency)
        await setRoomsOccurencySumByRoom([...RoomsOccurencySumByRoom])
        await setSumOccurency(sum_occurency)
        let existOeder = RoomCount.findIndex(x => x.RomeName == roomName);
        if(existOeder == -1){
          RoomCount.push({"count" : parseInt(e.target.value) ,"RomeName" : roomName})
        } 
        else{
          RoomCount[existOeder].count = parseInt(e.target.value)
        }
        let exist = t.findIndex(x => x.index == index);
        if(exist == -1){
          t.push({"index" : index ,"price" : fixedPrice})
        }
        else {
          t[exist].price = fixedPrice
        }
         let sum = 0
         for (let i = 0; i < t.length; i++) {
           sum += Math.floor(t[i].price);
         }
          await setOrderSum(sum)
          console.log(RoomCount)
          setRoomsCount([...RoomCount])
         setTemp([...t])
    }


  return (
    <div >    
               {!hotelData.name  ? "" : <Button variant="primary" id = "backToSearch"  onClick={async() => {backToSearchPage()}}>back to the search page</Button> } 
                 <h4>{!hotelData.name  ? "" : hotelData.name}</h4>
                 <p>{!hotelData.starRating  ? "" : "star rating: " + hotelData.starRating}</p>
                 
                {!hotelData.description ? "" :<div id = "description"> <p>{hotelData.description}</p> </div>}
                 
                {!hotelData.hotelFeatures ? "" : <h4 id = "hotelFeaturesTitle">hotel features:</h4>  }
                 {!hotelData.hotelFeatures ? "" : hotelData.hotelFeatures.features.map(y=> {
                    return <p>{y}</p> 
                 })}
                 <Carousel id = "pictureCarosel" autoPlay={true} interval={1500} indicators={false} prevLabel nextLabel >
      { !hotelData.images? "" : hotelData.images.map((item,x) => {
            return (
              
              
                  <Carousel.Item>
               
                  <img key = {x} src = {item.imageUrl}></img>
                  
                  </Carousel.Item>
              
              
            ) })  
      }
      </Carousel>  
                   
      {!hotelData.rooms  ? "" : <table id = "tableRooms">
                         <tr id = "tableTitle">
                     <th id = "titleRoomType">room type</th>
                     <th id = "titleSelectRooms" style = {{paddingLeft : "40px" }}>Select rooms count</th>
                     <th>room price</th>
                         </tr>
                   {hotelData.rooms.map((x,n) => {
                      return  <tr id = "rowTableRoom" >
                        <td  id = "roomsType">
                      <button id = "buttonRoom" onClick = {async() => {moreDataAboutRoom(n)}}>{x.roomDisplayName}</button>             
                       { n == itemNumber ? roomData &&  <div style = {{display : 'flex' , flexDirection : 'row' , paddingLeft : "100px"}}>
                              { x.images.map( (y,num) => (
                                   <ModalImage 
                                    small={y.thumbNailUrl}
                                    large={y.largeUrl}
                                     alt={num}
                                     hideDownload={true}
                                     hideDownload={true}
                                     className = "modal-image"
                                   />
                            
                               ))}  
                                </div> : ""}
                                </td>
                                <td id = "NumbersRoomChosen">
                                <select onChange = {(e) => pricePerRooms(e , n , x.roomDisplayName)}>
                               <option value={0}>0</option>
                               <option value={1}>1</option>
                               <option value={2}>2</option>
                               <option value={3}>3</option>
                               <option value={4}>4</option>
                               <option value={5}>5</option>
                               <option value={6}>6</option>
                               <option value={7}>7</option>
                               </select>
                               </td>
                               <td>
                             <p>{x.displayableRates[0].displayPrice }</p> 
                             </td>
                             </tr>
                          
                   }) 
                  
                   
                 }
                   </table >
}
                  {!hotelData.rooms  ? "" : <p id = "totalPrice">total price:  {orderSum}</p>}
                  {!hotelData.rooms  ? "" : <Button variant="primary" id = "buttonOrder" onClick={() => {passToFinalHorder()}}>order hotel</Button>  }
                  <p id = "errmsg">{errMsg}</p>
    </div>
    
  );
}

export default OrderHotel;