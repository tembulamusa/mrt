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
        referenceNumber: "",
        decsription: ""
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
        let endpoint = '/memo';
        setIsLoading(true)
        makeRequest({url: endpoint, method: 'POST', data: values}).then(([status, response]) => {

            setIsLoading(false)
            if (status === 200 || status == 201 || status == 204) {
                dispatch({type: "SET", key: "latestmemoobj", payload: response?.message?.memo})
                dispatch({type: "SET", key: "latestsuccessmessage", payload: `Memo ${response?.message?.memo?.referenceNumber} created successfully. Add Services`})
                navigate(`/memo-details/${response?.message?.memo?.memoId}`);
            } else {
                let message = {
                    status: status,
                    message: response?.message || "Error attempting to create memo"
                };
                Notify(message);
            }
        })
    }


    const validate = values => {

        let errors = {}

        if (!values.referenceNumber || values.referenceNumber.length < 4) {
            errors.referenceNumber = "Invalid reference Number";
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
                            <label className='block mb-2'>Reference Number</label>

                            <input
                                    value={values.referenceNumber}
                                    className={`text-dark deposit-input form-control col-md-12 input-field py-3 ${errors.referenceNumber && 'text-danger'}`}
                                    id="referenceNumber"
                                    name="referenceNumber"
                                    type="text"
                                    data-action="grow"
                                    required="required"
                                    placeholder={errors.referenceNumber || "Enter Memo Name"}
                                    onChange={(ev) => onFieldChanged(ev)}
                                />
                                {errors.referenceNumber && <div className='text-danger'> {errors.referenceNumber} </div>}

                            
                            <br/>
                            
                        </div>

                        <div className="form-group col-12 justify-content-center mt-3">
                                <label className='block mb-2'>Description</label>
                                <textarea
                                    value={values.description}
                                    className={`text-dark deposit-input form-control col-md-12 input-field py-3 ${errors.description && 'text-danger'}`}
                                    id="description"
                                    name="description"
                                    data-action="grow"
                                    required="required"
                                    placeholder={errors.description || "Enter brief description"}
                                    onChange={(ev) => onFieldChanged(ev)}
                                />
                                {errors.description && <div className='text-danger'> {errors.description} </div>}
                                <br/>
                            <input type="hidden" name="ref" value="{props.refURL}"/>
                        </div>
                            <div className='mt-2 mb-2 flex flex-row'>
                                <span
                                onClick={() => dispatch({type:"SET", key:"shownewmemomodal", payload:false})}
                                className={`p-3 rounded shadow-md border border-white-200 w-40 mr-2 bg-red-400 text-white flex flex-col text-center`}
                                            disabled={isLoading}>
                                        Cancel
                                </span>

                                <button className={`p-3 rounded shadow-md border border-white-200 w-50 bg-blue-500 text-white text-center`}
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