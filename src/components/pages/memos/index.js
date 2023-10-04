import React, {useState, useCallback, useEffect, useContext} from "react";
import { Modal } from "react-bootstrap";
import makeRequest from "../../utils/fetch-request";
import {getFromLocalStorage} from '../../utils/local-storage'; 
import { Context } from "../../../context/store";
import MemoItem from "../../memos/memo-item";
import {toast, ToastContainer} from 'react-toastify';


const dummy = [
    {
        title: "road",
        id: 1,
        description: "description sample",
        status: "assigned",
        created: "date",
        referenceNumber: "some number"
    },
    {
        title: "airline",
        id: 2,
        description: "description sample",
        status: "delivered",
        created: "date",
        referenceNumber: "some number"
    },
    {
        title: "chopper",
        id: 3,
        description: "description sample",
        status: "defaulted",
        created: "date",
        referenceNumber: "some number"
    },
    {
        title: "hotel",
        id: 4,
        description: "description sample",
        status: "assigned",
        created: "date",
        referenceNumber: "some number"
    },
    {
        title: "hotel",
        id: 5,
        description: "description sample",
        status: "delivered",
        created: "date",
        referenceNumber: "some number"
    },
    {
        title: "road",
        id: 6,
        description: "description sample",
        status: "delivered",
        created: "date",
        referenceNumber: "some number"
    },
];
const MemoIndex = (props) => {
    const [state, dispatch] = useContext(Context);
    const [isRequesting, setIsRequesting] = useState(true);
    const [memos, setMemos] = useState([]);

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
    const Memos = () => {
        let endpoint = "/memos";
        makeRequest({url: endpoint, method: 'GET' }).then(([status, response]) => {

            setIsRequesting(false)
            if ([200, 201, 204].includes(status)) {
                // dispatch({type:"SET", key:"showloginmodal", payload:false})
                setMemos(response?.message?.memos);

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
        Memos();
     }, []);

    return (
        <>
            <h1 className="mb-2 text-2xl">Memos <button className="bg-blue-500 text-white rounded p-2 text-sm float-end" onClick={() => dispatch({type:"SET", key:"shownewmemomodal", payload:true})}>Create New Memo</button></h1>
            <div className="mb-3">
                <select className="p-2">
                    <option>All Memos</option>
                    <option>Processing</option>
                    <option>Closed</option>
                    <option>Open</option>
                </select>

                <input
                type="text"
                placeholder="Enter memo id or name"
                className="ml-3 border border-blue-100 p-2 rounded"
                />
            </div>

            <table className="w-full">
                <tbody className="[&>*:nth-child(even)]:bg-blue-50">
                    {dummy.map((memo, index) => (
                        <MemoItem memo={memo} key={index}/>
                    ))}
                </tbody>
            </table>
        
        </>
        
    )
}


export default MemoIndex;