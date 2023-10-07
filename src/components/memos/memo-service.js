import React, {useEffect, useCallback, useContext, useState} from "react";
import makeRequest from "../utils/fetch-request";
import {getFromLocalStorage} from '../utils/local-storage';
import { Modal } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { Context } from "../../context/store";
import {toast, ToastContainer} from 'react-toastify';
import MemoServiceItem from "./memo-service-item";
import EmptyRecords from "../utils/empty-records";
import ServiceRequestDetail from "../service_requests/service-request-details";


const MemoServices = (props) => {
    const [state, dispatch] = useContext(Context);
    const [memoServices, setMemoServices] = useState({});

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

    const getMemoServices = () => {
        let endpoint = `/memo/${state?.latestmemoobj?.memoId}/services`;
        makeRequest({url: endpoint, method: 'GET' }).then(([status, response]) => {
            
            if ([200, 201, 204].includes(status)) {

                setMemoServices(response?.message);
                
            } else {
                let message = {
                    status: status,
                    message: response?.message?.status || "Error fetching Memos."
                };
                Notify(message);
            }
        })

        

    }

    useEffect(() => {
        getMemoServices();
     }, []);

     useEffect((memoServices) => {
        dispatch({type: "SET", key: "memoservices", payload: {memo: state?.latestmemoobj, services: memoServices}});
     }, [])

     useEffect(() => {
        console.log("I UPDATED THIS STUFF HERE::::: MEMOSERVICES")
     }, [state?.memoservices])

    return (
        <>  
            <table className="w-full">
                <tbody className="w-full [&>*:nth-child(odd)]:bg-blue-100">
                    
                    { Object.values(memoServices).every(o => Object.keys(o).length < 1) && <EmptyRecords itemname="services"/>}
                    
                    {Object.keys(memoServices).map(key => {
                            return (
                                <>
                                { Object.keys(memoServices[key]).length > 0 ? <MemoServiceItem memoserviceitem = {memoServices[key]} key={key} kword={key} /> : ""}
                                </>
                            );
                        })}
                </tbody>
            </table> 
            <div className="my-2 mt-3">
                <span className="text-white bg-blue-500 p-2 rounded w-auto" onClick={() => dispatch({type:"SET", key:"shownewmemoserviceitemmodal", payload:true})}>
                    Add New memo service
                </span>
            </div>



            {/* Show memo service request details */}


            <Modal
            {...props}
            top
            size = "xl"
            show={state?.showservicedetailmodal /*state?.shownewsuppliermodal*/}
            onHide={() => dispatch({type: "SET", key: "showservicerequestmodal", payload: false})}
            dialogClassName="new-memo-modal"
            aria-labelledby="contained-modal-title-vcenter">
                     <Modal.Header closeButton className="bg-blue-500 text-white text-center justify-center place-items-center">
                      <Modal.Title className="w-full font-sm text-md capitalize">{state?.latestmemoobj?.referenceNumber} - {state?.latesteservicerequestname}</Modal.Title>
                    </Modal.Header>
                    {
                    <Modal.Body>

                        <ServiceRequestDetail />

                    </Modal.Body>
                 }
            </Modal>
        </>
    )
};

export default MemoServices;