import React, {useState} from "react";
import { FaHandshake } from "react-icons/fa";
import { FaCommentDollar } from "react-icons/fa";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';


const Teams = ["tusker", "ulinzi", "nairobi", "shabana","kenya_police", "posta", "nzoia", "muranga"]

const OurPromise = (props) => {
    const [key, setKey] = useState("areas");

    return (
        <>
            
            <section className='bg-white my-3 mb-4' id='search-section h-1.5'>
                <div className='container relative w-full'>
                    <div className='w-full md:w-1/3 inline-block'>
                        <div className="border border-gray-200 p-3">
                            <div className="border-b border-gray-200 pb-2 mb-2 text-center text-2xl py-2">Key Areas</div>   
                            <div className="text-center">
                                <div className="text-center"><FaRegMoneyBillAlt size={40} className="text-blue-600 mx-auto"/></div>
                                <div className="text-2xl capitalize my-3 font-bold">Areas</div>
                                <div className="py-2">
                                    Chatbots, android, frontend, deployment, Erp, Betting systems, Transport and Logistics, process flow design
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-2/3 inline-block p-3">

                        {/* Tabs */}

                        <Tabs
                            id="events-selector"
                            activeKey={key}
                            onSelect={(k) => setKey(k)}
                            className="events-selector mb-3"
                            >
                            <Tab eventKey="areas" title="Key Areas">
                                Scrolling areas etc
                            </Tab>
                            <Tab eventKey="business" title="Business Sizes">
                                Scrolling business with descriptions
                            </Tab>
                            
                        </Tabs>
                        <div className="border border-gray-200 rounded-md px-2 pb-3">
                        <div className="border-b border-gray-200 pb-2 mb-2 text-center text-2xl py-2">Business</div>
                        <div className='w-full md:w-1/2 p-2 mt-2 inline-block'>
                            <div className="border border-gray-200 p-3 shadow-sm text-center">
                                <div className="text-center"><FaHandshake size={40} className="text-blue-600 mx-auto"/></div>
                                <div className="text-2xl capitalize my-3 font-bold">SMEs</div>
                                <div className="py-2">
                                    15 Years expertise in SME systems. We grow with the Business because we fully understand what is involved from both angles.
                                </div>
                            </div>
                        </div>

                        <div className='w-full md:w-1/2 p-2 mt-2 inline-block'>
                            <div className="border border-gray-200 p-3 shadow-sm text-center">
                                <div className="text-center"><FaCommentDollar size={40} className="text-blue-600 mx-auto"/></div>
                                <div className="text-2xl capitalize my-3 font-bold">Corporates</div>
                                <div className="py-2">
                                    We provide high quality custom moving solutions at affordable prices. Call us or fill the free quote form to get a free estimate.
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default React.memo(OurPromise);