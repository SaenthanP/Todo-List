import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

export default function NavBar() {
    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg justify-content-end">
        <Link to="/" className="navbar-brand">Todo App</Link>
            <ul className="navbar-nav mr-auto" >
               
                <li className="navbar-item">
                    <Link to="/user" className="nav-link" >Logout</Link>
                </li>
            </ul>
    </nav>
    );
 }