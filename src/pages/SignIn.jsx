import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {supabase} from "../db/supabase.js";

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) alert(error.message);
        else navigate("/dashboard");
    }
    return (
        <div>
            <form className="max-w-md m-auto pt-4" onSubmit={(e)=>handleSubmit(e)}>
                <h2>Sign up</h2>
                <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                <div className="flex flex-col p-4">
                    <input className="p-3 mt-3 border-1 " type="email" placeholder="Email Address" value={email} onChange={(e)=> setEmail(e.target.value)} />
                    <input className="p-3 mt-3 border-1 " type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)} />
                    <button className="p-3 mt-3 border-1 " type="submit">Sign up</button>
                </div>
            </form>
        </div>
    )
}

export default SignIn
