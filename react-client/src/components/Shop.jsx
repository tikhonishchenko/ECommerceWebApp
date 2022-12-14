import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import './CSS/App.css';
import './CSS/Shop.css';
import Constants from '../utils/Constants';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
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
        getProducts();
      });

  }
  function showDetails(productId){
    navigate(`/details/${productId}`);
  }

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
        console.log(error);
      });
  }
  function maxPriceProducts() {
    if(products.length === 0){
      getProducts();
    }
    var maxPrice = 0;
    for (let i = 0; i < products.length; i++) {
      if (products[i].price > maxPrice) {
        maxPrice = products[i].price;
      }
    }
    return maxPrice;
  }
  const initialFormData = Object.freeze({
    name: "",
    category: "",
    minPrice: 0.00,
    maxPrice: parseFloat(maxPriceProducts()),
  });
  const [formData, setFormData] = useState(initialFormData);

  const onChangeSearch = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }
  const searchByParams = (event) => {
    event.preventDefault();
    const url = `${Constants.API_URL_FIND_PRODUCT_BY_PARAMS}`;

    const product = {
        name: formData.name,
        category: "",
        minPrice: parseFloat(formData.minPrice),
        maxPrice: parseFloat(formData.maxPrice)
            };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then((productsFromServer) => {
        console.log(productsFromServer);
        setProducts(productsFromServer);
      }).catch((error) => {
        console.log(error);
      }
      );
  }

//#endregion

//#region renderers

  function renderProductsTable() {
    console.log(products);
    return (
      <div>
        <div className="products">
              {products.map((product) => (
                <div className="product" key={product.id}>
                  <div className="details" onClick={() => showDetails(product.idString)}>
                    <img src={product.imageUrl}  />
                    <h1>{product.name}</h1>
                    <h4>{product.idString}</h4>
                    <h2>{product.price}???</h2>
                  </div>
                    <button onClick={() => addToCart(product.idString)}>Add to cart</button>
                </div>
              ))}
        </div>
      </div>
    );
  }

  function renderProductsTableHeader() {
    return (
      <div className="products-header">
        <div className='search'>
          <div className="searchBar">
          <label>Name</label>
          <input type="text" name="name" placeholder='Search' id="search" value={formData.name} onChange={onChangeSearch}/>
          </div>
          <div class="price-input">
            <div class="field">
              <span>Min</span>
              <input type="number" name="minPrice" className='input-min' value={formData.minPrice} onChange={onChangeSearch}/>
            </div>
            <div class="field">
              <span>Max</span>
              <input type="number" name="maxPrice" className='input-max' value={formData.maxPrice} onChange={onChangeSearch}/>
            </div>
          </div>
          <button className="search-button" onClick={searchByParams}>Search</button>
        </div>

      </div>
    );
  }
//#endregion



return (
  <div>
    {renderProductsTableHeader()}
    {renderProductsTable()}
  </div>
);
}
