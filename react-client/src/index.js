import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
    Footer,
    Home,
    Header,
    Login,
    Register,
    Shop,
    Details,
    Admin,
    UpdateUser,
    Cart
  } from "./components";
  

ReactDOM.render(

    <Router>
        <Header />
            <Switch>
                <Route path='/' element={<Home />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/register' element={<Register />}></Route>
                <Route path='/shop' element={<Shop />}></Route>
                <Route path='/details/:productId' element={<Details />}></Route>
                <Route path='/admin-panel' element={<Admin />}></Route>
                <Route path='/update-user' element={<UpdateUser />}></Route>
                <Route path='/cart' element={<Cart />}></Route>
            </Switch>
        <Footer />
    </Router>,
    
    
    document.getElementById('root')
    );

