import React, {useState, useContext, useEffect} from 'react';
import QuickLogin from './quick-login';
import CompanyInfo from './company-info';
import BetSlip from './betslip';
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import ShareModal from "../sharemodal";
import { Context } from "../../context/store";

const AlertMessage = (props) => {
    // const betslipLength = len(BetSlip);
    return (
        <div className={`alert alert-dismissible ${props.classname}`} role='alert'>
            <button type='button' className='close' data-dismiss='alert' aria-label='Close'><span
                aria-hidden='true'>×</span>
            </button>
            {props.message}
        </div>
    )
}

const Right = (props) => {
    const [state, dispatch] = useContext(Context);
    const {jackpot, betslipValidationData, jackpotData} = props;
    const [betSlipMobile, setBetSlipMobile] = useState(false);
    const [bongeBonusMessage, setBongeBonusMessage] = useState('Chagua mechi 3 au zaidi uweze kupata Bonge Bonus');


    const showShareModalDialog = () => {
        dispatch({type:"SET", key:"showsharemodal", payload:true})
    }

    const  updateBongeBonusMessage = () => {
       let win_matrix = {
           3:3,4:5,5:10,6:15,7:20,8:25,9:30,10:35,11:40,12:45,13:50,14:55,15:60,16:65,17:70,18:80,19:90,20:100
       } 
       let max_games = 16;
       let total_games = Object.keys(state?.betslip||{}).length;

       if(total_games > max_games){
           total_games = max_games;
       }
       let centage = win_matrix[total_games];
       if(!(total_games in win_matrix)){
           setBongeBonusMessage("Chagua mechi 3 au zaidi uweze kupata Bonge Bonus")
           return;
       }

       let bonusAdvice = "";
       if(total_games == 1){
           bonusAdvice = "Ongeza mechi 2 uweza kupata WIN bonus ya 3% kuanzia mechi 3.";
       } else if(total_games == 2){
           bonusAdvice = "Ongeza mechi 1 uweza kupata WIN bonus ya 3% kuanzia mechi 3.";
       } else {
           if(total_games > 2 && total_games <= 16){
               var next_centage = win_matrix[total_games + 1]
               bonusAdvice = "Hongera umepokea WIN bonus ya "
                   + centage + "% kwa mechi " + total_games
                   + " Ongeza mechi 1 uweza kupata WIN bonus ya " +next_centage+ "%";
           } else if(total_games >16){
               bonusAdvice = "Hongera umepokea WIN bonus ya "
                   + centage + "% kwa mechi " + total_games ;
           }
       }
       setBongeBonusMessage(bonusAdvice);
    }

    useEffect(() => {
        updateBongeBonusMessage();
    }, [state?.betslip])


    const BongeBetMarkupMessage = () => {
        return (
          <div className="bonge-bonus" style={{padding:"5px", background:"yellow", marginTop:"3px"}} >
            <div className="" >
                <div className="" id="bonus-centage-advice" style={{fontWeight:"100"}}>{bongeBonusMessage}</div> 
            </div>
          </div>
        )
    }

    return (
        <div className="col-md-3 gn betslip-container sticky-top">
            <div className=" betslip-container d-none d-md-block">
                {props?.message && <AlertMessage classname={props.classname} message={props.message}/>}
                <div className="bet-option-list sticky-top" id=''>
                    <div className="bet alu block-shadow">
                        <header>
                            <div className="betslip-header">
                    <span className="col-sm-2 bkmrk">
                        <i className="fa fa-bookmark" aria-hidden="true"></i></span>
                                <span className="col-sm-8 slp">BETSLIP/JAMVI </span>
                                <span className="col-sm-2 slip-counter">({ Object.keys(state?.betslip||{}).length })</span>
                                {Object.keys(state?.betslip||{}).length > 0 && (<span className="col-sm-2 float-end share-btn btn btn-light" 
                                   style={{marginTop:"4px",width:"fit-content"}}
                                   onClick = {showShareModalDialog} ><span><FontAwesomeIcon icon={faShare} /> </span><span>Share</span></span>) }

                            </div>
                        </header>
                        <button id="slip-button-close" type="button" className="close mobi" aria-hidden="true">×
                        </button>
                        <div id="betslip" className="betslip">
                             {bongeBonusMessage && <BongeBetMarkupMessage /> }
                            <BetSlip jackpot={jackpot} betslipValidationData={betslipValidationData}
                                     jackpotData={jackpotData}/>
                        </div>
                        <QuickLogin/>
                    </div>
                </div>
                <CompanyInfo/>
            </div>
            <div
                className={`fixed-bottom text-white d-block d-md-none shadow-lg betslip-container-mobile ${betSlipMobile ? 'd-block' : 'd-none'}`}>
                <div className="bet-option-list sticky-top" id=''>
                    <div className="bet alu  block-shadow">
                        <header style={{marginTop: "60px"}}>
                            <div className="betslip-header d-flex justify-content-between">
                                <span className="col-sm-8 slp">BETSLIP/JAMVI</span>
                                <span className="col-sm-2 slip-counter d-flex justify-content-center"
                                      title={'Hide BetSlip'} onClick={() => setBetSlipMobile(false)}>
                                    <FontAwesomeIcon icon={faTimes} className={'align-self-center'}/>
                                </span>
                            </div>
                        </header>
                        <div id="betslip" className="betslip">
                            <BetSlip jackpot={jackpot} betslipValidationData={betslipValidationData}/>
                        </div>
                        <QuickLogin/>
                    </div>
                </div>
            </div>
            <div
                className={`${betSlipMobile ? 'd-none' : 'd-block'} d-block d-md-none fixed-bottom text-center text-white bg-info bet-slip-footer-toggle`}
                onClick={() => setBetSlipMobile(true)}>
                Click to show BetSlip
            </div>
        </div>
    )
}
export default Right;
