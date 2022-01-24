import React from 'react';

const BetslipSubmitForm = (props) =>{
    
    
    return (
        <form name="betslip-submit-form" >
            <table className="bet-table">
             <tbody>
                <tr className="hide-on-affix">
                    <td>TOTAL ODDS</td>
                    <td><b>{props?.totalOdds}</b></td>
                </tr>
                <tr id="odd-change-text">
                    <td colSpan="2">
                        <label className="checkbox">
                            <input className="odds-change-box" type="checkbox" id="accept-all-odds-change" name="accept-all-odds-change" defaultValue="1"  /> Accept any odds change
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>Stake</td>
                    <td>
                        <div id="betting">
                            <input className="bet-select" type="text" id="bet_amount" name="bet_amount" onKeyUp={()=> {}}  defaultValue="100"
                                   min="300" max="500000"/>
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
                                id="pos_win">3000</span>
                    </td>
                </tr>
                <tr className="bet-win-tr hide-on-affix">
                    <td>Bonus (<span id="bonus-centage">3</span>%)</td>
                    <td>KES. <span id="bonus">200</span></td>
                </tr>
                <tr className="bet-win-tr hide-on-affix">
                    <td>Tax (7.5%)</td>
                    <td>KES. <span id="tax">75</span></td>
                </tr>
                <tr className="bet-win-tr hide-on-affix">
                    <td>Net Amount</td>
                    <td>KES. <span id="net-amount">1000</span></td>
                </tr>
                <tr>
                    <td>
                        <button className="place-bet-btn" type="button" onClick={()=>{}}>REMOVE ALL</button>
                    </td>
                    <td>
                        <button type="button" id="place_bet_button" className="place-bet-btn" onClick={()=>{}}>
                            PLACE BET
                        </button>
                    </td>
                </tr>
            </tbody>
            </table>
                
            <input type="hidden" id="user_id" value={props?.user?.user_id} readOnly="readonly" />
            <input type="hidden" id="total_odd" value={props?.totalOdds} readOnly="readyonly"/>
            <input type="hidden" id="total_games" value={ props?.betslip?.length} readOnly="readyonly"/>
        </form>
    )
}
export default BetslipSubmitForm;
