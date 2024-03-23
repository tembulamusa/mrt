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
        <section id='next-games' className="transition-block text-white">
                <section className='title-block mb-10'>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <h1 className="">
                                    Our Services
                                </h1>
                            </div>
                            <div className="col-md-6">
                                <div className="">
                                    subscribe
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className='container relative w-full tracking-wider'>                    
                    <div className='w-full md:w-1/3 pr-4 mt-2 inline-block'>
                        <div className="p-3 text-center rounded column-1">
                            <div className="text-center">
                                {/* <img src={Messenger} alt="house-moving"  className="mx-auto rounded-full w-20"/> */}
                            </div>
                            <div className="text-2xl uppercase my-3 font-medium tracking-wider">Languages and Tools</div>
                            <div className="py-2">
                                Different Languages for different usecases
                                <button className="mx-auto block capitalize my-4 btn flat-btn text-white">Check Out</button>
                            </div>
                        </div>
                    </div>

                    <div className='w-full md:w-1/3 pr-4 mt-2 inline-block'>
                        <div className="p-3 text-center rounded column-2">
                            <div className="text-center">
                                {/* <img src={Office} alt="house-moving"  className="mx-auto rounded-full w-20"/> */}
                            </div>
                            <div className="text-2xl uppercase my-3 font-medium tracking-wider">Team and Product</div>
                            <div className="py-2">
                                Team of Big Talent
                                <button className="mx-auto block capitalize my-4 btn flat-btn text-white">Check out</button>
                            </div>
                        </div>
                    </div>

                    <div className='w-full md:w-1/3 pr-4 mt-2 inline-block'>
                        <div className="text-center rounded column-3">
                            <div className="text-center">
                                {/* <img src={Courier} alt="house-moving"  className="mx-auto rounded-full w-20"/> */}
                            </div>
                            <div className="text-2xl uppercase my-3 font-medium tracking-wider">Solutions and Others</div>
                            <div className="py-2">
                                Problem specific Solutions
                                <button className="mx-auto block capitalize my-4 btn flat-btn text-white">Check out</button>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
    )
}

export default React.memo(FeaturedEvents)