import React, { useState } from 'react';
import './App.css';
import Constants from './utils/Constants';



export default function App() {
  const [products, setProducts] = useState([]);

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

  function getUser() {
    const url = Constants.API_URL_SHOW_USER;

    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  function login(username, password) {
    const url = `${Constants.API_URL_LOGIN_USER}/${username}/${password}`;

    fetch(url, {
      method: "GET",
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




  return (
    <div>
      <button className="btn btn-primary" onClick={getProducts}>Refresh</button>
      <button className="btn btn-primary" onClick={() => {login("lol","12345")}}>login</button>
      {renderProductsTable()}
    </div>
  );



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

}