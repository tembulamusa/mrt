import React, {useEffect, useCallback, useContext, useState} from "react";
import { Modal } from "react-bootstrap";
import makeRequest from '../../utils/fetch-request';
import {getFromLocalStorage} from '../../utils/local-storage'; 
import { Context } from "../../../context/store"
import {HiOutlineUserAdd, HiOutlinePlus} from "react-icons/hi";

import ServiceItem from "../../services/service-item"

const servicesData = [
    {
        id: 1,
        title: "airline",
    },
    {
        id: 2,
        title: "Hotel"
    },
    {
        id: 3,
        title: "car hire"
    },
    {
        id: 4,
        title: "chopper"
    },
]



const Services = (props) => {
    const [errors, setErrors] = useState({title: ["must be unique"]});
    const [showErrors, setShowErrors] = useState(false);
    


    return (
        <>

            <div className="flex mb-3">
                <h2 className="inline-block text-2xl w-50">Services</h2>
            </div>
            <table className="w-full table">
                <tbody className="[&>*:nth-child(even)]:bg-white-600 [&>*:nth-child(odd)]:bg-gray-50 capitalize text-blue-600">
                    {servicesData.map((service, index) => (
                        <ServiceItem serviceitem={service} key={index} />
                    ))}

                    <tr className="w-full bg-gray-400">
                        <td className="border border-gray-100">
                            <form>
                                <span className="inline-block mr-2 w-50">
                                    <input name="title" type="text" required="required" className="border bg-white border-gray-300 p-3 w-80 rounded" placeholder="Enter New Title"></input>
                                    {showErrors && <span className="block text-0.5 text-red-500">Error</span>}
                                </span>
                                <button className="inline-block w-auto px-4 p-2 shadow rounded-md bg-green-500 text-white" onClick={() => setShowErrors(!showErrors)}><HiOutlinePlus /> Add Service</button>

                            </form>
                        </td>
                        <td>
                        </td>
                    </tr>
                </tbody>
            </table>
            
            </>
            
    )
}


export default Services;