import React, {useState, useEffect, useContext, useCallback, useRef, useLayoutEffect} from 'react';
import {Context} from '../../context/store';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import {
    addToSlip,
    removeFromSlip,
    removeFromJackpotSlip,
    addToJackpotSlip,
    getBetslip
} from '../utils/betslip';
import {removeItem } from '../utils/local-storage';

import CurrencyFormat from 'react-currency-format';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import padlock from '../../assets/img/padlock.png';
import PosterImage from '../../assets/img/banner/products/Daily-JackPot.png'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChartLine, faFire} from "@fortawesome/free-solid-svg-icons";
import {getFromLocalStorage} from "../utils/local-storage";
import Moment from 'react-moment';
import moment from 'moment';


const clean = (_str) => {
    _str = _str.replace(/[^A-Za-z0-9\-]/g, '');
    return _str.replace(/-+/g, '-');
}

const EmptyTextRow = (props) => {
    const {odd_key, classname, live} = props;

    return (
        <div className={`${classname} btn btn-disabled match-detail col c-btn`}
             style={{
                 width: "100%",
                 minWidth: live ? "100px" : "100%",
                 height: "30px",
                 padding: "2px",
                 background: "#d7d7d7",
                 opacity: 1
             }}>
            {odd_key && <span className="et label btn-disabled ">{odd_key}</span>}
            <span className="label label-inverse">
             <LazyLoadImage
                 style={{opacity: "0.3", width: "15px"}}
                 src={padlock}
                 effect="blur"
                 alt="--"/>
         </span>
        </div>
    );
};

