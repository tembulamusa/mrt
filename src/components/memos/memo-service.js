import React, {useEffect, useCallback, useContext, useState} from "react";
import makeRequest from "../utils/fetch-request";
import {getFromLocalStorage} from '../utils/local-storage'; 
import { Context } from "../../context/store";
import {toast, ToastContainer} from 'react-toastify';
import MemoServiceItem from "./memo-service-item";
import EmptyRecords from "../utils/empty-records";


const memo_service_data = [
    {
        servive_id: 1,
        memo_id: 10,
        qty: "quantity",
        status: "my status"
    },
    {
        servive_id: 1,
        memo_id: 10,
        qty: "quantity",
        status: "my status"
    },
    {
        servive_id: 2,
        memo_id: 10,
        qty: "quantity",
        status: "my status"
    },
    {
        servive_id: 3,
        memo_id: 10,
        qty: "quantity",
        status: "my status"
    },
    {
        servive_id: 2,
        memo_id: 10,
        qty: "quantity",
        status: "my status"
    }

]


const MemoServices = (props) => {
    const [state, dispatch] = useContext(Context);
    const [memoServices, setMemoServices] = useState([])


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
        let endpoint = `/memo/${state?.currentmemoitem?.memoId}/services`;
        makeRequest({url: endpoint, method: 'GET' }).then(([status, response]) => {

            if ([200, 201, 204].includes(status)) {
                setMemoServices(response?.message);

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
        getMemoServices();
     }, []);


    return (
        <>  
            <table className="w-full">
                <tbody className="w-full">
                    { memoServices.length >= 1 && !state?.currentmemoitem === null ? memoServices?.map((memo_service_item, index) => (
                        <MemoServiceItem memoserviceitem = {memo_service_item} key= {index}/>
                        )
                    ): <EmptyRecords itemname="services"/>
                    }
                </tbody>
            </table> 
            <div className="my-2 mt-3">
                <span className="text-white bg-blue-500 p-2 rounded w-auto" onClick={() => dispatch({type:"SET", key:"shownewmemoserviceitemmodal", payload:true})}>
                    Add New memo service
                </span>
            </div>
        </>
    )
};

export default MemoServices;