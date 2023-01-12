import React, {useState} from 'react';
import {Formik, Form} from 'formik';
import makeRequest from "../utils/fetch-request";
import mpesa from '../../assets/img/mpesa-3.png'
import { useNavigate } from "react-router-dom";

const Header = React.lazy(() => import('../header/header'));
const SideBar = React.lazy(() => import('../sidebar/awesome/Sidebar'));
const Right = React.lazy(() => import('../right/index'));
const Footer = React.lazy(() => import('../footer/footer'));

const Signup = (props) => {

    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const initialValues = {
        msisdn: '',
        password: ''
    }

    const handleSubmit = values => {
        // if(loading) { return ;}

        setLoading(true);
        let endpoint = '/v1/signup';
        makeRequest({url: endpoint, method: 'POST', data: values}).then(([status, response]) => {
            setSuccess(response?.success?.status == 200 || response?.success?.status === 201);
            setMessage(response?.success?.message);
            

            if (response?.success?.status == 200 || response?.success?.status === 201) {
                setLoading(false);
                navigate('/login', {state: {message: response?.success?.message} });
            }
        })


    }

    const validate = values => {

        let errors = {}

        if (!values.msisdn || !values.msisdn.match(/(255|0|)?[71]\d{8}/g)) {
            errors.msisdn = 'Please enter a valid phone number'
        }

        if (!values.password || values.password.length < 4) {
            errors.password = "Please enter four or more characters for password";
        }

        return errors
    }

    const FormTitle = () => {
        return (
            <div className='col-md-12 primary-bg p-4 text-center'>
                <h4 className="">
                    SIGNUP | CREATE A NEW ACCOUNT
                </h4>
            </div>
        )
    }

    const MySignupForm = (props) => {
        const {errors, values, submitForm, setFieldValue} = props;

        const onFieldChanged = (ev) => {
            let field = ev.target.name;
            let value = ev.target.value;
            setFieldValue(field, value);
        }
        const loadingContent = function(){
            return <span className="loading">Registering</span>
        }
        return (
            <Form>
                <div className="pt-0">
                    <div className="row">
                        <div className='col-md-6 text-center'>
                        </div>
                        <div className="form-group row d-flex justify-content-center mt-5">
                            <div className="col-md-12">
                                <label>Mobile Number</label>
                                <input
                                    value={values.msisdn}
                                    className="text-dark deposit-input form-control col-md-12 input-field"
                                    id="msisdn"
                                    name="msisdn"
                                    type="text"
                                    placeholder='Phone number'
                                    onChange={ev => onFieldChanged(ev)}
                                />
                                {errors.msisdn && <div className='text-danger'> {errors.msisdn} </div>}
                            </div>
                        </div>

                        <div className="form-group row d-flex justify-content-center mt-5">
                            <div className="col-md-12">
                                <label>Password</label>
                                <input
                                    value={values.password}
                                    className="text-dark deposit-input form-control col-md-12 input-field"
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder='Password'
                                    onChange={ev => onFieldChanged(ev)}
                                />
                                {errors.password && <div className='text-danger'> {errors.password} </div>}
                            </div>
                        </div>
                        <div className="form-group row d-flex justify-content-left mb-4">
                            <div className="col-md-3">
                                <button type="submit"
                                    className={`btn btn-lg btn-primary mt-5 col-md-12 deposit-withdraw-button`}
                                    disabled={loading}
                                    >
                                    {loading ? loadingContent() : 'Signup'}
                                </button>

                                <p>Already Have an account!? <a href="/login"><strong>Click here to Login</strong></a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        );
    }

    const SignupForm = (props) => {
        return (
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validateOnChange={false}
                validateOnBlur={false}
                validate={validate}
                render={(props) => <MySignupForm {...props} />}/>
        );
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
                            <div className="col-md-12 mt-2  p-2">
                                {message && <Alert/>}
                                <div className="modal-body pb-0" data-backdrop="static">
                                    <SignupForm/>
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

export default Signup;
