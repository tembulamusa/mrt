import React, {useContext, useEffect, useState, useCallback} from "react";
import {Context} from '../context/store';
import makeRequest from './utils/fetch-request';
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
} from 'react-accessible-accordion';

import '../assets/css/accordion.react.css';

const Header = React.lazy(()=>import('./header/header'));
const Footer = React.lazy(()=>import('./footer/footer'));
const SideBar = React.lazy(()=>import('./sidebar/awesome/Sidebar'));
const CarouselLoader = React.lazy(()=>import('./carousel/index'));
const Right = React.lazy(()=>import('./right/index'));

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
    const [mybets, setMybets] = useState(null);

    const fetchData = useCallback(async() => {
        if(isLoading) return;
        setIsLoading(true);
        let endpoint = "/v1/mybets?status="+loadedBetStaus+"&limit=";
        makeRequest({url: endpoint, method: "POST", data: null}).then(([status, result]) => {
            setMybets(result);
            setIsLoading(false);
        });

    }, [loadedBetStaus]);

    useEffect(() => {
       fetchData();
    }, [fetchData]);

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

        const [betStatus, setBetStatus] = useState(bet.status_desc);
        const [canCancel, setCanCancel] = useState(false);

        const cancelBet = () => {
            let endpoint = '/bet-cancel';
            let data = {
                    bet_id:bet.bet_id,
                    cancel_code:101,
                    user:state?.user,
            }
            makeRequest({url: endpoint, method: "POST", data: data, use_jwt:true}).then(([status, result]) => {
                if(status === 201){
                   setBetStatus('CANCELED');
                   setCanCancel(false);

                }
            });
        };

        useEffect(() => {
            if(bet){
                let bet_time = new Date(bet.created).getTime();
                var currentDate = new Date().getTime();
                let diff =  currentDate - bet_time;
                if(diff/1000/60 < 20){
                    setCanCancel(true);
                }
            }
        }, [])

        const cancelBetMarkup = () => {
            return (
                <div className="col">
                    <button
                         title="Cancel Bet"
                         className="col win-status-cancel "
                         onClick={()=> cancelBet()} 
                         >
                         Cancel
                    </button>
                </div>
            )
        }

        return (
            <div className={`container`}  key={bet.bet_id}>
                <div className="row">
                  <div className="col-5">
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
                   <div className="col-2">
                       <div className="row"> 
                         <div className="col">
                            <div className={`uppercase win-status-${bet.status.toLowerCase()}`}> { bet.status.charAt(0).toUpperCase() + bet.status.slice(1).toLowerCase()}</div>
                           { canCancel === true && cancelBetMarkup() }
                        </div>
                      </div>
                 </div>
                </div>
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
			{mybets && mybets.map((bet) => (
				<div className="mybet-list" 
                    key = {bet.bet_id} 
                    uuid = { bet.bet_id }
					>
					<div className="bet-item">
                        <a href={`/my-bet-detail/${bet.bet_id}`} >
							<BetItem bet={bet}  key={bet.id}/>
                        </a>
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
            <Header user={state?.user}/>
            <div className="amt">
                <div className="d-flex flex-row justify-content-between">
                    <div className="d-md-block d-none"><SideBar loadCompetitions/></div>
                    <div className="gz home" style={{width: '100%'}}>
                        <div className="homepage">
                            <CarouselLoader/>
                            <PageTitle />
                            <MyBetsList  />
                        </div>
                    </div>
                    <Right/>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default MyBets
