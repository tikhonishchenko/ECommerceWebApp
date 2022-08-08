import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/App.css";
import "./CSS/Register.css";
import Constants from "../utils/Constants";

export default function Register() {
  //#region functions
  const initialFormData = Object.freeze({
    username: "",
    password: "",
    email: "",
    role: "User",
  });

  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();


  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const HandleSubmit = (event) => {
    event.preventDefault();

    const user = {
    email: formData.email,
      username: formData.username,
      password: formData.password,
      role: formData.role,
    };

    const url = Constants.API_URL_REGISTER_USER;
    fetch(url, {
      method: "POST",
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
  return (
    <div className="login">
      <form>
        <h1>Register</h1>
        <h2>Email</h2>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
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
        <h2>User role</h2>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
        <option value="Admin">Admin</option>
        <option value="User">User</option>
        </select>
        <h4></h4>
        <button onClick={HandleSubmit}>Register</button>
        <h4>
          <a href="login" id="register">
            Got an account? Login.
          </a>
        </h4>
      </form>
    </div>
  );
}
