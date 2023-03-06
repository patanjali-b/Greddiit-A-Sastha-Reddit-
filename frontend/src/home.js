import React from "react";
import { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import "./Text.css"

export default function Home()
{
    const [switchTab, setSwitchTab] = useState(true);
    function switchToSignin()
    {
        setSwitchTab(true);
    }
    function switchToSignup()
    {
        setSwitchTab(false);
    }
    return (
        <div className="Text">
            <title>Grediit</title>
            <h1 textAlign="center"> Welcome to Grediit</h1>
            <button className="Button btn1" onClick={switchToSignin}>Sign In</button>
            <button className="Button btn2" onClick={switchToSignup}>Sign Up</button>
            {(switchTab ?  <SignIn switch={switchToSignup}/>: <SignUp switch={switchToSignin}/>)}
        </div>
    )
     
}