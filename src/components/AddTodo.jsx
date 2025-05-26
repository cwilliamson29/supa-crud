import React, {useState} from 'react'
import {supabase} from "../db/supabase.js";
import {useAuth} from "../context/AuthContext.jsx";

function AddTodo() {
    const {session} = useAuth();
    const [todo, setTodo] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const user_id = session?.user?.id;
        const { error } = await supabase.from("todos").insert({ todo_text: todo, user_id });

        if (error) {
            setMessage("Failed to add todo: " + error);
            console.log(error)
        } else {
            setMessage("Todo added successfully!");
            setTodo("");
        }
        setLoading(false);
    }
    return (
        <div className="flex flex-col items-center justify-center w-full">
            <h1 className="text-3xl font-bold">Add todo's</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Add your note here..." className="border-1 m-3" autoFocus={true} onChange={(e)=>setTodo(e.target.value)}/>
                <button type="submit" disabled={loading}>
                    {loading ? "Adding..." : "Add Todo"}
                </button>
                {message && <p>{message}</p>}
            </form>
        </div>
    )
}

export default AddTodo
