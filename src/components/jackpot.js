import React, {useEffect, useCallback, useState} from "react";

import Header from './header/header';
import Footer from './footer/footer';
import SideBar from './sidebar/awesome/Sidebar';
import {JackpotMatchList, JackpotHeader} from './matches/index';
import makeRequest from "./utils/fetch-request";
import dailyJackpot from '../assets/img/banner/jackpots/DailyJackpot.png'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Container from "react-bootstrap/Container";

const Right = React.lazy(() => import('./right/index'));

const Jackpot = (props) => {
    const [matches, setMatches] = useState(null);
    const [weeklyJPMatches, setWeeklyJPMatches] = useState(null);
    const [dailyJPMatches, setDailyJPMatches] = useState(null);
    const [message, setMessage] = useState(null);
    const [showEmptyWeeklyJackpot, setShowEmptyWeeklyJackpot] = useState(false);
    const [showEmptyDailyJackpot, setShowEmptyDailyJackpot] = useState(false);
    const [disabledWeekly, setDisabledWeekly] = useState(false);
    const [disabledDaily, setDisabledDaily] = useState(false);
    const [currentJackpot, setCurrentJackpot] = useState(null);

    const fetchData = (jpType) => {
        let match_endpoint = `/v1/matches/jackpot?key=${jpType}`;

        makeRequest({url: match_endpoint, method: "get", data: null}).then(
            ([m_status, m_result]) => {
                if (m_status === 200) {

                if (jpType == "jp"){
                    setDailyJPMatches(m_result);
                    setShowEmptyDailyJackpot(true);
                    setDisabledDaily(true);
                    setWeeklyJPMatches(false);
                    setShowEmptyWeeklyJackpot(false)
                    setDisabledWeekly(false);
                    // setCurrentJackpot(dailyJPMatches);
                    setMatches(m_result);
                } else if (jpType == "wjp") {
                    setWeeklyJPMatches(m_result);
                    setShowEmptyWeeklyJackpot(true);
                    setDisabledWeekly(true);
                    setDailyJPMatches(false);
                    setShowEmptyDailyJackpot(false)
                    setDisabledDaily(false);
                    // setCurrentJackpot(weeklyJPMatches);
                    setMatches(m_result);
                } else {
                    setMatches(m_result);
                }

                
            } else {
                setMessage("An error occurred");
            }
            });
        

    };


    const EmptyJackpotPageMarkup = (props) => {
        return (
            <div>

            </div>
            )
    }

    const JackpotsHeader = () => {
        return (
            <div className="jp-header">
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-3"></div>
                    <div className="col">
                        <span className="jp-pick-type">Home</span> 
                        <span className="jp-pick-type">Draw</span>
                        <span className="jp-pick-type">Away</span>
                    </div>
                </div>
            </div>
            )
    }
    const JackpotsListing = () => {
        return (
            <div className="jackpots">
                <div className="jackpot-body">
                    <div className="weekly-jackpot jackpot-entry p-3 pb-4 mt-3 mb-3 primary-bg">
                        <div className="row">
                            {/* We'll fetch the jackpots first. due to detail */}
                            <div className="col-4">
                                <h3>TSH. 50,000,000</h3>
                            </div>

                            <div className="col-4">
                                <h4 className="uppercase">Biko weekly jackpot</h4>
                                <p className="more-info-text detail-text">Pick 17 games, Prizes from correct 13</p>
                            </div>

                            <div className="col-4">
                                <h4>30/01/2023 4.00 PM</h4>
                            </div>

                            <div className="col-12">
                                <button onClick={() => fetchData("wjp")}
                                    disabled={disabledWeekly}
                                    className="bold mt-2 btn-lg btn btn-primary deposit-withdraw-button secondary-red-bg uppercase btn-play-jackpot btn-weekly full-width">
                                    Play for TSH. 5
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="jackpot-matches">
                        <div className="weekly-jp jackpot-games">

                            {weeklyJPMatches?.data?.length > 0 ? (
                                <>  
                                    <JackpotsHeader />
                                    <JackpotMatchList matches={weeklyJPMatches}/>
                                </>
                            ) : ( showEmptyWeeklyJackpot? (
                                    <div className={'col-md-12 text-center background-primary  mt-2 p-3'}>
                                        There are no active Weekly jackpots at the moment.
                                    </div>) : ("") 
                                
                            )}
                        </div>
                    </div>
                </div>
                <div className="jackpot-body">
                    <div className="daily-jackpot jackpot-entry p-3 pb-4 mt-4 yellow-bg-2">
                        <div className="row">
                            {/* We'll fetch the jackpots first. due to detail */}
                            <div className="col-4">
                                <h3 className="black-text-shadow">TSH. 10,000,000</h3>
                            </div>

                            <div className="col-4">
                                <h4 className="uppercase black-text-shadow">Biko Daily jackpot</h4>
                                <p className="bold more-info-text detail-text">Pick 13 games, Prizes from correct 8</p>
                            </div>

                            <div className="col-4 black-text-shadow">
                                <h4>29/01/2023  4.00PM</h4>
                            </div>

                            <div className="col-12">

                                <button onClick={() => fetchData("jp")}
                                    disabled={disabledDaily}
                                    className="mt-2 btn-lg btn btn-primary bold deposit-withdraw-button uppercase btn-play-jackpot btn-daily full-width">
                                    Play for TSH. 5
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="jackpot-matches">
                        <div className="daily-jp jackpot-games">

                            {dailyJPMatches?.data?.length > 0 ? (
                                <>  
                                    <JackpotsHeader />
                                    <JackpotMatchList matches={dailyJPMatches}/>
                                </>
                            ) : ( showEmptyDailyJackpot? (
                                    <div className={'col-md-12 text-center background-primary  mt-2 p-3'}>
                                        There are no active Daily jackpots at the moment.
                                    </div>) : ("") 
                                
                            )}
                        </div>
                    </div>

                </div>


            </div>
        )
    }

    
    const JackpotTabs = () => {
        return (
            <Tabs
            variant={'tabs'}
            defaultActiveKey={"home"}
            id=""
            className="background-primary menu-type-tabs"
            justify>

            <Tab eventKey="home" 
              title=" ALL JACKPOTS" 
              className={'background-primary'}
              >
                <JackpotsListing />

            </Tab>

            <Tab 
               eventKey="results" 
               title="RESULTS"
               >
                <div className="jp-results remove-last-element">
                    <JackpotHeader jackpot={matches?.meta}/>
                    <div className="matches full-mobile sticky-top container">
                        <div
                            className="top-matches d-flex position-sticky  p-4">
                            <div className="col-md-3 bold">
                                TIME
                            </div>
                            <div className="col-md-6 bold">
                                MATCH
                            </div>
                            <div className="col-md-3 bold">
                                OUTCOME
                            </div>
                        </div>
                    </div>
                </div>    

                {matches?.data.map((match, index) => (
                    <div className={'matches full-width'} key={index}>
                        <Container className="web-element">
                            <div
                                className="col-md-12 d-flex flex-row p-2 top-matches">
                                <div className="col-md-3">
                                    {match?.start_time}
                                </div>
                                <div className="col-md-6 d-flex flex-column">
                                    <div className={'small'}>
                                        {match?.category} | {match?.competition_name}
                                    </div>
                                    <div>
                                        <div className={'bold'}>
                                            {match?.home_team}
                                        </div>
                                        <div className={'bold'}>
                                            {match?.away_team}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    {match?.outcome || '-'}
                                </div>
                            </div>
                        </Container>
                    </div>
                ))}
            </Tab>


            <Tab eventKey="rules" 
              title=" RULES" 
              className={'background-primary'}
              disabled = {matches?.meta.status == 'INACTIVE'}
              >
                {matches?.data?.length > 0 ? (
                    <>
                        <JackpotHeader jackpot={matches?.meta}/>
                        <JackpotMatchList matches={matches}/>
                    </>
                ) : (
                    <div
                        className={'col-md-12 text-center background-primary  mt-2 p-3'}>
                        There are no active jackpots at the moment.
                    </div>
                )}
            </Tab>
        </Tabs>
        )
    }

    

    return (
        <>
            <Header/>
            <div className="amt">
                <div className="d-flex flex-row justify-content-between">
                    <SideBar loadCompetitions/>
                    <div className="gz home" style={{width: "100%"}}>
                        <div className="homepage">
                            <JackpotTabs />
                            
                        </div>
                    </div>
                    <Right jackpot={true} jackpotData={matches?.meta}/>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Jackpot
