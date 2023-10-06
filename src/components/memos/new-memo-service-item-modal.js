import React, {useState, useCallback, useEffect, useContext} from "react";
import { Modal } from "react-bootstrap";
import makeRequest from '../utils/fetch-request';
import {toast, ToastContainer} from 'react-toastify';
import {getFromLocalStorage} from '../utils/local-storage'; 
import { Context } from "../../context/store"
import {Formik, Field, Form} from 'formik';
// import CarHireFields from "./serviceitems/car-hire-fields";
// import AirlineFields from "./serviceitems/airline-fields";
// import HotelFields from "./serviceitems/hotel-fields";
// import airliftFields from "./serviceitems/airlift-fields";


const testSystData = [
    {
        id: 3,
        name: "car hire"
    },
    {
        id: 2,
        name: "airline"
    },
    {
        id: 1,
        name: "airlift"
    },
    {
        id: 4,
        name: "hotel"
    },
    
];
const NewMemoServiceItemModal = (props) => {
    const [state, dispatch] = useContext(Context);
    const [systemServices, setSytemServices] = useState([]);
    const [selectedService, setSelectedService] = useState("");
    const [selectedServiceName, setSelectedServiceName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isCreated, setIsCreated] = useState(false);
    const [serviceUrl, setServiceUrl] = useState("")

    const initialValues = {
        location: "",
        memoId: parseInt(`${state?.latestmemoobj?.memoId}`),
        serviceId: parseInt(`${selectedService}`),
        

    }

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
                setSytemServices(response?.message?.services);

                // remove this
                setSytemServices(testSystData);

            } else {
                let message = {
                    status: status,
                    message: response?.message?.status || "Error fetching Memos."
                };
                Notify(message);
            }
        })
    }

    useEffect(() => {
        GetSystemServices();
    }, []);


      const handleSubmit = values => {
        let endpoint = `/memo/${state?.latestmemoobj?.memoId}/${serviceUrl}`;
        setIsLoading(true)

        // async await for the password to update and then create
        // then proceed to send
        makeRequest({url: endpoint, method: 'POST', data: values}).then(([status, response]) => {
            setIsLoading(false)

            if ([200, 201, 204].includes(status)) {
                setIsCreated(true)

                // add the service to the detail level state of memo services
            } else {
                let message = {
                    status: status,
                    message: response?.message || "Error attempting to create service"
                };
                Notify(message);
            }
        })
    }
    const validate = values => {

        let errors = {}

        // if (!values.referenceNumber || values.referenceNumber.length < 4) {
        //     errors.referenceNumber = "Invalid reference Number";
        // }

        return errors
    }
    
    const changeServiceUrl = () => {
        let current_service = selectedServiceName;
        if(current_service == "car hire"){
            setServiceUrl("car_hire_service");
        } else if (current_service == "airline"){
            setServiceUrl("airline_service");
        } else if (current_service == "airlift") {
            setServiceUrl("airlift_service");
        } else if (current_service == "hotel") {
            setServiceUrl("hotel_service")
        }
    }
    useEffect(() => {
        changeServiceUrl();
    }, [selectedServiceName])

    const NewMemoServiceForm = (props) => {

        const {isValid, errors, values, submitForm, setFieldValue} = props;

        const onFieldChanged = (ev) => {
            let field = ev.target.name;
            var value = ev.target.value;
            if (ev.target.type == "number") {
                value = parseInt(value);
            }
            setFieldValue(field, value);

            if (ev.target.name == "serviceId") {
                parseInt(setSelectedService(ev.target.id));
                setSelectedServiceName(ev.target.value)

            }
        

            
        }
        
        return (
  
            <Form>
                            <span className="font-medium capitalize mr-3">{selectedServiceName}</span>
                            <select
                            name="serviceId"
                            id={3}
                            className="p-2" onChange={onFieldChanged}>
                                <option className="p-2" value="">Change Service</option>
                                {systemServices.map((service, index) => (
                                    <option id={service.id} className="" value={service.name}>{service.name}</option>
                                ))}
                            </select>

                            
                            
                            {  ["car hire", "airline", "hotel", "airlift"].includes(selectedServiceName) && <>
                                <div className="form-group col-12 justify-content-center mt-3 flex flex-col">
                                <label className='block mb-2'>Location</label>
                                    <input
                                    id="location"
                                    type="text"
                                    name="location" 
                                    maxlength="50" 
                                    placeholder="Enter Location" 
                                    className="border border-gray-100 p-2"
                                    required="required"
                                    onChange={(ev) => onFieldChanged(ev)}
                                    />
                                </div>
                                {/* Car Hire */}
                                {selectedServiceName == "car hire" &&  <>
                                <div className="form-group col-12 justify-content-center mt-3 flex flex-col">
                                    <label className='block mb-2'>Number of cars</label>
                                        <input
                                        className="p-2 border border-gray-100 p-2"
                                        id="carCount"
                                        name="carCount"
                                        data-action="grow"
                                        required="required"
                                        min="1"
                                        type="number"
                                        placeholder=""
                                        onChange={(ev) => onFieldChanged(ev)}
                                        />
                                    </div>
                                    
                                    {/* <div className="form-group col-12 justify-content-center mt-3 flex flex-col">
                                    <label className='block mb-2'>Car Type</label>
                                        <input
                                        type="text"
                                        id="carType"
                                        name="carType" 
                                        maxlength="50" 
                                        placeholder="Enter Car Type" 
                                        className="border border-gray-100 p-2"
                                        required="required"
                                        onChange={(ev) => onFieldChanged(ev)}
                                        />
                                    </div> */}
                                    

                                    <div className="form-group col-12 justify-content-center mt-3 flex flex-col">
                                    <label className='block mb-2'>Select Car Type</label>
                                        <select
                                        onChange={(ev) => onFieldChanged(ev)}
                                        required="required" name="carType" className="p-2 border-gray-200">
                                        <option value={""}>Select Category</option>
                                        <option >economy</option>
                                        <option >luxury</option>
                                        <option >suv</option>
                                        <option >people carrier</option>
                                        </select>
                                    </div>
                                
                                </>}

                                {/* Airline */}
                                {selectedServiceName === "airline" && <>
                                <div className="form-group col-12 justify-content-center mt-3 flex flex-col">
                                    <label className='block mb-2'>Number of Tickets</label>
                                        <input
                                        className="p-2 border border-gray-100 p-2"
                                        id="ticketCount"
                                        name="ticketCount"
                                        data-action="grow"
                                        required="required"
                                        min="1"
                                        type="number"
                                        placeholder=""
                                        onChange={(ev) => onFieldChanged(ev)}
                                        />
                                    </div>
                                                
                                    <div className="form-group col-12 justify-content-center mt-3 flex flex-col">
                                    <label className='block mb-2'>departure Date</label>
                                        <input
                                        type="date"
                                        name="departureDate" 
                                        maxlength="50" 
                                        placeholder="Enter Location" 
                                        className="border border-gray-100 p-2"
                                        required="required"
                                        onChange={(ev) => onFieldChanged(ev)}
                                        />
                                    </div>
                                    <div className="form-group col-12 justify-content-center mt-3 flex flex-col">
                                    <label className='block mb-2'>Return Date</label>
                                        <input
                                        type="date"
                                        name="returnDate" 
                                        maxlength="50" 
                                        placeholder="Enter Location" 
                                        className="border border-gray-100 p-2"
                                        required="required"
                                        onChange={(ev) => onFieldChanged(ev)}
                                        />
                                    </div>
                                
                                    <div className="form-group col-12 justify-content-center mt-3 flex flex-col">
                                    <label className='block mb-2'>Select Journey Type</label>
                                        <select
                                        onChange={(ev) => onFieldChanged(ev)}
                                        required="required"
                                        id="journeyType"
                                        name="journeyType" className="p-2 border-gray-200">
                                            <option value={""}>Select location Type</option>
                                            <option value={"one_way"}>one Way</option>
                                            <option value={"two_way"}>two Way</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-12 justify-content-center mt-3 flex flex-col">
                                    <label className='block mb-2'>Origin</label>
                                        <input
                                        type="text"
                                        name="origin" 
                                        maxlength="50" 
                                        placeholder="Enter Origin" 
                                        className="border border-gray-100 p-2"
                                        required="required"
                                        onChange={(ev) => onFieldChanged(ev)}
                                        />
                                    </div>

                                    <div className="form-group col-12 justify-content-center mt-3 flex flex-col">
                                    <label className='block mb-2'>Destination</label>
                                        <input
                                        type="text"
                                        name="destination" 
                                        maxlength="50" 
                                        placeholder="Enter Destination" 
                                        className="border border-gray-100 p-2"
                                        required="required"
                                        onChange={(ev) => onFieldChanged(ev)}
                                        />
                                    </div>
                                </>}
                                {selectedServiceName === "hotel" && <>
                                <div className="form-group col-12 justify-content-center mt-3 flex flex-col">
                                <label className='block mb-2'>Number of Rooms</label>
                                    <input
                                    className="p-2 border border-gray-100 p-2"
                                    id="roomsCount"
                                    name="roomsCount"
                                    data-action="grow"
                                    required="required"
                                    min="1"
                                    type="number"
                                    placeholder=""
                                    onChange={(ev) => onFieldChanged(ev)}
                                    />
                                </div>
                                
                                <div className="form-group col-12 justify-content-center mt-3 flex flex-col">
                                <label className='block mb-2'>Type of Room(s)</label>
                                    <input
                                    type="text"
                                    id="roomType"
                                    name="roomType" 
                                    maxlength="50" 
                                    placeholder="Enter Room Type" 
                                    className="border border-gray-100 p-2"
                                    onChange={(ev) => onFieldChanged(ev)}
                                    />
                                </div>
                                <div className="form-group col-12 justify-content-center mt-3 flex flex-col">
                                <label className='block mb-2'>Room Layout</label>
                                    <input
                                    type="text"
                                    id="roomLayout"
                                    name="roomLayout" 
                                    maxlength="50" 
                                    placeholder="Enter Room Layout" 
                                    className="border border-gray-100 p-2"
                                    onChange={(ev) => onFieldChanged(ev)}
                                    />
                                </div>
                                </>}
                                {selectedServiceName === "airlift" && <>
                                <div className="form-group col-12 justify-content-center mt-3 flex flex-col">
                                    <label className='block mb-2'>Number of Passengers</label>
                                        <input
                                        className="p-2 border border-gray-100 p-2"
                                        id="passengersCount"
                                        name="passengersCount"
                                        data-action="grow"
                                        required="required"
                                        min="1"
                                        type="number"
                                        placeholder=""
                                        onChange={(ev) => onFieldChanged(ev)}
                                        />
                                    </div>
                                    <div className="form-group col-12 justify-content-center mt-3 flex flex-col">
                                    <label className='block mb-2'>origin</label>
                                        <input
                                        type="text"
                                        name="origin" 
                                        maxlength="50" 
                                        placeholder="Enter Origin" 
                                        className="border border-gray-100 p-2"
                                        required="required"
                                        onChange={(ev) => onFieldChanged(ev)}
                                        />
                                    </div>
                                    <div className="form-group col-12 justify-content-center mt-3 flex flex-col">
                                    <label className='block mb-2'>Destination</label>
                                        <input
                                        type="text"
                                        name="destination" 
                                        maxlength="50" 
                                        placeholder="Enter Destination" 
                                        className="border border-gray-100 p-2"
                                        required="required"
                                        onChange={(ev) => onFieldChanged(ev)}
                                        />
                                    </div>
                                    <div className="form-group col-12 justify-content-center mt-3 flex flex-col">
                                    <label className='block mb-2'>Select Journey Type</label>
                                        <select
                                        onChange={(ev) => onFieldChanged(ev)}
                                        required="required"
                                        name="journey_type"
                                        className="p-2 border-gray-200">
                                            <option value={""}>Select location Type</option>
                                            <option value={"one_way"}>one Way</option>
                                            <option value={"two_way"}>two Way</option>
                                        </select>
                                    </div>
                                </>}

                                {/* if selected is not airline */}
                                <div className="form-group col-12 justify-content-center mt-3 flex flex-col">
                                <label className='block mb-2'>From Date</label>
                                    <input
                                    type="date"
                                    id="fromDate"
                                    name="fromDate" 
                                    maxlength="50" 
                                    placeholder="Select Date" 
                                    className="border border-gray-100 p-2"
                                    required="required"
                                    onChange={(ev) => onFieldChanged(ev)}
                                    />
                                </div>
                                <div className="form-group col-12 justify-content-center mt-3 flex flex-col">
                                <label className='block mb-2'>To Date</label>
                                    <input
                                    id="toDate"
                                    type="date"
                                    name="toDate" 
                                    maxlength="50" 
                                    placeholder="Enter Location" 
                                    className="border border-gray-100 p-2"
                                    required="required"
                                    onChange={(ev) => onFieldChanged(ev)}
                                    />
                                </div>

                                {/* end if selected is not airline */}

                                <div className="form-group col-12 justify-content-center mt-3 flex flex-col">
                                <label className='block mb-2'>Select Location Category</label>
                                    <select 
                                    required="required" 
                                    name="locationType"
                                    id="locationType"
                                    onChange={(ev) => onFieldChanged(ev)}
                                    className="p-2 border-gray-200">
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

                        
                        </Form>
        )
    }

    const MemoServiceForm = (props) => {
        return (
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validateOnChange={false}
                validateOnBlur={false}
                validate={validate}
            >{(props) => <NewMemoServiceForm {...props} />}</Formik>
        );
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
                        {isCreated ? <>
                            <div className="p-3 rounded bg-green-200 text-green-600 my-3"><span className="font-medium text-green-700">{ selectedServiceName}</span>  created Successfully</div>
                            <div className="flex flex-row">
                                <button className="p-3 mr-3 bg-red-300 rounded-sm text-white my-3 w-40">Close</button>
                                <button className="p-3 my-3 bg-blue-600 text-white rounded-sm w-60" onClick={() => setIsCreated(false)}>Add another Service</button>
                            </div>
                            </> : <MemoServiceForm />}
                    </Modal.Body>
                 }
            </Modal>
        </>
    )

}


export default NewMemoServiceItemModal;