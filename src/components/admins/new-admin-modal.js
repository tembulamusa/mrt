import React, {useState, useCallback, useEffect, useContext} from "react";
import { Modal } from "react-bootstrap";
import makeRequest from '../utils/fetch-request';
import {getFromLocalStorage} from '../utils/local-storage'; 
import { useNavigate, useLocation } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import {Formik, Field, Form} from 'formik';
import {Context} from '../../context/store';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {setLocalStorage} from '../utils/local-storage';
import { useMediaQuery } from 'react-responsive';

const NewAdminModal = (props) => {
    const {shownewadminform, adminroles} = props;
    const [dummyAdminshow, setDummyAdminShow] = useState(true);
    const [isLoading, setIsLoading] = useState(null)
    const [message, setMessage] = useState("null message for a start");
    const {setUser} = props;
    const navigate = useNavigate();
    const location = useLocation();
    const isMobile = useMediaQuery({ query: `(max-width: 576px)` });
    const [state, dispatch] = useContext(Context);
    const [newUserId, setNewUserId] = useState(null);
    const [showAdminRoleForm, setShowNewAdminRole] = useState(true);
    const [showMessage, setShowMessage] = useState(true);
    const [messageType, setMessageType] = useState(null)

    const initialValues = {
        email: "",
        lastName: "",
        msisdn: "",
        username: "",
        password: "",
        password: "",
        firstName: ""
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
            toastId: 673739 /* this is hack to prevent multiple toasts */
        }
        if (message.status === 200) {
            toast.success(`🚀 ${message.message}`, options);
        } else {
            toast.error(`🦄 ${message.message}`, options);
        }

    };

    const CreatePassword = () => {
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let length = Math.floor(Math.random() * (9 - 5 + 1) ) + 5;
        let result = '';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        initialValues.password = result;

    }
    const dispatchUser = useCallback(() => {
        if (message !== null) {
            Notify(message);
            if (message.status == 200) {
                setLocalStorage('user', message?.user);
                location?.state?.from
                    ? navigate(location?.state?.from) 
                    :  ((isMobile && Object.keys(state?.betslip ||{}).length > 0 )? navigate("/") : navigate("/")) ;
            }

        }
    }, [message])

    useEffect(() => {
        dispatchUser();
    }, [dispatchUser]);

    const handleSubmit = values => {
        let endpoint = '/v1/user';
        setIsLoading(true)

        // async await for the password to update and then create
        values.password = CreatePassword();
        // then proceed to send


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


    const NewAdminForm = (props) => {
        const {isValid, errors, values, submitForm, setFieldValue} = props;

        const onFieldChanged = (ev) => {
            let field = ev.target.name;
            let value = ev.target.value;
            setFieldValue(field, value);
        }
        return (
            <form className="p-3">
                    <Row>
                        <div className="form-group col-12 justify-content-center mt-3">
                            <label className='block mb-2'>User Email</label>

                            <input
                                    value={values.email}
                                    className={`text-dark deposit-input form-control col-md-12 input-field py-2 ${'errors.email && "text-danger"'}`}
                                    id="name"
                                    name="email"
                                    type="email"
                                    data-action="grow"
                                    required="required"
                                    placeholder={"Enter User Email"}
                                    // onChange={(ev) => onFieldChanged(ev)}
                                />
                                {/* {errors.email && <div className='text-danger'> {errors.email} </div>} */}

                            
                            <br/>
                            
                        </div>

                        <div className="form-group col-6 justify-content-center mt-2">
                                <label className='block mb-2'>First Name</label>
                                <input
                                    value={values.firstName}
                                    className={`text-dark deposit-input form-control col-md-12 input-field py-2 ${"errors.first_name && 'text-danger'"}`}
                                    id="first-name"
                                    name="first_name"
                                    data-action="grow"
                                    required="required"
                                    placeholder={"Admin First Name"}
                                    // onChange={(ev) => onFieldChanged(ev)}
                                />

                                {/* {errors.first_name && <div className='text-danger'> {errors.first_name} </div>} */}
                        
                        </div>
                        <div className="form-group col-6 justify-content-center mt-2">
                                <label className='block mb-2'>Last Name</label>
                                <input
                                    value={values.last_name}
                                    className={`text-dark deposit-input form-control col-md-12 input-field py-2 ${"errors.last_name && 'text-danger'"}`}
                                    id="last-name"
                                    name="last_name"
                                    data-action="grow"
                                    required="required"
                                    placeholder={"Admin Last Name"}
                                    // onChange={(ev) => onFieldChanged(ev)}
                                />

                                {/* {errors.reference && <div className='text-danger'> {errors.reference} </div>} */}
                        
                        </div>

                        <div className="form-group col-12 justify-content-center mt-4">
                            <label className='block mb-2'>User Phone Number</label>

                            <input
                                    value={values.email}
                                    className={`text-dark deposit-input form-control col-md-12 input-field py-2 ${"errors.name && text-danger"}`}
                                    id="name"
                                    name="name"
                                    type="text"
                                    data-action="grow"
                                    required="required"
                                    placeholder={"072xxxxxxx"}
                                    // onChange={(ev) => onFieldChanged(ev)}
                                />
                                {/* {errors.name && <div className='text-danger'> {errors.name} </div>} */}

                                                        
                        </div>

                                                
                            <div className='mt-3 mb-2'>
                                <span className={`p-3 rounded shadow-md border border-white-200 w-40 mr-2 bg-red-400 text-white`}
                                            disabled={isLoading}>
                                        Cancel
                                </span>

                                <button className={`p-3 rounded shadow-md border border-white-200 w-50 bg-blue-500 text-white`}
                                            disabled={isLoading}>
                                        {isLoading ? <span>Creating Memo...</span> : <span>Continue</span>}
                                </button>
                            </div> 

                                
                            
                    </Row>
                </form>
        )
    }

    // show/set user roles form after creating the user

    const UserRolesForm = (props) => {
        const handleRoleSubmit = (rolevalues) => {

        }

        return (
            <>
                
                <div id="add-roles">
                    <h1 className="font-md mb-3 font-md">Select Roles To add</h1>

                    <form>
                            {adminroles.map((role, index) => (
                                <div className="">
                                    <label key={index} className="bg-blue-50 border border-blue-70 p-2 w-full mb-2">
                                        <input type="checkbox" name="roles" className="mr-3" value={role.id}/> {role.name}
                                    </label>
                                </div>
                            ))}
                        <div>
                            <input type="hidden" value={newUserId} />
                        </div>
                        <button className="p-2 bg-green-500 text-white rounded mt-3">add roles</button>
                    </form>
                </div>
            </>
        )
    }
    return (
        <>
            <Modal
            {...props}
            top
            size = "md"
            show={shownewadminform}
            onHide={() => setDummyAdminShow(true)}
            dialogClassName="new-admin-modal"
            aria-labelledby="contained-modal-title-vcenter">
                     <Modal.Header closeButton className="bg-blue-500 text-white text-center justify-center place-items-center">
                      <Modal.Title className="w-full font-small ">New Admin</Modal.Title>
                    </Modal.Header>
                    {
                    <Modal.Body>
                        {showMessage &&
                            <div className={` alert alert-${messageType === 'error'  && "danger" || "success"}`}>
                                {message}
                            </div>
                        }

                        {
                            showAdminRoleForm && <UserRolesForm /> || <NewAdminForm values={initialValues}/>
                        }
                    </Modal.Body>
                 }
            </Modal>
        </>
    )
}

export default NewAdminModal;