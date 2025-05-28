import React, {useState} from 'react'
import {Link} from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx";

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const {signUpNewUser} = useAuth()
    const [msg, setMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const result = await signUpNewUser(email, password);
            if (result.success) {
                //navigate("/dashboard");
                setMsg("Confirmation email successfully sent.");
            }
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false);
        }
    }
    return (
        <div>
            <form className="max-w-md m-auto pt-4" onSubmit={(e) => handleSubmit(e)}>
                <h2 className="text-xl font-bold">Sign up</h2>
                <p>Already have an account? <Link to="/signin">Sign in</Link></p>
                {msg !== "" && <p className="text-yellow-500 ml-5">{msg}</p>}
                {msg !== "" && <p className="text-yellow-500 ml-5">Please confirm email before <Link to="/signin">signing in.</Link></p>}
                <div className="flex flex-col p-4">
                    <input className="p-3 mt-3 border-1 " type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input className="p-3 mt-3 border-1 " type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button className="bg-blue-800 p-3 mt-3 border-1 hover:border-blue-500 w-3/4 m-auto font-bold rounded-md border-blue-600 cursor-pointer" disabled={loading}
                            type="submit">Sign up
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SignUp
