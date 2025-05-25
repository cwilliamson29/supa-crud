import React from 'react'
import {UserAuth} from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

function Dashboard() {
    const {session, signOutUser} = UserAuth()
    const navigate = useNavigate();

    const handleSignOut = async (e) => {
        e.preventDefault();
        try{
            await signOutUser();
            navigate("/signin");
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div>
            <div className="content">Dashboard</div>
            <div className="content">Hello, {session?.user?.email}</div>
        <button onClick={(e)=>handleSignOut(e)}>Sign out</button>
        </div>
    )
}

export default Dashboard
