import React, { Component,useContext,useState} from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import UserContext from "../context/user.context";
import Axios from 'axios';
import Error from './error.component';
export default class Register extends Component {


    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.onChangeError=this.onChangeError.bind(this);
      
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
          error:undefined
        }
        
    }
       //This is a react life cycle method, it is called before anything is displayed
    //    componentDidMount() {
    //     const{setUserData}=useContext(UserContext);
    // }
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
            confirmPassword:this.state.confirmPassword
        }
        console.log(user);
        await Axios.post("http://localhost:5000/users/register",user);
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

                            <h5 className="card-title text-center">Register</h5>
                            <form onSubmit={this.onSubmit} className="form-signin">
                                <div className="form-group">
                                    <label for="inputEmail">Username</label>
                                    <input type="text" className="form-control" placeholder="Username"  value={this.state.username} onChange={this.onChangeUsername}/>
                                </div>
                                <div className="form-group">
                                    <label for="inputEmail">Password</label>
                                    <input type="password" className="form-control" placeholder="Password (Min 8 characters)"  value={this.state.password} onChange={this.onChangePassword} />
                                </div>
                                <div className="form-group">
                                    <label for="inputEmail">Confirm Password</label>
                                    <input type="password" className="form-control" placeholder="Re-enter Password"  value={this.state.confirmPassword}  onChange={this.onChangeConfirmPassword}/>
                                </div>
                                <div className="form-group">
                                <button className="btn btn-lg btn-primary btn-block text-uppercase signin-btn" type="submit">Register</button>
                                </div>
                                <Link to="/login" >Login</Link>

                            </form>
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}