import React, { useState } from "react";
import Constants from "../utils/Constants";
import {useNavigate} from 'react-router-dom'
import ProductCreateForm from "./ProductCreateForm";
import ProductUpdateForm from "./ProductUpdateForm";

function App() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const [showingCreateNewProductForm, setShowingCreateNewProductForm] = useState(false);
  const [productCurrentlyBeingUpdated, setProductCurrentlyBeingUpdated] = useState(null);

  function getProducts() {
    const url = Constants.API_URL_GET_ALL_PRODUCTS;

    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((productsFromServer) => {
        setProducts(productsFromServer);
      })
      .catch((error) => {
        console.log(error);
        getProducts();
      });
  }

  function deleteProduct(productId){
    const url = `${Constants.API_URL_DELETE_PRODUCT_BY_ID}/${productId}`;

    fetch(url, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((responseFromServer) => {
        console.log(responseFromServer);
        OnProductDeleted(productId);
      })
      .catch((error) => {
        console.log(error);
        
      });
  }

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
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
      });
  }
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  if(loading){
    {getUser()}
    return <div>Loading...</div>
  }
  else{
    if(userData.role === "Admin"){
        return (
            <div className="container">
              <div className="row min-vh-100">
                <div className="col d-flex flex-column justify-content-center align-items-center">
                  {showingCreateNewProductForm === false && productCurrentlyBeingUpdated === null && (
                    <div>
                      <h1>Products</h1>
                      <div className="mt-5">
                        <button className="btn btn-primary" onClick={getProducts}>
                          Refresh
                        </button>
                        <button className="btn btn-secondary" onClick={() => setShowingCreateNewProductForm(true)}>
                          Create Product
                        </button>
                      </div>
                    </div>
                  )}
        
                  {(products.length > 0 &&
                    showingCreateNewProductForm === false && productCurrentlyBeingUpdated === null) &&
                    renderProductsTable()}
        
                  {showingCreateNewProductForm && (
                    <ProductCreateForm OnProductCreated={OnProductCreated} />
                  )}
        
                  {productCurrentlyBeingUpdated !== null && <ProductUpdateForm product={productCurrentlyBeingUpdated} OnProductUpdated={OnProductUpdated} />}
                </div>
              </div>
            </div>
          );
    }
    else{
        return (
            <h1>YOU ARE NOT ALLOWED TO USE THIS PAGE</h1>
        );
    }
  }
  

  function renderProductsTable() {
    return (
      <div className="table-responsive mt-5">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Operations</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <th>{product.idString}</th>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => setProductCurrentlyBeingUpdated(product)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => { if(window.confirm(`Are you sure you want to delete "${product.name}"?`)) deleteProduct(product.idString)}}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  function OnProductCreated(createdProduct) {
    setShowingCreateNewProductForm(false);
    
    if (createdProduct === null) {
      return;
    }

    alert(`Product titled: ${createdProduct.name} created successfully`);
    {getProducts()};
  }

  function OnProductUpdated(updatedProduct) {
    setProductCurrentlyBeingUpdated(null);
    if (updatedProduct === null) {
      return;
    }

    let productsCopy = [...products];
    const index = productsCopy.findIndex((productsCopyPost, currentIndex) => {
      if(productsCopyPost.idString === updatedProduct.idString) {
        return true;
      }
    });

    if(index !== -1) {
      productsCopy[index] = updatedProduct;
    }

    setProducts(productsCopy);
    alert(`Product titled: ${updatedProduct.name} updated successfully`);
    {getProducts()};
  }

  function OnProductDeleted(productId) {
    let productsCopy = [...products];
    const index = productsCopy.findIndex((productsCopyPost, currentIndex) => {
      if(productsCopyPost.idString === productId) {
        return true;
      }
    });

    if(index !== -1) {
      productsCopy.splice(index, 1);
    }

    setProducts(productsCopy);
    alert(`Product deleted successfully`);
    {getProducts()};
  }
}

export default App;
