import AdminItem from "../../admins/admin-item";

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

    return (
        <div className="bg-white p-2 flex flex-row w-full">

            
            <div id="admin-users" className="flex flex-col w-70 pr-2">
                <h1 className="bg-white mb-2 pb-2 border-b border-gray-200">Users - Admins <button className="p-2 rounded bg-green-500 text-white">Add Admin</button></h1>
                <table className="w-full">
                    <tbody className="[&>*:nth-child(even)]:bg-blue-50">
                        {testAdmins.map((admin, index) => (
                            <AdminItem adminitem={admin} key={index} />
                        ))
                        }
                    </tbody>
                </table>
            </div>

            <div id="user-roles" className="flex flex-col w-30 pl-2">
                <h1 className="text-2xl">Admin Roles</h1>
                <table className="w-full">
                    <tbody className="[&>*:nth-child(even)]:bg-blue-50">
                        {testUserRoles.map((role, index) => (
                            <tr key={index} className="w-full">
                                <td className="p-2">{role.name}</td>
                            </tr>
                        ))}
                        <tr><td><input placeholder="Add new role" className="mr-2 p-2 rounded-sm border border-gray-200"/><button className="bg-blue-400 text-white p-1 rounded">Add Role</button></td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export default AdminIndex;