import React, {useEffect, useCallback, useContext, useState} from "react";
import SupplierItem from "../../suppliers/supplier-item";
import CreateNewSupplier from "../../suppliers/create-new-supplier";

const suppliersList = [
    {
        title: "title1",
        email: "mymail@mail.com",
        address: "my addreess",
        registration_pin: "the pin",
        kra_pin: "myPin",
        primary_msisdn: "msisdn",
        secondary_msisdn: "234",
        description: "description",
        active: true
    },
    {
        title: "title2",
        email: "mymail@maiel.com",
        address: "my addreess",
        registration_pin: "the pin",
        kra_pin: "myPin",
        primary_msisdn: "msisdn",
        secondary_msisdn: "234",
        description: "description",
        active: true
    },
    {
        title: "title3",
        email: "mymail@mail3.com",
        address: "my addreess",
        registration_pin: "the pin",
        kra_pin: "myPin",
        primary_msisdn: "msisdn",
        secondary_msisdn: "234",
        description: "description",
        active: true
    },
    {
        title: "title4",
        email: "mymail@m4ail.com",
        address: "my addreess",
        registration_pin: "the pin",
        kra_pin: "myPin",
        primary_msisdn: "msisdn",
        secondary_msisdn: "234",
        description: "description",
        active: true
    },
]


const SuppliersIndex = (props) => {
    const [showCreateModal, setShowCreateModal] =  useState(false);

    return (
        <>
            <div className="mb-4 border-b border-gray-200 py-2 my-2 ">
                <h2 className="text-3xl inline-block">Suppliers </h2>
                <input type="text" placeholder="Search for items" className="border border-gray-200 rounded-xl mx-5 p-2"/>
                <button className="inline-block bg-green-500 text-white rounded p-2 text-1xl" onClick={() => setShowCreateModal(true)}>Add Supplier</button>
            </div>
            <select className="border border-gray-200 p-2 mb-3">
                <option>All Suppliers</option>
                <option>Hotel</option>
                <option>Airline</option>
                <option>Car Hire</option>
                <option>Chopper</option>
            </select>

            <table className="w-full">
                <tbody className="[&>*:nth-child(even)]:bg-white-600 [&>*:nth-child(odd)]:bg-gray-50 capitalize text-blue-600">
                    {suppliersList.map((supplier, index) => (
                        <SupplierItem supplier={supplier} key={index} />
                    ))}
                </tbody>
            </table>
        
        <CreateNewSupplier showmodal = {showCreateModal} />

        </>
    )
}

export default SuppliersIndex;