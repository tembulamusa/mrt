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
import Help from './components/pages/Help';
import Footer from './components/footer/footer';
import Sidebar from './components/sidebar/sidebar';
import {getFromLocalStorage, setLocalStorage} from "./components/utils/local-storage";
import TeamDetail from "./components/pages/team-detail";

// import Services from "./components/pages/services";
// import ServiceDetail from "./components/pages/services/service-detail";
// import SuppliersIndex from "./components/pages/suppliers";
// import SupplierDetails from "./components/pages/suppliers/supplier-details";
// import QuotationsIndex from "./components/pages/quotations";
// import AdminIndex from "./components/pages/admins";
// import AdminDetails from "./components/pages/admins/admin-details";
// import MemoIndex from "./components/pages/memos";
// import MemoDetail from "./components/pages/memos/memo-detail";

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
    const isAuthenticated = getFromLocalStorage("user");
    return ( 
                <div className="flex flex-row min-h-screen bg-white">

                <div className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in min-h-screen">
                    <div className="relative">
                        <Routes>
                        <Route exact path="/" element={<Index/>}/>
                        <Route exact path="/login" element={<Login/>}/>
                        <Route exact path="/reset-password" element={<ResetPassword/>}/>
                        <Route exact path="/logout" element={<Logout/>}/>
                        {/* <Route exact path="/print-report" element={<PrintReport/>}/> */}
                        <Route exact path="/help" element={<Help/>}/>

                        {/* mockup to delete */}
                        
                        <Route exact path="/" element={<Index user={state?.user}/>} />
                        <Route exact path="/team-details/:team" element={<TeamDetail user={state?.user}/>} />

                        {/* end delete */}

                        <Route element={<ProtectedRoute /> }>
                            <Route exact path="/" element={<Index  user={state?.user}/>}/>
                            <Route exact path="/home" element={<Index user={state?.user}/>}/>
                            <Route exact path="/team-details/:team" element={<TeamDetail user={state?.user}/>} />
                        </Route>
                        
                        <Route path="*" element={<Index/>}/>
                        </Routes>
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
