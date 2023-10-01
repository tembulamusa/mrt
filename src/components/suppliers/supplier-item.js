import { useNavigate } from 'react-router-dom';

const SupplierItem = (props) => {
    const {supplier, key} = props;
    const navigate = useNavigate();

    const supplierDetail = (supplierId) => {
        navigate(`/supplier-details/${supplierId}`);
    }

    return (
        <>
            <tr key={key} className="w-full" onClick={() => supplierDetail(supplier.id)}>
                <td className="border border-gray-200 p-2">{supplier?.title}</td>
                <td className="border border-gray-200 p-2">{supplier?.primary_msisdn}</td>
            </tr>
        </>
    )
}


export default SupplierItem;