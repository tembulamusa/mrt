import React,  { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import Header from './header/header';
import Footer from './footer/footer';
import SideBar from './sidebar/sidebar';
import banner from '../assets/img/banner.jpg';
import CarouselLoader from './carousel/index';
import MainTabs from './header/main-tabs';
import SearchBar from './header/search-bar';
import { MarketList } from './matches/index';
import Right from './right/index';

import useAxios from "../hooks/axios.hook";
import { Context }  from '../context/store';

const MatchAllMarkets = (props) => {
    const [page, setPage] = useState(1);
    const [state, dispatch] = useContext(Context);                              
    const {response, makeRequest} = useAxios()
    const params = useParams();

    useEffect(()=>{                                                             
        const abortController = new AbortController();                          
        if(!isNaN(+params.id)) {
            console.log("Found an integer in ID",params.id);
            let endpoint = "/v1/matches?id="+params.id; 
                                                                                    
            makeRequest({url:endpoint, method:"get", data:null }).then((response) => {
                let {status, result} = response;                      
                console.log("Received match result", result);
                dispatch({type:"SET", key:"matchwithmarkets", payload:result});
            });                                                                     
        } else {
           console.log("Attempting to load id", params.id);
        }
        return () => {                                                          
            abortController.abort();                                            
        };                                                                      
    }, [params?.id]);

   return (
       <>
        <Header />        
        <div className="by amt">
          <div className="gc">
            <SideBar />
            <div className="gz home">
                <div className="homepage">
                    <MarketList />
                </div> 
            </div>  
            <Right />
          </div>
        </div>
       </>
   )
}

export default MatchAllMarkets;
