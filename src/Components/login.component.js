import React, { Component,useContext,useState} from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import UserContext from "../context/user.context";
import Axios from 'axios';
import Error from './error.component';

export default class Login extends Component {
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeError=this.onChangeError.bind(this);

        this.state = {
            username: '',
            password: '',
          
          error:undefined
        }
    }
    onChangeUsername(e) {
        //ALWAYS USE SET STATE PROPERY
        this.setState({
          //Updates the username element in the state
          username: e.target.value
        });
    
      }
      onChangePassword(e) {
        //ALWAYS USE SET STATE PROPERY
        this.setState({
          //Updates the username element in the state
          password: e.target.value
        });
    
      }
      onChangeConfirmPassword(e) {
        //ALWAYS USE SET STATE PROPERY
        this.setState({
          //Updates the username element in the state
          confirmPassword: e.target.value
        });
    
      }
      onChangeError(err){
          this.setState({
            error:err
          });
      }
    onSubmit=async(e)=>{
       
        try{
        e.preventDefault();
        console.log("test");
       
        const user={
            username:this.state.username,
            password:this.state.password,
         
        }
        console.log(user);
        await Axios.post("http://localhost:5000/users/login",user);
    }catch(err){
//this.setState({error: err.response.data.Error});
        err.response.data.Error&&this.onChangeError(err.response.data.Error);
        }
    }
    render() {
        return (
            <div className="row">
                <div className="col-sm-12 d-flex">
                        <div className="card signin-card">
                            <div className="card-body">
                            {this.state.error&&(<Error message={this.state.error} /> )}

                                <h5 className="card-title text-center">Sign In</h5>
                                <form onSubmit={this.onSubmit} className="form-signin">
                                    <div className="form-group">
                                        <label for="inputEmail">Username</label>
                                        <input type="text" className="form-control" placeholder="Username"  className="form-control" value={this.state.username} onChange={this.onChangeUsername}/>
                                    </div>
                                    <div className="form-group">
                                        <label for="inputEmail">Password</label>
                                        <input type="password" className="form-control" placeholder="Password"  className="form-control" value={this.state.password} onChange={this.onChangePassword}/>
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
}