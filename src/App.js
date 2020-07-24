import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


import './App.css';
import Login from "./Components/login.component";
import Register from "./Components/register.component";

function App() {
  return (
    <Router>
    <div className="container-fluid ">

    
     <br />
     <Route path={["/", "/login"]} exact component={Login} />

     <Route path="/register" exact component={Register} />
     </div>
   </Router>
  );
}

export default App;
