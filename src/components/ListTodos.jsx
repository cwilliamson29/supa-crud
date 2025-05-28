import React from 'react'
import ListTodosEditMode from "./ListTodosEditMode.jsx";

function ListTodos({todos, loading, deleteTodo, editTodo}) {

    if (loading) {
        return <div>Loading...</div>
    } else {
        return (
            <div className="flex flex-col items-center justify-center w-full">
                <ul className="border-1 border-gray-600 m-3 bg-gray-800 rounded-md shadow overflow-hidden p-3 w-1/2">
                    {todos.map((todo) => (
                        <ListTodosEditMode key={todo.id} todo={todo} handleDelete={deleteTodo} handleEdit={editTodo}/>
                    ))}
                </ul>
            </div>
        );
    }
}

export default ListTodos
