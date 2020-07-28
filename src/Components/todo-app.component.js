import React, { Component, useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import UserContext from "../context/user.context";
import Axios from 'axios';
import Error from './error.component';
import NavBar from "../Components/navbar.component";
import '../Component.css';
import Table from 'react-bootstrap/Table';


const Todo = (props) => ((

    <tbody>
        <tr>
            <td>{props.todo.taskName}</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
        </tr>

    </tbody>
));
export default function TodoApp() {
    const [todo, setTodo] = useState();
    const { userData } = useContext(UserContext);

    //When the app runs, this function runs once because there is no dependancy in []
    useEffect(() => {
       
        if (!localStorage.getItem('auth-token')) {
            window.location = '/login';
        }
         Axios
            .get(
                "http://localhost:5000/todo/tasks"
            )
            .then(( todo ) => {
                setTodo(todo);

            });
    });
    /*eslint no-unused-expressions: [2, { allowShortCircuit: true }]*/

    // const todoList = () => {
    //     return todo.map(currentTodo => {
    //         <Todo todo={currentTodo} key={currentTodo._id} />;
    //     })
    // }



    return (
        <div className="container-fluid nav">
            <NavBar />
            <div className="container">
                <div className="card todo-card">
                    <div className="card-body">
                        <h5 className="card-title text-center">Todo List</h5>


                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Task Name</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            {console.log(todo)}
                        </Table>

                    </div>
                </div>
            </div>
        </div>

    );
}
