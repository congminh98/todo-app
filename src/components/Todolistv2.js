import React from 'react';

class TodoList extends React.Component {
    render() {
        const { listTodo } = this.props;
        const { completeTodo } = this.props;
        const { deleteHandler } = this.props;
        const { editHandler } = this.props;
        const { editInputHandler } = this.props;
        const { cancelEditHandler } = this.props;
        return <React.Fragment>
            <div className="list-todo">
                <ul>
                    {listTodo.map(todo => (
                        <li key={todo.id}>
                            <div className="content">
                                <input type="checkbox" checked={todo.completed} readOnly onClick={() => completeTodo(todo.id)} />
                                {todo.isEdit
                                    ? <input type="text" value={todo.text} onChange={(e) => editInputHandler(todo.id, e.target.value)} />
                                    : <label style={{ textDecoration: todo.completed ? 'line-through' : '' }}>{todo.text}</label>
                                }
                            </div>
                            <div className="action-list">
                                <button onClick={() => editHandler(todo.id, todo.isEdit)}>{todo.isEdit ? 'Lưu' : 'Sửa'}</button>
                                <button onClick={() => deleteHandler(todo.id)}>Xóa</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </React.Fragment>;
    }
}

export default TodoList;