import React, { useState } from "react";
import { IoMdFootball } from "react-icons/io";


const Games = [
    {
        home_team: "nzoia",
        away_team: "bournemouth",
        date: "20-1-2024",
        scores: [0, 0]
    },
    {
        home_team: "shabana",
        away_team: "tusker",
        date: "20-1-2024",
        scores: [0, 0]
    },
    {
        home_team: "nzoia",
        away_team: "nairobi",
        date: "22-1-2024",
        scores: [0, 0]
    },
    {
        home_team: "ulinzi",
        away_team: "bournemouth",
        date: "23-1-2024",
        scores: [0, 0]
    }
]
const Matches = (props) => {
    const [active, setActive] = useState("all_matches")
    return (
        <>
            <div className="font-bold my-4"><IoMdFootball className="inline-block"/> Football Matches</div>

            <div id="filter" className="">
                <ul className={`pt-3 text-gray-400 border-b border-gray-200 mb-3`}>
                    <li className="text-gray-700 inline-block mr-3 py-2 pb-3 border-b-2 border-blue-500">latest Matches</li>
                    <li className="inline-block mr-3 py-2 pb-3">Coming Matches</li>
                    <li className="inline-block mr-3 py-2 pb-3">Pre-season</li>
                    <li className="inline-block mr-3 py-2 pb-3">Live Games</li>
                    <li className="inline-block mr-3 py-2 pb-3">Fun football</li>
                </ul>
                <ul className="capitalize font-bold">
                    {Games.map((game, idx) => (
                        <li className="block w-full py-1 px-2 bg-gray-200 mb-2 rounded">
                            <span id="home-team" className="w-1/4 inline-block">
                                <img style={{width:"25px"}}
                                className={'inline-block'}
                                src={require(`../../assets/img/teams/${game.home_team}.svg`)} /> {game.home_team}
                            </span>
                            <span className="rounded-2xl px-3 py-1  inline-block w-1/7 uppercase bg-gray-300 mx-4">vs</span>

                            <span id="away-team" className="w-1/4 inline-block">
                                <img style={{width:"25px"}}
                                className={'inline-block'}
                                src={require(`../../assets/img/teams/${game.away_team}.svg`)} /> {game.away_team}
                            </span>

                            <span className="text-red-600 font-bold inline-block w-1/4">{game.date}</span>
                            <button className="bg-red-600 py-1 px-3 text-white inline-block rounded-md font-normal">Buy Ticket</button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default React.memo(Matches)