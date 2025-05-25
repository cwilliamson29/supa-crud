import React from 'react'
import {UserAuth} from "../context/AuthContext.jsx";
import {Navigate, Outlet} from "react-router-dom";

function ProtectedRoutes() {
    const {session} = UserAuth()

    console.log(session);

    if(!session){
        return <Navigate to="/signin"/>
    }
    return <Outlet />
}

export default ProtectedRoutes
