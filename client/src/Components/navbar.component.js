import React, { Component,useContext } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import '../Component.css';
import UserContext from '../context/user.context';

export default function NavBar() {
const {setUserData}=useContext(UserContext);
const logout=()=>{
setUserData({
    token:undefined,
    user:undefined,
});
localStorage.setItem("auth-token","");

};
    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg justify-content-end">
        <Link to="/" className="navbar-brand">Todo App</Link>
            <ul className="navbar-nav mr-auto" >
               
                <li className="navbar-item">
                    <Link to="/login" className="nav-link" onClick={logout}>Logout</Link>
                </li>
            </ul>
    </nav>
    );
 }