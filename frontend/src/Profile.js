import React, { useEffect, useState } from "react";
import { ReactDOM } from "react";
import './tabb.css'
import "./Text.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ResponsiveAppBar from "./navbar";
import Navbar from "./navbar";
// import EditProfile from "./Edit_Profile";

export default function Profile() {
    const navigate = useNavigate();
    // ResponsiveAppBar();
    const [Details, setDetails] = useState({})
    function handleSubmit() {
        <div>
            <form> Name: <input type="text" name="name"></input> </form>

        </div>
    }
    useEffect(function () {
        const val = localStorage.getItem("logged");
        if (val === 1) {
            navigate("/profile");
        }
    }, [])
    useEffect(function () {

        axios.get('/api/profile' + '/' + localStorage.getItem('email'))
            .then((res) => {
                console.log("Response is", res)
                console.log("Response data is", res.data)
                console.log("Response data First Name is", res.data[0].firstName)
                setDetails({
                    name: res.data[0].firstName,
                    email: res.data[0].email,
                    phone: res.data[0].contact,
                    userName: res.data[0].userName,
                    age: res.data[0].age,
                    followers: res.data[0].followers,
                    following: res.data[0].following
                })
                console.log("Followers length is", Details.followers.length)
            })
            .catch((err) => { console.log(err) })


    }, [])
    console.log("Details is", Details.name) 
    
    const [editMode, setEditMode] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [contact, setContact] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [changeData, setChangeData] = useState(false);
    // console.log("First Name is", firstName)

    // if(Details){
    //     setFirstName(Details.name)
    // }

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleSaveClick = () => {
        setEditMode(false);
        console.log(`Changes: First Name: ${firstName}, Last Name: ${lastName}, Username: ${userName}, Contact: ${contact}, Age: ${age}, Email: ${email}`);
        Profile_update();
    };

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };


    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
    };

    const handleContactChange = (event) => {
        setContact(event.target.value);
    };

    const handleAgeChange = (event) => {
        setAge(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const [showProfile, setShowProfile] = useState(false);

    const EditProfile = (event) => {
        event.preventDefault();
        console.log("Button Works")
        setShowProfile(true);
    }
    function Profile_update() {
        const Profile_update = {
            firstName: firstName!=='' ? firstName : undefined,
            userName: userName!=='' ? userName : undefined,
            contact: contact!=='' ? contact : undefined,
            age: age!=='' ? age : undefined,
            email: email!=='' ? email : undefined
        }
        axios.put(`/api/users/${localStorage.getItem('id')}`, Profile_update)
            .then((res) => {
                const updatingto = {
                    name: res.data.firstName,
                    email: res.data.email,
                    phone: res.data.contact,
                    userName: res.data.userName,
                    age: res.data.age,
                    followers: res.data.followers,
                    following: res.data.following
                }
                console.log(updatingto);
                setDetails(updatingto)
            })
            .catch((err) => { console.log(err) })
    }

    return (
        <React.Fragment>
            
            <div>
                <div className="Text">
                    <h1> Profile </h1>
                    <h2>Welcome {Details.name}</h2>
                    <h3>mail: {Details.email}</h3>
                    <h3>phone: {Details.phone}</h3>
                    <div class="dropdown">
                        <button class="dropbtn btn1">Followers </button>
                        <div class="dropdown-content">
                            <p>Ram</p>
                            <p>Dan</p>
                            <p>Niel</p>
                        </div>
                    </div>
                    <div class="dropdown btn2">
                        <button class="dropbtn">Following </button>
                        <div class="dropdown-content">
                            <p>Yu</p>
                            <p>Papa</p>
                            <p>Akka</p>
                        </div>
                    </div>
                    <button type="button" className="btn3" onClick={EditProfile}>Change Profile</button>
                    {showProfile && <div>
                        <h1>Edit Profile</h1>
                        {editMode ? (
                            <form>
                                <label>
                                    First Name: 
                                    <input type="text" value={firstName} onChange={handleFirstNameChange} />
                                </label>
                                <label>
                                    Username:
                                    <input type="text" value={userName} onChange={handleUserNameChange} />
                                </label>
                                <label>
                                    Contact:
                                    <input type="text" value={contact} onChange={handleContactChange} />
                                </label>
                                <label>
                                    Age:
                                    <input type="text" value={age} onChange={handleAgeChange} />
                                </label>
                                <label>
                                    Email:
                                    <input type="email" value={email} onChange={handleEmailChange} />
                                </label>
                                <button type="button" onClick={handleSaveClick}>Save</button>
                            </form>
                        ) : (
                            <div>
                                <p>First Name: {firstName}</p>
                                <p>Last Name: {lastName}</p>
                                <p>Username: {userName}</p>
                                <p>Contact: {contact}</p>
                                <p>Age: {age}</p>
                                <p>Email: {email}</p>
                                <button type="button" onClick={handleEditClick}>Edit</button>
                            </div>
                        )}
                    </div>}
                </div>
            </div>
        </React.Fragment>
    )
}
