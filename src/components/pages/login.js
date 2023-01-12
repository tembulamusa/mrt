import React, {useState} from 'react';
import {Formik, Form} from 'formik';
import makeRequest from "../utils/fetch-request";
import mpesa from '../../assets/img/mpesa-3.png'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const Header = React.lazy(() => import('../header/header'));
const SideBar = React.lazy(() => import('../sidebar/awesome/Sidebar'));
const Right = React.lazy(() => import('../right/index'));
const Footer = React.lazy(() => import('../footer/footer'));
const BodyLogin = React.lazy(() => import('../header/mobile-login'));


const Login = (props) => {
    const [message, setMessage] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);


    
    const FormTitle = () => {
        return (
            <div className='col-md-12 primary-bg p-4 text-center'>
                <h4 className="">
                    Login
                </h4>
            </div>
        )
    }

   
    const Alert = (props) => {
        let c = success ? 'success' : 'danger';
        return (<div role="alert" className={`fade alert alert-${c} show`}>{message}</div>);

    };
    return (
        <React.Fragment>
            <Header/>
            <div className="amt">
                <div className="d-flex flex-row justify-content-between">
                    <SideBar loadCompetitions/>
                    <div className="gz home mt-3">
                        <div className="homepage">
                            <FormTitle/>

                            <div className="row">
                            <div className="col-md-12 mt-2  p-2">
                                {message && <Alert/>}
                                <div className="modal-body pb-0" data-backdrop="static">
                                    <BodyLogin/>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <Right/>
                </div>
            </div>
            <Footer/>
        </React.Fragment>
    );
}

export default Login;