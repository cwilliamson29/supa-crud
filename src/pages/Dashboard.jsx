import React, {useState} from 'react'
import {useAuth} from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import {supabase} from "../db/supabase.js";

function Dashboard() {
    const {session, signOutUser} = useAuth()
    const navigate = useNavigate();
    const [todo, setTodo] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSignOut = async (e) => {
        e.preventDefault();
        try{
            await signOutUser();
            navigate("/signin");
        }catch(err){
            console.log(err)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const user_id = session?.user?.id;
        const { error } = await supabase.from("todos").insert({ name: todo, user_id });

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
        <div>
            <div className="content">Dashboard</div>
            <div className="content">Hello, {session?.user?.email}</div>
        <button onClick={(e)=>handleSignOut(e)}>Sign out</button>
            <div>
                <div>Add todo's</div>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Add your note here..." className="border-1 m-3" autoFocus={true} onChange={(e)=>setTodo(e.target.value)}/>
                    <button type="submit" disabled={loading}>
                        {loading ? "Adding..." : "Add Todo"}
                    </button>
                    {message && <p>{message}</p>}
                </form>
            </div>
        </div>
    )
}

export default Dashboard
