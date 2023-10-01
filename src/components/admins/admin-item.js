import { useNavigate } from 'react-router-dom';


const AdminItem = (props) => {
    const {adminitem, key} = props;
    const navigate = useNavigate();

    const adminDetail = (adminId) => {
        navigate(`/admin-details/${adminId}`);
    }

    return (
        <>
            <tr key={key} className="w-full" onClick={() => adminDetail(adminitem.id)}>
                <td className="p-2">{adminitem.name}</td>
                <td className="p-2">{adminitem.email}</td>
            </tr>
        </>
    )
}

export default AdminItem;