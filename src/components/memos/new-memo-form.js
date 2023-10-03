import React, {useState, useEffect, useContext, useCallback} from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import {Formik, Field, Form} from 'formik';
import makeRequest from "../utils/fetch-request";
import {Context} from '../../context/store';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {setLocalStorage} from '../utils/local-storage';
import { useMediaQuery } from 'react-responsive';

const NewMemoForm = (props) => {
    const [isLoading, setIsLoading] = useState(null)
    const [message, setMessage] = useState(null);
    const {setUser} = props;
    const navigate = useNavigate();
    const location = useLocation();
    const isMobile = useMediaQuery({ query: `(max-width: 576px)` });
    const [state, dispatch] = useContext(Context);
    const initialValues = {
        name: "",
        reference: ""
    }

    const Notify = (message) => {
        let options = {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: 673738 /* this is hack to prevent multiple toasts */
        }
        if (message.status === 200) {
            toast.success(`🚀 ${message.message}`, options);
        } else {
            toast.error(`🦄 ${message.message}`, options);
        }

    };

    const dispatchUser = useCallback(() => {
        if (message !== null) {
            Notify(message);
            if (message.status == 200) {
                setLocalStorage('user', message?.user);
                location?.state?.from 
                    ? navigate(location?.state?.from) 
                    :  ((isMobile && Object.keys(state?.betslip ||{}).length > 0 )? navigate("/mobile-betslip") : navigate("/")) ;
            }

        }
    }, [message])

    useEffect(() => {
        dispatchUser();
    }, [dispatchUser]);

    const handleSubmit = values => {
        let endpoint = '/v1/login';
        setIsLoading(true)
        makeRequest({url: endpoint, method: 'POST', data: values}).then(([status, response]) => {

            setIsLoading(false)
            if (status === 200 || status == 201 || status == 204) {
                dispatch({type:"SET", key:"showloginmodal", payload:false})
                dispatch({type:"SET", key:"user", payload:response?.user})
                setMessage(response);
            } else {
                let message = {
                    status: status,
                    message: response?.message || "Error attempting to login"
                };
                Notify(message);
            }
        })
    }


    const validate = values => {

        let errors = {}

        if (!values.reference || values.reference.length < 4) {
            errors.reference = "Invalid reference";
        }

        return errors
    }


    const MyMemoForm = (props) => {
        const {isValid, errors, values, submitForm, setFieldValue} = props;

        const onFieldChanged = (ev) => {
            let field = ev.target.name;
            let value = ev.target.value;
            setFieldValue(field, value);
        }
        return (
            <>
                <Form className="p-3">
                    <Row>
                        <div className="form-group col-12 justify-content-center mt-3">
                            <label className='block mb-2'>Name</label>

                            <input
                                    value={values.name}
                                    className={`text-dark deposit-input form-control col-md-12 input-field py-3 ${errors.name && 'text-danger'}`}
                                    id="name"
                                    name="name"
                                    type="text"
                                    data-action="grow"
                                    required="required"
                                    placeholder={errors.name || "Enter Memo Name"}
                                    onChange={(ev) => onFieldChanged(ev)}
                                />
                                {errors.name && <div className='text-danger'> {errors.name} </div>}

                            
                            <br/>
                            
                        </div>

                        <div className="form-group col-12 justify-content-center mt-3">
                                <label className='block mb-2'>Reference Number</label>
                                <input
                                    value={values.reference}
                                    className={`text-dark deposit-input form-control col-md-12 input-field py-3 ${errors.reference && 'text-danger'}`}
                                    id="reference"
                                    name="reference"
                                    data-action="grow"
                                    required="required"
                                    placeholder={errors.reference || "Enter Reference Number"}
                                    onChange={(ev) => onFieldChanged(ev)}
                                />
                                {errors.reference && <div className='text-danger'> {errors.reference} </div>}
                                <br/>
                            <input type="hidden" name="ref" value="{props.refURL}"/>
                        </div>
                            <div className='mt-2 mb-2'>
                                <button className={`p-3 rounded shadow-md border border-white-200 w-40 mr-2 bg-red-400 text-white`}
                                            disabled={isLoading}>
                                        Cancel
                                </button>

                                <button className={`p-3 rounded shadow-md border border-white-200 w-50 bg-blue-500 text-white`}
                                            disabled={isLoading}>
                                        {isLoading ? <span>Creating Memo...</span> : <span>Continue</span>}
                                </button>
                            </div> 

                                
                            
                    </Row>
                </Form>
            </>
        );
    }

    const MemoForm = (props) => {
        return (
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validateOnChange={false}
                validateOnBlur={false}
                validate={validate}
            >{(props) => <MyMemoForm {...props} />}</Formik>
        );
    }

    return (
        <Container className="body-login-section white-bg">
                <ToastContainer/>
                <MemoForm/>
                
        </Container>
    )
}
export default NewMemoForm;