import { Navigate, Outlet } from "react-router-dom";
import { Is_authenticated } from "../Constants";
const GuestRoute = () => {
    const isAuth = Is_authenticated;
    if (isAuth) return <Navigate to='/' />
    return <Outlet />
}

export default GuestRoute
