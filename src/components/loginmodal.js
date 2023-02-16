import React, {useState, useCallback, useEffect, useContext} from "react";
import { Modal } from "react-bootstrap";
import makeRequest from './utils/fetch-request';
import {getFromLocalStorage} from './utils/local-storage'; 
import { Context } from "../context/store"
import { MyLoginForm } from "./header/top-login"

import "../App.css";

const LoginModal = (props) => {
    const user = getFromLocalStorage("user");
    const app_name = "desktop-web";
    const [state, dispatch] = useContext(Context);

    console.log("This is my context", state);




    return (
        <>
            <Modal
            show={state?.showloginmodal === true}
            onHide={() => dispatch({type:"SET", key:"showloginmodal", payload:false})}
            dialogClassName="modal-90w popover-login-modal"
            aria-labelledby="contained-modal-title-vcenter">
                     <Modal.Header closeButton className="primary-bg">
                      <Modal.Title>Share bet</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row mb-3">
                            <div className="col-12"> BIKO ACCOUNT LOGIN </div>
                        </div>
                        <MyLoginForm />
                    </Modal.Body>
            </Modal>
        </>
    )
}

export default LoginModal;
