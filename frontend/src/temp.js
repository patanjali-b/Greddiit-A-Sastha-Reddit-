import axios from "axios";
import {Button} from "@mui/material"
import React from "react";
import {TextField} from "@mui/material";


function TempPage() {
const [sendData,setsendData] = React.useState("");

    async function getData(){
        const promise = await axios.get("/api/patu");
        console.log(promise.data)
    }
    
async function postData(){
   axios.post("/api/patu",{x:sendData})
}

    return <div><h1>temp</h1><div>
        <TextField id="outlined-basic" onChange={(event) => {setsendData(event.target.value)
        console.log(sendData)}} label="data" defaultValue={sendData} variant="outlined" />
        <Button onClick={postData}>sendButton</Button></div></div>
}

export default TempPage;