import axios from 'axios';
import { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [userIDStore, setUserIDStore] = useState("")
  const [startDate, setStartDate] = useState(new Date());
  const [startDateString, setStartDateString] = useState(`${startDate.getFullYear()}-${('0' + (startDate.getMonth()+1)).slice(-2)}-${('0' + startDate.getDate()).slice(-2)}`);
  const [customUserID, setCustomUserID] = useState("test-account-2")
  const [provider, setProvider] = useState("")

  const setUpMetriport = async () => {
    console.log(axios)
    const connection = await axios({
      method: "get",
      url: `https://api.sandbox.metriport.com`,
      headers: { 'x-api-key': process.env.REACT_APP_SECRET_KEY }
    })
    console.log("connection",connection)
    if (connection.data === "OK") {
      const userID = await getUserID(true)
      const connectToken = await axios({
        method: "get",
        url: `https://api.sandbox.metriport.com/user/connect/token?userId=${userID}`,
        headers: { 'x-api-key': process.env.REACT_APP_SECRET_KEY }
      })
      console.log("connectToken",connectToken.data.token)
      window.open(`https://connect.metriport.com/?token=${connectToken.data.token}&sandbox=true`);
    }
    // console.log(metriportUserId)
    // console.log(connectToken)
  }
  const getUserID = async (value = false) => {
    const userID = await axios({
        method: "post",
        url: `https://api.sandbox.metriport.com/user?appUserId=${customUserID}`,
        headers: { 'x-api-key': process.env.REACT_APP_SECRET_KEY }
    })
    console.log("userID",userID.data.userId)
    setUserIDStore(userID.data.userId)
    switch(value){
      case true:
        return userID.data.userId
      default:
        break
    }
  }
  const getActivityData = async () => {
    const activity = await axios({
      method: "get",
      url: `https://api.sandbox.metriport.com/activity?userId=${userIDStore}&date=${startDateString}`,
      headers: { 'x-api-key': process.env.REACT_APP_SECRET_KEY }
    })
    console.log(activity)
  }
  const getBiometricsData = async () => {
    const biometrics = await axios({
      method: "get",
      url: `https://api.sandbox.metriport.com/biometrics?userId=${userIDStore}&date=${startDateString}`,
      headers: { 'x-api-key': process.env.REACT_APP_SECRET_KEY }
    })
    console.log(biometrics)
  }
  const getBodyData = async () => {
    const body = await axios({
      method: "get",
      url: `https://api.sandbox.metriport.com/body?userId=${userIDStore}&date=${startDateString}`,
      headers: { 'x-api-key': process.env.REACT_APP_SECRET_KEY }
    })
    console.log(body)
  }
  const getNutritionData = async () => {
    const nutrition = await axios({
      method: "get",
      url: `https://api.sandbox.metriport.com/nutrition?userId=${userIDStore}&date=2023-01-25`,
      headers: { 'x-api-key': process.env.REACT_APP_SECRET_KEY }
    })
    console.log(nutrition)
  }
  const getSleepData = async () => {
    const sleep = await axios({
      method: "get",
      url: `https://api.sandbox.metriport.com/sleep?userId=${userIDStore}&date=2023-01-25`,
      headers: { 'x-api-key': process.env.REACT_APP_SECRET_KEY }
    })
    console.log(sleep)
  }
  const getUserData = async () => {
    const user = await axios({
      method: "get",
      url: `https://api.sandbox.metriport.com/user?userId=${userIDStore}&date=2023-01-25`,
      headers: { 'x-api-key': process.env.REACT_APP_SECRET_KEY }
    })
    console.log(user)
  }
  const revokeProvider = async () => {
    console.log("test")
    const revoke = await axios.delete(`https://api.sandbox.metriport.com/user/revoke?userId=${userIDStore}&provider=${provider}`,{
      headers: { 'x-api-key': process.env.REACT_APP_SECRET_KEY }
    })
    console.log(revoke)
  }
  useEffect(()=>{
    setStartDateString(`${startDate.getFullYear()}-${('0' + (startDate.getMonth()+1)).slice(-2)}-${('0' + startDate.getDate()).slice(-2)}`)
  },[startDate])
  return (
    <div className="App">
        Username:<input value={customUserID} onChange={(event)=>{
          if (event.target.value[event.target.value.length - 1] !== " "){
            // setCustomUserID(event.target.value)
          }
          }}></input>
          <br/>
        Date:
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        
        <button onClick={setUpMetriport}>Set Up</button>
        <br/>
        <button onClick={() => {getUserID(false)}}>Get User ID</button>
        <br/>
        <select value={provider} onChange={e=>setProvider(e.target.value)}>
          <option value={"apple"}>Apple</option>
          <option value={"cronometer"}>Cronometer</option>
          <option value={"fitbit"}>Fitbit</option>
          <option value={"oura"}>Oura</option>
          <option value={"whoop"}>Whoop</option>
          <option value={"withings"}>Withings</option>
        </select> <button onClick={revokeProvider}>Revoke</button>
        <br/>
        <button onClick={getActivityData}>Get Activity Data</button>
        <br/>
        <button onClick={getBiometricsData}>Get Biometrics Data</button>
        <br/>
        <button onClick={getBodyData}>Get Body Data</button>
        <br/>
        <button onClick={getNutritionData}>Get Nutrition Data</button>
        <br/>
        <button onClick={getSleepData}>Get Sleep Data</button>
        <br/>
        <button onClick={getUserData}>Get User Data</button>
        <br/>
        See Console for results
      {/* </header> */}
    </div>
  );
}

export default App;
