import React, {useEffect, useCallback, useContext, useState} from "react";
import SupplierItem from "../../suppliers/supplier-item";
import CreateNewSupplier from "../../suppliers/create-new-supplier";
import { Context } from "../../../context/store";

const suppliersList = [
    {
        title: "Milestone suppliers",
        email: "mymail@mail.com",
        address: "my addreess",
        registration_pin: "the pin",
        kra_pin: "myPin",
        primary_msisdn: "07201290389",
        secondary_msisdn: "234",
        description: "description",
        active: true
    },
    {
        title: "HotelsA suppliers",
        email: "mymail@maiel.com",
        address: "my addreess",
        registration_pin: "the pin",
        kra_pin: "myPin",
        primary_msisdn: "07201290389",
        secondary_msisdn: "234",
        description: "description",
        active: true
    },
    {
        title: "Airline KQ",
        email: "mymail@mail3.com",
        address: "my addreess",
        registration_pin: "the pin",
        kra_pin: "myPin",
        primary_msisdn: "07201290389",
        secondary_msisdn: "234",
        description: "description",
        active: true
    },
    {
        title: "Some supplier",
        email: "mymail@m4ail.com",
        address: "my addreess",
        registration_pin: "the pin",
        kra_pin: "myPin",
        primary_msisdn: "07201290389",
        secondary_msisdn: "234",
        description: "description",
        active: true
    },
]




const SuppliersIndex = (props) => {
    const [showCreateModal, setShowCreateModal] =  useState(false);
    const [state, dispatch] = useContext(Context);


    useEffect(() => {
        return () => {
            dispatch({type: "DEL", key: "shownewsuppliermodal"})
        }
    }, [])
    return (
        <>
            <div className="mb-4 border-b border-gray-200 py-2 my-2 ">
                <h2 className="text-3xl inline-block">Suppliers </h2>
            </div>
            
            <div className="mb-2">
                <select className="border border-gray-200 p-2 mb-3">
                    <option>Select Service</option>
                    <option>Hotel</option>
                    <option>Airline</option>
                    <option>Car Hire</option>
                    <option>Airlift</option>
                </select>
                <input type="text" placeholder="Enter Name" className="border border-gray-200 rounded-xl mx-5 p-2"/>
                <button className="inline-block bg-green-500 text-white rounded p-2 text-1xl float-end" onClick={() => dispatch({type: "SET", key: "shownewsuppliermodal", payload: true})}>Add Supplier</button>
            </div>
            <table className="w-full">
                <tbody className="[&>*:nth-child(even)]:bg-blue-100 capitalize">
                    {suppliersList.map((supplier, index) => (
                        <SupplierItem supplier={supplier} key={index} />
                    ))}
                </tbody>
            </table>
        
        <CreateNewSupplier />

        </>
    )
}

export default SuppliersIndex;