import React, { useContext } from "react";
import { Context } from "../context/store";

const SampleGames = [
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
const Games = (props) => {
    const [state, dispatch] = useContext(Context);
    return (
        <section id='next-games' className={`bg-${state?.followingclub ? state?.followingclub.bg_color: "red" }-200`}>
                <div className='container py-5 capitalize'>
                    {SampleGames.map((game, idx) => (
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

                                <button className={`bg-${state?.followingclub ? state?.followingclub.bg_color: "red"}-600 rounded-md text-white p-3 py-2 mt-4 w-full`}>Buy Ticket</button>
                            </div>
                        </div>
                    ))}
                </div>

            </section>
    )
}

export default React.memo(Games)