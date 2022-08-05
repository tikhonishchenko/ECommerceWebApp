import React, { useState } from 'react';
import './CSS/App.css';
import Constants from '../utils/Constants';

export default function App() {
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
      <div className="table-responsive mt-5">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Image</th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <th>{product.idString}</th>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td><img src={product.imageUrl}></img></td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>
                  {/*<button className="btn btn-primary" onClick={() => setProductCurrentlyBeingUpdated(product)}>Edit</button>*/}
                  <button className="btn btn-danger" onClick={() => { if(window.confirm(`Are you sure you want to delete "${product.name}"?`)) deleteProduct(product.idString)}}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
