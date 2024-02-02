import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Context } from "../context/store";
import Logo from '../assets/svg/logo.svg';
import makeRequest from "./utils/fetch-request";


const BuyTicketModal = (props) => {
    const [state, dispatch] = useContext(Context);
    const [msisdn, setMsisdn] = useState(null);
    const [ticketCount, setTicketCount] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedTicketType, setSelectedTicketType] = useState(null);
    const [currentTicketCount, setCurrentTicketCount] = useState(1);
    const [errorMessage, setErrorMessage] = useState(null);

    const onMobileChange = (ev) => {
        setMsisdn(ev.target.value);
    }


    const setTicketType = (ticketType) => {

    }

    const changeTicketNumber = (changeType) => {
        if (changeType === "decrement") {
            if (currentTicketCount > 1) {
                const newTicketCount = currentTicketCount - 1;
                setCurrentTicketCount(newTicketCount);
            }
        }

        if(changeType === "increment") {
            const newTicketCount = currentTicketCount + 1;
            setCurrentTicketCount(newTicketCount);
        }
    }


    const selectedEventDetail = (eventId) => {
        let endpoint = `event/${eventId}`;
        console.log("Event Id::::", eventId)
        makeRequest({url: endpoint, method: 'GET' }).then(([status, response]) => {
            
            if ([200, 201, 204].includes(status)) {
                dispatch({type: "SET", key: "selectedeventdetail", payload: response?.data});

            } else {
                if (response?.message) {
                    setErrorMessage(response?.message);
                } else {
                    setErrorMessage("an error occurred");
                }
                
            }
        })
    }

    useEffect(() => {

    }, [currentTicketCount, state?.selectedticket]);

    useEffect(() => {
        selectedEventDetail(state?.selectedevent?.id);
    }, [state?.selectedevent])

    const payTicket = () => {
        console.log("paying request");
    }
    return (
        <>
            <Modal
            {...props}
            top
            size = "md"
            show={state?.showbuyticketmodal === true}
            onHide={() => dispatch({type:"SET", key:"showbuyticketmodal", payload:false})}
            dialogClassName="buy-ticket-modal"
            aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header closeButton className="bg-gray-200 justify-center place-items-center pb-0 pt-0">
                    <Modal.Title className="w-full font-small pb-0 pt-0">
                        <img src={Logo} width="150px"/>
                    </Modal.Title>
                    </Modal.Header>
                    {
                    <Modal.Body>

                        <div className="text-center">
                            <h1 className="font-bold mb-3">{(new Date(state?.selectedeventdetail?.event?.start_date)).toString()}</h1>
                            <div className="mb-3 opacity-50 capitalize">{state?.selectedeventdetail?.event?.competition}</div>
                            <div className="mb-3 capitalize" id="teams">
                                <div className='text-red-500 inline-block w-1/3'>
                                    <img style={{width:"35px"}}
                                        className={'mx-auto'}
                                        src={state?.selectedeventdetail?.event?.home_team?.logo} alt="home"/>
                                        {state?.selectedeventdetail?.event?.home_team?.name}
                                </div>
                                <div className='text-red-500 inline-block w-1/3'>
                                    <img style={{width:"35px"}}
                                        className={'mx-auto'}
                                        src={state?.selectedeventdetail?.data?.event?.away_team?.logo} alt="away"/>
                                        {state?.selectedeventdetail?.data?.event?.away_team?.name}
                                </div>

                            </div>

                            <div id="mobile-phone" className=" mb-3">
                                <input className="border border-gray-200 bg-gray-100 rounded p-2" placeholder="mobile number" onChange={(ev) => onMobileChange(ev)}/>
                            </div>

                            <div id="ticketType">

                                {state?.selectedeventdetail?.prices?.map((ticket, idx) => (
                                    <button className={`px-3 py-1 mr-2 border border-gray-200 rounded-md inline-block ${state?.selectedticket === ticket ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"}`} onClick={() => dispatch({type: "SET", key: "selectedticket", payload: ticket})}>{ticket?.name}</button>
                                ))}
                                </div>

                            <div className="my-3" id="changeNumber">
                                <div className="inline-block mr-3">Number Of Tickets</div>

                                <div className="inline-block">
                                    <div className="bg-gray-200 text-gray-700 inline-block px-3 rounded-md mr-3">{currentTicketCount}</div>
                                    <div className="inline-block" id="ticketChanger">
                                        <button className="px-2 py bg-gray-200 mr-2 rounded-full font-bold" onClick={()=>changeTicketNumber("decrement")}>-</button>
                                        <button className="px-2 py bg-gray-200 rounded-full font-bold" onClick={()=>changeTicketNumber("increment")}>+</button>
                                    </div>
                                </div>

                                <div className="mb-3 mt-4" id="payTotal">
                                    <div className="inline-block mr-3">Ksh. {totalPrice}</div>
                                    <button className="shadow-sm bg-gray-200 px-3 py-1 rounded-md" onClick={() => payTicket()}>Buy Ticket Now</button>
                                </div>
                            </div>
                        </div>

                    </Modal.Body>
                 }
            </Modal>
        </>
    )
}

export default React.memo(BuyTicketModal);