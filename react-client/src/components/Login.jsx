import React, {useState} from 'react'
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


    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
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
          })
          .catch((error) => {
            console.log(error)
            alert(error);
          });
          //props.OnProductCreated(productToCreate);
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
                <button onClick={handleSubmit} >Login</button>
                <h4><a href="register" id="register">Haven't got an account? Register.</a></h4>
            </form>
        </div>
    );
  }