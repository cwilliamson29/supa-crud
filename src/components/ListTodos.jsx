import React, {useEffect, useState} from 'react'
import {useAuth} from "../context/AuthContext.jsx";
import {supabase} from "../db/supabase.js";
import ListTodosEditMode from "./ListTodosEditMode.jsx";

function ListTodos() {
    const { session } = useAuth();
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchTodos = async () => {
            if (!session?.user?.id) return;
            const { data, error } = await supabase
                .from("todos")
                .select("id, todo_text")
                .eq("user_id", session.user.id);
            if (!error) setTodos(data);
            //console.log(data)
        };

        fetchTodos();
    }, [session]);

    useEffect(() => {
        if (!session?.user?.id) return;

        const channel = supabase
            .channel("todos-changes")
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "todos",
                    filter: `user_id=eq.${session.user.id}`,
                },
                (payload) => {
                    setTodos((prev) => [...prev, payload.new]);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [session]);

    const handleDelete = async (id) => {
        const { error } = await supabase.from("todos").delete().eq("id", id);
        if (!error) {
            setTodos((prev) => prev.filter((todo) => todo.id !== id));
        }
    };
    const handleEdit = async (id, newText) => {
        console.log(id, newText)
        const { error } = await supabase.from("todos").update({ todo_text: newText }).eq("id", id);
        if (!error) {
            setTodos((prev) =>
                prev.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
            );
            console.log(error)
        }
    };
    return (
        <div className="flex flex-col items-center justify-center w-full">
            <ul className="border-1 border-gray-600 m-3 bg-gray-800 rounded-md shadow overflow-hidden p-3 w-1/2">
                {todos.map((todo) => (
                        <ListTodosEditMode key={todo.id} todo={todo} handleDelete={handleDelete} handleEdit={handleEdit} />
                ))}
            </ul>
        </div>
    );
}

export default ListTodos
