import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';



export default class Login extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-sm-12 d-flex">
                        <div className="card signin-card">
                            <div className="card-body">
                                <h5 class="card-title text-center">Sign In</h5>
                                <form className="form-signin">
                                    <div className="form-group">
                                        <label for="inputEmail">Username</label>
                                        <input type="text" class="form-control" placeholder="Username" required className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label for="inputEmail">Password</label>
                                        <input type="password" class="form-control" placeholder="Password" required className="form-control" />
                                    </div>
                                    <button class="btn btn-lg btn-primary btn-block text-uppercase signin-btn" type="submit">Sign in</button>
                                    <Link to="/register" >Register</Link>

                                   

                                 </form>
                            </div>
                        </div>
                    </div>
                </div>
            

        );
    }
}