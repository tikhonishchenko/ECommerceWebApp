import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import './CSS/App.css';
import './CSS/Shop.css';
import Constants from '../utils/Constants';
import minus from '../images/minus.png';
import plus from '../images/plus.png';

export default function Cart() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
//#region functions
  function getProducts() {
    const url = Constants.API_URL_GET_CART;

    fetch(url, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((productsFromServer) => {
        console.log(productsFromServer);
        setProducts(productsFromServer);
        setLoading(false);
        countTotal(productsFromServer);

      })
      .catch((error) => {
        console.log(error);
        if(products.length === 1){
          setProducts([]);
          countTotal([]);
        }
        else if(products.length === 0){
            setLoading(false);
        }

      })
      .finally(() => {

    });
  }
  function countTotal(productsToCount) {
    let total = 0;
    console.log(productsToCount);
    for (let i = 0; i < productsToCount.length; i++) {
      total += productsToCount[i].price * productsToCount[i].quantity;
    }
    setTotal(total);
    console.log(total);
  }
  function showDetails(productId){
    navigate(`/details/${productId}`);
  }
  function checkout (){
    alert("Checkout");
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
        getProducts();
      })
      .catch((error) => {
        console.log(error);
      });
  }
    const removeFromCart = (id) => {
        const url = `${Constants.API_URL_REMOVE_FROM_CART}/${id}`;
        fetch(url, {
            method: "POST",
            credentials: "include",
          })
          .then((response) => response.status===200?response.status:navigate(`/login`))
            .then((productsFromServer) => {
              console.log(productsFromServer);
              getProducts();
            })
            .catch((error) => {
              console.log(error);
            });
    }
    const removeOneFromCart = (id) => {
        const url = `${Constants.API_URL_REMOVE_ONE_FROM_CART}/${id}`;
        fetch(url, {
            method: "POST",
            credentials: "include",
          })
          .then((response) => response.status===200?response.status:navigate(`/login`))
            .then((productsFromServer) => {
              console.log(productsFromServer);
              getProducts();
            })
            .catch((error) => {
              console.log(error);
            });
    }

    function goToShop(){
        navigate(`/shop`);
    }

  
//#endregion

//#region renderers

  function renderProductsTable() {
    if(loading){
        {getProducts()}
        return (
            <div>Loading cart...</div>
        );
    }
    else{
        if(products.length === 0) {
            return(
                <div className='empty-cart'>
                    <h1>Your cart is empty!</h1>
                    <button onClick={goToShop}>Shop</button>
                </div>
            )
        }
        else{
            return (
                <div>
                  <div className="products">
                          
                        {products.map((product) => (
                          <div className="product" key={product.id}>
                            <div className="details" onClick={() => showDetails(product.idString)}>
                              <img src="https://picsum.photos/600/900"  />
                              <h1>{product.name}</h1>
                              <h4>{product.idString}</h4>
                              <h2>{product.price}₴</h2>
                              </div>
                              <div className='quantityControls'>
                                  <a onClick={() => {removeOneFromCart(product.idString);}}><img src={minus}></img></a>
                                  <h3>{product.quantity}</h3>
                                  <a onClick={() => {addToCart(product.idString);}}><img src={plus}></img></a>
                              </div>
                              
                              <button onClick={() => removeFromCart(product.idString)}>Remove from cart</button>
                          </div>
                        ))}
                  </div>
                </div>
              );
        }
    }


    
  }

  
//#endregion



return (
  <div className='cart'>
    {renderProductsTable()}
    <div className='checkout-button'>
        <p>{total}</p>
    <button onClick={checkout}>Buy</button>
    </div>
  </div>
);
}
