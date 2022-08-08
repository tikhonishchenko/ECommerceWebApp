import React, { useState } from 'react';
import './CSS/App.css';
import './CSS/Shop.css';
import Constants from '../utils/Constants';

export default function Shop() {
  const [products, setProducts] = useState([]);

//#region functions
  function getProducts() {
    const url = Constants.API_URL_GET_ALL_PRODUCTS;

    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((productsFromServer) => {
        console.log(productsFromServer);
        setProducts(productsFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }
  function deleteProduct(productId){
    const url = `${Constants.API_URL_DELETE_PRODUCT_BY_ID}/${productId}`;

    fetch(url, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((responseFromServer) => {
        console.log(responseFromServer);
        //OnProductDeleted(productId);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  function logout() {
    const url = `${Constants.API_URL_LOGOUT_USER}`;

    fetch(url, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.status)
      .then((productsFromServer) => {
        console.log(productsFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }
  function getUser() {
    const url = `${Constants.API_URL_GET_USER}`;

    fetch(url, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((productsFromServer) => {
        console.log(productsFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }
  function addToCart(id) {
    const url = `${Constants.API_URL_ADD_TO_CART}/${id}`;

    fetch(url, {
      method: "POST",
      credentials: "include",
    })
      .then((response) => response.statusText)
      .then((productsFromServer) => {
        console.log(productsFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }
//#endregion

//#region renderers

  function renderProductsTable() {
    return (
      <div className="products">
            {products.map((product) => (
              <div className="product" key={product.id}>
                <img src="https://picsum.photos/200/300" />
                <h1>{product.name}</h1>
                <h4>{product.idString}</h4>
                <h2>{product.price}₴</h2>
              </div>
            ))}
      </div>
    );
  }
//#endregion



return (
  <div>
    <button className="btn btn-primary" onClick={getProducts}>Refresh</button>
    <button className="btn btn-primary" onClick={() => {logout()}}>logout</button>
    <button className="btn btn-primary" onClick={() => {getUser()}}>get user</button>
    <button className="btn btn-primary" onClick={() => {addToCart("0000002")}}>add to cart</button>
    {renderProductsTable()}
  </div>
);
}
