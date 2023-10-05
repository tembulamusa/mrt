import React, {useState, useCallback, useEffect, useContext} from "react";
import { Modal } from "react-bootstrap";
import makeRequest from "../../utils/fetch-request";
import {getFromLocalStorage} from '../../utils/local-storage'; 
import { Context } from "../../../context/store";
import {toast, ToastContainer} from 'react-toastify';
import AdminRoles from "../../admins/admin-roles";
import NewAdminModal from "../../admins/new-admin-modal";

const AdminDetails = (props) => {
    const [state, dispatch] = useContext(Context);
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
                    status: status,
                    message: response?.message?.status || "Error fetching roles."
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
            
            <h1 className=""></h1>

            <div className="flex flex-row">
                <div className="flex flex-col mr-2 w-50">
                <h2 className="text-2xl mb-2 pb-2 border-b border-gray-100">Admin Details - {state?.selecteduserdetail?.firstName + " " + state?.selecteduserdetail?.lastName}
                </h2>
                <div className="mb-2"><span className="font-md">ID:</span> # {state?.selecteduserdetail?.userId}</div>
                <div className="mb-2">Name: {state?.selecteduserdetail?.firstName + " " + state?.selecteduserdetail?.lastName}</div>
                <div className="mb-2">Phone No.: {state?.selecteduserdetail?.msisdn}</div>
                <div className="mb-2">Email: {state?.selecteduserdetail?.email}</div>

                {/* add a different/new admin */}
                <div className="mt-3 pt-3 border-t border-gray-200"><button className="p-3 rounded bg-green-500 text-white float-en text-sm" onClick={() => dispatch({type: "SET", key: "shownewadminmodal", payload: true}) }>Create New Admin</button></div>
                </div>
                <div className="flex flex-col ml-3 w-50">
                    {state?.latestsuccessmessage && <div className="bg-green-200 p-3 rounded text-green-600">{state?.latestsuccessmessage}</div>}
                    <AdminRoles selecteduserid={state?.selecteduserdetail?.userId}/>

                </div>
            </div>
            

            <NewAdminModal />

        </>
    )
}


export default AdminDetails;