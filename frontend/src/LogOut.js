import React from "react";
import { ReactDOM } from "react";
import { useNavigate } from "react-router-dom";


export default function LogOut()
{
    const navigate = useNavigate();
    window.localStorage.setItem('logged',0);
    console.log("LOgout",window.localStorage.getItem('logged'))
    navigate("/");
}