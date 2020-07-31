import React, { useState, useEffect } from 'react';
import '../App.css';
import Axios from 'axios';
import NavBar from "../Components/navbar.component";
import '../Component.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import TypeWriterEffect from './typewriter.component';

export default function TodoApp() {
    const [taskName, setTaskName] = useState();
    const [error, setError] = useState(undefined);

    const [todo, setTodo] = useState([]);

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

    const onSubmit = async (e) => {

        try {
            e.preventDefault();
            e.target.reset();
            const newTask = {
                taskName,


            }
            const taskRes = await Axios.post("http://localhost:5000/todo/create", newTask, { headers: { "x-auth-token": localStorage.getItem('auth-token') } });
            setTodo([...todo, taskRes.data]);

        } catch (err) {
            err.response.data.Error && setError(err.response.data.Error);

        }
    }
    const deleteTodo = async (id) => {

        const todoRes = await Axios.delete("http://localhost:5000/todo/" + id, { headers: { "x-auth-token": localStorage.getItem('auth-token') } });
        setTodo(todoRes.data);


    }

    const Todo = (props) => ((
        <tbody>
            <tr>

                <td key={props.todo._id}>{props.todo.taskName}</td>
                <td  >{<button type="button" className="delete-btn" onClick={() => { deleteTodo(props.todo._id) }}> Click to Complete!</button>}</td>
            </tr>

        </tbody>
    ));


    return (
        <div className="container-fluid nav">

            <NavBar />
            {error && (alert(error), setError(null))}

            <div className="container">
                <div className="card todo-card">
                    <div className="card-body">
                        <h1 className="card-title text-center">Todo List</h1>
                        <TypeWriterEffect/>
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
                                            <th>Delete</th>
                                        </tr>
                                    </thead>


                                    {todo.map(currentTodo => <Todo todo={currentTodo} key={currentTodo._id} />)}

                                </Table>
                            </div>
                        </form>

                    </div>

                </div>


            </div>
        </div>

    );
}
