import React, {useContext, useLayoutEffect, useEffect, useCallback, useState, useMemo} from "react";
import {useLocation, useParams} from 'react-router-dom';
import makeRequest from './utils/fetch-request';
import {getJackpotBetslip, getBetslip} from './utils/betslip' ;
import MainTabs from './header/main-tabs';

import matches from "./utils/fetch-request";
import useInterval from "../hooks/set-interval.hook";
import {Context} from '../context/store';

import LiveSideBar from './sidebar/live-sidebar';
import CarouselLoader from './carousel/index';
import SearchBar from './header/search-bar';
import MatchList from './matches/index';
import { ShimmerTable } from "react-shimmer-effects";


const Live = (props) => {
    const [matches, setMatches] = useState();
    const [state, dispatch] = useContext(Context);
    const {spid} = useParams();
    const [threeWay, setThreeWay] = useState(false);
    const [subTypes, setSubTypes] = useState("1,18,29");
    const [producerDown, setProducerDown] = useState(false);
    const location = useLocation();
    const [userSlipsValidation, setUserSlipsValidation] = useState();

    const findPostableSlip = () => {
        let betslips = getBetslip() || {};
        var values = Object.keys(betslips).map(function (key) {
            return betslips[key];
        });
        return values;
    };

    const [markets, setMarkets]  = useState("1,18,29");

    const { reset, stop } = useInterval(async () => {
        let endpoint = "/v1/matches/live";
        endpoint += "?sub_type_id=" + markets;
        if (spid) {
            endpoint += "?spid=" + spid;
        }
        let betslip = findPostableSlip();
        let method = betslip ? "POST" : "GET";
        await makeRequest({url: endpoint, method: method, data: betslip}).then(([status, result]) => {
            if (status == 200) {
                setMatches(result?.data || result)
                if (result?.slip_data) {
                    setUserSlipsValidation(result?.slip_data)
                }
                setProducerDown(result?.producer_status === 1);
            }
        });
    }, 2000);

    const checkThreeWay = () => {
        setThreeWay(subTypes.split(",").includes("1"))
    }
    useEffect(() => {
        checkThreeWay()
    }, [subTypes]);

    const fetchData = useCallback(async () => {
        let endpoint = "/v1/matches/live";
        endpoint += "?sub_type_id=" + markets;

        if (spid) {
            endpoint += "&spid=" + spid;
        }

       
        let betslip = findPostableSlip();
        let method = betslip ? "POST" : "GET";
        const [match_result] = await Promise.all([
            makeRequest({url: endpoint, method: method, data: betslip})
        ]);
        let [m_status, m_result] = match_result;
        if (m_status == 200) {
            setMatches(m_result?.data || m_result)
            if (m_result?.slip_data) {
                setUserSlipsValidation(m_result?.slip_data);
            }
            setProducerDown(m_result?.producer_status === 1);
        }

    }, []);


    useEffect(() => {
        fetchData();
        let cachedSlips = getBetslip("betslip");
        if (cachedSlips) {
            dispatch({type: "SET", key: "betslip", payload: cachedSlips});
        }
        return () => {
            stop();
            setMatches(null);
        };
    }, [fetchData]);

    return (
        <>
            <CarouselLoader />
            <MainTabs tab={"live"} />
            {!matches && <ShimmerTable row={5} col={5} /> }
            {matches && <MatchList live matches={matches} pdown={producerDown} subTypes={subTypes} three_way={threeWay}/>}
        </>
    )
}

export default Live
