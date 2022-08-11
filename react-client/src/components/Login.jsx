import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/App.css";
import "./CSS/Login.css";
import Constants from "../utils/Constants";

export default function Login() {
  //#region functions
  const initialFormData = Object.freeze({
    username: "",
    password: "",
  });
  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const logout = () => {
    const url = `${Constants.API_URL_LOGOUT_USER}`;

    fetch(url, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.status)
      .then((productsFromServer) => {
        console.log(productsFromServer);
        navigate(`/`);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
        navigate(`/`);
      });
  };
  const getUser = () => {
    const url = `${Constants.API_URL_GET_USER}`;

    fetch(url, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((productsFromServer) => {
        setUserData(productsFromServer);
        console.log(userData);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const HandleSubmit = (event) => {
    event.preventDefault();

    const user = {
      username: formData.username,
      password: formData.password,
    };

    const url = Constants.API_URL_LOGIN_USER;
    fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((responseFromServer) => {
        console.log(user);
        console.log(responseFromServer);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  //#endregion

  if (loading) {
    getUser();
    return (
      <div className="login">
        <h1>Loading...</h1>
      </div>
    );
  }
  if (userData === null) {
    return (
      <div className="login">
        <form>
          <h1>Login</h1>
          <h2>Username</h2>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <h2>Password</h2>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <h4></h4>
          <button onClick={HandleSubmit}>Login</button>
          <h4>
            <a href="register" id="register">
              Haven't got an account? Register.
            </a>
          </h4>
        </form>
      </div>
    );
  } else {
    if (userData.role === "Admin") {
      return (
        <div className="login-admin">
                  <div className="login-text">
                  <h1>Welcome, {userData.username}</h1>
          <h2>You are an admin</h2>
                  </div>
          <div className="buttons">
            <button onClick={() => navigate("/admin-panel")}>
              Admin panel
            </button>
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      );
    }
    return (
      <div className="login-user">
        <div className="login-text">
          <h1>Welcome {userData.username}</h1>
          <h2>You are logged in</h2>
        </div>
        <div className="buttons">
          <button onClick={() => navigate("/cart")}>Cart</button>
          <button onClick={() => navigate("/update-user")}>Change info</button>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    );
  }
}
