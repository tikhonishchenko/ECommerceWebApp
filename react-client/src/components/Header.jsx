import React from "react";
import logo from '../images/logo.jpg'
import login from '../images/login.png'
import './CSS/Header.css';
import './CSS/App.css';
export default function Header(){
    return (
      <div>
        <div>
          <div id="top">
            <img src={logo} alt="logo" id="logo" />
            <a href="login"><img src={login} alt="login" id="login" /></a>
          </div>

          <hr class="trans--grow" />
        </div>
        <div>
          <ul class="topnav">
            <li><a href="/">Home</a></li>
            <li><a href="contact">Contact</a></li>
            <li><a href="about">About</a></li>
            <li><a href="app">App</a></li>
            
          </ul>
        </div>
      </div>

    );
  }

