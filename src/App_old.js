import React from 'react';

const initialList = [
    {
        id: 1,
        name: 'Robin',
    },
    {
        id: 2,
        name: 'Dennis',
    },
];

const listReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            return {
                ...state,
                list: state.list.concat({ name: action.name, id: action.id }),
            };
        default:
            throw new Error();
    }
};

const App = () => {
    const [listData, dispatchListData] = React.useReducer(listReducer, {
        list: initialList,
        isShowList: true,
    });
    const [name, setName] = React.useState('');
    function handleChange(event) {
        setName(event.target.value);
    }

    function handleAdd() {
        dispatchListData({ type: 'ADD_ITEM', name });
        setName('');
    }

    return (
        <div className="container">
            <div className="main-content">
                <span>Awesome Todo List</span>
                <AddItem
                    name={name}
                    onChange={handleChange}
                    onAdd={handleAdd}
                />

                <List list={listData.list} />
            </div>
        </div>
    );
};

const AddItem = ({ name, onChange, onAdd }) => (
    <div className="add-item">
        <input type="text" value={name} onChange={onChange} placeholder="What do you need to do today?" />
        <button type="submit" onClick={onAdd}>Add</button>
    </div>
);

const List = ({ list }) => (
    <div className="list-result">
        {list.map((item) => (
            <div key={item.id}>
                <label>
                    {item.name}
                    <input type="checkbox" />
                    <span></span>
                </label>
                <em>
                    <span>Edit</span>
                    <span>Delete</span>
                </em>
            </div>
        ))}
    </div>
);


export default App;
