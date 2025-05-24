import React, {useState} from 'react'
import {Link} from "react-router-dom";

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit =()=>{
        console.log(password);
    }
    return (
        <div>
            <form className="max-w-md m-auto pt-4" onSubmit={handleSubmit}>
                <h2>Sign up</h2>
                <p>Already have an account? <Link to="/signin">Sign in</Link></p>
                <div className="flex flex-col p-4">
                    <input className="p-3 mt-3 border-1 " type="email" placeholder="Email Address" value={email} onChange={(e)=> setEmail(e.target.value)} />
                    <input className="p-3 mt-3 border-1 " type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)} />
                    <button className="p-3 mt-3 border-1 " disabled={loading} type="submit">Sign up</button>
                </div>
            </form>
        </div>
    )
}

export default SignUp
