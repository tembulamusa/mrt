import MemoItem from "./memo-item"


const dummy = [
    {
        type: "road",
        description: "description sample",
        status: "assigned"
    },
    {
        type: "airline",
        description: "description sample",
        status: "delivered"
    },
    {
        type: "chopper",
        description: "description sample",
        status: "defaulted"
    },
    {
        type: "hotel",
        description: "description sample",
        status: "assigned"
    },
    {
        type: "hotel",
        description: "description sample",
        status: "delivered"
    },
    {
        type: "road",
        description: "description sample",
        status: "delivered"
    },
];

const LatestMemos = (props) => {
    return (
        <>
            <table className="table-auto w-full text-sm text-gray-500 px-3 ">
                <tbody className="w-full ">
                { dummy?.map((memo, index) => (
                    <MemoItem item = {memo} key= {index}/>
                ))}    
                </tbody>
            </table>

        </>
    )
}

export default LatestMemos;