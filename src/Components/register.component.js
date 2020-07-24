import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';



export default class Register extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-sm-12 d-flex">
                        <div className="card signin-card">
                            <div className="card-body">
                                <h5 class="card-title text-center">Register</h5>
                                <form className="form-signin">
                                    <div className="form-group">
                                        <label for="inputEmail">Username</label>
                                        <input type="text" class="form-control" placeholder="Username" required className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label for="inputEmail">Password</label>
                                        <input type="password" class="form-control" placeholder="Password (Min 8 characters)" required className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label for="inputEmail">Confirm Password</label>
                                        <input type="password" class="form-control" placeholder="Re-enter Password" required className="form-control" />
                                    </div>
                                    <button class="btn btn-lg btn-primary btn-block text-uppercase signin-btn" type="submit">Register</button>
                                    <Link to="/login" >Login</Link>

                                 </form>
                            </div>
                        </div>
                    </div>
                </div>
            

        );
    }
}