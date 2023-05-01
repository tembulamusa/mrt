import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getFromLocalStorage } from './local-storage';
import 'react-toastify/dist/ReactToastify.css';

const ProtectedRoute = ({children}) => {
    const location = useLocation();
    const user = getFromLocalStorage("user");
    return user?.token ? children : <Navigate  replace to="/login" state={{from:location}}/>;
}

export default ProtectedRoute;
