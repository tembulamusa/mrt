import RecentTrend from '../graphs/db-main';
import {HiOutlineUserAdd, HiOutlinePlus} from "react-icons/hi";
import {RiFolderReceivedLine} from "react-icons/ri";
import {AiOutlineUserDelete} from "react-icons/ai";
import {MdOutlineSmsFailed} from "react-icons/md";
import {FiUsers} from "react-icons/fi";
import {FaFirstOrder} from "react-icons/fa";
import LatestMemos from '../memos/latest-memos';
import LatestUsers from '../users/latest-suppliers';


const AdminDashboard = (props) => {

    return (
        <>
            {/* top important listed items */}
            <div className="">
                    <div className="inline-block text-center w-1/5 mb-2 p-2">
                        <div className="border border-gray-100 p-3">
                            <div className="block text-1xl text-green-500">
                                Add New Memo
                            </div>
                            <div className='flex items-center justify-center text-4xl text-gray-400 mt-1 mb-1'>
                                <HiOutlinePlus />
                            </div>
                            <div className="text-1xl py-1 font-bold text-red-500">
                                7 pending
                            </div>
                        </div>
                    </div>

                    <div className="inline-block text-center w-1/5 mb-2 p-2">
                        <div className="border border-gray-100 p-3">
                            <div className="block text-1xl text-green-500">
                                    Create New User
                            </div>
                            <div className='flex items-center justify-center text-4xl text-gray-400 mt-1 mb-1'>
                                    <HiOutlineUserAdd />
                            </div>
                            <div className="text-1xl py-1 font-bold text-blue-500">
                                    100
                            </div>
                        </div>
                    </div>

                    <div className="inline-block text-center w-1/5 mb-2 p-2">
                        <div className="border border-gray-100 p-3">
                            <div className="block text-1xl text-blue-500">
                                    Received Quotations
                            </div>
                            <div className='flex items-center justify-center text-4xl text-green-400 mt-1 mb-1'>
                                    <RiFolderReceivedLine />
                            </div>
                            <div className="text-1xl py-1 font-bold text-gray-500">
                                    5
                            </div>
                        </div>
                    </div>

                    <div className="inline-block text-center w-1/5 p-2 mb-2">
                        <div className="border border-gray-100 p-3">
                            <div className="block text-1xl text-yellow-500">
                                    Unresponsive Suppliers
                            </div>
                            <div className='flex items-center justify-center text-4xl text-yellow-400 mt-1 mb-1'>
                                    <AiOutlineUserDelete />
                            </div>
                            <div className="text-1xl py-1 font-bold text-yellow-500">
                                    6
                            </div>
                        </div>
                    </div>

                    <div className="inline-block text-center w-1/5 p-2 mb-2">
                        <div className="border border-gray-100 p-3">
                            <div className="block text-1xl text-red-500">
                                    Failed Memos
                            </div>
                            <div className='flex items-center justify-center text-4xl text-red-400 mt-1 mb-1'>
                                    <MdOutlineSmsFailed />
                            </div>
                            <div className="text-1xl py-1 font-bold text-red-500">
                                    15
                            </div>
                        </div>
                    </div>
            </div>

            {/* the graphs and such non/un-important info */}
            <div id="general-info" className="p-2 block">
                <div className="inline-block min-h-full w-3/5 bg-blue-50 p-2">
                    <div className="border border-blue-100 flex flex-col">
                        <div>
                        Latest Trends
                        <RecentTrend />
                        </div>
                    </div>
                </div>

                <div className="h-[390px] min-h-full p-2 w-1/5 inline-block">
                    <div className="border border-gray-100 min-h-full w-100 text-center flex flex-col p-2">
                        <div className='my-3'>
                            Memos
                        </div>

                        <div className='flex justify-center text-9xl text-gray-400 mt-1 mb-1'>
                            <FaFirstOrder />
                        </div>

                        <div className="my-3">
                            1265
                        </div>
                    </div>
                </div>

                <div className="h-[390px] min-h-full p-2 w-1/5 inline-block">
                    <div className="border border-gray-100 min-h-full w-100 text-center flex flex-col p-2">
                        <div className='my-3'>
                            Suppliers
                        </div>
                        <div className='flex items-center justify-center text-9xl text-gray-400 mt-1 mb-1'>
                            <FiUsers />
                        </div>
                        <div className="my-3">
                            1265
                        </div>
                    </div>
                </div>
            </div>

            {/* New memos */}
            <div id='bottom-dashboard' className='border-t bg-blue-50 border-gray-200 py-4 px-2 mt-3 flex'>
                <div className='flex flex-col inline-block w-3/5 pr-5'>
                    <h3 className='text-blue-400 text-2xl mb-3'>Latest Memos</h3>
                    <LatestMemos />
                    <div className='text-center py-3 bg-white'>
                        <button className='bg-green-400 text-white rounded shadow-sm py-2 px-3'>Add New Memo</button>
                    </div>
                </div>


                <div className='flex flex-col inline-block w-2/5'>
                    <h3 className='text-blue-400 text-2xl mb-3'>Service Suppliers</h3>
                    <LatestUsers />
                    
                    <div className='text-center bg-white py-3'>
                        <button className='bg-blue-400 text-white rounded shadow-sm py-2 px-3'>Add New Supplier</button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default AdminDashboard;