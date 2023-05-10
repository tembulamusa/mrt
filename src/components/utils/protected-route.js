import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { getFromLocalStorage } from './local-storage';
import 'react-toastify/dist/ReactToastify.css';

const ProtectedRoute = ({}) => {
    const location = useLocation();
    const user = getFromLocalStorage("user");
    return user?.token ? <Outlet /> : <Navigate  replace to="/login" state={{from:location}} />
}

export default ProtectedRoute;
