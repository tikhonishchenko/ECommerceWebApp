import React from "react";
import "./CSS/App.css";

export default function Home(){
    return (
        <div className="home">
            <h1>Hello!</h1>
            <h2>This is pet-project of Tikhon Ishchenko.</h2>
            <h3>I hope you will enjoy it.</h3>
            <h4>It was made using .NET 3.1 and React 18. For databases it uses SQLite and Entity Framework 5.</h4>
            <h4>You can view source code in my repository on <a href="https://github.com/tikhonishchenko/ECommerceWebApp">GitHub</a>.</h4>
            <h4>My other <a href="https://tikhon-ishchenko.carrd.co/">projects</a>.</h4>
            <h4>You can use these credentials to login:</h4>
            <h4>User: Username: user Password: 123</h4>
            <h4>Admin: Username: admin Password: 123</h4>
            <h4>Or you can register new.</h4>
        </div>
    );
  }