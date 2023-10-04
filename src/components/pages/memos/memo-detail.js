import React, {useState, useCallback, useEffect, useContext} from "react";
import { Modal } from "react-bootstrap";
import makeRequest from "../../utils/fetch-request";
import {getFromLocalStorage} from '../../utils/local-storage'; 
import { Context } from "../../../context/store";
import MemoItem from "../../memos/memo-item";
import {toast, ToastContainer} from 'react-toastify';
import MemoServices from "../../memos/memo-service";
const MemoDetail = (props) => {
    const [state, distpatch] = useContext(Context);
    const [serviceItems, setServiceItems] = useState([]);
    const [isRequesting, setIsRequesting] = useState(true); 

    return (
        <div className="flex flex-row">

            <div className="flex flex-col w-50 pr-3">
                <h1 className="text-2xl mb-2">Memo Detail: {state?.currentselectedmemo?.title}</h1>
                <div>Deadline: {state?.currentselectedmemo?.created}</div>
            </div>

            <div className="flex flex-col pl-3 w-50">
                <h1 className="text-2xl">Memo service requests</h1>
                <MemoServices />
            </div>
        </div>
    )
}


export default MemoDetail;