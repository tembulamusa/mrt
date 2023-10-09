import React, {useState, useCallback, useEffect, useContext} from "react";
import { useNavigate } from 'react-router-dom';
import { Context } from "../../context/store";

const MemoItem = (props) => {
    const { memo, key } = props;
    const navigate = useNavigate();
    const [state, dispatch] = useContext(Context);


    const memoDetail = (memo) => {

        dispatch({type: "SET", key: "latestmemoobj", payload: memo})
        navigate(`/memo-details/${memo.memoId}`);
    }
    return (
        <>
            <tr key={key} className="w-full border-b border-gray-100" onClick={() => memoDetail(memo)}>
                
                <td className="p-2 border border-blue-70">
                    {memo.referenceNumber}
                </td>
                <td className="p-2 border border-blue-70">
                    {memo.description}
                </td>
                <td className="p-2 border border-blue-70">
                    {memo.createdAt}
                </td>
                <td className="p-2 border border-blue-70">
                    {memo.status}
                </td>
                
            </tr>
        </>
        )
}


export default MemoItem;