import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Constants from "../utils/Constants";
import './CSS/App.css';
import './CSS/Login.css';

export default function UpdateUser() {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();


    function getUser() {
        const url = `${Constants.API_URL_GET_USER}`;
    
        fetch(url, {
          method: "GET",
          credentials: "include",
        })
          .then((response) => response.json())
          .then((productsFromServer) => {
            console.log(productsFromServer);
            setUser(productsFromServer);
            setLoading(false);
          })
          .catch((error) => {
            navigate(`/login`);
          });
      }
    const initialFormData = Object.freeze({
        id: user.id,
        username: user.username,
        email: user.email,
        password: user.password,
        passwordKey: user.passwordKey,
        cartSave: user.cartSave,
        role: user.role,
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

        const productToUpdate = {
            id: user.id,
            username: formData.username,
            email: formData.email,
            password: user.password,
            passwordKey: user.passwordKey,
            cartSave: user.cartSave,
            role: user.role,
        };

        const url = Constants.API_URL_UPDATE_USER;

        fetch(url, {
            method: 'PUT',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              },
              body: JSON.stringify(productToUpdate),
              
          })
          .then(response => response.json())
          .then(responseFromServer => {
            console.log(responseFromServer);
          })
          .catch((error) => {
            console.log(error);

        }).finally(() => {
            
            HandleUpdate();
        });
    };

    const deleteAccount = (event) => {
        event.preventDefault();

        const url = `${Constants.API_URL_DELETE_USER}`;

        fetch(url, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              },
              body: JSON.stringify(user),
              
          })
          .then(response => response)
          .then(responseFromServer => {
            console.log(responseFromServer);
            navigate("/login");
          })
          .catch((error) => {
            console.log(error)
            navigate("/login");
          });
        }
        const HandleUpdate = () => {    
            const userUpdated = {
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
                  body: JSON.stringify(userUpdated),
                  
              })
              .then(response => response.json())
              .then(responseFromServer => {
                console.log(userUpdated)
                console.log(responseFromServer);
                navigate("/login");
              })
              .catch((error) => {
                console.log(error)
                console.log(userUpdated)    
              });
        };

if(loading){
    {getUser()}
    return (
        <div>
            <h1>Loading...</h1>
        </div>
    );
}
else{
    return (
    <div className='updateForm'>
        <form>
            <h1>Update the "{user.username}" </h1>


            <div >
                <h2 >Name</h2>
                <input value={formData.username} name='username' type="text"  onChange={handleChange}/>
            </div>
            <p></p>
            <div >
                <h2 >E-mail</h2>
                <input value={formData.email} name='email' type="email"  onChange={handleChange}/>
            </div>
            <p></p>
            <div >
                <h2 >Type password to confirm</h2>
                <input value={formData.password} name='password' type="email"  onChange={handleChange}/>
            </div>

            <p></p>
            <button onClick={handleSubmit} >Update</button>
            <p></p>
            <button onClick={deleteAccount} >Delete Account</button>
        </form>
    </div>
  );
    }
}
