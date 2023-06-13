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
    const { tab } = props;
    const location = useLocation();
    const {id, sportid, categoryid, competitionid } = useParams();
    const [matches, setMatches] = useState([]);
    const [limit, setLimit] = useState(50);
    const [producerDown, setProducerDown] = useState(false);
    const [threeWay, setThreeWay] = useState(false);
    const [page, setPage] = useState(1);
    const [state, dispatch] = useContext(Context);
    const [fetching, setFetching] = useState(false)
    const [subTypes, setSubTypes] = useState("1,18,29");
    const [currentTab, setCurrentTab] =useState('highlights');
    const [searchParams, setSearchParams] = useSearchParams();

    const findPostableSlip = () => {
        let betslips = getBetslip() || {};
        var values = Object.keys(betslips).map(function (key) {
            return betslips[key];
        });
        return values;
    };


    const fetchData = async () => {
        setFetching(true)
        let betslip = findPostableSlip();
        let method = betslip ? "POST" : "GET";
        let endpoint = "/v1/matches?page=" + (page || 1) + `&limit=${limit || 50}` ;


        let url = new URL(window.location.href)
        endpoint += "&sport_id=" + (sportid || 79);
        let search_term = url.searchParams.get('search')

        endpoint += search_term ? '&search=' + search_term : ""; 
        
        if(categoryid) {
            endpoint += "&category_id=" + categoryid;
        }
        if(competitionid) {
            endpoint += "&competition_id=" +  competitionid;
        }
        
        let tab = url.searchParams.get('tab') || "upcoming";
        if(!id && !categoryid && !competitionid) {
           endpoint += "&tab=" + currentTab || tab;
        } else {
           endpoint += "&tab=upcoming";
        }
        //endpoint = endpoint.replaceAll(" ", '')
        endpoint += `&sub_type_id=` + subTypes;
        await makeRequest({url: endpoint, method: method, data: betslip}).then(([status, result]) => {
            if (status == 200) {
                setMatches(matches?.length > 0 ? {...matches, ...result?.data} : result?.data || result)
                setFetching(false)
                if (result?.slip_data) {
                    dispatch({type: "SET", key: "betslipvalidationdata", payload: result?.slip_data});
                }
                setProducerDown(result?.producer_status === 1);
            }
        });

    };

    const { reset, stop } = useInterval(async () => {
      fetchData();
    }, 20000); 

    useEffect(() => {
        if(tab) {
            dispatch({type: "SET", key: "active_tab", payload: tab});
        }
    }, [ tab])

    useEffect(() => {
        if(state?.active_tab) {
            setCurrentTab(state?.active_tab);
            reset();
        }
    }, [ state?.active_tab])

    useEffect(() => {
        let cachedSlips = getBetslip("betslip");
        if (cachedSlips) {
            dispatch({type: "SET", key: "betslip", payload: cachedSlips});
        }
        return () => {
            stop();
            setMatches(null);
        };
    }, []);

    useEffect(() => {
        reset();
        setMatches(null);
        setFetching(false);
        fetchData();
        return () => setMatches(null);
    }, [state?.active_tab, id, sportid, categoryid, competitionid]);

    useEffect(() => {
        checkThreeWay()
    }, [subTypes]);


    useEffect(() => {
        let url = new URL(window.location);
        setSubTypes(
             state?.selectedmarkets ||  "1,18,29"
        );
    }, [state?.selectedmarkets]);

    const listInnerRef = useRef();

    const checkThreeWay = () => {
        setThreeWay(subTypes.split(",").includes("1"))
    }

    document.addEventListener('scrollEnd', (event) => {
        if (!fetching) {
            setFetching(true)
            setLimit(limit + 50)
        }
    })

    return (
        <>
            <CarouselLoader/>
            <MainTabs tab={currentTab} />
            {!matches && <ShimmerTable row={5} col={5} /> }
            <MatchList
                live={false}
                matches={matches}
                pdown={producerDown}
                three_way={threeWay}
                fetching={fetching}
                subTypes={subTypes}
            />
        </>
    )
}

export default Index
