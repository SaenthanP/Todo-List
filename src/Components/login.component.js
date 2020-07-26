import React, { Component,useContext,useState} from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import UserContext from "../context/user.context";
import Axios from 'axios';
import Error from './error.component';

export default function Login(){
    const[username,setUsername]=useState();
    const[password,setPassword]=useState();
    const[error,setError]=useState();

    
   const onSubmit=async(e)=>{
       
        try{
        e.preventDefault();
        console.log("test");
       
        const user={
            username,
            password,
         
        }
        console.log(user);
        await Axios.post("http://localhost:5000/users/login",user);
    }catch(err){
//this.setState({error: err.response.data.Error});
        err.response.data.Error&&setError(err.response.data.Error);
        }
    }
    
        return (
            <div className="row">
                <div className="col-sm-12 d-flex">
                        <div className="card signin-card">
                            <div className="card-body">
                            {error&&(<Error message={error} clearError={()=>setError(undefined)}/> )}

                                <h5 className="card-title text-center">Sign In</h5>
                                <form onSubmit={onSubmit} className="form-signin">
                                    <div className="form-group">
                                        <label for="inputEmail">Username</label>
                                        <input type="text" className="form-control" placeholder="Username"  onChange={(e)=>setUsername(e.target.value)}/>
                                    </div>
                                    <div className="form-group">
                                        <label for="inputEmail">Password</label>
                                        <input type="password" className="form-control" placeholder="Password"   onChange={(e)=>setPassword(e.target.value)}/>
                                    </div>
                                    <button className="btn btn-lg btn-primary btn-block text-uppercase signin-btn" type="submit">Sign in</button>
                                    <Link to="/register" >Register</Link>

                                   

                                 </form>
                            </div>
                        </div>
                    </div>
                </div>
            

        );
    }
