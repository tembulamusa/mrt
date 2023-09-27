import React, {useState, useCallback, useEffect, useContext} from "react";
import { Modal } from "react-bootstrap";
import makeRequest from '../utils/fetch-request';
import {getFromLocalStorage} from '../utils/local-storage'; 
import { Context } from "../../context/store"
import CarHireFields from "./serviceitems/car-hire-fields";
import AirlineFields from "./serviceitems/airline-fields";
import HotelFields from "./serviceitems/hotel-fields";
import ChopperFields from "./serviceitems/chopper-fields";

const NewMemoServiceItemModal = (props) => {
    const [state, dispatch] = useContext(Context);

    return (
        <>
        <Modal
            {...props}
            // centered
            // size = "sm"
            show={true}
            animationDirection='right'
            onHide={() => dispatch({type:"SET", key:"shownewmemoserviceitemmodal", payload:false})}
            dialogClassName="new-memo-modal shadow-lg z-50 opacity-95"
            aria-labelledby="contained-modal-title-vcenter">
                     <Modal.Header closeButton className="bg-purple-500 text-white text-center justify-center place-items-center">
                      <Modal.Title className="w-full font-small ">Add Memo service item</Modal.Title>
                    </Modal.Header>
                    {
                    <Modal.Body className="bg-white">
                        <form>
                            <select className="p-2">
                                <option className="p-2" value="">Select Service</option>
                                <option className="p-2" value={"1"}>Db Service service 1</option>
                                <option className="p-2" value={"2"}>Db Service service 2</option>
                                <option className="p-2" value={"3"}>Db Service service 3</option>
                            </select>

                            {/* if car higher */}
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
                            <br />
                            if car hire
                            <CarHireFields />

                            <br />
                            if airline
                            <AirlineFields />

                            <br />
                            if hotel
                            <HotelFields />

                            <br />
                            if chopper
                            <ChopperFields />

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
                        </form>
                    </Modal.Body>
                 }
            </Modal>
        </>
    )

}


export default NewMemoServiceItemModal;