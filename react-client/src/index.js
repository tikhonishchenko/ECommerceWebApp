import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
    App,
    Footer,
    Home,
    Header,
    Login,
  } from "./components";
  

ReactDOM.render(

    <Router>
        <Header />
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/app' element={<App />}></Route>
                <Route path='/login' element={<Login />}></Route>
            </Routes>
        <Footer />
    </Router>,
    
    
    document.getElementById('root')
    );

