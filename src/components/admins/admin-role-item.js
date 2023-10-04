import React from 'react';
import { MDBSwitch } from 'mdb-react-ui-kit';

const AdminRoleItem = (props) => {
    const {role, key} = props;
    return (
        <tr className="w-full">
            <td className="p-2 border border-blue-60">{role.title}</td>
        </tr>
    )
}


export default AdminRoleItem;