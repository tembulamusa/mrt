

const MemoItem = (props) => {
    const { memo, key } = props;
    return (
        <>
            <tr key={key} className="w-full border-b border-gray-100">
                <td className="p-2 border border-blue-70">
                    {memo.title}
                </td>
                <td className="p-2 border border-blue-70">
                    {memo.referenceNumber}
                </td>
                <td className="p-2 border border-blue-70">
                    {memo.created}
                </td>
                <td className="p-2 border border-blue-70">
                    {memo.status}
                </td>
                
            </tr>
        </>
        )
}


export default MemoItem;