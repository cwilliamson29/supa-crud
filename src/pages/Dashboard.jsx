import React from 'react'
import AddTodo from "../components/AddTodo.jsx";
import ListTodos from "../components/ListTodos.jsx";
import {useTodos} from "../hooks/useTodos.js";

function Dashboard() {
    const {todos, loading, deleteTodo, editTodo, addTodo} = useTodos();
    return (
        <div>
            <AddTodo addTodo={addTodo}/>
            <ListTodos todos={todos} loading={loading} deleteTodo={deleteTodo} editTodo={editTodo}/>
        </div>
    )
}

export default Dashboard
