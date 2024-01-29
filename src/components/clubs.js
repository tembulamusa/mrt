import React from "react";
import { Link } from "react-router-dom";
import { GiGamepad } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";


const Teams = ["tusker", "ulinzi", "nairobi", "shabana","kenya_police", "posta", "nzoia", "muranga"]

const Clubs = (props) => {
    return (
        <>
            <section className='bg-white' id='search-section h-1.5'>
                <div className='container relative w-full'>
                    <div className='bg-gray-200 flex flex-row absolute w-full bg-white -mt-3 rounded-md shadow-[0_0_2px_2px_rgba(0,0,0,0.1)] border border-gray-500'><span className='mr-3 p-2'><FaSearch className='' /></span><input className='w-100 p-2 border-' placeholder='Search by Events, teams' /></div>
                    
                    <div className='py-5 text-gray-600'>
                        <div className='font-bold py-4'><GiGamepad className='inline-block mr-1 text-gray-600 text-2xl'/>
                            Follow Team
                            <span className='float-right'>
                                left - right
                            </span>
                        
                        </div>

                        {/* Teams from APIs */}
                        <div className='pb-4'>
                            {Teams.map((team, idx) => (
                                <Link to="/">
                                    <img
                                     className={'align-self-center inline-block px-2 w-1/7'}
                                     src={require(`../assets/img/teams/${team}.svg`)}/>
                                </Link>
                            ))}
                            {/* <Link to="/"></Link> */}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default React.memo(Clubs);