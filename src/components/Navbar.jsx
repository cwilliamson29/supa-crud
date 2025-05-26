import React from 'react'
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx";

function Navbar() {
    const {session, signOutUser} = useAuth()
    const navigate = useNavigate();
    const links = [
        {to: "/", name: "Home"},
        {to: "/signin", name: "Sign In"},
        {to: "/signup", name: "Sign Up"},
    ];
    const protectedLinks = [
        {to: "/", name: "Home"},
        {to: "/dashboard", name: "Dashboard"},
    ]
    const linkCSS = "p-4 font-bold text-white border-b-1 ml-1 hover:bg-gray-600 hover:border-blue-400 cursor-pointer"

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
        <div className="flex justify-between bg-gray-900 pb-2 pl-4 pr-4">
            <div className="flex">
                {links.map((link, index) => (
                    !session &&
                    <Link key={index} to={link.to}>
                        <div className={linkCSS}>
                            {link.name}
                        </div>
                    </Link>
                ))}
                {protectedLinks.map((link, index) => (
                    session &&
                    <Link key={index} to={link.to}>
                        <div className={linkCSS}>
                            {link.name}
                        </div>
                    </Link>
                ))}
            </div>
            <div>
                {session &&
                    <div className={linkCSS} onClick={(e)=>handleSignOut(e)}>Sign Out</div>
                }
            </div>
        </div>
    )
}

export default Navbar
