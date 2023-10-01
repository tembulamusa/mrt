import QuotationItem from "../../quotations/quotation-item";

const testData = [
    {
        quotation_id: 1,
        supplier_id: 2,
        service_id: 1,
        amount: 300,
        deadline_date: "date",
        status: "awarded"
    },
    {
        quotation_id: 2,
        supplier_id: 2,
        service_id: 1,
        amount: 100,
        deadline_date: "date",
        status: "declined"
    },
    {
        quotation_id: 1,
        supplier_id: 2,
        service_id: 1,
        amount: 30,
        deadline_date: "date",
        status: "pending"
    },
    {
        quotation_id: 1,
        supplier_id: 2,
        service_id: 1,
        amount: 20,
        deadline_date: "date",
        status: "awarded"
    },

];

const QuotationsIndex = (props) => {

    return (
        <>
            <h1 className="text-2xl mb-2">Quotations</h1>
            <div className="mb-3" id="search-bar">
                <select className="border border-gray-200 p-2 mr-2">
                    <option>All Quotations</option>
                    <option>Pending</option>
                    <option>Awarded</option>
                    <option>Declined</option>
                </select>

                {/* Dynamically get the services */}
                <select className="border border-gray-200 p-2 mr-2">
                    <option>All Services</option>
                    <option>Car Hire</option>
                    <option>Air</option>
                    <option>Chopper</option>
                    <option>Hotel</option>
                </select>
                <input className="border border-gray-200 p-2 rounded" placeholder="Enter Memo" />
            </div>
            <table className="w-full">
                <tbody className="[&>*:nth-child(even)]:bg-blue-50">
                {   
                    testData.map((entry, index) => (
                        <QuotationItem entry = {entry} key = {index} />
                    ))
                    
                }
                </tbody>
            </table>
        </>
    )
};


export default QuotationsIndex;