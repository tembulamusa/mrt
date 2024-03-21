import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/store";
import makeRequest from "./utils/fetch-request";
import Messenger from '../assets/img/services/messenger.jpg'
import Office from '../assets/img/services/house.jpg'
import Courier from '../assets/img/services/pest.png'


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
        <section id='next-games' className="bg-gray-200 my-3 pb-3 md:py-5">
                <div className='container'>
                    <h1 className="my-2 pb-1 py-3 md:py-3 text-4xl text-blue-600 font-bold text-center">
                        Our Services
                    </h1>

                    <div className="py-3 my-2 text-center md:text-left">
                        Our Services range from development, to deployment, to tech support. How a service is interpreted depending on the customer. For example, to businesses, it suffices tosay we do system development, but to tech firms, we can have the services expanded: eg requirement collection, analysis, development, deployment, audit, system support, and many more develpment. It all depends on were you stand
                    </div>
                </div>

                <div className='container relative w-full'>                    
                    <div className='w-full md:w-1/3 pr-4 mt-2 inline-block'>
                        <div className="border border-gray-400 p-3 shadow-sm text-center bg-gray-100 rounded">
                            <div className="text-center">
                                <img src={Messenger} alt="house-moving"  className="mx-auto rounded-full w-20"/>
                            </div>
                            <div className="text-xl md:text-2xl capitalize mb-1 md:my-3 font-bold">System Development and management()</div>
                            <div className="py-2">
                                Our house moves team handles everything from packing to final arrangement at your new house, we take the anxiety out of moving.
                            </div>
                        </div>
                    </div>

                    <div className='w-full md:w-1/3 pr-4 mt-2 inline-block'>
                        <div className="border border-gray-400 p-3 shadow-sm text-center bg-gray-100 rounded">
                            <div className="text-center">
                                <img src={Office} alt="house-moving"  className="mx-auto rounded-full w-20"/>
                            </div>
                            <div className="text-xl md:text-2xl capitalize mb-1 md:my-3 font-bold">System management and maintenance</div>
                            <div className="py-2">
                                We provide high quality custom moving solutions at affordable prices. Call us or fill the free quote form to get a free estimate.
                            </div>
                        </div>
                    </div>

                    <div className='w-full md:w-1/3 pr-4 mt-2 inline-block'>
                        <div className="border border-gray-400 p-3 shadow-sm text-center bg-gray-100 rounded">
                            <div className="text-center">
                                <img src={Courier} alt="house-moving"  className="mx-auto rounded-full w-20"/>
                            </div>
                            <div className="text-xl md:text-2xl capitalize mb-1 md:my-3 font-bold">Software as a service Integration</div>
                            <div className="py-2">
                                A Courier service app by mrt space offering affordable, reliable and efficient parcel delivery within Nairobi.
                            </div>
                        </div>
                    </div>
                </div>

            </section>
    )
}

export default React.memo(FeaturedEvents)