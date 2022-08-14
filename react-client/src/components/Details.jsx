import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import "./CSS/App.css";
import "./CSS/Details.css";
import Constants from "../utils/Constants";
import Shop from './Shop.jsx';

export default function Details(){
//#region functions
    const [product, setProduct] = useState([]);
    const { productId } = useParams();
    const navigate = useNavigate();
    const HandleSubmit = () => {
        const url = `${Constants.API_URL_GET_PRODUCT_BY_ID}/${productId}`;
        fetch(url, {
            method: 'GET',
          })
          .then(response => response.json())
          .then(responseFromServer => {
            setProduct(responseFromServer);
          })
          .catch((error) => {
            console.log(error)
          });
    };
    const addToCart = (id) => {
        const url = `${Constants.API_URL_ADD_TO_CART}/${id}`;
    
        fetch(url, {
          method: "POST",
          credentials: "include",
        })
          .then((response) => response.status===200?response.status:navigate(`/login`))
          .then((productsFromServer) => {
            console.log(productsFromServer);
          })
          .catch((error) => {
            if(error.status === 405){
                navigate(`/login`);
            }
            console.log(error);
          });
      }





//#endregion
    return (
        <div className="page"> 
            {(() => {
        if(product.length === 0){
            HandleSubmit();
        }})()}    
            <img src={product.imageUrl} />
            <div className="description">
                <h1>{product.name}</h1>
                <p>{product.idString}</p>
                <h3>{product.description}</h3>
                <h2>{product.price}₴</h2>
                <button onClick={() => {addToCart(product.idString)}}>Add to cart</button>

            </div>
        
        </div>
    );
  }