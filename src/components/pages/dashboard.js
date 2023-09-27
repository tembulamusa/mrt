import AdminDashboard from "../dashboard/admin";


const Dashboard = (props) => {

    return (
        <>
            {/* if user is admin load admin dashboard*/}
            <AdminDashboard />
        </>
    )
};

export default Dashboard;