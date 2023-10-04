import React from 'react';
import { MDBSwitch } from 'mdb-react-ui-kit';

const AdminRoleItem = (props) => {
    const {role, key} = props;
    return (
        <tr className="w-full">
            <td className="p-2 border border-blue-60 flex xlex-row">{role.title}</td>
            <td className='p-2 border border-blue-60 w-10'><MDBSwitch id='flexSwitchCheckDefault'/></td>
        </tr>
    )
}


export default AdminRoleItem;