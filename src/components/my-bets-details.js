import React, {useContext, useEffect, useState, useCallback} from "react";
import {Context} from '../context/store';
import makeRequest from './utils/fetch-request';
import { useParams} from 'react-router-dom';
import { getFromLocalStorage} from './utils/local-storage';

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

const MyBetDetails = (props) => {
    const [state, dispatch] = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);
    const { betid } = useParams();
    const [betData, setBetData] = useState();
    const [betSlipData, setBetSlipData] = useState();

    const fetchData = useCallback(async() => {
        if(isLoading) return;
        setIsLoading(true);
        let endpoint = "/v1/betdetails";
        let user = getFromLocalStorage('user');
        let params = {
            bet_id:betid,
            token:user?.token
        }
        console.log("fetch data for bet details", params);

        makeRequest({url: endpoint, method: "POST", data: params}).then(([status, result]) => {
            setBetData(result?.meta?.bet_info)
            setBetSlipData(result?.data)
            console.log("You yu", result?.meta);
            setIsLoading(false);
        });

    }, [state?.user]);

    useEffect(() => {
       fetchData();
    }, [fetchData]);

    const BetItemHeader = (props) => {
        return (
            <div className={`Styles.container`} >
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

    const getBetStatus = (status) => {
        let st =  "pending";
        switch(status){
           case 3:
                st = "lost";
                break;
            case 5:
                st = "won";
                break;
            case 24:
                st = "cancelled";
                break;
            default:
                st="pending";
                break

        }
        return st;
    }
    const BetItem = (props) => {
        const { bet } = props;

        const [betStatus, setBetStatus] = useState(bet?.status_desc);
        const [canCancel, setCanCancel] = useState(bet?.can_cancel === 1);

        const cancelBet = () => {
            let endpoint = '/bet-cancel';
            let data = {
                    bet_id:bet?.bet_id,
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


        const cancelBetMarkup = () => {
            return (
                <div className="col">
                    <button
                         title="Cancel Bet"
                         className="col btn btn-sm place-bet-btn "
                         onClick={()=> cancelBet()} 
                         >
                         Cancel
                    </button>
                </div>
            )
        }

        return (
            <div className="bet-item m-2"  key={bet?.bet_id}>
                <div className="row">
                  <div className="col-5">
                    <div className="col-6">
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
                        { canCancel == false 
                            ? <div className={`win-status-${ getBetStatus(bet.status)}`}> { getBetStatus(bet.status).charAt(0).toUpperCase() + getBetStatus(bet?.status).slice(1).toLowerCase()}</div>
                            : cancelBetMarkup() 
                        }
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
                    <div className="col">{ betslip.winning_outcome}</div>
                    <div className="col">{ betslip.result}</div>
                    <div className="col bold">{ getBetStatus(betslip?.status)}</div>
                </div>
            </div>
        )
    }


    const PageTitle = () => {
       return (
            <div className='col-md-12 biko-bg p-4 text-center small-pad-horizontal' style={{paddingTop:"2px", paddingBottom:"2px"}}>
                <h4 className="inline-block">
                    BET DETAILS { betid }
                </h4>
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
                            { betData && <BetItem bet={betData} />  }
                            <div className="bet-item m-2">
                                { betData && <strong><BetslipHeader /> </strong>}
                                { betSlipData && betSlipData.map((betslip, index) => <BetslipItem betslip={betslip}/> ) }
                            </div>
                        </div>
                    </div>
                    <Right/>
                </div>
            </div> 
            <Footer/>
        </>
    )
}

export default MyBetDetails
