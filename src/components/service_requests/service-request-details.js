import React, {useState, useCallback, useEffect, useContext} from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Context } from "../../context/store"

const ServiceRequestDetail = (props) => {
    const [key, setKey] = useState("detail");
    const [state, dispatch] = useContext(Context);

    const setServiceRequestDetail = () => {
        const selectedService = state?.latesteservicerequestname;

        {console.log("SERVICES LOGGED:::: ", state?.latestmemoserviceitem)}
        if (selectedService.includes("hotel")) {

            return (
                <>
                <table className="w-full">
                    <tbody className="[&>*:nth-child(odd)]:bg-blue-50">
                        <tr className="w-full">
                            <td className="border border-gray-100 p-2">status</td>
                            <td className="border border-gray-100 p-2">selectable status</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-100 p-2">Location</td>
                            <td className="border border-gray-100 p-2">{state?.latestmemoserviceitem?.location}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-100 p-2">Location Type</td>
                            <td className="border border-gray-100 p-2">{state?.latestmemoserviceitem?.locationType}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-100 p-2">Room Layout</td>
                            <td className="border border-gray-100 p-2">{state?.latestmemoserviceitem?.roomLayout}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-100 p-2">Room Type</td>
                            <td className="border border-gray-100 p-2">{state?.latestmemoserviceitem?.roomType}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-100 p-2">Number of Rooms</td>
                            <td className="border border-gray-100 p-2">{state?.latestmemoserviceitem?.roomsCount}</td>
                        </tr>
                        
                        <tr>
                            <td className="border border-gray-100 p-2">Starting Date</td>
                            <td className="border border-gray-100 p-2">{state?.latestmemoserviceitem?.fromDate}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-100 p-2">Ending Date</td>
                            <td className="border border-gray-100 p-2">{state?.latestmemoserviceitem?.toDate}</td>
                        </tr>
                    </tbody>
                </table>
                </>
            )
        } else if (selectedService.includes("airlift")) {
            return (
                <>
                    <table className="w-full">
                    <tbody className="[&>*:nth-child(odd)]:bg-blue-50">
                        <tr className="w-full">
                            <td className="border border-gray-100 p-2">Status</td>
                            <td className="border border-gray-100 p-2">selectable status</td>
                        </tr>
                        <tr className="w-full">
                            <td className="border border-gray-100 p-2">Date Created</td>
                            <td className="border border-gray-100 p-2">{state?.latestmemoserviceitem?.createdAt}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-100 p-2">Location Type</td>
                            <td className="border border-gray-100 p-2">{state?.latestmemoserviceitem?.locationType}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-100 p-2">Journey Type</td>
                            <td className="border border-gray-100 p-2">{state?.latestmemoserviceitem?.journeyType}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-100 p-2">Origin</td>
                            <td className="border border-gray-100 p-2">{state?.latestmemoserviceitem?.origin}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-100 p-2">Destination</td>
                            <td className="border border-gray-100 p-2">{state?.latestmemoserviceitem?.destination}</td>
                        </tr>
                        
                        <tr>
                            <td className="border border-gray-100 p-2">Number of Passengers</td>
                            <td className="border border-gray-100 p-2">{state?.latestmemoserviceitem?.passengersCount}</td>
                        </tr>
                        
                        <tr>
                            <td className="border border-gray-100 p-2">Starting Date</td>
                            <td className="border border-gray-100 p-2">{state?.latestmemoserviceitem?.fromDate}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-100 p-2">Ending Date</td>
                            <td className="border border-gray-100 p-2">{state?.latestmemoserviceitem?.toDate}</td>
                        </tr>
                    </tbody>
                </table>
                </>
            )
        } else if (selectedService.includes("airline")) {
            return (
                <>
                    <table className="w-full">
                    <tbody className="[&>*:nth-child(odd)]:bg-blue-50">
                        <tr className="w-full">
                            <td className="border border-gray-100 p-2">Status</td>
                            <td className="border border-gray-100 p-2">selectable status</td>
                        </tr>
                        <tr className="w-full">
                            <td className="border border-gray-100 p-2">Date Created</td>
                            <td className="border border-gray-100 p-2">{state?.latestmemoserviceitem?.createdAt}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-100 p-2">Location</td>
                            <td className="border border-gray-100 p-2">{state?.latestmemoserviceitem?.location}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-100 p-2">Location Type</td>
                            <td className="border border-gray-100 p-2">{state?.latestmemoserviceitem?.locationType}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-100 p-2">Journey Type</td>
                            <td className="border border-gray-100 p-2">{state?.latestmemoserviceitem?.journeyType}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-100 p-2">Origin</td>
                            <td className="border border-gray-100 p-2">{state?.latestmemoserviceitem?.origin}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-100 p-2">Destination</td>
                            <td className="border border-gray-100 p-2">{state?.latestmemoserviceitem?.destination}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-100 p-2">Ticket Category</td>
                            <td className="border border-gray-100 p-2">{state?.latestmemoserviceitem?.ticketCategory}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-100 p-2">Number of Tickets</td>
                            <td className="border border-gray-100 p-2">{state?.latestmemoserviceitem?.ticketCount}</td>
                        </tr>
                        
                        <tr>
                            <td className="border border-gray-100 p-2">Departure Date</td>
                            <td className="border border-gray-100 p-2">{state?.latestmemoserviceitem?.departureDate}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-100 p-2">Return Date</td>
                            <td className="border border-gray-100 p-2">{state?.latestmemoserviceitem?.returnDate}</td>
                        </tr>
                    </tbody>
                </table>
                </>
            )
        }else if (selectedService.includes("car")) {
            return (
                <>
                    <table className="w-full">
                    <tbody className="[&>*:nth-child(odd)]:bg-blue-50">
                        <tr className="w-full">
                            <td className="border border-gray-100 p-2">Status</td>
                            <td className="border border-gray-100 p-2">selectable status</td>
                        </tr>
                        <tr className="w-full">
                            <td className="border border-gray-100 p-2">Date Created</td>
                            <td className="border border-gray-100 p-2">{state?.latestmemoserviceitem?.createdAt}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-100 p-2">Location</td>
                            <td className="border border-gray-100 p-2">{state?.latestmemoserviceitem?.location}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-100 p-2">Location Type</td>
                            <td className="border border-gray-100 p-2">{state?.latestmemoserviceitem?.locationType}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-100 p-2">Car Type</td>
                            <td className="border border-gray-100 p-2">{state?.latestmemoserviceitem?.carType}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-100 p-2">Number of Cars</td>
                            <td className="border border-gray-100 p-2">{state?.latestmemoserviceitem?.carCount}</td>
                        </tr>
                        
                        <tr>
                            <td className="border border-gray-100 p-2">Starting Date</td>
                            <td className="border border-gray-100 p-2">{state?.latestmemoserviceitem?.fromDate}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-100 p-2">End Date</td>
                            <td className="border border-gray-100 p-2">{state?.latestmemoserviceitem?.toDate}</td>
                        </tr>
                    </tbody>
                </table>
                </>
            )
        }else {
            <>
                
            </>
        }
        
    }

    return (
        <>
            <Tabs
                id="new-memo-tabs"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
                >
                <Tab eventKey="detail" title="Detail">
                    {setServiceRequestDetail()}
                </Tab>
                <Tab eventKey="requests" title={"requests (6)"}>
                    <div>The service requests sent come here</div>
                </Tab>
                <Tab eventKey="quotations" title="Quotations (4)">
                    <div>The Quotations received come here</div>
                </Tab>
            </Tabs>

        </>
    )
}

export default ServiceRequestDetail;