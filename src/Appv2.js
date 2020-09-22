import React, { useState } from 'react';
import TodoList from './Todolist';
import './assets/style.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: "",
            listTodo: [
                {
                    id: 1,
                    text: 'Tạo git',
                    completed: false,
                    isEdit: false,
                }, {
                    id: 2,
                    text: "Upload source lên git",
                    completed: true,
                    isEdit: false,
                }, {
                    id: 3,
                    text: "Tạo danh sách",
                    completed: false,
                    isEdit: false,
                }
            ]
        }
        this.inputChange = this.inputChange.bind(this);
        this.handlerSubmit = this.handlerSubmit.bind(this);
        this.completeTodo = this.completeTodo.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
        this.editHandler = this.editHandler.bind(this);
        this.editInputHandler = this.editInputHandler.bind(this);
        this.cancelEditHandler = this.cancelEditHandler.bind(this);
    }
    handlerSubmit(e) {
        e.preventDefault();
        const { inputText } = this.state;
        const { listTodo } = this.state;
        if (inputText !== "") {
            listTodo.push({
                id: parseInt(Math.random() * 1000),
                text: inputText,
                completed: false,
                isEdit: false
            });
            this.setState({
                listTodo, inputText: ""
            });
        }
        else {
            alert("Nội dung không được rỗng!");
        }
    }

    completeTodo(id) {
        let { listTodo } = this.state;
        for (let i = 0; i < listTodo.length; i++) {
            const todo = listTodo[i];
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }
        }
        this.setState({ listTodo })
    }

    inputChange(e) {
        this.setState({
            inputText: e.target.value
        });
    }

    deleteHandler(id) {
        let { listTodo } = this.state;
        listTodo = listTodo.filter(item => item.id !== id);
        this.setState({ listTodo });
    }

    editHandler(id, isEdit) {
        let { listTodo } = this.state;
        for (let i = 0; i < listTodo.length; i++) {
            const todo = listTodo[i];
            if (todo.id === id) {
                listTodo[i].isEdit = !isEdit;
                break;
            }
        }
        this.setState({ listTodo });
    }
    editInputHandler(id, value) {
        let { listTodo } = this.state;
        for (let i = 0; i < listTodo.length; i++) {
            const todo = listTodo[i];
            if (todo.id === id) {
                listTodo[i].text = value;
                break;
            }
        }
        this.setState({ listTodo });
    }
    cancelEditHandler(id) {
        
    }

    render() {
        const { inputText, listTodo } = this.state;
        return <React.Fragment>
            <div className="panel">
                <input onChange={this.inputChange} type="text" className="add-todo" placeholder="Hôm nay bạn có task gì?" value={inputText} />
                <button onClick={this.handlerSubmit}>Thêm</button>
                <TodoList
                    listTodo={listTodo}
                    completeTodo={this.completeTodo}
                    deleteHandler={this.deleteHandler}
                    editHandler={this.editHandler}
                    editInputHandler={this.editInputHandler}
                    cancelEditHandler={this.cancelEditHandler}
                />
            </div>
        </React.Fragment>;
    }
}

export default App;