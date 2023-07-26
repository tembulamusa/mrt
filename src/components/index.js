import React, { 
    useContext, 
    useEffect, 
    useCallback, 
    useState, 
    useRef,
} from "react";

import {useLocation, useParams, useSearchParams} from 'react-router-dom';
import {Context} from '../context/store';
import makeRequest from './utils/fetch-request';
import {getBetslip} from './utils/betslip';
import useInterval from "../hooks/set-interval.hook";
import {Spinner} from "react-bootstrap";
// import WorldCupModal from './world_cup_modal' ;

// import SideBar from './sidebar/sidebar';
import CarouselLoader from './carousel/index';
import MainTabs from './header/main-tabs';
import MatchList from './matches/index';
import { ShimmerTable } from "react-shimmer-effects";


const Index = (props) => {
    const location = useLocation();
    const { tab } = props;
    const {id, sportid, categoryid, competitionid} = useParams();
    const [matches, setMatches] = useState([]);
    const [datalen, setDataLen] = useState(0);
    const [limit, setLimit] = useState(50);
    const [producerDown, setProducerDown] = useState(false);
    const [threeWay, setThreeWay] = useState(false);
    const [page, setPage] = useState(1);
    const [state, dispatch] = useContext(Context);
    const [fetching, setFetching] = useState(false)
    const [subTypes, setSubTypes] = useState("1,18,29");
    const [searchParams, setSearchParams] = useSearchParams();
    
    const onScroll = useCallback(() => {
        const scrollTop = document.documentElement.scrollTop
        const scrollHeight = document.documentElement.scrollHeight
        const clientHeight = document.documentElement.clientHeight

        if (datalen && scrollTop + clientHeight >= scrollHeight) {
          let newPage = datalen ? Math.floor(datalen/limit) + 1 : 1;
          setPage(newPage);
           
        }
    }, [datalen])

    const findPostableSlip = () => {
        let betslips = getBetslip() || {};
        var values = Object.keys(betslips).map(function (key) {
            return betslips[key];
        });
        return values;
    };


    const fetchData = async (polling = false) => {
        if(fetching) return false;

        setFetching(true)
        let betslip = findPostableSlip();
        let method = betslip ? "POST" : "GET";
        let fetchPage = polling ? 1 : page
        let fetchLimit = polling ? limit*page : limit;
    
        let endpoint = "/v1/matches?page=" + fetchPage + "&limit=" + fetchLimit ;

        endpoint += "&sport_id=" + (sportid || 79);
        let search_term = state?.searchterm;

        endpoint += search_term ? '&search=' + search_term : ""; 
        
        if(categoryid) {
            endpoint += "&category_id=" + categoryid;
        }
        if(competitionid) {
            endpoint += "&competition_id=" +  competitionid;
        }
        
        if(!id && !categoryid && !competitionid) {
           endpoint += "&tab=" + ( tab || 'upcoming' );
        } else {
           endpoint += "&tab=upcoming";
        }
        //endpoint = endpoint.replaceAll(" ", '')
        endpoint += `&sub_type_id=` + subTypes;
        console.log("Fetching data URL ", endpoint);
        await makeRequest({url: endpoint, method: method, data: betslip}).then(([status, result]) => {
            if (status == 200) {
                let m = result?.data || result;
                if(polling) {
                    setMatches(m)
                } else {
                    setMatches( matches ? [...matches, ...m] : m)
                }
                setFetching(false)
                if (result?.slip_data) {
                    dispatch({type: "SET", key: "betslipvalidationdata", payload: result?.slip_data});
                }
                setProducerDown(result?.producer_status === 1);
            }
        });

    }


    const { reset, stop } = useInterval(async () => {
      fetchData(true);
    }, 20000); 

    useEffect(() => {
        let cachedSlips = getBetslip("betslip");
        if (cachedSlips) {
            dispatch({type: "SET", key: "betslip", payload: cachedSlips});
        }
        return () => stop();
    }, []);


    useEffect(() => {
       setDataLen(0)
       setPage(1);
       fetchData();
        return () => stop();
    }, [tab]);

    useEffect(() => {
       reset();
       setFetching(false);
       fetchData();
        return () => stop();
    }, [page]);

    useEffect(() => {
       if(matches) {
           setDataLen(matches.length);
       } else {
           setDataLen(0);
       }
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [matches, datalen,  onScroll])

    useEffect(() => {
        reset();
        setFetching(false);
        setPage(1);
        fetchData();
        return () => stop();
    }, [ id, sportid, categoryid, competitionid, state?.searchterm]);

    useEffect(() => {
        checkThreeWay()
    }, [subTypes]);


    useEffect(() => {
        setSubTypes(
             state?.selectedmarkets ||  "1,18,29"
        );
    }, [state?.selectedmarkets]);

    const listInnerRef = useRef();

    const checkThreeWay = () => {
        setThreeWay(subTypes.split(",").includes("1"))
    }


    return (
        <>
            <CarouselLoader/>
            <MainTabs tab={tab}   />
            {!matches && <ShimmerTable row={5} col={5} /> }
            <MatchList
                live={false}
                matches={matches}
                pdown={producerDown}
                three_way={threeWay}
                fetching={fetching}
                subTypes={subTypes}
            />
            {fetching && <ShimmerTable row={1} col={2} /> }
        </>
    )
}

export default Index
