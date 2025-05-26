import React, {useState} from 'react'
import {useAuth} from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import {supabase} from "../db/supabase.js";
import AddTodo from "../components/AddTodo.jsx";
import ListTodos from "../components/ListTodos.jsx";

function Dashboard() {

    return (
        <div>
            <AddTodo />
            <ListTodos />
        </div>
    )
}

export default Dashboard
