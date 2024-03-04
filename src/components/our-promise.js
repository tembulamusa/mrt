import React from "react";
import { FaHandshake } from "react-icons/fa";
import { FaCommentDollar } from "react-icons/fa";
import { FaRegMoneyBillAlt } from "react-icons/fa";


const Teams = ["tusker", "ulinzi", "nairobi", "shabana","kenya_police", "posta", "nzoia", "muranga"]

const OurPromise = (props) => {
    return (
        <>
            
            <section className='bg-white my-3 mb-4' id='search-section h-1.5'>
                <div className='container relative w-full'> 
                    <div className="w-full md:w-2/3 inline-block">
                        <div className="w-full p-3 !pl-0">
                            <div className="border border-gray-200 p-3 shadow-sm text-center uppercase text-2xl font-medium text-blue-500">
                                Business/Corporates
                            </div>
                        </div>                  
                        <div className='w-full md:w-1/2 pr-4 mt-2 inline-block'>
                            <div className="border border-gray-200 p-3 shadow-sm text-center">
                                <div className="text-center"><FaHandshake size={40} className="text-blue-600 mx-auto"/></div>
                                <div className="text-2xl capitalize my-3 font-bold">SMEs</div>
                                <div className="py-2">
                                    With 10 years of experience, industry knowledge and lots of satisfied customers, we are the best moving company in Kenya!
                                </div>
                            </div>
                        </div>

                        <div className='w-full md:w-1/2 pr-4 mt-2 inline-block'>
                            <div className="border border-gray-200 p-3 shadow-sm text-center">
                                <div className="text-center"><FaCommentDollar size={40} className="text-blue-600 mx-auto"/></div>
                                <div className="text-2xl capitalize my-3 font-bold">Corporates</div>
                                <div className="py-2">
                                    We provide high quality custom moving solutions at affordable prices. Call us or fill the free quote form to get a free estimate.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='w-full md:w-1/3 pr-4 mt-2 inline-block'>
                        <div className="w-full p-3 mb-2 !px-0">
                            <div className="border border-gray-200 p-3 shadow-sm text-center uppercase text-2xl font-medium text-blue-500">
                                Tech Companies
                            </div>
                        </div>    
                        <div className="border border-gray-200 p-3 shadow-sm text-center">
                            <div className="text-center"><FaRegMoneyBillAlt size={40} className="text-blue-600 mx-auto"/></div>
                            <div className="text-2xl capitalize my-3 font-bold">Tech To Tech</div>
                            <div className="py-2">
                                Our secure and accessible storage facility is ready to receive and store your goods in large volumes
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default React.memo(OurPromise);