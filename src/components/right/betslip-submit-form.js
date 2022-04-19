import React, { useState, useEffect, useContext, useCallback, useMemo }from 'react';
import { Context }  from '../../context/store';
import { 
    removeFromSlip, 
    getBetslip,
    clearSlip,
    clearJackpotSlip
}  from '../utils/betslip';
import { toast } from 'react-toastify';
import publicIp from 'public-ip';
import makeRequest from '../utils/fetch-request'; 
import 'react-toastify/dist/ReactToastify.css';

import {
    Formik,
    Form as FormikForm,
    useFormikContext,
    Field
} from 'formik';

const Float = (equation, precision=4) => {
    return Math.round(equation * (10 ** precision)) / (10 ** precision);
}



const BetslipSubmitForm = (props) =>{

    const { jackpot, totalGames, totalOdds, betslip, setBetslipsData } = props;
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

    useEffect(()=>{
        if(jackpot){
            setBetslipKey("jackpotbetslip");
        }
    }, [jackpot])

    const ipAddress = useCallback(async () => {
        let ip = await publicIp.v4({
            fallbackUrls: [ 'https://ifconfig.co/ip' ]
        }).then((result) => { return result});

        setIpv4(ip);
    }, [ipv4]);

    const Alert = (props) => {
        let c = message?.status == 201  ? 'success' : 'danger';
        let x_style= {
            float: "right",
            display: "block",
            fontSize: "22px",
            color: "orangered",
            cursor:"pointer",
            padding:"3px"
        }
        return (<>{ message?.status  && 
            <div role="alert" 
                className={`fade alert alert-${c} show alert-dismissible`}>
                    {message.message}
                    <span aria-hidden="true" style={x_style} onClick={()=> setMessage(null)}>&times;</span>
            </div> } 
        </>) ;

    };
    useEffect(() => {
        ipAddress();
    }, [ipAddress])


    const handlePlaceBet =  useCallback((values, 
        { setSubmitting,  resetForm, setStatus, setErrors})  => {
        let bs = Object.values(betslip || []);

        let slipHasOddsChange = false;

        for(let slip of bs) {
            if(slip.prev_odds 
                && slip.prev_odds != slip.odd_value 
                && values.accept_all_odds_change === false) 
            {
                console.log("For each found slip with odds chnage");
                slipHasOddsChange = true;
                break;
            }
        };

        if(slipHasOddsChange === true){
            Notify( {
                    status:400, 
                    message: "Slip has events with changed odds, tick "
                    + " accept odds all odds change box to accept and place bet"
            });
            setSubmitting(false);
            return false;
        }

        let payload = {                                                         
            bet_string : 'web',                                  
            app_name : 'desktop',                                 
            possible_win: possibleWin,                          
            profile_id: values.user_id,                               
            stake_amount : values.bet_amount,                            
            bet_total_odds : totalOdds,                             
            endCustomerIP: ipv4,                         
            channelID: 'web',
            slip: bs,
            account:1,                               
            msisdn: state?.user?.msisdn,           
            accept_all_odds_change:values.accept_all_odds_change
        }; 
        let endpoint = '/bet';
        makeRequest({url: endpoint, method: 'GET', data: payload, use_jwt:true})
            .then(([status, response]) => {
                setMessage(response);
                if(status === 200 || status == 201 || status == 204){
                    //all is good am be quiet
                    if(jackpot) {
                        clearJackpotSlip();
                    } else {
                        clearSlip();
                    }
                   setBetslipsData(null);
                   dispatch({type:"SET", key:"betslip", payload:{}});
                } else {
                    let qmessage = {
                        status : status,
                        message:response?.message || "Error attempting to login" 
                    };
                    Notify(qmessage);
                }
                setSubmitting(false);
            })
    });

    const updateWinnings = useCallback(() => {
        if( betslip ) { 
            let stake_after_tax = Float(stake)/Float(107.5)*100
            let ext = Float(stake) - Float(stake_after_tax);
            let raw_possible_win = Float(stake_after_tax) * Float(totalOdds);
            let taxable_amount = Float(raw_possible_win)-Float(stake_after_tax);
            let wint = taxable_amount*0.2;
            let nw = raw_possible_win - wint;
            setExciseTax(Float(ext,2));
            setStakeAfterTax(stake_after_tax);
            setNetWin(Float(nw,2));
            setPossibleWin(Float(raw_possible_win,2));
            setWithholdingTax(Float(wint,2));
       } else {
          setNetWin(0);
          setWithholdingTax(0);
          setExciseTax(0);
          setPossibleWin(0);
          setStakeAfterTax(0);
       }
       if(message && message.status > 299){
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
           
           dispatch({type:"SET", key:match_selector, payload:"remove."+ucn});
        });
        dispatch({type:"SET", key:"betslip", payload:{}});
        setMessage(null);
    }, []);

    useEffect(() => {
        updateWinnings();
    }, [updateWinnings]);

    const initialValues = {
        bet_amount: 100,
        accept_all_odds_change:  true,
        user_id:state?.user?.profile_id,
        total_games:totalGames,
        total_odd: totalOdds,
    };

    const validate = values => {

        let errors = {}

        if (!values.user_id  ) {
            errors.user_id = 'Kindly login to proceed';
            Notify({status:400, message:errors.user_id});
            return errors;
        }

        if (!values.bet_amount || values.bet_amount < 1) {
            errors.bet_amount = 'Enter valid bet amount';
            Notify({status:400, message:errors.bet_amount});
            return errors;
        }
        if (!betslip || Object.keys(betslip).length === 0) {
            errors.user_id = "No betlip selected";
            Notify({status:400, message:errors.user_id});
            return errors;
        }
        return errors;
    };


    const Notify = (message) => {
        let options =  { 
           position: "top-right", 
           autoClose: 5000, 
           hideProgressBar: true, 
           closeOnClick: true, 
           pauseOnHover: true, 
           draggable: true, 
           progress: undefined, 
           toastId:676737/* this is hack to prevent multiple toasts */
        }
        if(message.status == 201){
           toast.success(`🚀 ${message.message}`,options);
        } else {
           toast.error(`🦄 ${message.message}`,options);
        }

    };

    const clean_rep = (str) => {
        str = str.replace(/[^A-Za-z0-9\-]/g, '');
        return str.replace(/-+/g, '-');
    }

    const SubmitButton = (props) => {
        const { title, ...rest } = props;
        const { isSubmitting } = useFormikContext();
        return (
             <button type="submit" {...rest} disabled={isSubmitting}>{isSubmitting ? " WAIT ... " : title}</button>
        );
    };

    return (

        <Formik 
              initialValues={initialValues}
              onSubmit={handlePlaceBet}
              validate={validate}
              validateOnChange={false}
              validateOnBlur={false}
              enableReinitialize={true} 
              >{(props) =>  {

            const {isValid, errors, values, submitForm, setFieldValue } = props;

            const onFieldChanged = (ev)=>{
                let field = ev.target.name;
                let value = ev.target.type === 'checkbox' 
                    ? ev.target.checked 
                    : ev.target.value;
                if(field == 'bet_amount'){
                    value = value.replace(/[^\d]/g, '');
                    setFieldValue(field, value);
                    setStake(value);
                } else {
                    setFieldValue(field, value);
                }
            }

            return (<FormikForm name="betslip-submit-form" >
                <Alert />
                <table className="bet-table">
                 <tbody>
                    <tr className="hide-on-affix">
                        <td>TOTAL ODDS</td>
                        <td>
                          <b>{Float(totalOdds, 2)}</b>
            
                        </td>
                        
                    </tr>
                    <tr id="odd-change-text">
                        <td colSpan="2">
                            <label className="checkbox">
                                
                                <input type="checkbox"
                                    className="odds-change-box"
                                    name={"accept_all_odds_change"}
                                    id={"accept-all-odds-change"}
                                    checked = {values?.accept_all_odds_change}
                                    onChange={(e) => onFieldChanged(e) }
                                /> Accept any odds change
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td>Stake</td>
                        <td>
                            <div id="betting">
                                <input type="text"
                                    className="bet-select"
                                    name="bet_amount"
                                    id="bet_amount"
                                    value={values.bet_amount}
                                    onChange = {(e) => onFieldChanged(e)}
                                /> 
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2"></td>
                    </tr>
                    <tr className="bet-win-tr hide-on-affix">
                        <td>Possible winnings</td>
                        <td>
                            KES. <span
                                    id="pos_win">{possibleWin}</span>
                        </td>
                    </tr>
                    <tr className="bet-win-tr hide-on-affix">
                        <td> Excise Tax (7.5%)</td>
                        <td>KES. <span id="tax">{exciseTax}</span></td>
                    </tr>
                    <tr className="bet-win-tr hide-on-affix">
                        <td> Withholding (20%)</td>
                        <td>KES. <span id="tax">{withholdingTax}</span></td>
                    </tr>
                    <tr className="bet-win-tr hide-on-affix">
                        <td>Net Amount</td>
                        <td>KES. <span id="net-amount">{netWin}</span></td>
                    </tr>
                    <tr>
                        <td>
                            <button className="place-bet-btn" 
                                type="button" 
                                onClick={()=> handleRemoveAll()}>REMOVE ALL</button>
                        </td>
                        <td>
                            <SubmitButton id="place_bet_button" 
                               className="place-bet-btn" 
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
    </Formik>)
}
export default React.memo(BetslipSubmitForm);
