import {createContext, useContext, useEffect, useState} from "react";
import {supabase} from "../db/supabase.js";

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [session, setSession] = useState(null)
    const [loading, setLoading] = useState(true)

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
        let mounted = true;

        const initSession = async () => {
            const { data } = await supabase.auth.getSession();
            if (mounted) {
                setSession(data?.session ?? null);
            }
        };

        const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
            if (mounted) {
                setSession(newSession);
                setLoading(false);
            }
        });

        initSession().then(() => {
            setTimeout(() => {
                if (mounted) setLoading(false);
            }, 300);
        });

        return () => {
            mounted = false;
            listener.subscription.unsubscribe();
        };
    }, []);




    return (
        <AuthContext.Provider value={{session, loading, signUpNewUser, signOutUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
