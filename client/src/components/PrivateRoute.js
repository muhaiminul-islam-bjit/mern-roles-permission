import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"
import Dashboard from "./ui/template/dashboard";

export default function PrivateRoute({children}) {
    const isLoggedIn = useAuth();
    return isLoggedIn ? <Dashboard>{children}</Dashboard>  : <Navigate to="/login" />
}