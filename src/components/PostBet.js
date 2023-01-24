import React, {useState, useEffect, useContext, useCallback} from 'react';
import {
    removeFromSlip,
    getBetslip,
    clearSlip,
    clearJackpotSlip, formatNumber
} from './utils/betslip';
import { 
    getFromLocalStorage, 
    setLocalStorage,
    removeItem
} from './utils/local-storage';
import { Context } from "../context/store";

import ShareModal from "./sharemodal";


const PostBet = (props) => {
    const [state, dispatch] = useContext(Context);
	// const newBetslip = 
	const oldBetslip = getFromLocalStorage('old_betslip');
	const shareBet = () => {
		alert("Share invoked");
		return "share function";
	}
	const placeNewBet = () => {

		removeItem("old_betslip");
		window.location = "/";
		return "share function";
	}
	const reBet = () => {
		const oldBetslip = getFromLocalStorage('old_betslip');
	    setLocalStorage('betslip', oldBetslip, 1*60*60*1000);
	    removeItem("old_betslip");
		window.location.reload();
	}

	const showShareModalDialog = () => {
		const oldBetslip = getFromLocalStorage('old_betslip');
	    setLocalStorage('betslip', oldBetslip, 1*60*60*1000);

        dispatch({type:"SET", key:"showsharemodal", payload:true})
    }

	return (
		<div className="post-bet-details">
			<div className="unpaid-bet">
			</div>

			<div className="more-bet-options">
				<ul className="post-bet-more-action">
					<li onClick={showShareModalDialog}>Share your bet <span className="share-links">
					<button className="btn btn-success">Share Betslip</button></span></li>
					<li onClick={reBet}>Rebet(Reuse Bet selections)</li>
					<li onClick={placeNewBet}>Place New Bet</li>
					<li>Betslip Details</li>
				</ul>


				<ul>
				<li>Your Picks</li>
				{Object.entries(oldBetslip || {}).map(([k, slip]) => {
					return (

                    <li key={k}>
                    	<div>{slip.start_time} {slip.start_time}</div>
                    	<div>{slip.home_team} vs {slip.away_team} {slip.odd_value}</div>
                    	<div>{slip.odd_type} {slip.bet_pick}</div>
                     </li>
                    )
					})
				}

				{oldBetslip && <div>
					<div>Total odds {oldBetslip.total_odds}</div>
					<div>Total odds {oldBetslip.total_odds}</div>
					<div>Stake Amount {oldBetslip.total_odds}</div>
					<div>Potential Winnings {oldBetslip.total_odds}</div>
					<div>Win After Tax {oldBetslip.total_odds}</div>
					<div>Status {oldBetslip.total_odds}</div>
				</div>}
                </ul>

			</div>
		</div>
		)
}





export default PostBet;