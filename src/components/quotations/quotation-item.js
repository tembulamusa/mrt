import React, {useState, useCallback, useEffect, useContext} from "react";
import { Modal } from "react-bootstrap";
import makeRequest from '../utils/fetch-request';
import {getFromLocalStorage} from '../utils/local-storage'; 
import { Context } from "../../context/store";


const QuotationItem = (props) => {
    const {entry, key} = props;
    const [showQuotationDetail, setShowQuotationDetail] = useState(false);
    
    return (
        <>
            <tr className="w-full" key={key} onClick={() => setShowQuotationDetail(true)}>
                <td className="p-2 border border-gray-200">supplier</td>
                <td className="p-2 border border-gray-200">{entry.status}</td>
                <td className="p-2 border border-gray-200">{entry.amount}</td>
                <td className="p-2 border border-gray-200">created</td>
                {/* cancel btn active until accomplished then gets disabled*/}
                <td className="p-2 border border-gray-200">{entry.status} {entry.status === "awarded" && <button className="bg-red-600 rounded text-white p-1">Cancel</button>}</td>
                
            </tr>


            <Modal
                {...props}
                top
                size = "lg"
                show={showQuotationDetail}
                onHide={() => setShowQuotationDetail(false)}
                dialogClassName="new-memo-modal"
                aria-labelledby="contained-modal-title-vcenter">
                        <Modal.Header closeButton className="bg-blue-500 text-white text-center justify-center place-items-center">
                        <Modal.Title className="w-full font-small ">supplier - {entry.status}</Modal.Title>
                        </Modal.Header>
                        {
                        <Modal.Body>

                            The quotation Details and some small action

                        </Modal.Body>
                    }
            </Modal>
        </>
    )

}

export default QuotationItem;