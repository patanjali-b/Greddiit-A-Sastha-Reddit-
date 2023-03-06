import React from "react";
import { useNavigate } from "react-router-dom";
import './Navbar.css'
function Navbar() {
  const nav = useNavigate();
  function redirectLogin() {
    window.localStorage.setItem('logged', 0);
    nav("/");
  }
  function redirectMysgs() {
    nav("/mysubgreddits");
  }
  function redirectSaved() {
    nav("/savedposts");
  }
  function redirectAllsgs() {
    nav("/allsubgreddits");
  }
  function redirectProfile() {
    nav("/profile");
  }
  console.log("Logged", window.localStorage.getItem('logged'))
  return (
    window.localStorage.getItem('logged') > 0 ?
      <div>
        <nav class="navbar navbar-expand-lg navbar-light">
          <a class="navbar-brand" href=""> <span className="greddiit"> Greddiit </span></a>

          <div class="collapse navbar-collapse" id="navbarScroll">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <a class="nav-link"> <i class="fa-sharp fa-solid fa-house-user"></i> Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" onClick={redirectProfile}><i class="fa-solid fa-circle-user"></i> Profile</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" onClick={redirectMysgs} >My Subgreddits</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" onClick={redirectAllsgs} >All Subgreddits</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" onClick={redirectSaved}  >Saved Posts</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" onClick={redirectLogin}><i class="fa-solid fa-right-from-bracket"></i> Logout</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      :
      <div>
        <nav class="navbar navbar-expand-lg navbar-light">
          <a class="navbar-brand" href=""> <span className="greddiit"> Greddiit </span></a>
          <div class="collapse navbar-collapse" id="navbarScroll">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <a class="nav-link"> <i class="fa-sharp fa-solid fa-house-user"></i> Home</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

  );
}

export default Navbar;