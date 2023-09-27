


const MemoServiceItem = (props) => {
    const {memoserviceitem, key} = props;
    return (
        <tr className="w-full" key={key}><td className="border border-gray-100 p-2">{memoserviceitem.servive_id}</td></tr>
    )
}

export default MemoServiceItem;