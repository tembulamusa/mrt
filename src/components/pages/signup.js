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
                navigate('/verify-account', {state: {phone: values.msisdn} });
            }
        })


    }

    const validate = values => {

        let errors = {}

        if (!values.msisdn || !values.msisdn.match(/(\+?255|0|)?\d{9}/g)) {
            errors.msisdn = 'Please enter a valid phone number'
        }

        if (!values.password || values.password.length < 4) {
            errors.password = "Please enter four or more characters for password";
        }
        if (!values.repeat_password) {
            errors.repeat_password = "Please enter your password confirmation"
        }

        if (values.password !== values.repeat_password) {
            errors.repeat_password = "The passwords do not match. Please enter the password you entered above."
        }

        return errors
    }

    const FormTitle = () => {
        return (
            <div className='col-md-12 biko-bg p-2 text-center'>
                <h4 className="">
                    JISAJILI BIKOSPORTS
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
            return <span className="loading">subiria sajili</span>
        }
        return (
            <Form>
                <div className="pt-0">
                    <div className="row">
                        <div className='col-12 text-cente'>
                        <h4>Karibu BIKOSPORTS</h4>
                        <div className="small-box-content">
                        Jaza maelezo yote yanayohitajika, ikiwemo namba ya simu na nenosiri (password). Bofya na hakikisha kuwa umesoma na kukubali kanuni, na
                        umetimiza umri wa miaka 18.
                        Bofya kitufe cha “Jisajili”. Utapokea ujumbe mfupi (sms) wenye namba ya uhakiki (verification code) yako. Ili kukamilisha usajili wako, fuata
                        maelekezo ya kutuma namba ya uhakiki ili akaunti mpya na wallet viwezeshwe kwa ajili ya matumizi.
                        </div>
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
                            <div className="col-md-6">
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

                            <div className="col-md-6">
                                    <label>Confirm Password</label>
                                    <input
                                        value={values.repeat_password}
                                        className="text-dark deposit-input form-control col-md-12 input-field"
                                        id="confirm_password"
                                        name="repeat_password"
                                        type="password"
                                        placeholder='Password'
                                        onChange={ev => onFieldChanged(ev)}
                                    />
                                    {errors.repeat_password &&
                                        <div className='text-danger'>
                                            {errors.repeat_password}
                                        </div>}
                                </div>
                        </div>
                        <div className="form-group row d-flex justify-content-left mb-4">
                            <div className="col-md-12">
                                <button type="submit"
                                    className={`btn btn-lg btn-primary mt-5 col-md-12 deposit-withdraw-button full-width biko-bg`}
                                    disabled={loading}
                                    >
                                    {loading ? loadingContent() : 'Register'}
                                </button>
                                <hr/>
                                <p className="small-box-content">Already Have an account!? <a href="/login"><strong>Click here to Login</strong></a></p>
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
