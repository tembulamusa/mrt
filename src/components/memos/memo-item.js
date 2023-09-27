

const MemoItem = (props) => {
    const { memo, key } = props;
    return (
        <>
            <tr key={key} className="w-full bg-white border-b border-gray-100">
                <td className="p-2">
                    {memo.type}
                </td>
                <td className="p-2">
                    {memo.description}
                </td>
                <td className="p-2">
                    {memo.status}
                </td>
            </tr>
        </>
        )
}


export default MemoItem;