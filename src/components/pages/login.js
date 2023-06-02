import React, {useState, useEffect} from 'react';
import {Formik, Form} from 'formik';
import makeRequest from "../utils/fetch-request";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useLocation } from 'react-router-dom';

import BodyLogin from '../header/mobile-login';


const Login = (props) => {
    const location = useLocation()
    const [preMsg, setpreMsg] = useState();
    const [mobileNo, setmobileNo] = useState();

    useEffect(()=>{
        if(location?.state){
            let { preLoginMessage,  mobileNumber} = location.state
            setpreMsg(preLoginMessage);
            setmobileNo(mobileNumber);
        }

    }, [])

    // const {state} = useLocation();
    // const {regMessage} = state;
    const [message, setMessage] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    
    const FormTitle = () => {
        return (
            <div className='col-md-12 biko-bg p-2 text-center'>
                <h4 className="">
                    Login
                </h4>
            </div>
        )
    }

    const PreLogAlert = (props) => {
        let c = preMsg?"success" : "danger";
        return (<div role="alert" className={`fade alert alert-${c} show`}>{preMsg}</div>);
    }   
    const Alert = (props) => {
        let c = success ? 'success' : 'danger';
        return (<div role="alert" className={`fade alert alert-${c} show`}>{message}</div>);

    };

    return (
        <React.Fragment>
            <FormTitle/>

            <div className="row">
                <div className="col-md-12 mt-2  p-2">
                    {preMsg && <PreLogAlert/>}
                    {message && <Alert/>}

                    <div className="modal-body pb-0" data-backdrop="static">
                        <BodyLogin />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Login;
