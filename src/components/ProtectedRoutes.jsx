import React from 'react'
import {useAuth} from "../context/AuthContext.jsx";
import {Navigate, Outlet} from "react-router-dom";

function ProtectedRoutes() {
    const {session, loading} = useAuth()

    if (loading) return <div>Loading...</div>;
    if (!session) return <Navigate to="/signin" replace/>;

    return <Outlet />

}

export default ProtectedRoutes
