import React from "react";
import logo from '../images/logo.png'
import account from '../images/account.png'
import './CSS/Header.css';
import './CSS/App.css';

export default function Header(){
    return (
      <div className="header">
        <div>
          <div id="top">
            <img src={logo} alt="logo" id="logo" />
            <a href="/login"><img src={account} alt="account" id="login" /></a>
          </div>

          <hr className="trans--grow" />
        </div>
        <div>
          <ul className="topnav">
            <li><a href="/">Home</a></li>
            <li><a href="/shop">Shop</a></li>
          </ul>
        </div>
      </div>

    );
  }

