import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import "./CSS/App.css";
import "./CSS/Login.css";
import Constants from "../utils/Constants";

export default function Login(){
//#region functions
    const initialFormData = Object.freeze({
        username: "",
        password: "",
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
            username: formData.username,
            password: formData.password,
        };

        const url = Constants.API_URL_LOGIN_USER;
        fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              },
              body: JSON.stringify(user),
              
          })
          .then(response => response.json())
          .then(responseFromServer => {
            console.log(user)
            console.log(responseFromServer);
            navigate("/");
          })
          .catch((error) => {
            console.log(error)
            alert(error);

          });
    };

//#endregion
    return (
        <div class="login">        
            <form>
                <h1>Login</h1>
                <h2>Username</h2>
                <input type="text" name="username" value={formData.username} onChange={handleChange} />
                <h2>Password</h2>
                <input type="password" name="password" value={formData.password} onChange={handleChange} />
                <h4></h4>
                <button onClick={HandleSubmit} >Login</button>
                <h4><a href="register" id="register">Haven't got an account? Register.</a></h4>
            </form>
        </div>
    );
  }