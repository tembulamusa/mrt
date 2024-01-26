import {useLocation, useParams, useSearchParams} from 'react-router-dom';
import {Context} from '../context/store';
import makeRequest from './utils/fetch-request';
import Header from './header/header.js'
import CardHolder from '../assets/svg/card-holder.svg';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { GiGamepad } from "react-icons/gi";
import Matches from './matches/index.js';



const Teams = ["tusker", "ulinzi", "nairobi", "shabana","kenya_police", "posta", "nzoia", "muranga"]
const Games = [
    {
        home_team: "bournemouth",
        away_team: "chelsea",
        date: "24-1-2024",
        competition: "premier league"
    },
    {
        home_team: "tusker",
        away_team: "shabana",
        date: "24-1-2024",
        competition: "premier league"
    },
    {
        home_team: "ulinzi",
        away_team: "nairobi",
        date: "24-1-2024",
        competition: "premier league"
    },

]
const Index = (props) => {
    return (
        <div className='main w-100'>
            <Header headertype="main" />
            <section id='' className=" bg-red-500 text-white pt-7">
                <div className='container mt-7 pt-7 flex flex-row'>
                    <div className='w-50 pt-4'>
                        <div className='text-5xl py-3 font-bold'>Kenya’s Premier <br/>Sports Experience <br/>Website</div>
                        <div className=''>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et rhoncus purus, eget pretium lacus. Phasellus semper turpis est, tincidunt volutpat augue porttitor sit amet.</div>
                    </div>
                    <div id='image-section' className='w-50'>
                        <img src={CardHolder} />
                    </div>
                </div>
            </section>

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

            <section id='next-games' className='bg-red-200'>
                <div className='container py-5 capitalize'>
                    {Games.map((game, idx) => (
                        <div className='text-center w-1/3 inline-block p-3'>
                            <div className='bg-white p-3 py-4 rounded shadow-md'>
                                <div className='font-bold'>{game.date}</div>
                                <div className='capitalize text-gray-400'>{game.competition}</div>
                                <div className='my-3'>
                                        <div className='text-red-500 inline-block w-1/3'>
                                            <img style={{width:"35px"}}
                                            className={'mx-auto'}
                                            src={require(`../assets/img/teams/${game.home_team}.svg`)}/>
                                            {game.home_team}
                                        </div>
                                        <div className='bg-gray-200 rounded font-bold text-2xl inline-block w-1/3'>0 - 0</div>
                                        <div className='text-red-500 inline-block w-1/3'>
                                            <img style={{width:"35px"}}
                                            className={'mx-auto'}
                                            src={require(`../assets/img/teams/${game.away_team}.svg`)}/>
                                            {game.away_team}
                                        </div>
                                        
                                </div>

                                <button className='bg-red-600 rounded-md text-white p-3 py-2 mt-4 w-full'>Buy Ticket</button>
                            </div>
                        </div>
                    ))}
                </div>

            </section>

            <section id='football-matches' className='bg-white'>
                <div className='container pt-8'>
                    <Matches />
                </div>
            </section>
        </div>
    )
}

export default Index;
