import MemoItem from "./memo-item"


const dummy = [
    {
        title: "road",
        description: "description sample",
        status: "assigned",
        created: "date",
        referenceNumber: "some number"
    },
    {
        title: "airline",
        description: "description sample",
        status: "delivered",
        created: "date",
        referenceNumber: "some number"
    },
    {
        title: "chopper",
        description: "description sample",
        status: "defaulted",
        created: "date",
        referenceNumber: "some number"
    },
    {
        title: "hotel",
        description: "description sample",
        status: "assigned",
        created: "date",
        referenceNumber: "some number"
    },
    {
        title: "hotel",
        description: "description sample",
        status: "delivered",
        created: "date",
        referenceNumber: "some number"
    },
    {
        title: "road",
        description: "description sample",
        status: "delivered",
        created: "date",
        referenceNumber: "some number"
    },
];

const LatestMemos = (props) => {
    return (
        <>
            <table className="table-auto w-full text-sm text-gray-500 px-3 ">
                <tbody className="w-full ">
                { dummy?.map((memo, index) => (
                    <MemoItem memo = {memo} key= {index}/>
                ))}    
                </tbody>
            </table>

        </>
    )
}

export default LatestMemos;