const MatchHeaderRow = (props) => {
    const {
        live, 
        first_match, 
        jackpot, 
        fetching, 
        three_way, 
        sub_types
    } = props;

    //const [state, ]  = useContext(Context);
    const categories = getFromLocalStorage('categories')
    const sport_id = new URL(window.location).searchParams.get('sport_id') || 79
    let sport = categories?.all_sports?.filter((category) => category.sport_id == sport_id)

    const [sportName, setSportName] = useState(sport?.[0]?.sport_name || 'Soccer');
    const [showX, setShowX] = useState(true);
    const [market, setMarket] = useState('1x2');
    const [marketCols, setMarketCols] = useState(3)
    const [extraMarketDisplays, setExtraMarketDisplays] = useState([])

    const getSelectedMarkets = () => {


        const markets = [
            {
                id: "18", 
                name: "Over/Under 2.5", 
                extra_market_cols: 2, 
                extra_markets_display: [
                    "Under", "Over"
                ]
            },
            {
                id: "10", 
                name: "Double Chance", 
                extra_market_cols: 3, 
                extra_markets_display: [
                    "1X", "X2", "12"
                ]
            },
            {
                id: "29", 
                name: "Both Teams to Score", 
                extra_market_cols: 2, 
                extra_markets_display: [
                    "NO", "YES"
                ]
            },
            {
                id: "219", 
                name: "Winner (incl. overtime)", 
                extra_market_cols: 2, 
                extra_markets_display: [2, 1]
            },
            {
                id: "186", 
                name: "Winner", 
                extra_market_cols: 2, 
                extra_markets_display: [1, 2]
            },

            {
                id: "202", 
                name: "1 Set Winner", 
                extra_market_cols: 2, 
                extra_markets_display: [1, 2]
            },
            {
                id: "406",
                name: "Winner (incl. overtime and penalties)",
                extra_market_cols: 2,
                extra_markets_display: [
                    2, 1
                ]
            },
            {
                id: "340",
                name: "Winner (incl. super over)",
                extra_market_cols: 2,
                extra_markets_display: [
                    1, 2
                ]
            }
        ]


        let extraMarkets = []

        sub_types?.split(",")?.forEach((sub_type) => {
            let selectedMarket = markets.filter((market) => Number(market.id) === Number(sub_type))

            if (selectedMarket.length > 0) {
                extraMarkets.push(selectedMarket[0])
            }
        })

        setExtraMarketDisplays(extraMarkets)

    }


    useEffect(() => {
        getSelectedMarkets()
        if (first_match) {
            setSportName(first_match.sport_name);
            setMarket(first_match.market_name);
            /**
             * I blew the shiet here someone help recoil this to API call results
             */
            setShowX(!["186", "340"].includes(first_match.sub_type_id));

        }
    }, [first_match?.parent_match_id])


    return (
        <Container className="live full-mobile sticky-top" style={{position: "sticky"}}>
            <div className="top-matches header d-flex position-sticky sticky-top "
                 style={{opacity: "1", top: "100px", paddingLeft:"5px"}}>

                 

                 {live && 
                    <div className="row white-text">
                         <div className="col"> LIVE</div>

                    </div> 
                 }
                <div className="d-sm-none d-md-block pad left-text col-sm-2 col-xs-12 pad d-none" key="d5">
                    <div className="align-self-center col">

                   { fetching && <div className="filter-group-icon d-lg-block d-none float-end" >
                           <Spinner animation="border" size="sm" variant="secondary" />
                       </div>
                   }

                    </div>
                </div>
                <div className={'col-2 d-none d-md-block d-xs-none d-sm-none match-detail-container'} key="d4"></div>
                
                <div className={'col d-flex d-none d-md-flex flex-row justify-content-between'}>
                    {three_way &&
                        <div className=" align-self-center" style={{ width:"37%", color:"#fff",textAlign:"center", paddingLeft:"0",paddingRight:"0"  }} key="d3">
                            <div className="d-flex flex-column mobile-right-mkt-type">
                                <div className={'bold align-self-center'}>
                                    3 WAY
                                </div>
                                <div className="row">
                                    <div className="col-4 align-self-center">1</div>
                                    <div className="col-4 align-self-center">X</div>
                                    <div className="col-4 align-self-center">2</div>
                                </div>
                            </div>
                        </div>
                    }

                    

                    {!live && !jackpot && extraMarketDisplays.length > 0 && (
                        <>
                            {extraMarketDisplays?.map((extra_market) => (
                                <div className={'d-flex flex-column mobile-right-mkt-type'} key={extra_market.name} style={{width:"25%"}}>
                                    <div className={'bold align-self-center'}>
                                        {extra_market.name}
                                    </div>
                                    <div className={'row'}>
                                        <div className="col text-center">
                                            {(extra_market.extra_markets_display[0])}
                                        </div>
                                        <div className="col text-center">
                                            {(extra_market.extra_markets_display[1])}
                                        </div>
                                        {extra_market?.extra_market_cols > 2 &&
                                            <div className={`col text-center`}>
                                                {(extra_market.extra_markets_display[2])}
                                            </div>}
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                    
                <div className="col d-flex flex-row justify-content-between"> &nbsp; 

                {live && 
                                <div className="row float-end" style={{width:"100%"}}>
                                    <div className="col-3 center-text">1</div>
                                    <div className="col-3 center-text">X</div>
                                    <div className="col-3 center-text">2</div>
                                </div>
                            
                    }
                </div>
                </div>

                    <div className="d-sm-flex d-md-none" style={{width:"100%", textAlign:"right", paddingRight:"5px"}}>
                     <div className="row">
                        <div className="col-3"></div>
                        <div className="col mobile-top-custom-pad">
                          <div className="row">
                        
                              <div className="col-3 center-text">1</div>
                              <div className="col-3  center-text"> X </div>
                              <div className="col-3  center-text"> 2</div>
                           </div>
                       </div>
                     </div>
                 </div>
            </div>
        </Container>
    )
}

const MoreMarketsHeaderRow = (props) => {
    const {
        home_team,
        away_team,
        game_id,
        category,
        competition,
        start_time,
        match_time,
        score,
        live,
        match_status
    } = props;

    const datetime = new Date();
    
    return (
        <Container className="mt-2">
            <div className="panel-header match-detail-header">

                <h4 className="inline-block row">
                    <div className="mobile-font-10 center-text mb-2">{start_time}</div>
                     <div className="row mobile-font-13 center-text uppercase text-uppercase">
                        <div className="col-5 mb-3">{home_team}</div>
                        <div className="col-2">VS </div> 
                        <div className="col-5">{away_team}</div>
                     </div>
                </h4>
                {live &&
                    <Row className="header-text">
                        <Col style={{
                            marginBottom: "5px",
                            color:"red",
                        }}> {match_status} {match_time} <br/>{score}</Col>
                    </Row>
                }
                <Row className="header-text">
                    <Col>{category} {competition}</Col>
                </Row>
                
            </div>
        </Container>
    )
}

const SideBets = (props) => {
    const {match, live} = props;
    const [picked,] = useState();

    return (
    <>
        <div className="col d-flex flex-row justify-content-between">
        <div
            className={`bet-fix events-odd pad ${picked} align-self-center more-markets-container m-lg-2`}>
            {(match?.side_bets > 1) && <>
                <a className="side" title={'More Markets'}
                   href={`/match/${live ? 'live/' : ''}${
                       live ? match.parent_match_id : match?.match_id}`
                   }><span className="text-tertiary">+{match.side_bets}</span>

                <div className="normal-font-weight dark-text uppercase">More</div>

                </a>

            </>}
        </div>
        </div>
        </>
    )

}

const OddButton = (props) => {
    const {match, mkt, detail, live, jackpot, subType, marketKey} = props
    const [ucn, setUcn] = useState('');
    const [picked, setPicked] = useState('');
    const [oddValue, setOddValue] = useState(null);

    const [state, dispatch] = useContext(Context);
    const ref = useRef();
    let reference = match.match_id + "_selected";
    const [betslip_key, setBetslipKey] = useState('betslip');

    const updateBeslipKey = useCallback(() => {
        if (jackpot) {
            setBetslipKey("jackpotbetslip");
        }
    }, [jackpot]);

    useEffect(() => {
        updateBeslipKey();
    }, [updateBeslipKey])

    // here

    const updatePickedChoices = useCallback(() => {
        let betslip = jackpot ? state?.[betslip_key] : (getBetslip() || {});
        let uc = clean(
            match.match_id
            + "" + match.sub_type_id
            + (match?.[mkt] || match?.odd_key || 'draw')
        );
        // here
        if ((betslip?.[match.match_id]?.match_id == match.match_id)
            && uc == betslip?.[match.match_id]?.ucn) {
            setPicked('picked');
        } else {
            setPicked('');
        }
    }, [picked, state[betslip_key]])

    useEffect(() => {
        updatePickedChoices();
    }, [updatePickedChoices]);

    const updateOddValue = useCallback(() => {
        if (match) {
            let uc = clean(
                match.match_id
                + "" + match.sub_type_id
                + (match?.[mkt] || match?.odd_key || 'draw')
            );
            setUcn(uc);
            if (mkt === 'home_team') {

                setOddValue(match.odds.home_odd)

            } else if (mkt === 'away_team') {

                setOddValue(match.odds.away_odd)

            } else if (mkt === 'draw') {
                setOddValue(match.odds.neutral_odd)
            } else {
                setOddValue(match.odd_value);
            }
        }
    }, [match]);

    useLayoutEffect(() => {
        updateOddValue();
    }, [updateOddValue]);

    const updateMatchPicked = useCallback(() => {
        if (state?.[reference]) {
            if (state?.[reference].startsWith('remove.')) {
                setPicked('');
            } else {
                let uc = clean(
                    match.match_id
                    + "" + match.sub_type_id
                    + (match?.[mkt] || match?.odd_key || 'draw')
                );

                if (state?.[reference] === uc) {
                    setPicked('picked')
                } else {
                    setPicked('');
                }
            }
        }
    }, [state?.[reference]])

    useEffect(() => {
        updateMatchPicked();
    }, [updateMatchPicked])

    const handleButtonOnClick = (event) => {
        let pmid = event.currentTarget.getAttribute("parent_match_id");
        let mid = event.currentTarget.getAttribute("match_id");
        let stid = event.currentTarget.getAttribute("sub_type_id");
        let sbv = event.currentTarget.getAttribute("special_bet_value");
        let oddk = event.currentTarget.getAttribute("odd_key");
        let odd_value = event.currentTarget.getAttribute("odd_value");
        let bet_type = event.currentTarget.getAttribute("bet_type");
        let odd_type = event.currentTarget.getAttribute("odd_type");
        let home_team = event.currentTarget.getAttribute("home_team");
        let away_team = event.currentTarget.getAttribute("away_team");
        let sport_name = event.currentTarget.getAttribute("sport_name");
        let market_active = event.currentTarget.getAttribute("market_active");
        let cstm = clean(mid + "" + stid + oddk + (marketKey !== undefined ? marketKey : ''))

        let slip = {
            "match_id": mid,
            "parent_match_id": pmid,
            "special_bet_value": sbv,
            "sub_type_id": stid,
            "bet_pick": oddk,
            "odd_value": odd_value,
            "home_team": home_team,
            "away_team": away_team,
            "bet_type": bet_type,
            "odd_type": odd_type,
            "sport_name": sport_name,
            "live": live,
            "ucn": cstm,
            "market_active": market_active,
        }

        removeItem('old_betslip');

        if (cstm === ucn) {
            let betslip;
            if (picked === 'picked') {
                betslip = jackpot !== true
                    ? removeFromSlip(mid)
                    : removeFromJackpotSlip(mid);

                setPicked('');
            } else {
                betslip = jackpot !== true
                    ? addToSlip(slip)
                    : addToJackpotSlip(slip);

                dispatch({type: "SET", key: reference, payload: cstm});
            }
            dispatch({type: "SET", key: betslip_key, payload: betslip});
        }
        
    };

    return (
        <button
            ref={ref}
            className={`home-team ${match.match_id} ${ucn} ${picked} c-btn`}
            home_team={match.home_team}
            odd_type={match?.name || match?.market_name || "1X2"}
            bet_type={live ? 1 : 0}
            away_team={match.away_team}
            market_active={match.market_active}
            odd_value={oddValue}
            odd_key={match?.[mkt] || match?.odd_key || 'draw'}
            parent_match_id={match.parent_match_id}
            match_id={match.match_id}
            custom={ucn}
            sport_name={match.sport_name}
            sub_type_id={match.sub_type_id}
            special_bet_value={match?.special_bet_value || ''}
            onClick={handleButtonOnClick}>
            {!detail &&
                (
                    <span className="theodds odd-fix">
                            {oddValue}
                        </span>
                )
            }
            {detail &&
                (<>
                      <span
                          className="label label-inverse">
                        {match.odd_key}
                      </span>
                    <span
                        className="label label-inverse odd-value">
                            {oddValue}
                     </span>
                </>)}
        </button>
    )
}


const MarketRow = (props) => {
    const {markets, match, market_id, width, live, pdown} = props;

    const MktOddsButton = (props) => {
        const {match, mktodds, live, pdown} = props;
        const fullmatch = {...match, ...mktodds};
        return (
            !pdown
            && fullmatch?.odd_value !== 'NaN'
            && fullmatch.market_active == 1
            && fullmatch.odd_active == 1
        )
            ? <OddButton match={fullmatch} detail mkt={"detail"} live={live}/>
            : <EmptyTextRow odd_key={fullmatch?.odd_key} live />;
    }

    return (
        <div className="top-matches match sidebet-detail">
            <Row className="top-matches header detail-title">
                {live &&
                    <div
                        style={{
                            width: "2px",
                            marginTop: "-5px",
                            marginRight: "5px",
                            opacity: 0.6
                        }}>
                    </div>
                }
                {market_id}
            </Row>

            {markets && markets.map((mkt_odds) => {
                return (<>
                    <Col className="match-detail" style={{width: width, float: "left"}}>
                        <MktOddsButton
                            match={match}
                            mktodds={mkt_odds}
                            live={live}
                            pdown={pdown}
                        />
                    </Col>
                </>)
            })
            }
        </div>
    )
}

const ColoredCircle = ({color}) => {
    const styles = {backgroundColor: color};
    return color ? (
        <>
            <span className="colored-circle" style={styles}/>
        </>
    ) : null;
};

const MarketsWordMount = (props) => {
    return (
        <>
            <span>Markets</span>
        </>
    )
}

const getUpdatedMatchFromOdds = (props) => {
    const {match, marketName, odd_key, odd_data} = props;
    let newMatch = {...match, ...odd_data};
    newMatch.name = marketName;
    newMatch.odd_key = odd_key;
    newMatch.odd_value = odd_data.odd_value;
    newMatch.odd_active = odd_data.odd_active;
    newMatch.special_bet_value = odd_data.special_bet_value;
    delete newMatch['odds']
    delete newMatch['extra_odds']
    return newMatch;

}


const PosterBanner = () => {

    return (
        <div className="poster-image">
           <img src={PosterImage} />
        </div>
    )
}

const MatchRow = (props) => {
    const {
        match, 
        jackpot, 
        live,
        counter, 
        pdown, 
        three_way, 
        sub_types} = props;

    let url = new URL(window.location)
    match.market_active = 1
    match.odds.home_odd_active = 1
    const [totalMarkets] = useState(sub_types?.split(",")?.length)
    let append = totalMarkets - Object.keys(match?.extra_odds || {}).length - 1
    let loops = []
    for (let i = 0; i < append; i++) {
        loops.push(i)
    }

    return (

    <>



        {jackpot ? '' : live ? '' : (counter > 0 && counter % 20 == 0)  ? <PosterBanner /> : ''}
        <div className="top-matches d-flex">
            
                <div className="col-sm-2 col-xs-12 pad d-none d-md-block left-text" key="22">
                {live &&
                    <>
                        <small style={{color: "red"}}> {match?.match_status} </small>
                        <br/>
                    </>
                }
                
                <div className="d-flex flex-column bold match-cl-desc" key="20">
                    <div className={'small'}>
                        {(live && match?.match_time) ?
                            <>{`${match.match_time}`}</> : match?.start_time}
                    </div>
                    {/*<>ID: {match?.game_id}</>*/}
                    <div className="d-none d-md-block">
                    <small>{match.category} <br/>{match.competition_name}</small>
                    </div>
                </div>
            </div>
            <div className="col-2 col-xs-12 match-detail-container" key="23">
                <a href={jackpot ? '#' : `/match/${live ? 'live/' + match.parent_match_id : match.match_id}`}>
                    <div className="d-flex flex-column">
                        <div className="compt-deta overflow-ellipsi" key="0034">
                            <div className="d-flex flex-column" key="20">
                                
                                <span className={'small  d-xs-block d-sm-block d-md-none'}>
                                {(live && match?.match_time) ?
                                    <>{`${match.match_time}`}</> : match?.start_time}
                                    </span>
                            </div>
                        </div>
                        <div className="compt-teams d-flex flex-column" key="0035">
                            <div className={'bold'}>
                                {live && (match?.match_status !== 'ended') && <ColoredCircle color="red"/>}
                                { match.home_team }
                                 { live && <span className="opacity-reduce-txt vs-styling"> {match?.score} </span> }
                            </div>
                            <div className={'bold'}>
                                {match.away_team}
                            </div>

                        </div>
                    </div>
                </a>
            </div>
            <div className="col d-flex flex-row justify-content-between" key="24">
                <div className={`c-btn-group align-self-center mobile-width-100 mobile-85-to-70 web-width-37 ${(jackpot) ?'jackpot-mobile-width-85':''} ${(live) ?'live-width-85':''}`} key="222" style={{}}>
                    {
                        match?.odds?.home_odd ? (match?.odds?.home_odd && (!pdown && match?.odds?.home_odd && match.odds.home_odd !== 'NaN' &&
                                match.market_active == 1 && match.odds.home_odd_active == 1) || jackpot
                                ? <OddButton key={`${match?.match_id}-home`} match={match} mkt="home_team" live={live} jackpot={jackpot}/>
                                : <EmptyTextRow key={`${match?.match_id}-home`} odd_key={match?.odd_key} live ={live}/>) :
                            match?.odds?.home_odd ? <EmptyTextRow odd_key={match?.odd_key}/> : ''
                    }

                    {match?.odds?.neutral_odd ? ((!pdown && match?.odds?.neutral_odd && match.odds.neutral_odd !== 'NaN' &&
                        match.market_active == 1 && match.odds.neutral_odd_active == 1) || jackpot
                        ? <OddButton key={`${match?.match_id}-draw`} match={match} mkt="draw" live={live} jackpot={jackpot}/>
                        : <EmptyTextRow okey={`${match?.match_id}-draw`} dd_key={match?.odd_key} live ={live}/>) : ''
                    }
                    {match?.odds?.away_odd ? (match?.odds?.away_odd && (!pdown && match?.odds?.away_odd && match.odds.away_odd !== 'NaN' &&
                            match.market_active == 1 && match.odds.away_odd_active == 1) || jackpot
                            ? <OddButton key={`${match?.match_id}-away`} match={match} mkt="away_team" live={live} jackpot={jackpot}/>
                            : <EmptyTextRow key={`${match?.match_id}-away`} odd_key={match?.odd_key} live={live}/>) :
                        match?.odds?.away_odd ? <EmptyTextRow key={`${match?.match_id}-away`} odd_key={match?.odd_key}/> : ''
                    }
                </div>

                {!jackpot && <>
                    {Object.entries(match?.extra_odds || {}).map(([marketName, odds], index) => (
                        marketName !== '' && (
                            <div className={`d-none d-md-flex c-btn-group m-lg-1 align-self-center`} style={{width:"25%"}}key={index}>
                                {
                                    Object.entries(odds || {}).map(([odd_key, odd_data]) => {
                                        return odd_data?.odd_active == 1 && odd_data.market_active == 1 ? (<OddButton
                                            match={getUpdatedMatchFromOdds({match, marketName, odd_key, odd_data})}
                                            key={odd_key} live={live}/>) : (<EmptyTextRow odd_key={match?.odd_key}/>)
                                    })
                                }
                            </div>
                        )
                    ))
                    }
                    {!live && loops?.map(() => (
                        <div className={`c-btn-group align-self-center`} key="223" style={{width:"25%"}}>
                            <EmptyTextRow odd_key={match?.odd_key}/>
                            <EmptyTextRow odd_key={match?.odd_key}/>
                        </div>
                    ))}
                </>
                }
                
            {!pdown && !jackpot &&
                    <SideBets match={match} live={live} style={{}} className="d-block"/>
                    
                }
            </div>
        </div>

        </>
    )

}

export const MarketList = (props) => {

    const {live, matchwithmarkets, pdown} = props;

    return (
        <div className="matches full-width">
                <MoreMarketsHeaderRow
                    {...matchwithmarkets?.data?.match}
                    score={matchwithmarkets?.data?.match?.score}
                    live={live}
                />
            <Container className="web-element">
                {Object.entries(matchwithmarkets?.data?.odds || {}).map(([mkt_id, markets]) => {
                    return <MarketRow
                        market_id={mkt_id}
                        markets={markets}
                        width={markets.length === 3 ? "33.333%" : "50%"}
                        match={matchwithmarkets?.data?.match}
                        key={mkt_id}
                        live={live}
                        pdown={pdown}
                    />
                })
                }
            </Container>
        </div>
    )

}

export const JackpotHeader = (props) => {
    const {jackpot} = props

    return (
        <Container>
            <Row className="top-matches">
                <Row className="jp-header-text jp-header-element">
                    <div className="jp-header-top">
                        <div className="title-div">
                            {jackpot?.type} JACKPOT-  {jackpot?.name}
                        </div>
                        
                    </div>
                </Row>
                <div className="jp-header-text jp-header-element">
                            {jackpot?.total_games} GAMES
                        </div>
                <Row className="jp-header-text mb-2 jp-header-element">
                    <div className="jackpot-amount mt">
                        <CurrencyFormat
                            value={jackpot?.jackpot_amount}
                            displayType={'text'}
                            thousandSeparator={true} prefix={'TSH'}/>
                    </div>
                </Row>
                <div className="jp-header-element">
                    <Row>
                        <div className="col-6 col-sm-6">
                            Jackpot
                        </div>
                        <div className="col-6 col-sm-6">
                            <Row className="text-center">
                                <div className="col-4">1</div>
                                <div className="col-4">X</div>
                                <div className="col-4">2</div>
                            </Row>
                        </div>
                    </Row>
                </div>

            </Row>
        </Container>
    )

}

export const JackpotMatchList = (props) => {
    const {matches, jackpotData} = props;

    return (
        <div className="matches full-width mt-5">

            <MatchHeaderRow jackpot={true} first_match={matches ? matches[0] : []}/>

            <Container className="web-element">
                {matches && Object.entries(matches?.data).map(([key, match]) => (
                    <MatchRow match={match} jackpot key={key}/>
                ))
                }
                {(matches !== null && matches.length === 0) &&
                    <div className="top-matches row">
                        No events found.
                    </div>
                }
            </Container>
        </div>
    )
}

const MatchList = (props) => {
    const {
        live, 
        matches, 
        pdown, 
        three_way, 
        fetching, 
        subTypes
    } = props;
    const counter = 0;
    let start_time = null;

    return (
        <div className="matches full-width">

            {matches && <MatchHeaderRow 
                 live={live} 
                first_match={matches ? matches[0] : {}} 
                fetching={fetching}
                three_way={three_way}
                sub_types={subTypes}
                />}

            <Container className="web-element">
                {matches &&
                    Object.entries(matches).map(([key, match]) => {
                        let this_match_time = moment(match.start_time).format("YYYY-MM-DD");
                        let output = ( 
                            <>
                            {
                                (start_time === null ||  this_match_time != start_time) 
                                &&  <div className="top-matches d-flex dat-row"><Moment format="dddd, MMMM Do YYYY">{this_match_time}</Moment> {start_time}</div>
                            }
                            <MatchRow 
                                    match={match} 
                                    key={key}
                                    counter = {key} 
                                    live={live} 
                                    pdown={pdown} 
                                    three_way={three_way}
                                    sub_types={subTypes}/>
                            </> 
                        )
                        start_time = this_match_time;
                        return output; 
                    }
                    
                    )
                }

                {(!matches && fetching === false) &&
                    <div className="top-matches row">
                        No events found.
                    </div>
                }
            </Container>
        </div>
    )
}
export default MatchList;
