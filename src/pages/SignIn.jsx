import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {UserAuth} from "../context/AuthContext.jsx";

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {session, signinUser} = UserAuth()

    const handleSubmit = async (e)=>{
        e.preventDefault();

        setLoading(true);

        try{
            const result = await signinUser(email, password);
            if(result.success){
                navigate("/dashboard");
            }
        }catch(err){
            console.log(err)
        } finally {
            setLoading(false);
            console.log(session);
        }
    }
    return (
        <div>
            <form className="max-w-md m-auto pt-4" onSubmit={(e)=>handleSubmit(e)}>
                <h2>Sign up</h2>
                <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                <div className="flex flex-col p-4">
                    <input className="p-3 mt-3 border-1 " type="email" placeholder="Email Address" value={email} onChange={(e)=> setEmail(e.target.value)} />
                    <input className="p-3 mt-3 border-1 " type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)} />
                    <button className="p-3 mt-3 border-1 " disabled={loading} type="submit">Sign up</button>
                </div>
            </form>
        </div>
    )
}

export default SignIn
