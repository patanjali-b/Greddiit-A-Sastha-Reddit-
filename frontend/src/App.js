import SignIn from "./SignIn";
import Profile from "./Profile"
import SignUp from "./SignUp";
import Home from "./home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import TempPage from "./temp";
import AllSubGreddits from "./AllSubGreddits";
import MySubGreddits from "./MySubGreddits";
import Myposts from "./Posts";
import Navbar from "./navbar"


function RequiresSignIn({ children }) {
  const navigate = useNavigate();
  console.log({ children })
  if (localStorage.getItem('logged') === "1") {
    return children

  }


  return <Navigate to="/" />;
}
function Requires1SignIn({ children }) {
  const navigate = useNavigate();
  console.log({ children })
  if (localStorage.getItem('logged') === "1") {
    return <Navigate to="/profile" />;

  }


  return children
}
// function Require2Sign(props){
//   const navigate = useNavigate();
//   console.log("hhhhhhhhhh");
//   if (localStorage.getItem('logged') === "1"){
//     if(props.onCheck==="home") return <Navigate to="/profile" />;
//  else   return <Navigate to="/home " />;
//   }


// }
function App() {

  return (
    <BrowserRouter>
<Navbar />
      <Routes>
        <Route path="/profile" element={<RequiresSignIn><Profile /></RequiresSignIn>} />
        <Route path="/" element={<Requires1SignIn><Home /></Requires1SignIn>} />
        <Route path="/temp" element={<TempPage />} />
        <Route path="/allsubgreddits" element={<AllSubGreddits />} />
        <Route path="/mysubgreddits" element={<MySubGreddits />} />
        <Route path="/mysubgreddits/:id" element={<Myposts />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

