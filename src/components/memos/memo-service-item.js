import React, {useState, useCallback, useEffect, useContext} from "react";
import { Modal } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import {Formik, Field, Form} from 'formik';
import makeRequest from '../utils/fetch-request';
import {getFromLocalStorage} from '../utils/local-storage'; 
import { Context } from "../../context/store"

const MemoServiceItem = (props) => {
    const {memoserviceitem, key, kword} = props;
    const [state, dispatch] = useContext(Context);
    
    const createServiceName = (name) => {

        return name.match(/([A-Z]?[^A-Z]*)/g).join(" ");
    }

    const setServiceRequestParams = () => {
        dispatch({type: "SET", key: "showservicedetailmodal", payload: true});
        dispatch({type: "SET", key: "latesteservicerequestname", payload: createServiceName(kword)})
        dispatch({type: "SET", key: "latestmemoserviceitem", payload: memoserviceitem})
    }
    return (
        <>
            <tr className="w-full" key={kword}> <td className="border border-gray-100 p-2 capitalize" onClick={setServiceRequestParams}>{createServiceName(kword)} (status)</td></tr>
      
        </>
    )
        

}

export default MemoServiceItem;