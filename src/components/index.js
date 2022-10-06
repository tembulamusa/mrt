import React, { 
    useContext, 
    useEffect, 
    useCallback, 
    useState, 
    useRef
} from "react";

import {useLocation, useParams} from 'react-router-dom';
import {Context} from '../context/store';
import makeRequest from './utils/fetch-request';
import {getBetslip} from './utils/betslip' ;
import useInterval from "../hooks/set-interval.hook";
import {Spinner} from "react-bootstrap";

const Header = React.lazy(() => import('./header/header'));
const Footer = React.lazy(() => import('./footer/footer'));
// const SideBar = React.lazy(()=>import('./sidebar/sidebar'));
const CarouselLoader = React.lazy(() => import('./carousel/index'));
const MainTabs = React.lazy(() => import('./header/main-tabs'));
const MatchList = React.lazy(() => import('./matches/index'));
const Right = React.lazy(() => import('./right/index'));
const SideBar = React.lazy(() => import('./sidebar/awesome/Sidebar'))

const Index = (props) => {
    const location = useLocation();
    const {id, sportid, categoryid, competitionid } = useParams();

    console.log("This are my params for competition ", id, sportid, categoryid, competitionid);
    const [matches, setMatches] = useState([]);
    const [limit, setLimit] = useState(50);
    const [producerDown, setProducerDown] = useState(false);
    const [threeWay, setThreeWay] = useState(false);
    const [page, setPage] = useState(1);
    const [userSlipsValidation, setUserSlipsValidation] = useState();
    const [state, dispatch] = useContext(Context);
    const [fetching, setFetching] = useState(false)
    const homePageRef = useRef()
    const [subTypes, setSubTypes] = useState("1,18,29");
    const findPostableSlip = () => {
        let betslips = getBetslip() || {};
        var values = Object.keys(betslips).map(function (key) {
            return betslips[key];
        });
        return values;
    };


    const fetchData = async () => {
        setFetching(true)
        let tab = 'highlights';
        let betslip = findPostableSlip();
        let method = betslip ? "POST" : "GET";
        let endpoint = "/v1/matches?page=" + (page || 1) + `&limit=${limit || 50}` ;

        let url = new URL(window.location.href)
        endpoint += "&sport_id = " + (state?.filtersport?.sport_id||sportid || 79);
        let search_term = url.searchParams.get('search')
        endpoint += search_term ? '&search=' + search_term : ""; 

        if(state?.filtersport){
        
            console.log("Found state filtersport", state?.filtersport); 
            if(state?.filtercategory) {
                endpoint += "&category_id =" + state?.filtercategory?.category_id;
            }
            if(state?.filtercompetition ) {
                endpoint += "&competition_id =" + state?.filtercompetition?.competition_id;
            }
        } else {
            console.log("Considering to user raw categories since we dont have state") 
            if(categoryid) {
                endpoint += "&category_id =" + categoryid;
            }
            if(competitionid) {
                endpoint += "&competition_id =" +  competitionid;
            }
        } 
        if(state?.active_tab) {
            tab = state?.active_tab;
        }
        
        endpoint += "&tab=" + tab;
        endpoint = endpoint.replaceAll(" ", '')

        endpoint += `&sub_type_id=` + subTypes;
        console.log("Final end point ", endpoint);
        await makeRequest({url: endpoint, method: method, data: betslip}).then(([status, result]) => {
            if (status == 200) {
                setMatches(matches?.length > 0 ? {...matches, ...result?.data} : result?.data || result)
                setFetching(false)
                if (result?.slip_data) {
                    setUserSlipsValidation(result?.slip_data)
                }
                setProducerDown(result?.producer_status === 1);
            }
        });

    };

    useInterval(async () => {
      fetchData();
    }, 10000); 


    useEffect(() => {
        fetchData();
    }, [
        state?.filtersport, 
        state?.filtercategory, 
        state?.filtercompetition, 
        state?.active_tab, 
    ]
    )

    useEffect(() => {
        console.log("Loaging state as ", state?.selectedmarkets);
        if(state?.selectedmarkets){ 
            setSubTypes(state.selectedmarkets);
        } 

        console.log("categories loaded ", state?.categories);
        if(state?.categories) {
            let spid = Number(sportid || 79);
            let sp = state.categories.all_sports.find((sport) => sport.sport_id === spid);
            setSubTypes(state?.selectedmarkets || sp.default_display_markets);
        } 
        let cachedSlips = getBetslip("betslip");
        if (cachedSlips) {
            dispatch({type: "SET", key: "betslip", payload: cachedSlips});
        }
        return () => {
            setMatches(null);
        };
    }, []);

    useEffect(() => {
        fetchData();
    }, [subTypes]);

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
            <Header/>
            <div className="amt">
                <div className="d-flex flex-row justify-content-between">
                    <SideBar loadCompetitions/>
                    <div className="gz home" style={{width: '100%'}}>
                        <div className="homepage" ref={homePageRef}>
                            <CarouselLoader/>
                            <MainTabs tab={location.pathname.replace("/", "") || 'highlights'} />
                            {/* <MobileCategories/> */}
                            <MatchList
                                live={false}
                                matches={matches}
                                pdown={producerDown}
                                three_way={threeWay}
                                fetching={fetching}
                                subTypes={subTypes}
                            />
                        </div>
                        <div className={`text-center mt-2 text-white ${fetching ? 'd-block' : 'd-none'}`}>
                            <Spinner animation={'grow'} size={'lg'}/>
                        </div>
                    </div>
                    <Right betslipValidationData={userSlipsValidation}/>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Index
