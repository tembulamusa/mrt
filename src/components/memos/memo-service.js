import MemoServiceItem from "./memo-service-item";
import NewMemoServiceItem from "./new-memo-service-item";

const memo_service_data = [
    {
        servive_id: 1,
        memo_id: 10,
        qty: "quantity",
        status: "my status"
    },
    {
        servive_id: 1,
        memo_id: 10,
        qty: "quantity",
        status: "my status"
    },
    {
        servive_id: 2,
        memo_id: 10,
        qty: "quantity",
        status: "my status"
    },
    {
        servive_id: 3,
        memo_id: 10,
        qty: "quantity",
        status: "my status"
    },
    {
        servive_id: 2,
        memo_id: 10,
        qty: "quantity",
        status: "my status"
    }

]


const MemoServices = (props) => {
    return (
        <>  
            <table className="w-full">
                <tbody className="w-full">
                    { memo_service_data?.map((memo_service_item, index) => (
                        <MemoServiceItem memoserviceitem = {memo_service_item} key= {index}/>
                        )
                    )
                    }
                </tbody>
            </table> 
            <NewMemoServiceItem />
        </>
    )
};

export default MemoServices;