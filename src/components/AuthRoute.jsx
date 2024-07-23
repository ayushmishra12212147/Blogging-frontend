import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks";

const AuthRoute = () => {
    const isAuth = useAuth();
    if (!isAuth) return <Navigate to='/' />
    return <Outlet/>
}

export default AuthRoute
