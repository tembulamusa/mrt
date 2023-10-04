import React, {useState, useCallback, useEffect, useContext} from "react";
import { Modal } from "react-bootstrap";
import makeRequest from "../../utils/fetch-request";
import {getFromLocalStorage} from '../../utils/local-storage'; 
import { Context } from "../../../context/store";
import {toast, ToastContainer} from 'react-toastify';
import AdminRoles from "../../admins/admin-roles";


const AdminDetails = (props) => {
    const [state, distpatch] = useContext(Context);
    const [roles, setRoles] = useState([]);
    const [isRequesting, setIsRequesting] = useState(true); 




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

    const getUserRoles = () => {
        let endpoint = `/user/${state?.selecteduserdetail?.userId}/roles`;
        makeRequest({url: endpoint, method: 'GET' }).then(([status, response]) => {

            setIsRequesting(false)
            if ([200, 201, 204].includes(status)) {
                // dispatch({type:"SET", key:"showloginmodal", payload:false})
                setRoles(response?.message?.roles);

            } else {
                let message = {
                    status: response.status,
                    message: response?.status || "Error fetching Memos."
                };
                Notify(message);
            }
        })
    }

    useEffect(() => {
        getUserRoles();
     }, []);

    
    return (
        <>
            

            <div className="flex flex-row">
                <div className="flex flex-col mr-2 w-50">
                <h2 className="text-2xl mb-2 pb-2 border-b border-gray-100">User Details - {state?.selecteduserdetail?.firstName + " " + state?.selecteduserdetail?.lastName}</h2>
                <div className="mb-2"><span className="font-md">ID:</span> # {state?.selecteduserdetail?.userId}</div>
                <div className="mb-2">Name: {state?.selecteduserdetail?.firstName + " " + state?.selecteduserdetail?.lastName}</div>
                <div className="mb-2">Phone No.: {state?.selecteduserdetail?.msisdn}</div>
                <div className="mb-2">Email: {state?.selecteduserdetail?.email}</div>
                </div>
                <div className="flex flex-col ml-3 w-50">
                    
                    <AdminRoles selecteduserid={state?.selecteduserdetail?.userId}/>

                </div>
            </div>
        </>
    )
}


export default AdminDetails;