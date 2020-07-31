import React, { Component, useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import UserContext from "../context/user.context";
import Axios from 'axios';
import Error from './error.component';
import NavBar from "../Components/navbar.component";
import '../Component.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export default function TodoApp() {
    const [taskName, setTaskName] = useState();

    const [todo, setTodo] = useState([]);
    const { userData } = useContext(UserContext);

    //When the app runs, this function runs once because there is no dependancy in []
    useEffect(() => {

        if (!localStorage.getItem('auth-token')) {
            window.location = '/login';
        }
        const readTasks = async () => {



            const tasks = await Axios.get("http://localhost:5000/todo/tasks", { headers: { "x-auth-token": localStorage.getItem('auth-token') } });
            setTodo(tasks.data);
        }
        readTasks();
    }, []);
    /*eslint no-unused-expressions: [2, { allowShortCircuit: true }]*/

    // const todoList = () => todo.map(
    //     todo => <Todo todo={todo}/>
    // )

    const onSubmit = async (e) => {

        try {
            e.preventDefault();
            const newTask ={
                taskName,
             
                
            }
            const taskRes = await Axios.post("http://localhost:5000/todo/create", newTask, { headers: { "x-auth-token": localStorage.getItem('auth-token') } });
            console.log(taskRes.data);
            window.location = '/app';
        } catch (err) {
            //this.setState({error: err.response.data.Error});
        }
    }
    const deleteTodo=async(id)=>{
        const taskRes = await Axios.delete("http://localhost:5000/todo/"+id,{ headers: { "x-auth-token": localStorage.getItem('auth-token') } });
        window.location = '/app';
    }

   const Todo = (props) => ((
        <tbody>
            <tr>
    
                {/* {console.log(props.todo)} */}
                <td key={props.todo.key}>{props.todo.taskName}</td>
                <td>{<button >Edit Todo</button>}</td>
                <td>{<button onClick={()=>{deleteTodo(props.todo._id)}}> Delete Todo</button>}</td>
            </tr>
    
        </tbody>
    ));
    return (
        <div className="container-fluid nav">
            <NavBar />
            <div className="container">
                <div className="card todo-card">
                    <div className="card-body">
                        <h5 className="card-title text-center">Todo List</h5>
                        <form onSubmit={onSubmit} className="form-add-task">
                            <div className="row">
                                <div className="col-sm-8 d-flex">
                                    <div className="form-group">
                                        <input type="text" className="task-search form-control" placeholder="Task" onChange={(e) => setTaskName(e.target.value)} />
                                    </div>

                                </div>
                                <div className="col-sm-4 d-flex">
                                    <Button className="text-uppercase task-btn" variant="dark" type="submit">Add</Button>


                                </div>
                            </div>
                            <div className="container-fluid">
                                <Table className="task-table" striped bordered hover variant="dark">
                                    <thead>
                                        <tr>
                                            <th>Task Name</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>

                                    {/* {console.log(JSON.parse(JSON.stringify(todo[0])))} */}
                                    {/* {setTodo(JSON.parse(todo.data))} */}
                                    {todo.map(currentTodo => <Todo todo={currentTodo} key={currentTodo._id} />)}
                                    {/* {todo.map(currentTodo => JSON.stringify(currentTodo)).forEach(currentTodo=>{
                               return <Todo todo={currentTodo} key={currentTodo._id}/>                            })} */}


                                    {/* {this.todoList()} */}
                                    {/* {todo.map(currentTodo => {
                               return <Todo todo={currentTodo} key={currentTodo._id}/>
                            })} */}
                                    {/* { todo.map(currentTodo => {
            return <Todo todo={currentTodo.taskName}/>
        })} */}
                                </Table>
                            </div>
                        </form>

                    </div>

                </div>


            </div>
        </div>

    );
}