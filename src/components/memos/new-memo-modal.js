import React, {useState, useCallback, useEffect, useContext} from "react";
import { Modal } from "react-bootstrap";
import makeRequest from '../utils/fetch-request';
import {getFromLocalStorage} from '../utils/local-storage'; 
import { Context } from "../../context/store"
import { ShimmerTitle, ShimmerTable } from "react-shimmer-effects";
import NewMemoTabs from "./new-memo-tab";
// import "../App.css";

const NewMemoModal = (props) => {
    const user = getFromLocalStorage("user");
    const [state, dispatch] = useContext(Context);
    const [doneCreate, setDoneCreate] = useState(false);
    const [createMessage, setCreateMessage] = useState(false);
    

    const createNewParams = useCallback(async () => {
        let endpoint = "/v1/share";
        setDoneCreate(false);
        let payload = {
            profile_id: "user?.profile_id",
        }
        makeRequest({url: endpoint, method: "POST", data: payload}).then(([status, result]) => {
            if(status === 200) {

                // dispatch({type:"SET", key:"sharecode", payload:result.code});
            } else {
                setCreateMessage("Could not create share code, please try again");
            }
            setDoneCreate(true);
        });
    }, []);

    return (
        <>
            <Modal
            {...props}
            top
            size = "lg"
            show={state?.shownewmemomodal === true}
            onHide={() => dispatch({type:"SET", key:"shownewmemomodal", payload:false})}
            dialogClassName="new-memo-modal"
            aria-labelledby="contained-modal-title-vcenter">
                     <Modal.Header closeButton className="bg-blue-500 text-white text-center justify-center place-items-center">
                      <Modal.Title className="w-full font-small ">New Memo || Memo title/name</Modal.Title>
                    </Modal.Header>
                    {
                    <Modal.Body>

                        <NewMemoTabs />

                    </Modal.Body>
                 }
            </Modal>
        </>
    )
}

export default NewMemoModal;
