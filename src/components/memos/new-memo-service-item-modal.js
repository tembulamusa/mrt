import React, {useState, useCallback, useEffect, useContext} from "react";
import { Modal } from "react-bootstrap";
import makeRequest from '../utils/fetch-request';
import {toast, ToastContainer} from 'react-toastify';
import {getFromLocalStorage} from '../utils/local-storage'; 
import { Context } from "../../context/store"
import CarHireFields from "./serviceitems/car-hire-fields";
import AirlineFields from "./serviceitems/airline-fields";
import HotelFields from "./serviceitems/hotel-fields";
import ChopperFields from "./serviceitems/chopper-fields";


const testSystData = [
    {
        id: 1,
        name: "car hire"
    },
    {
        id: 2,
        name: "airline"
    },
    {
        id: 3,
        name: "chopper"
    },
    {
        id: 4,
        name: "hotel"
    },
    
];
const NewMemoServiceItemModal = (props) => {
    const [state, dispatch] = useContext(Context);
    const [systemServices, setSytemServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [selectedServiceName, setSelectedServiceName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const Notify = (message) => {
        let options = {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: 673738 /* this is hack to prevent multiple toasts */
        }
        if (message.status === 200) {
            toast.success(`🚀 ${message.message}`, options);
        } else {
            toast.error(`🦄 ${message.message}`, options);
        }

    };

    const GetSystemServices = (props) => {
        let endpoint = `/services`;
        makeRequest({url: endpoint, method: 'GET' }).then(([status, response]) => {

            setSytemServices(testSystData);
            if ([200, 201, 204].includes(status)) {
                setSytemServices(response?.message);

                // remove this
                setSytemServices(testSystData);

            } else {
                let message = {
                    status: response.status,
                    message: response?.status || "Error fetching Memos."
                };
                Notify(message);
            }
        })
    }

    useEffect(() => {
        GetSystemServices();
    }, []);

    const handleChange = (e) => {

        setSelectedService(e.target.id);
        setSelectedServiceName(e.target.value)

      }
      
    return (
        <>
        <Modal
            {...props}
            // centered
            // size = "sm"
            show={state?.shownewmemoserviceitemmodal === true}
            animationDirection='right'
            onHide={() => dispatch({type:"SET", key:"shownewmemoserviceitemmodal", payload:false})}
            dialogClassName="new-memo-modal shadow-lg z-50 opacity-95"
            aria-labelledby="contained-modal-title-vcenter">
                     <Modal.Header closeButton className="bg-purple-500 text-white text-center justify-center place-items-center">
                      <Modal.Title className="w-full text-sm font-md uppercase ">Add Memo service</Modal.Title>
                    </Modal.Header>
                    {
                    <Modal.Body className="bg-white">
                        <form>
                            <select className="p-2" onChange={handleChange} value={selectedService}>
                                <option className="p-2" value="">Select Service</option>
                                {systemServices.map((service, index) => (
                                    <option id={service.id} className="" value={service.name}>{service.name}</option>
                                ))}
                            </select>
                            
                            {  ["car hire", "airline", "hotel", "chopper"].includes(selectedServiceName) && <>
                                <div className="form-group col-12 justify-content-center mt-3 flex flex-col">
                                <label className='block mb-2'>Location</label>
                                    <input
                                    type="text"
                                    name="location" 
                                    maxlength="50" 
                                    placeholder="Enter Location" 
                                    className="border border-gray-100 p-2"
                                    required="required"/>
                                </div>
                                {selectedServiceName == "car hire" &&  <CarHireFields />}
                                {selectedServiceName === "airline" && <AirlineFields />}
                                {selectedServiceName === "hotel" && <HotelFields />}
                                {selectedServiceName === "chopper" && <ChopperFields />}

                                {/* if selected is not airline */}
                                <div className="form-group col-12 justify-content-center mt-3 flex flex-col">
                                <label className='block mb-2'>From Date</label>
                                    <input
                                    type="date"
                                    name="from_date" 
                                    maxlength="50" 
                                    placeholder="Enter Location" 
                                    className="border border-gray-100 p-2"
                                    required="required"/>
                                </div>
                                <div className="form-group col-12 justify-content-center mt-3 flex flex-col">
                                <label className='block mb-2'>To Date</label>
                                    <input
                                    type="date"
                                    name="to_date" 
                                    maxlength="50" 
                                    placeholder="Enter Location" 
                                    className="border border-gray-100 p-2"
                                    required="required"/>
                                </div>

                                {/* end if selected is not airline */}

                                <div className="form-group col-12 justify-content-center mt-3 flex flex-col">
                                <label className='block mb-2'>Select Location Category</label>
                                    <select required="required" name="location_type" className="p-2 border-gray-200">
                                        <option value={""}>Select location Type</option>
                                        <option >local</option>
                                        <option >international</option>
                                    </select>
                                </div>

                                <div className='mt-4 mb-2'>
                                    <span
                                        className={`p-2 rounded shadow-md border border-white-200 inline-block w-40 mr-2 bg-red-400 text-white text-center`}
                                        disabled={isLoading}> Cancel
                                    </span>
                                    <button className={`p-2 rounded shadow-md border border-white-200 w-50 bg-blue-500 text-white text-center`}
                                        type="submit"
                                        disabled={isLoading}>
                                            {isLoading ? <span>Creating service...</span> : <span>Add service</span>}
                                    </button>
                                </div> 
                                </>
                            }

                        
                        </form>
                    </Modal.Body>
                 }
            </Modal>
        </>
    )

}


export default NewMemoServiceItemModal;