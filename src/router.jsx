import {createBrowserRouter} from "react-router-dom";
import App from "./App.jsx";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import NotFound from "./pages/NotFound.jsx";

export const router = createBrowserRouter([
    {path: '/', element: <App />},
    {path: '/signup', element: <SignUp/>},
    {path: '/signin', element: <SignIn/>},
    {path: '/dashboard', element: <Dashboard/>},
    {path: '*', element: <NotFound/>},
])