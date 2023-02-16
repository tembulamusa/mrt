import React, {useState, useEffect, useContext, useCallback, useMemo} from 'react';
import {Context} from '../../context/store';
import {
    removeFromSlip,
    getBetslip,
    clearSlip,
    clearJackpotSlip, formatNumber
} from '../utils/betslip';
import {toast} from 'react-toastify';
import publicIp from 'public-ip';
import makeRequest from '../utils/fetch-request';
import 'react-toastify/dist/ReactToastify.css';
import PostBet from "../PostBet"
import {
    Formik,
    Form as FormikForm,
    useFormikContext,
    Field
} from 'formik';

import { 
    setLocalStorage,
    removeItem,
} from '../utils/local-storage';

import Airtel from '../../assets/img/payment_logos/airtel2.PNG'
import Mpesa from '../../assets/img/payment_logos/mpesa2.PNG'
import Tigo from '../../assets/img/payment_logos/tigo2.PNG'
import Halo from '../../assets/img/payment_logos/halo2.PNG'
import LoginModal from "../loginmodal";

const Float = (equation, precision = 4) => {
    return Math.round(equation * (10 ** precision)) / (10 ** precision);
}


const BetslipSubmitForm = (props) => {

    const {jackpot, totalGames, totalOdds, betslip, setBetslipsData, jackpotData} = props;
    const [ipv4, setIpv4] = useState(null);
    const [message, setMessage] = useState(null);
    const [state, dispatch] = useContext(Context);

    const [stake, setStake] = useState(100);
    const [stakeAfterTax, setStakeAfterTax] = useState(0);
    const [exciseTax, setExciseTax] = useState(0);
    const [withholdingTax, setWithholdingTax] = useState(0);
    const [possibleWin, setPossibleWin] = useState(0);
    const [netWin, setNetWin] = useState(0);

    const [betslipKey, setBetslipKey] = useState("betslip");
    const [showMoreOptions, setShowMoreOptions] = useState(false);

    const [payLaterNumber, setPaylaterNumber] = useState("");
    const [betAmount, setBetAmount] = useState();
    const [dummySave , setDummySave] = useState();
    const [betId, setBetId] = useState();
    const [mno, setMno] = useState("TIGO PESA");
    const [payLaterBusy, setPayLaterBusy] = useState(false);

    useEffect(() => {
        if (jackpot) {
            setBetslipKey("jackpotbetslip");
        }
    }, [jackpot])

    const ipAddress = useCallback(async () => {
        let ip = await publicIp.v4({
            fallbackUrls: ['https://ifconfig.co/ip']
        }).then((result) => {
            return result
        });

        setIpv4(ip);
    }, [ipv4]);


    const handlePhoneNumberChange = (event) => {
        setPaylaterNumber(event.target.value)
    }


    const handleSubmitPayLaterRequest = () => {
        const values = {
            amount: betAmount,
            msisdn: payLaterNumber
        }
        let endpoint = '/v1/stk/deposit';
        setPayLaterBusy(true);
        makeRequest({url: endpoint, method: 'POST', data: values}).then(([status, response]) => {
            setMessage({status:status, "message": response?.message});
            setPayLaterBusy(false);
            setShowMoreOptions(false);
        })
    }

    const CompleteBetPaymentMarkup = (props) => {

       const SetMNOName = (nt) => {
           let op;
           switch(nt){
              case "tigo":
                   op="TIGO PESA";
                   break;
              case "voda":
                   op="MPESA";
                   break;
              case "aitel":
                   op="AIRTEL";
                   break;
              case "halo":
                   op="HALO PESA";
                   break;
              default:
                   op = "TIGO PESA"; 
                   break;
           }
           setMno(op);
       }

       useEffect(() => {
           if(message && message.status == 202) {
                let match= /(kumbukumbu No. (\d+),)/.exec(message.message);
                let match2 = /(Kiasi ulichobet TZS (\d+(?:.00)),)/.exec(message.message);
                if(match){
                    let betId = match[2];
                    setBetId(betId);
                }
                if(match2){
                    let ba = match2[2];
                    setBetAmount(ba);
                }
           }
       }, [message?.message])

       return (
         <div className="container lipia ">
            <div className="row mb-3">
               <div className="col-12 mb-2 " style={{fontSize:"16px"}}>
                    <strong>Pay via Direct PAYBILL</strong>
               </div>
               <div className="col-12" style={{fontSize:"16px"}}>
                    TZS {betAmount}
               </div>
           </div>
            <div className="row mb-3 pt-2 pb-3" style={{background:"#e5f7fc", 
                fontWeight:"500", textTransform:"capitalize"}}>
               <div className="col-12">
                    Lipia kukamilisha bet yako
               </div>
           </div>
            <div className="row mb-3">
               <div className="col-12">
                    Select payment method
               </div>
               <div className="col-12">
                    <ul className="row">
                      <li className="col" onClick={() => SetMNOName("tigo") }><img style={{width: "60px"}} src={Tigo} alt="Tigo"/></li>
                      <li className="col" onClick={() => SetMNOName("voda") } ><img style={{width: "60px"}} src={Mpesa} alt="Mpesa"/></li>
                      <li className="col" onClick={() => SetMNOName("airtel") }><img style={{width: "60px"}} src={Airtel} alt="Airtel"/></li>
                      <li className="col" onClick={() => SetMNOName("halo") }><img style={{width: "60px"}} src={Halo} alt="Halotel"/></li>
                    </ul>
               </div>
           </div>

            <div className="row mb-3">
               <div className="col-12">
                    <strong>Enter your {mno} Phone Number </strong>
               </div>
           </div>
            <div className="row">
                       <div className="col-12 " id="betting">
                            <input 
                    name="phone_number" 
                    className="bet-select" 
                    type="text" 
                    defaultValue={payLaterNumber} 
                    placeholder="Phone number" 
                    style={{color:"#666666"}}
                    onBlur={ (e) => setPaylaterNumber(e.target.value) }
        />
               </div>
           </div>
            <div className="row">
               <div className="col-12">
                    <button className="place_bet_button" disabled = {payLaterBusy &&  "disabled" } 
                         style={{marginTop:"10px", width:"100%", marginBottom:"10px"}}
                         onClick={() => handleSubmitPayLaterRequest()}> { payLaterBusy === false ? "PAY NOW" : "WAIT ..."} </button>
               </div>
           </div>
        </div> 
       ) 
    
    }

    const PlaceBetResponseInfo = (props) => {
        let c = message?.status == 201 || message?.status == 200 ? 'success' : 'danger';
        let x_style = {
            float: "right",
            display: "block",
            fontSize: "22px",
            color: "orangered",
            cursor: "pointer",
            padding: "3px"
        }
        return (<>{message && (<> { message?.status == 202 ? 
                 <CompleteBetPaymentMarkup  /> 
                 : (<div role="alert"
                     className={`fade alert alert-${c} show alert-dismissible`}>
                    {message.message}
                    <span aria-hidden="true" style={x_style} onClick={() => setMessage(null)}>&times;</span>
                </div>)  }  </>)
               
        }
        </>);

    };
    useEffect(() => {
        ipAddress();
    }, [ipAddress])


    const handlePlaceBet = useCallback((values,
                                        {setSubmitting, resetForm, setStatus, setErrors}) => {
        let bs = Object.values(betslip || []);

        let slipHasOddsChange = false;

        let jackpotMessage = ''
        if (jackpot) {
                jackpotMessage += jackpotData?.jp_key
        }

        let live_bet = false;

        for (let slip of bs) {
            if (jackpot) {
                jackpotMessage += "#" + slip.bet_pick
            }
            if (slip.prev_odds
                && slip.prev_odds != slip.odd_value
                && values.accept_all_odds_change === false) {
                slipHasOddsChange = true;
                if(!values.accept_all_odds_change){
                    break;
                }
            }
            if(slip.live_bet === 1){
                live_bet = true;
            }
        }


        if (!values.user_id) {
            setMessage({status: 400, message: "Kndly login to place bet"});
            dispatch({type:"SET", key:"showloginmodal", payload:true})
            setSubmitting(false);
            return false;
        }

        if (slipHasOddsChange === true && !values.accept_all_odds_change) {
            setMessage({
                status: 400,
                message: "Slip has events with changed odds, tick "
                    + " accept odds all odds change box to accept and place bet"
            });
            setSubmitting(false);
            return false;
        }

        let payload = {
            bet_string: 'web',
            app_name: 'desktop',
            possible_win: possibleWin,
            profile_id: values.user_id,
            stake_amount: values.bet_amount,
            amount: values.bet_amount,
            bet_total_odds: totalOdds,
            endCustomerIP: ipv4,
            channelID: 'web',
            slip: bs,
            account: values.user_id ? 1: 0,
            msisdn: state?.user?.msisdn ||"255000000000",
            accept_all_odds_change: values.accept_all_odds_change
        };
        let endpoint = '/bet';
        let method = "POST"
        let use_jwt = jackpot
        if (jackpot) {
            payload.message = jackpotMessage
            payload.jackpot_id = jackpotData?.jackpot_event_id
            payload.slip = ''
            endpoint = "/jp/bet"
            method = "POST"
        }

        makeRequest({url: endpoint, method: method, data: payload, use_jwt: use_jwt})
            .then(([status, response]) => {
                console.log("Place be reponse as is ", response, status)
                if (status === 200 || status == 201 || status == 202 ) {
                    setMessage(response)
                    //all is good am be quiet
                    const current_betslip = getBetslip();
                    setLocalStorage('old_betslip', current_betslip, 1*60*60*1000);
                    setShowMoreOptions(true);

                   setTimeout(
                        function(){
                            removeItem("old_betslip");
                            removeItem("betslip");
                            setShowMoreOptions(false);
                            setBetslipsData(null);
                            setMessage(null)
                        }, 

                    60000);

                    if (jackpot) {
                        setShowMoreOptions(false);
                        clearJackpotSlip();
                    } 
                    setBetslipsData(null);
                    dispatch({type: "SET", key: jackpot ? 'jackpotbetslip' : 'betslip', payload: {}});
                } else {
                    let qmessage = {
                        status: status,
                        message: response?.message || "Could not place bet.",

                    };
                    console.log("Message on not 200",qmessage )
                    //dispatch({type:"SET", key:"showloginmodal", payload:true});
                    setMessage(qmessage);
                }
                setSubmitting(false);
            })
    });

    const updateWinnings = useCallback(() => {
        if (betslip) {
            let stake_after_tax = Float(stake) / 100 * 100
            let ext = Float(stake) - Float(stake_after_tax);
            let raw_possible_win = Float(stake_after_tax) * Float(totalOdds);
            if (jackpot) {
                raw_possible_win = jackpotData?.jackpot_amount
            }
            if (raw_possible_win > 500000 && !jackpot) {
                raw_possible_win = 500000
            }
            let taxable_amount = Float(raw_possible_win) - Float(stake_after_tax);

            let wint = taxable_amount * 0.1;
            let nw = raw_possible_win - wint;
            setExciseTax(Float(ext, 2));
            setStakeAfterTax(stake_after_tax);
            setNetWin(Float(nw, 2));
            setPossibleWin(Float(raw_possible_win, 2));
            setWithholdingTax(Float(wint, 2));
        } else {
            setNetWin(0);
            setWithholdingTax(0);
            setExciseTax(0);
            setPossibleWin(0);
            setStakeAfterTax(0);
        }
        if (message && message.status > 299) {
            setMessage(null);
        }
    }, [betslip, stake, totalOdds]);

    const handleRemoveAll = useCallback(() => {
        let betslips = getBetslip();
        Object.entries(betslips).map(([match_id, match]) => {
            removeFromSlip(match_id);
            let match_selector = match.match_id + "_selected";
            let ucn = clean_rep(
                match.match_id
                + "" + match.sub_type_id
                + (match.bet_pick)
            );

            dispatch({type: "SET", key: match_selector, payload: "remove." + ucn});
        });
        dispatch({type: "SET", key: "betslip", payload: {}});
        setMessage(null);
    }, []);

    useEffect(() => {
        updateWinnings();
    }, [updateWinnings]);

    const initialValues = {
        bet_amount: jackpot ? jackpotData?.bet_amount : 100,
        accept_all_odds_change: true,
        user_id: state?.user?.profile_id,
        total_games: totalGames,
        total_odd: totalOdds,
    };

    const validate = values => {

        let errors = {}


        if (!values.bet_amount || values.bet_amount < 1) {
            errors.bet_amount = 'Enter valid bet amount';
            setMessage({status: 400, message: errors.bet_amount});
            return errors;
        }
        if (!betslip || Object.keys(betslip).length === 0) {
            errors.user_id = "No betlip selected";
            setMessage({status: 400, message: errors.user_id});
            return errors;
        }
        return errors;
    };


    const clean_rep = (str) => {
        str = str.replace(/[^A-Za-z0-9\-]/g, '');
        return str.replace(/-+/g, '-');
    }


    const SubmitButton = (props) => {
        const {title, disabled, ...rest} = props;
        const {isSubmitting} = useFormikContext();
        return (
            <button type="submit" {...rest} className={`${disabled ? 'disabled' : ''} place-bet-btn bold`}
                    id='place_bet_button'
                    disabled={isSubmitting || disabled}>{isSubmitting ? " WAIT ... " : title}</button>
        );
    };

    return (
        <>
         <LoginModal />
        <PlaceBetResponseInfo />
        { showMoreOptions 
         ?  <PostBet/>
         : <Formik
            initialValues={initialValues}
            onSubmit={handlePlaceBet}
            validate={validate}
            validateOnChange={false}
            validateOnBlur={false}
            enableReinitialize={true}
        >{(props) => {

            const {isValid, errors, values, submitForm, setFieldValue} = props;

            const onFieldChanged = (ev) => {
                let field = ev.target.name;
                let value = ev.target.type === 'checkbox'
                    ? ev.target.checked
                    : ev.target.value;
                if (field == 'bet_amount') {
                    value = value.replace(/[^\d]/g, '');
                    setFieldValue(field, value);
                    setStake(value);
                } else {
                    setFieldValue(field, value);
                }
            }

            const savedBetSlip = getBetslip();

            return (
                <FormikForm name="betslip-submit-form">
                


                <table className="bet-table">
                    <tbody>
                    {!jackpot && <tr className="hide-on-affix">
                        <td>TOTAL ODDS</td>
                        <td style={{textAlign:"right"}}>
                            {Float(totalOdds, 2)}

                        </td>
                    </tr>}
                    <tr id="odd-change-text" style={{borderBottom:"1px solid #cccc"}}>
                        <td colSpan="2">
                            <label className="checkbox">

                                <input type="checkbox"
                                       className="odds-change-box"
                                       name={"accept_all_odds_change"}
                                       id={"accept-all-odds-change"}
                                       checked={values?.accept_all_odds_change}
                                       onChange={(e) => onFieldChanged(e)}
                                /> Accept any odds change
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2" style={{paddingTop:"10px", fontSize:"18px"}}>Stake</td>
                    </tr>
                    <tr>
                        <td colSpan="2" style={{paddingTop:"10px"}}>
                            <div id="betting">
                                {jackpot ?
                                    jackpotData?.bet_amount :
                                    (<input type="text"
                                            className="bet-select"
                                            name="bet_amount"
                                            id="bet_amount"
                                            value={values.bet_amount}
                                            onChange={(e) => onFieldChanged(e)}
                                    />)}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2"></td>
                    </tr>
                    {!jackpot && <tr className="bet-win-tr hide-on-affix">
                        <td>Possible winnings (TZS)</td>
                        <td>
                            <span
                            id="pos_win">{formatNumber(possibleWin)}</span>
                        </td>
                    </tr>}

                    {jackpot ? (
                        ''
                    ) : (
                        <>
                        <tr className="bet-win-tr hide-on-affix">
                            <td> Tax 10% (TZS)</td>
                            <td><span id="tax">{formatNumber(withholdingTax)}</span></td>
                        </tr>

                        <tr className="bet-win-tr hide-on-affix">
                            <td> Bonge Bonus (TZS)</td>
                            <td><span id="tax">{formatNumber(withholdingTax)}</span></td>
                        </tr>
                        </>
                    )}
                    <tr className="bet-win-tr hide-on-affix">
                        <td><strong>{jackpot?'Jackpot Amount':'Net Amount'} (TZS) </strong></td>
                        <td><span
                            id="net-amount"><strong>{formatNumber(jackpot ? jackpotData?.jackpot_amount : Float(netWin + withholdingTax))}</strong></span></td>
                    </tr>
                    <tr>
                        <td className="">
                            <button className="place-bet-btn"
                                    type="button"
                                    onClick={() => handleRemoveAll()}>REMOVE ALL
                            </button>
                        </td>
                        <td className="text-right">
                            <SubmitButton id="place_bet_button"
                                          disabled={jackpot && Object.entries(betslip || []).length != JSON.stringify(jackpotData?.total_games)}
                                          className="place-bet-btn bold"
                                          title="PLACE BET"/>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <input
                    type="hidden"
                    name={"user_id"}
                    id={"user_id"}
                    value={state?.user?.profile_id}
                />
                <input
                    type="hidden"
                    name={"total_odd"}
                    id={"total_odd"}
                    value={totalOdds}
                />
                <input
                    type="hidden"
                    name={"total_games"}
                    id={"total_games"}
                    value={totalGames}
                />
            </FormikForm>)
        }}
        </Formik>
        } // show more options toggle
        </>
    )
}
export default React.memo(BetslipSubmitForm);
