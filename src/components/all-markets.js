import React,  {
    useLayoutEffect, 
    useState,
    useCallback,
    useContext,
} from "react";
import { useParams } from 'react-router-dom';


import makeRequest from "./utils/fetch-request";
import useInterval from "../hooks/set-interval.hook";
import { getBetslip } from './utils/betslip' ;
import {Context} from '../context/store';

import { MarketList, LiveMatchTracker } from './matches/index';


const MatchAllMarkets = (props) => {
    const [page, setPage] = useState(1);
    const [producerDown, setProducerDown] = useState(false);
    const { live } = props;
    const [matchwithmarkets, setMatchWithMarkets] = useState();
    const [userSlipsValidation, setUserSlipsValidation] = useState();

    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [hideLocalHeader, setHideLocalHeader] = useState(false);
    const [, dispatch] = useContext(Context);

    const findPostableSlip = () => {
        let betslips = getBetslip() || {};
        var values = Object.keys(betslips).map(function(key){
            return betslips[key];
        });
        return values;
    };
    useInterval(() => {
		let endpoint = live 
			? "/v1/matches/live?id="+params.id
			: "/v1/matches?id="+params.id;

        let betslip = findPostableSlip();
        let method = betslip ? "POST" : "GET";

		makeRequest({url:endpoint, method:method, data:betslip}).then(([_status, response]) => {
            let api_response = response?.data || response;
            if(api_response) {
			    setMatchWithMarkets(api_response );
            }
            if(response?.slip_data) {
                dispatch({type: "SET", key: "betslipvalidationdata", payload: response?.slip_data});
            }
            setProducerDown(response?.producer_status === 1);
		});                                                                     
    }, (live ? 2000: null));


    const fetchPagedData =useCallback(async() => {
        if(!isLoading && !isNaN(+params.id)) {
            setIsLoading(true);
            let betslip = findPostableSlip();
            let endpoint = live 
                ? "/v1/matches/live?id="+params.id
                : "/v1/matches?id="+params.id;

            await makeRequest({url: endpoint, method: "POST", data: betslip}).then(([status, result]) => {
                setMatchWithMarkets(result?.data|| result)
                setProducerDown(result?.producer_status === 1);
                setIsLoading(false);
            });
        }
    }, []);

    useLayoutEffect(() => {
        const abortController = new AbortController();                          
        fetchPagedData();
        return () => {                                                          
            abortController.abort();                                            
        };                                                                      
    }, [fetchPagedData]);

   return (
       <>
         <LiveMatchTracker matchid={matchwithmarkets?.data?.match?.parent_match_id} setHideLocalHeader = {setHideLocalHeader}/>
        <MarketList live={live}  
            matchwithmarkets={matchwithmarkets} 
            pdown={producerDown} 
            hideLocalHeader={hideLocalHeader}
         />
       </>
   )
}

export default MatchAllMarkets;
