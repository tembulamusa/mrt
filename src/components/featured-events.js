import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/store";
import makeRequest from "./utils/fetch-request";

const SampleGames = [
    {
        home_team: "bournemouth",
        away_team: "chelsea",
        date: "24-1-2024",
        competition: "premier league"
    },
    {
        home_team: "tusker",
        away_team: "shabana",
        date: "24-1-2024",
        competition: "premier league"
    },
    {
        home_team: "ulinzi",
        away_team: "nairobi",
        date: "24-1-2024",
        competition: "premier league"
    },

]


const FeaturedEvents = (props) => {
    const [state, dispatch] = useContext(Context);
    const [events, setEvents] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    const buyGameTicket = (game) => {
        dispatch({type: "SET", key: "selectedevent", payload: game});
        dispatch({type: "SET", key: "showbuyticketmodal", payload: true});
    }

    const getEvents = () => {
        let endpoint = "upcoming_events";

        makeRequest({url: endpoint, method: 'GET' }).then(([status, response]) => {
            
            if ([200, 201, 204].includes(status)) {
                setEvents(response?.data?.events);

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
        getEvents();
    }, []);

    
    return (
        <section id='next-games' className={`bg-red-200 bg-${state?.followingclub ? state?.followingclub.bgColor : "red" }-200`}>
                <div className='container py-5 capitalize'>
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    {events?.map((event, idx) => (
                        <div className='text-center w-1/3 inline-block p-3'>
                            <div className='bg-white p-3 py-4 rounded shadow-md'>
                                <div className='font-bold'>{(new Date(event?.start_date)).toDateString()}</div>
                                <div className='capitalize text-gray-400'>{event.competition}</div>
                                <div className='my-3'>
                                        <div className='text-red-500 inline-block w-1/3'>
                                            <img style={{width:"35px"}}
                                            className={'mx-auto'}
                                            src={event?.home_team?.logo}/>
                                            {event.home_team?.logo}
                                        </div>
                                        <div className='bg-gray-200 rounded font-bold text-2xl inline-block w-1/3'>0 - 0</div>
                                        <div className='text-red-500 inline-block w-1/3'>
                                            <img style={{width:"35px"}}
                                            className={'mx-auto'}
                                            src={event?.away?.logo}/>
                                            {event?.away_team?.name}
                                        </div>
                                        
                                </div>

                                <button 
                                    onClick={() => buyGameTicket(event)}
                                    className={`bg-${state?.followingclub ? state?.followingclub.bg_color: "red"}-600 rounded-md text-white p-3 py-2 mt-4 w-full`}>
                                    Buy Ticket
                                    </button>
                            </div>
                        </div>
                    ))}
                </div>

            </section>
    )
}

export default React.memo(FeaturedEvents)