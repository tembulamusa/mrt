import { useNavigate } from 'react-router-dom';


const ServiceItem = (props) => {
    const {serviceitem, key} = props;
    const navigate = useNavigate();

    const serviceDetail = (serviceId) => {
        navigate(`/service-details/${serviceId}`);
    }

    return (
        <>
            <tr className="w-full" key={key} onClick={() => serviceDetail(serviceitem.id)}>
                <td className="p-2 border border-gray-100">{serviceitem.title}</td>
            </tr>
        </>
    )
    
}

export default ServiceItem;