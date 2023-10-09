

const quotationRequests =  [
    {
        quotationId: 1,
        createdAt: "3-11-2023",
        serviceRequestId: 2,
        supplier: "Samwel Odanga",
        serviceId: 2,
        status: "pending",
        message: "Service request email for some service..."
    },
    {
        quotationId: 2,
        serviceRequestId: 3,
        createdAt: "3-11-2023",
        supplier: "Samwel Odanga",
        serviceId: 2,
        status: "pending",
        message: "Service request email for some service..."
    },
    {
        quotationId: 3,
        createdAt: "3-11-2023",
        serviceRequestId: 2,
        supplier: "Samwel Odanga",
        serviceId: 2,
        status: "pending",
        message: "Service request email for some service..."
    },
    {
        quotationId: 4,
        serviceRequestId: 2,
        createdAt: "3-11-2023",
        supplier: "Samwel Odanga",
        serviceId: 2,
        status: "awarded",
        message: "Service request email for some service..."
    },
]

const QuotationMailList = (props) => {

    return (
        <>
            <div id="header" className="flex flex-row mb-3">
                <h1 className="font-mediu text-2xl mr-3">Quatation Mails </h1>
                <input className="border rounded-md border-gray-400 px-2" placeholder="Enter Supplier Name"/>
            </div>

            <table className="w-full">
                <tbody className="w-full">
                    { quotationRequests?.map((request, index) => (
                        <tr key={index}>
                            <td className="p-2 border border-gray-200">{request?.supplier}</td>
                            <td className="p-2 border border-gray-200">{request?.createdAt}</td>
                            <td className="p-2 border border-gray-200">{request?.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}


export default QuotationMailList;