
import React,{useState, useEffect} from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Axios from 'axios';
import './App.css';
import Login from "./Components/login.component";
import Register from "./Components/register.component";
import UserContext from "./context/user.context";

function App() {
  const [userData,setUserData]=useState({
    //When it starts the context and user is undefined
      token:undefined,
      user:undefined,
  });

//When the app runs, this function runs once because there is no dependancy in []
  useEffect(()=>{
    const checkLoggedIn=async()=>{
   
        let token=localStorage.getItem('x-auth-token');
        if(token===null){
          localStorage.setItem('x-auth-token','',{path:"/"});
          token="";
        }
        //Checks if the token is valid and gets the user data, and sets the state
      const tokenRes=await Axios.post("http://localhost:5000/users/tokenIsValid",null,{headers:{"x-auth-token":token}});
     if(tokenRes.data){
        const userRes=await Axios.get("http://localhost:5000/users/",{headers:{"x-auth-token":token}});
        setUserData({
          token,
          user:userRes.data,
        });
     }
    };
    checkLoggedIn();
  },[]);
  /*
  All of the components will have access to the current user using the context provider
  */
  return (

    <Router>
      {/* provider gives userData,setUserData to all the components in it */}
      <UserContext.Provider value={{userData,setUserData}}>
        <div className="container-fluid">


          <br />
          <Route path={["/", "/login"]} exact component={Login} />

          <Route path="/register" exact component={Register} />
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
