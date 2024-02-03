import React, { useContext, useEffect, useState } from "react";
import { IoMdFootball } from "react-icons/io";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import EmptyRecordsDiv from "../utils/empty-records-div";
import makeRequest from "../utils/fetch-request";
import IsLoadingHtml from "../utils/loading.js";
import { Context } from "../../context/store.js";
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
    const [key, setKey] = useState("latest_events");
    const [fetchedGames, setFetchedGames] = useState([]);
    const [isFetchingEVents, setIsFetchingEvents] = useState(false);
    const [state, dispatch] = useContext(Context);

    const fetchEvents = (event) => {
        let endpoint = event;
        setIsFetchingEvents(true);
        
        makeRequest({url: endpoint, method: 'GET' }).then(([status, response]) => {
            if ([200, 201, 204].includes(status)) {
                setFetchedGames(response?.data?.events);
                setIsFetchingEvents(false);
            }
        })
    }

    useEffect(() => {
        fetchEvents(key)
    },[key])

    useEffect(() => {
        fetchEvents(key)
    },[])

    const buyEventTicket = (game) => {
        dispatch({type: "SET", key: "selectedevent", payload: game});
        dispatch({type: "SET", key: "showbuyticketmodal", payload: true});
    }

    const EventsHtml = (props) => {

        return (
                <ul className="capitalize font-lighter">

                    {isFetchingEVents ? <IsLoadingHtml /> : fetchedGames.length < 1 ? <EmptyRecordsDiv itemname = {key} /> : 
                        fetchedGames.map((event, idx) => (
                            <li className="block w-full py-1 px-2 bg-gray-200 mb-2 rounded">
                                <span id="home-team" className="w-1/4 inline-block">
                                    <img style={{width:"25px"}}
                                    className={'inline-block'}
                                    src={event?.home_team?.logo} /> {event?.home_team?.name}
                                </span>
                                <span className="rounded-2xl px-3 py-1  inline-block w-1/7 uppercase bg-gray-300 mx-4 font-bold">vs</span>
                                <span id="away-team" className="w-1/4 inline-block">
                                    <img style={{width:"25px"}}
                                    className={'inline-block'}
                                    src={event?.away_team?.logo} /> {event?.away_team?.name}
                                </span>

                                <span className="text-red-600 font-bold inline-block w-1/4">{(new Date(event?.start_date).toDateString())}</span>
                                <button className="bg-red-600 py-1 px-3 text-white inline-block rounded-md font-normal" onClick={() => buyEventTicket(event)}>Buy Ticket</button>
                            </li>
                        ))
                    }
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
                <Tab eventKey="latest_events" title="Latest Events">
                    <EventsHtml />
                </Tab>
                <Tab eventKey="upcoming_events" title="Coming Events">
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