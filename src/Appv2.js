import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Formv2';
import TodoList from './components/TodoListv2';


function App() {
    //state stuff
    const [inputText, setInputText] = useState('');
    const [todos, setTodos] = useState([
        {
            id: 1,
            text: "Tạo git",
            uncompleted: true,
            status: false,
        }, {
            id: 2,
            text: "Upload source lên git",
            uncompleted: true,
            status: false,
        }, {
            id: 3,
            text: "Tạo danh sách",
            uncompleted: false,
            status: false,
        }
    ]);
    const [status, setStatus] = useState('all');
    const [filteredTodos, setFilteredTodos] = useState([]);
    //Functions
    const filteredHandler = () => {
        switch (status) {
            case 'completed':
                setFilteredTodos(todos.filter(todo => todo.completed === true))
                break;
            case 'uncompleted':
                setFilteredTodos(todos.filter(todo => todo.completed === false))
                break;
            default:
                setFilteredTodos(todos);
                break;
        }
    };

    //use effedt
    useEffect(() => {
        getLocalTodos();
    }, []);

    useEffect(() => {
        filteredHandler();
    }, [todos, status]);
    //save local
    // eslint-disable-next-line no-unused-vars
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const saveLocalTodos = (e) => {
        localStorage.setItem("todos", JSON.stringify(todos));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getLocalTodos = () => {
        if (localStorage.getItem("todos") === null) {
            localStorage.setItem("todos", JSON.stringify([]));
        }
        else {
            let todoLocal = JSON.parse(localStorage.getItem("todos"));
            setTodos(todoLocal);
        }
    };
    useEffect(() => {
        saveLocalTodos();
    }, [saveLocalTodos]);
    
    //
    return (
        <div className="App">
            <header>
                <h1>Todo List</h1>
            </header>
            <Form
                inputText={inputText}
                todos={todos}
                setTodos={setTodos}
                setInputText={setInputText}
                setStatus={setStatus}
                filteredTodos={filteredTodos}
            />
            <TodoList
                setTodos={setTodos}
                todos={todos}
                filteredTodos={filteredTodos}
            />
        </div>
    )
}
export default App;
// eslint-disable-next-line