import React, {useEffect, useState} from 'react'
import {useAuth} from "../context/AuthContext.jsx";
import {supabase} from "../db/supabase.js";
import ListTodosEditMode from "./ListTodosEditMode.jsx";

function ListTodos() {
    const {session} = useAuth();
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTodos = async () => {
            if (!session?.user?.id) return;
            const {data, error} = await supabase
                .from("todos")
                .select("id, todo_text, isCompleted")
                .eq("user_id", session.user.id)
                .order("isCompleted", {ascending: true})
                .order("id", {ascending: true})
            // .order("isCompleted", {ascending: true});
            if (!error) {
                console.log(data)
                setTodos(data);
            }
        };

        fetchTodos();
    }, [session, loading]);
    //
    // useEffect(() => {
    //     if (!session?.user?.id) return;
    //
    //     const channel = supabase
    //         .channel("todos-changes")
    //         .on(
    //             "postgres_changes",
    //             {
    //                 event: "INSERT",
    //                 schema: "public",
    //                 table: "todos",
    //                 filter: `user_id=eq.${session.user.id}`,
    //             },
    //             (payload) => {
    //                 setTodos((prev) => [...prev, payload.new]);
    //             }
    //         )
    //         .subscribe();
    //
    //     return () => {
    //         supabase.removeChannel(channel);
    //     };
    // }, [session]);

    // useEffect(() => {
    //     setLoading(true);
    //     todos.sort((a, b) => {
    //         if (a.isCompleted === b.isCompleted) {
    //             return a.id - b.id;
    //         } else {
    //             return a.isCompleted - b.isCompleted;
    //         }
    //     })
    //     console.log(todos)
    //     setLoading(false);
    // }, [todos])

    const handleDelete = async (id) => {
        const {error} = await supabase.from("todos").delete().eq("id", id);
        if (!error) {
            setTodos((prev) => prev.filter((todo) => todo.id !== id));
        }
    };
    const handleEdit = async (newTodo) => {
        console.log(newTodo)
        setLoading(true);
        const {error} = await supabase.from("todos").update({todo_text: newTodo.todo_text, isCompleted: newTodo.isCompleted}).eq("id", newTodo.id);
        if (!error) {
            setTodos((prev) =>
                prev.map((todo) => (todo.id === newTodo.id ? {...todo, todo_text: newTodo.todo_text} : todo))
            );
            console.log(error)
        }
        setTodos(todos.map(item => (item.id === newTodo.id ? {...item, todo_text: newTodo.todo_text, isCompleted: newTodo.isCompleted} : item)))
        setLoading(false);
    };

    if (loading) {
        return <div>Loading...</div>
    } else {
        return (
            <div className="flex flex-col items-center justify-center w-full">
                <ul className="border-1 border-gray-600 m-3 bg-gray-800 rounded-md shadow overflow-hidden p-3 w-1/2">
                    {todos.map((todo) => (
                        <ListTodosEditMode key={todo.id} todo={todo} handleDelete={handleDelete} handleEdit={handleEdit}/>
                    ))}
                </ul>
            </div>
        );
    }
}

export default ListTodos
