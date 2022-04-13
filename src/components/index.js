import React, {useContext, useEffect,  useCallback, useState} from "react";
import {useLocation} from 'react-router-dom';
import {Context} from '../context/store';
import makeRequest from './utils/fetch-request';

const Header = React.lazy(()=>import('./header/header'));
const Footer = React.lazy(()=>import('./footer/footer'));
const SideBar = React.lazy(()=>import('./sidebar/sidebar'));
const CarouselLoader = React.lazy(()=>import('./carousel/index'));
const MainTabs = React.lazy(()=>import('./header/main-tabs'));
const MatchList = React.lazy(()=>import('./matches/index'));
const Right = React.lazy(()=>import('./right/index'));


const Index = (props) => {
    //const [state, dispatch] = useContext(Context);
    const location = useLocation();
    const [matches, setMatches] = useState(null);
    const [page, setPage] = useState(1);


    const fetchData = useCallback(async() => {
        if(matches) return;
        let tab = location.pathname.replace("/", "") || 'highlights';
        
        let match_endpoint = "/v1/matches?page=" 
            + (page || 1) + "&limit=100&tab=" + tab;
        console.log("Fetching data from API");
        const [match_result] =  await Promise.all([
            makeRequest({url: match_endpoint, method: "get", data: null})
        ]);
        let [m_status, m_result] = match_result;
        if(m_status === 200){
            setMatches(m_result)
        }

    }, []);

    useEffect(() => {
       fetchData();
    }, [fetchData]);


    return (
        <>
            <Header />
            <div className="by amt">
                <div className="gc">
                    <SideBar loadCompetitions />
                    <div className="gz home">
                        <div className="homepage">
                            <CarouselLoader/>
                            <MainTabs tab={location.pathname.replace("/", "")}/>
                            <MatchList live={false}  matches ={matches}/> 
                        </div>
                    </div>
                    <Right/>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Index
