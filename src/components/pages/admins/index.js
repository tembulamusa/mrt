import React, {useState, useCallback, useEffect, useContext} from "react";
import AdminItem from "../../admins/admin-item";
import NewAdminModal from "../../admins/new-admin-modal";
import makeRequest from "../../utils/fetch-request";
import {getFromLocalStorage} from '../../utils/local-storage'; 
import { Context } from "../../../context/store";
import {toast, ToastContainer} from 'react-toastify';


const testAdmins = [
    {
        id: 1,
        name: "name1",
        email: "some email",
        extra: "some more detail"
    },
    {
        id: 2,
        name: "name2",
        email: "some email2",
        extra: "some more detail"
    },
    {
        id: 3,
        name: "name3",
        email: "some email3",
        extra: "some more detail"
    },
    {
        id: 4,
        name: "name4",
        email: "some email4",
        extra: "some more detail"
    },
    {
        id: 5,
        name: "name5",
        email: "some email5",
        extra: "some more detail"
    },
];

const testUserRoles = [
    {
        name: "some role name",
        id: 1
    },

    {
        name: "some role name2",
        id: 2
    },
    {
        name: "some role name3",
        id: 3
    },
    {
        name: "some role name4",
        id: 4
    },

]
const AdminIndex = (props) => {
    const [admins, setAdmins] = useState([]);
    const [state, dispatch] = useContext(Context);
    const [isRequesting, setIsRequesting] = useState(true);

    const Notify = (message) => {
        let options = {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: 673738 /* this is hack to prevent multiple toasts */
        }
        if (message.status === 200) {
            toast.success(`🚀 ${message.message}`, options);
        } else {
            toast.error(`🦄 ${message.message}`, options);
        }

    };

    const getAdmins = () => {
        let endpoint = "/users";
        makeRequest({url: endpoint, method: 'GET' }).then(([status, response]) => {

            setIsRequesting(false)
            if ([200, 201, 204].includes(status)) {
                setAdmins(response?.message);

            } else {
                let message = {
                    status: response.status,
                    message: response?.status || "Error fetching Memos."
                };
                Notify(message);
            }
        })
    }

    useEffect(() => {
        getAdmins();
     }, []);

    const [showNewAdminForm, setShowNewAdminForm] = useState(false);
    return (
        <>
        <div className="bg-white p-2 flex flex-row w-full">
         
            <div id="admin-users" className="flex flex-col w-full">
                <h1 className="bg-white mb-2 pb-2 border- boder-gray-200 text-2xl">Admins <button className="p-2 rounded bg-green-500 text-white float-end text-sm" onClick={() => setShowNewAdminForm(true) }>Add Admin</button></h1>
                <table className="w-full">
                    <tbody className="[&>*:nth-child(even)]:bg-blue-50">
                        {admins.map((admin, index) => (
                            <AdminItem adminitem={admin} key={index} />
                        ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
        <NewAdminModal shownewadminform={showNewAdminForm} adminroles={testUserRoles}/>
        </>
    )
}


export default AdminIndex;