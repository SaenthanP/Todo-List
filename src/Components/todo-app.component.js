import React, { Component,useContext,useState} from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import UserContext from "../context/user.context";
import Axios from 'axios';
import Error from './error.component';
import NavBar from "../Components/navbar.component";
import '../Component.css';

export default function TodoApp(){
  
    
    
        return (
            <div className="container-fluid nav">
            <NavBar />
            </div>
           
        );
    }
