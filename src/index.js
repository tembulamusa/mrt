import React, {useEffect, useCallback, useContext, useState} from "react";
import {render} from "react-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

import {
    BrowserRouter,
    Route,
    Routes,
    useNavigate,
} from 'react-router-dom'

import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import Store from './context/store';
import {Context} from './context/store';

import Index  from './components/index';
import Login from './components/pages/login';
import ResetPassword from './components/pages/auth/reset-password';
import ProtectedRoute from './components/utils/protected-route';
import PrintReport from './components/pages/downloads';
import Help from './components/pages/Help';
import AnyList from './components/pages/any-list';
import Users from './components/pages/users';
import Bookings from './components/pages/bookings';
import Dashboard from './components/pages/dashboard';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Sidebar from './components/sidebar/sidebar';
import Services from "./components/pages/services";
import ServiceDetail from "./components/pages/services/service-detail";
import SuppliersIndex from "./components/pages/suppliers";
import SupplierDetails from "./components/pages/suppliers/supplier-details";
import QuotationsIndex from "./components/pages/quotations";
import AdminIndex from "./components/pages/admins";
import AdminDetails from "./components/pages/admins/admin-details";

const Logout = () => {
    let navigate = useNavigate();

    const [state, dispatch] = useContext(Context);
    const out = useCallback(() => {
        localStorage.clear();
        dispatch({type: "DEL", key: "user"});
        navigate("/");
    }, [navigate]);

    useEffect(() => {
        out();
    }, [out]);
    return null;
}

const App = () => {

    const [state, ] = useContext(Context);
    return ( 
                <div className="flex flex-row min-h-screen bg-gray-100">
                {/* if logged in, show sidebar */}
                    <Sidebar />

                <div className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in min-h-screen">
                <Header/>
                  <div className="p-2 px-3">
                    <div className="bg-white p-2 px-3 shadow-sm border-b border-white min-h-80%">
                        <Routes>
                        <Route exact path="/" element={<Login/>}/>
                        <Route exact path="/login" element={<Login/>}/>
                        <Route exact path="/reset-password" element={<ResetPassword/>}/>
                        <Route exact path="/logout" element={<Logout/>}/>
                        <Route exact path="/print-report" element={<PrintReport/>}/>
                        <Route exact path="/help" element={<Help/>}/>

                        {/* mockup to delete */}
                        <Route exact path="/dashboard" element={<Dashboard  user={state?.user}/>}/>
                        <Route exact path="/dashboard" element={<Dashboard  user={state?.user}/>}/>
                        <Route exact path="/services" element={<Services  user={state?.user}/>}/>
                        <Route exact path="/service-details/:id" element={<ServiceDetail  user={state?.user}/>}/>
                        <Route exact path="/suppliers" element={<SuppliersIndex  user={state?.user}/>}/>
                        <Route exact path="/supplier-details/:id" element={<SupplierDetails  user={state?.user}/>}/>
                        <Route exact path="/quotations" element={<QuotationsIndex user={state?.user}/>}/>
                        <Route exact path="/admins" element={<AdminIndex user={state?.user}/>}/>
                        <Route exact path="/admin-details/:id" element={<AdminDetails  user={state?.user}/>}/>

                        {/* end delete */}

                        <Route element={<ProtectedRoute /> }>
                            <Route exact path="/bookings" element={<Bookings user={state?.user}/>}/>
                            <Route exact path="/users" element={<Users user={state?.user}/>}/>
                            <Route exact path="/services" element={<Services  user={state?.user}/>}/>
                            <Route exact path="/service-details/:id" element={<ServiceDetail  user={state?.user}/>}/>
                            <Route exact path="/suppliers" element={<SuppliersIndex  user={state?.user}/>}/>
                            <Route exact path="/supplier-details/:id" element={<SupplierDetails  user={state?.user}/>}/>
                            <Route exact path="/quotations" element={<QuotationsIndex  user={state?.user}/>}/>
                            <Route exact path="/admins" element={<AdminIndex user={state?.user}/>}/>
                            <Route exact path="/admin-details/:id" element={<AdminDetails  user={state?.user}/>}/>
                        </Route>
                        
                        <Route path="*" element={<Dashboard/>}/>
                        </Routes>
                        </div>
                    </div>
                <Footer/>
                </div>
              </div>
    )
}

const container = document.getElementById("app");

render((
    <Store>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Store>
), container);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
