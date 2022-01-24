import React,{ useState, useEffect} from 'react';
import BetslipSubmitForm from './betslip-submit-form';

const BetSlip = (props) => {
    const {betslip, setBetSlip} = useState();
    const [bonusAmout, setBonusAmount] = useState(0);

    const [totalOdds, setTotalOdds] = useState(1);
    useEffect(() => {
    
    }, betslip);
    return (

        <div className="bet-body">
           <ul>
            <li className="bet-option" style={{background:"yellow"}} >
                <div className="" id="bonus-centage-advice">{props.bonus_advice}</div> 
            </li>
            { betslip?.map((slip) => {
                let odd = slip.odd_value;
                let no_odd_bg = odd == 1 ? '#f29f7a' : '';

                totalOdds +=Math.round(totalOdds*slip.odd_value, 2);
                return (
                    <li className="bet-option hide-on-affix" 
                        style={{background:no_odd_bg}} >
                                
                        <div className="bet-cancel">
                            <input id={slip.match_id} type="submit" value="X" onClick={()=>{}} />
                        </div>
                        <div className="bet-value">{`${slip.home_team} v ${slip.away_team}`}
                            <br /><span className="sp_sport" ></span>
                        </div>
                        <span className="clearfix">{slip.odd_type}</span>
                        <div className="bet-pick" >Pick : {slip.bet_pick}
                            <span className="bet-odd">{slip.odd_value}
                               { slip.odd_value == 1 &&
                                        (<span style={{color:"#cc0000", fontSize:"11px", display:"block"}}>Market Disabled</span>)
                               }
                            </span>
                        </div>

                    </li>)
                })
            }
            </ul>
            <BetslipSubmitForm />
        </div>
    )
}
export default BetSlip;
