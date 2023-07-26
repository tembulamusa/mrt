import React, {useContext, useEffect, useState, useCallback} from "react";
import { useNavigate, Link } from 'react-router-dom';
import {Context} from '../context/store';
import makeRequest from './utils/fetch-request';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faRecycle, faTimes} from "@fortawesome/free-solid-svg-icons";
import {
    setLocalStorage
} from './utils/local-storage'; 
import { useMediaQuery } from 'react-responsive';


import CarouselLoader from './carousel/index';
import { ShimmerTable } from "react-shimmer-effects";

const Styles = {
   container: {
       background:'#22323e !important',
   },
   headers: {
       background:'##34B3BF',
       color:'#ffffff',
       padding: '10px 40px 10px',
       fontSize: '12px'
   },
   bet:{
       background:'#34B3BF',
       color:'#fff',
       padding: '5px',
   }
};

const MyBets = (props) => {
    const [state, dispatch] = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);
    const [loadedBetStaus, setLoadedBetStatus] = useState("all")
    const [mybets, setMybets] = useState([]);
    const isMobile = useMediaQuery({ query: `(max-width: 576px)` });
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [datalen, setDataLen] = useState(1);
    const [limit, setLimit] = useState(50);
    const [hasMore, setHasMore] = useState(true);

    const fetchData = useCallback(async () => {
        if(isLoading || !hasMore) return;
        setIsLoading(true);
        let endpoint = "/v1/mybets?status="+loadedBetStaus+"&limit=" + limit + "&page="+page;
        makeRequest({url: endpoint, method: "POST", data: null}).then(([status, result]) => {
            if(result) {
                setMybets([...mybets, ...result]);
                setHasMore(true);
            } else {
               setHasMore(false);
            }
            setIsLoading(false);
        });

    }, [loadedBetStaus, page]);

    const onScroll = useCallback(() => {
        const scrollTop = document.documentElement.scrollTop
        const scrollHeight = document.documentElement.scrollHeight
        const clientHeight = document.documentElement.clientHeight

        if (datalen && scrollTop + clientHeight >= scrollHeight) {
          let newPage = datalen ? Math.floor(datalen/limit) + 1 : 1;
          setPage(newPage);
           
        }
    }, [datalen])

    useEffect(() => {
       fetchData();
    }, [fetchData]);

    useEffect(() => {
        if(mybets) {
           setDataLen(mybets.length);
        }
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [mybets, datalen, onScroll])

    const BetItemHeader = (props) => {
        return (
            <div className={`container`} style={Styles.headers}>
                <div className="row">
                    <div className="col">CREATED</div>
                    <div className="col">ID</div>
                    <div className="col">GAMES</div>
                    <div className="col">BET AMOUNT</div>
                    <div className="col">POSSIBLE WIN</div>
                    <div className="col">TAX</div>
                    <div className="col">Status</div>
                </div>
            </div>
        );
    }
    const BetItem = (props) => {
        const { bet } = props;

        const [betStatus, ] = useState(bet.status);
        const [canSharenRebet, setCanSharenRebet] = useState(bet?.sharable);
        const [betslipActionMessage, setBetslipActionMessage] = useState();


        const cancelBet = (e) => {
            e.preventDefault();
            let endpoint = '/bet-cancel';
            let data = {
                    bet_id:bet.bet_id,
                    cancel_code:101,
                    user:state?.user,
            }
            makeRequest({url: endpoint, method: "POST", data: data, use_jwt:true}).then(([status, result]) => {
                if(status === 201){
                   setBetslipActionMessage(result?.message);

                } else {
                   setBetslipActionMessage("Error: " + result?.message);
                }
            });
        };

        const CancelBetMarkup = () => {
            return (
                <button className="share-btn btn btn-light uppercase" 
                style={{marginTop: "4px", width:"fit-content", background:"#c6224e", color:"#fff"}}
                onClick={(e)=> cancelBet(e)} 
                >
                   <span> <FontAwesomeIcon icon={faTimes} /> 
                  </span>
                  <span> Cancel</span>
                </button>
            ) 
        }

        const showShareModalDialog = (e) => {
            e.preventDefault();
            let endpoint = "/v1/share?bet_id="+bet.bet_id;
            makeRequest({url: endpoint, method: "GET", data: null, use_jwt:false}).then(([status, result]) => {
                if(status === 200){
                   setLocalStorage('betslip', result?.betslip, 1*60*60*1000);
                   dispatch({type:"SET", key:"showsharemodal", payload:true});
                   dispatch({type:"SET", key:"betamount", payload:result?.betamount});
                   dispatch({type:"SET", key:"sharecode", payload:bet.bet_id});
                }
            });

        }

        const rebetFromMyBetslip = (e) => {
            e.preventDefault();
            let endpoint = "/v1/share?bet_id="+bet.bet_id;
            makeRequest({url: endpoint, method: "GET", data: null, use_jwt:false}).then(([status, result]) => {
                if(status === 200){
                   setLocalStorage('betslip', result?.betslip, 1*60*60*1000);
                   dispatch({type:"SET", key:"betslip", payload:result?.betslip})
                   dispatch({type:"SET", key:"betamount", payload:result?.betamount});
                   dispatch({type:"SET", key:"sharecode", payload:bet.bet_id});
                   setBetslipActionMessage("Betslip loader successfully");
                   isMobile && navigate("/mobile-betslip");
                }
            });
        }

        const ShareMarkup = () => {
            return (
                <button className="share-btn btn btn-light uppercase" 
                style={{marginTop: "4px", width:"fit-content", background:"#0C3C5A", color:"#fff"}}
                onClick={(e) => showShareModalDialog(e)}>
                   <span>
                     <svg aria-hidden="true" focusable="false" 
                         data-prefix="fas" data-icon="share" className="svg-inline--fa fa-share fa-w-16 " 
                         role="img" 
                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                          <path fill="currentColor" d="M503.691 189.836L327.687 37.851C312.281 24.546 288 35.347 288 56.015v80.053C127.371 137.907 0 170.1 0 322.326c0 61.441 39.581 122.309 83.333 154.132 13.653 9.931 33.111-2.533 28.077-18.631C66.066 312.814 132.917 274.316 288 272.085V360c0 20.7 24.3 31.453 39.687 18.164l176.004-152c11.071-9.562 11.086-26.753 0-36.328z"></path></svg> 
                  </span>
                  <span> Share</span>
                </button>) 
        
        }
        const RebetMarkup = () => {
            return (
                <button 
                   className="share-btn btn btn-light uppercase" 
                   style={{marginTop: "4px", width:"fit-content", background:"green", color:"#fff"}}
                   onClick={(e) => rebetFromMyBetslip(e)} >
                   <span> <FontAwesomeIcon icon={faRecycle} /> 
                  </span>
                  <span> Rebet</span>
                </button>) 
        
        }
        return (
            <div className={`container`}  key={bet.bet_id}>
                <div className="row">
                  <div className="col-6">
                    <div className="col-12">
                      <div className="row">
                        <div className="col-4">DATE </div>
                        <div className="col-8">{ bet.created}</div>
                      </div>
                      <div className="row">
                        <div className="col">BET ID</div>
                        <div className="col"><strong>{ bet.bet_id}</strong></div>
                      </div>
                      <div className="row">
                        <div className="col">GAMES </div>
                        <div className="col">{ bet.total_matches}</div>
                      </div>
                   </div>
                  </div>
                  <div className="col-5">

                      <div className="row">
                        <div className="col">ODDS</div>
                        <div className="col">{ bet.total_odd}</div>
                     </div>
                      <div className="row">
                        <div className="col">STAKE TZS </div>
                        <div className="col">{ bet.bet_amount}</div>
                     </div>
                      <div className="row">
                          <div className="col">POSSIBLE WIN TSH</div>
                          <div className="col"><strong>{ bet.possible_win}</strong></div>
                      </div>
                 </div>
             </div>
             <div className="row"> 
                   <div className="col-auto">
                        <div className={`uppercase win-status-${betStatus.toLowerCase()}`}> { betStatus }</div>
                   </div>
                   { canSharenRebet !== 0 && !bet.jackpot_bet_id  &&
                        <>
                            <div className="col-auto">
                                <div className="uppercsae"> <ShareMarkup /> </div>
                            </div>
                            <div className="col-auto">
                                <div className="uppercase"><RebetMarkup /> </div> 
                            </div>
                        </>
                      
                    }
                    
                 </div>
            { betslipActionMessage && <div className="row">
                    <div className="col-auto" style={{color:"red"}}>{betslipActionMessage}  </div>
                  </div> 
            }
            </div>
        );
    }


    const BetslipHeader = () => {
        
        return (
            <div className={`container slipheader`} >
                <div className="row">
                    <div className="col">Start</div>
                    <div className="col">Home</div>
                    <div className="col">Away</div>
                    <div className="col">MKT</div>
                    <div className="col">Odds</div>
                    <div className="col">Pick</div>
                    <div className="col">Outcome</div>
                    <div className="col">FT</div>
                    <div className="col">Status</div>
                </div>
            </div>
        )
    }

    const BetslipItem = (props) => {
        const { betslip } = props;

		
        return (
            <div className={`container kumbafu`}  key={betslip.game_id}>
                <div className="row">
                    <div className="col">{ betslip.start_time}</div>
                    <div className="col">{ betslip.home_team}</div>
                    <div className="col">{ betslip.away_team}</div>
                    <div className="col">{ betslip.market}</div>
                    <div className="col">{ betslip.odd_value}</div>
                    <div className="col">{ betslip.bet_pick}</div>
                    <div className="col">{ betslip.outcomes}</div>
                    <div className="col">{ betslip.ft_result}</div>
                    <div className={`col win-status-${betslip.status}`}>{ betslip.status}</div>
                </div>
            </div>
        )
    }

    const MyBetsList = (props) => {
		return (
         <>
         <div className="row" style={{padding: "0 10px",}}>
			{mybets && mybets?.map((bet) => (
				<div className="mybet-list" 
                    key = {bet.bet_id} 
                    uuid = { bet.bet_id }
					>
					<div className="bet-item">
                        <Link to={`/my-bet-detail/${bet.bet_id}`} >
							<BetItem bet={bet}  key={bet.id}/>
                        </Link>
					</div>
				</div>
			))}
            {!mybets?.length && <div className="col-12 bet-item h-4">No bets found</div>}
		</div>
          </>
	    );

    }

    const PageTitle = () => {
       return (
            <div className='col-md-12 biko-bg p-4 text-center small-pad-horizontal' style={{paddingTop:"2px", paddingBottom:"2px"}}>
                <h4 className="inline-block col-12">
                    MY BET HISTORY
                </h4>
                <div className="row">
                    <div className="container p-0 flex">
                        <div className={`col-3 mybet-header ${loadedBetStaus === "all" ? "active": ""}`} 
                           onClick={ () => setLoadedBetStatus("all") } >
                           ALL
                        </div>
                        <div className={`col-3 mybet-header ${loadedBetStaus  === "pending" ? "active": ""}`}
                           onClick={ () => setLoadedBetStatus("pending") } >
                          PENDING
                        </div>
                        <div className={`col-3 mybet-header ${loadedBetStaus  === "settled" ? "active": ""}`}
                           onClick={ () => setLoadedBetStatus("settled") } >
                          SETTLED
                        </div>
                        <div className={`col-3 mybet-header ${loadedBetStaus  === "jackpot" ? "active": "" }`}
                           onClick={ () => setLoadedBetStatus("jackpot") } >
                          JACKPOT
                        </div>
                     </div>
                </div>
            </div>
       )
    }
    return (
        <>
            <CarouselLoader/>
            <PageTitle />
            <MyBetsList  />
            {isLoading && <ShimmerTable row={1} col={2} /> }
        </>
    )
}

export default MyBets
