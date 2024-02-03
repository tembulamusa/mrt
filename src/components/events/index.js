import React, { useState } from "react";
import { IoMdFootball } from "react-icons/io";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

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
const Events = (props) => {
    const [active, setActive] = useState("all_matches")
    const [key, setKey] = useState("latest_matches");

    const EventsHtml = (props) => {

        return (
                <ul className="capitalize font-lighter">
                    {Games.map((game, idx) => (
                        <li className="block w-full py-1 px-2 bg-gray-200 mb-2 rounded">
                            <span id="home-team" className="w-1/4 inline-block">
                                <img style={{width:"25px"}}
                                className={'inline-block'}
                                src={require(`../../assets/img/teams/${game.home_team}.svg`)} /> {game.home_team}
                            </span>
                            <span className="rounded-2xl px-3 py-1  inline-block w-1/7 uppercase bg-gray-300 mx-4 font-bold">vs</span>

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
        )
    }
    return (
        <>
            <div className="font-bold my-4"><IoMdFootball className="inline-block"/> Football Matches</div>

            <Tabs
                id="events-selector"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="events-selector mb-3"
                >
                <Tab eventKey="latest_matches" title="Latest Matches">
                    <EventsHtml />
                </Tab>
                <Tab eventKey="coming_matches" title="Coming Matches">
                    <EventsHtml />                   
                </Tab>
                <Tab eventKey="pre_season" title="Pre-season">
                    <EventsHtml />                   
                </Tab>
                <Tab eventKey="live_games" title="Live Games">
                    <EventsHtml />                    
                </Tab>
                <Tab eventKey="fun_football" title="Fun Football">
                    <EventsHtml />                 
                </Tab>
            </Tabs>
        </>
    )
}

export default React.memo(Events)