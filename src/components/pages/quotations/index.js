import ReceivedQuotationList from "../../quotations";

const QuotationsIndex = (props) => {

    return (
        <>
            <h1 className="text-2xl mb-2">Quotations</h1>
            <div className="mb-3" id="search-bar">
                <select className="border border-gray-200 p-2 mr-2">
                    <option>Select Status</option>
                    <option>Pending</option>
                    <option>Awarded</option>
                    <option>Declined</option>
                </select>

                {/* Dynamically get the services */}
                <select className="border border-gray-200 p-2 mr-2">
                    <option>Select Service</option>
                    <option>Car Hire</option>
                    <option>Air</option>
                    <option>Chopper</option>
                    <option>Hotel</option>
                </select>
                <input className="border border-gray-200 p-2 rounded" placeholder="Enter Memo Ref or Description" />
            </div>
            
            <ReceivedQuotationList />
        </>
    )
};


export default QuotationsIndex;