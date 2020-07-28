import React, { Component, useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import UserContext from "../context/user.context";
import Axios from 'axios';
import Error from './error.component';
import NavBar from "../Components/navbar.component";
import '../Component.css';

export default function TodoApp() {
    const { userData } = useContext(UserContext);

    //When the app runs, this function runs once because there is no dependancy in []
    useEffect(() => {
        if (!localStorage.getItem('auth-token')) {
            window.location = '/login';

        }
    });
    return (
        <div className="container-fluid nav">
            <NavBar />
            <div className="container">
                <form className="form-inline md-form mr-auto mb-4">
                    <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                    <button className="btn aqua-gradient btn-rounded btn-sm my-0" type="submit">Search</button>
                </form>
            </div>
        </div>

    );
}
