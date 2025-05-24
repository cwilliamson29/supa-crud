import {createContext, useContext, useEffect, useState} from "react";
import {supabase} from "../db/supabase.js";

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [session, setSession] = useState(null)

    // SIGN IN
    const signinUser = async (email, password) => {
        try{
            const {data, error} = await supabase.auth.signInWithPassword({email, password})
            if(error){
                console.error(error)
                return {success: false, error: error}
            }
            return {success: true, data}
        }catch(err){
            console.error(err)
        }
    }
    // SIGN UP
    const signUpNewUser = async (email, password) => {
        const {data, error} = await supabase.auth.signUp({
            email: email,
            password: password,
        })
        if (error) {
            console.error(error)
            return {success: false, error: error}
        }
        return {success: true, data}
    }
    // SIGN OUT
    const signOutUser = async () => {
        const {error}=supabase.auth.signOut();
        if (error) {
            console.error(error)
        }
    }
    // SESSION CHANGE
    useEffect(() => {
        supabase.auth.getSession().then(({data: {session}}) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        })
    }, [])


    return (
        <AuthContext.Provider value={{session,signUpNewUser, signOutUser, signinUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}