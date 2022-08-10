import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
    Footer,
    Home,
    Header,
    Login,
    Register,
    Shop,
    Details,
    Admin,
  } from "./components";
  

ReactDOM.render(

    <Router>
        <Header />
            <Routes>
                
                <Route path='/' element={<Home />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/register' element={<Register />}></Route>
                <Route path='/shop' element={<Shop />}></Route>
                <Route path='/details/:productId' element={<Details />}></Route>
                <Route path='/admin-panel' element={<Admin />}></Route>
            </Routes>
        <Footer />
    </Router>,
    
    
    document.getElementById('root')
    );

