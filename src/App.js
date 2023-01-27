import axios from 'axios';
import { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css"

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
    const revoke = await axios.delete(`https://api.sandbox.metriport.com/user/revoke?userId=${userIDStore}&provider=${provider}`,{
      headers: { 'x-api-key': process.env.REACT_APP_SECRET_KEY }
    })
    console.log(revoke)
  }
  const getAllData = async () => {
    const userID = await axios({
      method: "post",
      url: `https://api.sandbox.metriport.com/user?appUserId=${customUserID}`,
      headers: { 'x-api-key': process.env.REACT_APP_SECRET_KEY }
    })
    var userIDStore = userID.data.userId
    const activity = await axios({
      method: "get",
      url: `https://api.sandbox.metriport.com/activity?userId=${userIDStore}&date=${startDateString}`,
      headers: { 'x-api-key': process.env.REACT_APP_SECRET_KEY }
    })
    console.log(activity)
    const biometrics = await axios({
      method: "get",
      url: `https://api.sandbox.metriport.com/biometrics?userId=${userIDStore}&date=${startDateString}`,
      headers: { 'x-api-key': process.env.REACT_APP_SECRET_KEY }
    })
    console.log(biometrics)
    const body = await axios({
      method: "get",
      url: `https://api.sandbox.metriport.com/body?userId=${userIDStore}&date=${startDateString}`,
      headers: { 'x-api-key': process.env.REACT_APP_SECRET_KEY }
    })
    console.log(body)
    const nutrition = await axios({
      method: "get",
      url: `https://api.sandbox.metriport.com/nutrition?userId=${userIDStore}&date=2023-01-25`,
      headers: { 'x-api-key': process.env.REACT_APP_SECRET_KEY }
    })
    console.log(nutrition)
    const sleep = await axios({
      method: "get",
      url: `https://api.sandbox.metriport.com/sleep?userId=${userIDStore}&date=2023-01-25`,
      headers: { 'x-api-key': process.env.REACT_APP_SECRET_KEY }
    })
    console.log(sleep)
    const user = await axios({
      method: "get",
      url: `https://api.sandbox.metriport.com/user?userId=${userIDStore}&date=2023-01-25`,
      headers: { 'x-api-key': process.env.REACT_APP_SECRET_KEY }
    })
    console.log(user)
    console.log({
      "activity": activity.data,
      "biometrics": biometrics.data,
      "body": body.data,
      "nutrition": nutrition.data,
      "sleep": sleep.data,
      "user": user.data,
    })
  }
  useEffect(()=>{
    setStartDateString(`${startDate.getFullYear()}-${('0' + (startDate.getMonth()+1)).slice(-2)}-${('0' + startDate.getDate()).slice(-2)}`)
  },[startDate])
  const rootStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  }
  return (
    <div className="App" style={rootStyle}>
        Username:<input value={customUserID} onChange={(event)=>{
          if (event.target.value[event.target.value.length - 1] !== " "){
            // setCustomUserID(event.target.value)
          }
          }}></input>

        Date you want data retrived from:
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} style={{width: "unset"}}/>
        
        <button onClick={setUpMetriport}>Set Up</button>

        <button onClick={() => {getUserID(false)}}>Get User ID</button>
        <div style={{
          display: "flex",
          flexDirection: "row"
        }}>
          <select value={provider} onChange={e=>setProvider(e.target.value)}>
            <option value={"apple"}>Apple</option>
            <option value={"cronometer"}>Cronometer</option>
            <option value={"fitbit"}>Fitbit</option>
            <option value={"oura"}>Oura</option>
            <option value={"whoop"}>Whoop</option>
            <option value={"withings"}>Withings</option>
          </select> <button onClick={revokeProvider}>Revoke</button>
        </div>
        

        <button onClick={getActivityData}>Get Activity Data</button>

        <button onClick={getBiometricsData}>Get Biometrics Data</button>

        <button onClick={getBodyData}>Get Body Data</button>

        <button onClick={getNutritionData}>Get Nutrition Data</button>

        <button onClick={getSleepData}>Get Sleep Data</button>

        <button onClick={getUserData}>Get User Data</button>
        <button onClick={getAllData}>Get All Data</button>
        See Console for results
      {/* </header> */}
    </div>
  );
}

export default App;
