import QuotationItem from "./quotation-item";


const quotations = [
    {
        supplier: "some name",
        amount: 300,
        status: "pending",
        memoId: 1,
        serviceId: 3,
        deadlineDate: "2023-3-4 10:23:59",
        createdAt: "2023-10-9 20:25:30",
        createdBy: "some name"
    },
    {
        supplier: "some name",
        amount: 200,
        status: "pending",
        memoId: 1,
        serviceId: 3,
        deadlineDate: "2023-3-4 10:23:59",
        createdAt: "2023-10-9 20:25:30",
        createdBy: "some name"
    },
    {
        supplier: "some name",
        amount: 100,
        status: "awarded",
        memoId: 1,
        serviceId: 3,
        deadlineDate: "2023-3-4 10:23:59",
        createdAt: "2023-10-9 20:25:30",
        createdBy: "some name"
    },
    
]
const ReceivedQuotationList = (props) => {

    return (
        <>
            <div id="topBar" className="mb-3 flex flex-row">
                <input className="border border-gray-300 rounded-md p-2" placeholder="Enter supplier Name" />
            </div>

            <table className="w-full">
                <tbody className="w-full [&>*:nth-child(even)]:bg-blue-100">
                    {quotations.map((quotation, index) => (
                        <QuotationItem entry={quotation} key={index} />
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default ReceivedQuotationList;