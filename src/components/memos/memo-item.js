import React, {useState, useCallback, useEffect, useContext} from "react";
import { useNavigate } from 'react-router-dom';
import { Context } from "../../context/store";

const MemoItem = (props) => {
    const { memo, key } = props;
    const navigate = useNavigate();
    const [state, dispatch] = useContext(Context);


    const memoDetail = (memo) => {

        dispatch({type: "SET", key: "currentselectedmemo", payload: memo})
        navigate(`/memo-details/${memo.id}`);
    }
    return (
        <>
            <tr key={key} className="w-full border-b border-gray-100" onClick={() => memoDetail(memo)}>
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