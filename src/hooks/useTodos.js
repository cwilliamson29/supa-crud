import {useEffect, useState} from "react";
import {supabase} from "../db/supabase";
import {useAuth} from "../context/AuthContext";
import {sortTodosHelper} from "../helpers/useTodosHelper.js";

export function useTodos() {
    const {session} = useAuth();
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const user_id = session?.user?.id;

    useEffect(() => {
        if (!user_id) return;

        const fetchTodos = async () => {
            setLoading(true);
            const {data, error} = await supabase
                .from("todos")
                .select("id, todo_text, isCompleted")
                .eq("user_id", user_id)
                .order("isCompleted", {ascending: true})
                .order("id", {ascending: true})


            if (!error) {
                setTodos(data);
            } else {
                console.log(error);
            }
            setLoading(false);
        };

        fetchTodos();
    }, [user_id]);

    const addTodo = async (todo_text) => {
        const {data, error} = await supabase
            .from("todos")
            .insert({todo_text, user_id})
            .select();

        if (!error && data) {
            let newTodos = sortTodosHelper([...todos, ...data])
            setTodos(newTodos);
            console.log(newTodos)
        } else {
            console.log(error)
        }
        return {data, error};
    };

    const deleteTodo = async (id) => {
        const {error} = await supabase.from("todos").delete().eq("id", id);
        if (!error) {
            setTodos((prev) => prev.filter((todo) => todo.id !== id))
        } else {
            console.log(error)
        }
    };

    const editTodo = async (newTodo) => {
        const {error} = await supabase.from("todos").update({todo_text: newTodo.todo_text, isCompleted: newTodo.isCompleted}).eq("id", newTodo.id);
        if (!error) {
            let newTodos = sortTodosHelper(todos.map(item => (item.id === newTodo.id ? {...item, todo_text: newTodo.todo_text, isCompleted: newTodo.isCompleted} : item)))
            setTodos(newTodos)
        } else {
            console.log(error)
        }
    };

    return {todos, loading, addTodo, deleteTodo, editTodo};
}
