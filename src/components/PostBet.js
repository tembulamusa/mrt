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
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {faFacebook, faInstagram, faTwitter, faYoutube, faWhatsapp} from "@fortawesome/free-brands-svg-icons"

import ShareModal from "./sharemodal";


const PostBet = (props) => {
    const [state, dispatch] = useContext(Context);
	// const newBetslip = 
	const oldBetslip = getFromLocalStorage('old_betslip');
	
	const placeNewBet = () => {

		removeItem("old_betslip");
		window.location = "/";
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
					<li onClick={showShareModalDialog} className="row">
					<span className="col-6">Share your bet </span>
						<span className="share-links col-6 center-text text-center">
							<span className="social-icons center-text text-center">
							<FontAwesomeIcon icon={faFacebook} className="slip-share-icon"/>
							<svg  className="slip-share-icon" width="27px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xmlSpace="preserve">
                             <path d="M0,512l35.31-128C12.359,344.276,0,300.138,0,254.234C0,114.759,114.759,0,255.117,0 S512,114.759,512,254.234S395.476,512,255.117,512c-44.138,0-86.51-14.124-124.469-35.31L0,512z" style={{fill: "rgb(237, 237, 237)"}}></path> <path d="M137.71,430.786l7.945,4.414c32.662,20.303,70.621,32.662,110.345,32.662 c115.641,0,211.862-96.221,211.862-213.628S371.641,44.138,255.117,44.138S44.138,137.71,44.138,254.234 c0,40.607,11.476,80.331,32.662,113.876l5.297,7.945l-20.303,74.152L137.71,430.786z" style={{fill: "rgb(85, 205, 108)"}}></path> <path d="M187.145,135.945l-16.772-0.883c-5.297,0-10.593,1.766-14.124,5.297 c-7.945,7.062-21.186,20.303-24.717,37.959c-6.179,26.483,3.531,58.262,26.483,90.041s67.09,82.979,144.772,105.048 c24.717,7.062,44.138,2.648,60.028-7.062c12.359-7.945,20.303-20.303,22.952-33.545l2.648-12.359 c0.883-3.531-0.883-7.945-4.414-9.71l-55.614-25.6c-3.531-1.766-7.945-0.883-10.593,2.648l-22.069,28.248 c-1.766,1.766-4.414,2.648-7.062,1.766c-15.007-5.297-65.324-26.483-92.69-79.448c-0.883-2.648-0.883-5.297,0.883-7.062 l21.186-23.834c1.766-2.648,2.648-6.179,1.766-8.828l-25.6-57.379C193.324,138.593,190.676,135.945,187.145,135.945" style={{fill: "rgb(254, 254, 254)"}}>
                                    </path>
                            </svg>
							<FontAwesomeIcon icon={faTwitter} className="slip-share-icon"/>
							
                            </span>
						</span>
					</li>
					<li onClick={reBet} className="row"><span className="col-8">Rebet</span>

					<span className="col-4 text-right right-text"><span className="rebet rebet-btn" style={{marginLeft:"10px"}}>
					<svg width="20px" style={{marginLeft:"2px"}} height="20px" xmlns="http://www.w3.org/2000/svg" fill="#ffffff">
					<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
					<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
					<g id="SVGRepo_iconCarrier">
					<path fill="#ffffff" d="M14.9547098,7.98576084 L15.0711,7.99552 C15.6179,8.07328 15.9981,8.57957 15.9204,9.12636 C15.6826,10.7983 14.9218,12.3522 13.747,13.5654 C12.5721,14.7785 11.0435,15.5888 9.37999,15.8801 C7.7165,16.1714 6.00349,15.9288 4.48631,15.187 C3.77335,14.8385 3.12082,14.3881 2.5472,13.8537 L1.70711,14.6938 C1.07714,15.3238 3.55271368e-15,14.8776 3.55271368e-15,13.9867 L3.55271368e-15,9.99998 L3.98673,9.99998 C4.87763,9.99998 5.3238,11.0771 4.69383,11.7071 L3.9626,12.4383 C4.38006,12.8181 4.85153,13.1394 5.36475,13.3903 C6.50264,13.9466 7.78739,14.1285 9.03501,13.9101 C10.2826,13.6916 11.4291,13.0839 12.3102,12.174 C13.1914,11.2641 13.762,10.0988 13.9403,8.84476 C14.0181,8.29798 14.5244,7.91776 15.0711,7.99552 L14.9547098,7.98576084 Z M11.5137,0.812976 C12.2279,1.16215 12.8814,1.61349 13.4558,2.14905 L14.2929,1.31193 C14.9229,0.681961 16,1.12813 16,2.01904 L16,6.00001 L12.019,6.00001 C11.1281,6.00001 10.6819,4.92287 11.3119,4.29291 L12.0404,3.56441 C11.6222,3.18346 11.1497,2.86125 10.6353,2.60973 C9.49736,2.05342 8.21261,1.87146 6.96499,2.08994 C5.71737,2.30841 4.57089,2.91611 3.68976,3.82599 C2.80862,4.73586 2.23802,5.90125 2.05969,7.15524 C1.98193,7.70202 1.47564,8.08224 0.928858,8.00448 C0.382075,7.92672 0.00185585,7.42043 0.0796146,6.87364 C0.31739,5.20166 1.07818,3.64782 2.25303,2.43465 C3.42788,1.22148 4.95652,0.411217 6.62001,0.119916 C8.2835,-0.171384 9.99651,0.0712178 11.5137,0.812976 Z"></path> </g></svg></span>
					</span>
					</li>
					<li onClick={placeNewBet}>Place New Bet</li>
					<li>Betslip Details</li>
				</ul>


				<ul className="post-bet std2-block transparent-li">
				<li style={{fontWeight:"500"}}>Your Picks</li>
				
				
				{Object.entries(oldBetslip || {}).map(([k, slip]) => {
					return (

                    <li key={k} style={{fontSize:"12px"}}>
                    	<div>{slip.start_time} {slip.start_time}</div>
                    	<div className="weight-500">
	                    	<div><span className="primary-color-dark weight-40">{slip.home_team} vs {slip.away_team}</span> <span  className="float-end">{slip.odd_value}</span></div>
	                    	<div className="black-text">{slip.odd_type} <span  className="float-end">Your Pick: {slip.bet_pick}</span></div>
                    	</div>
                     </li>
                    )
					})
				}

				{/*
				{oldBetslip && <div>
					<div>Total odds {oldBetslip.total_odds}</div>
					<div>Total odds {oldBetslip.total_odds}</div>
					<div>Stake Amount {oldBetslip.total_odds}</div>
					<div>Potential Winnings {oldBetslip.total_odds}</div>
					<div>Win After Tax {oldBetslip.total_odds}</div>
					<div>Status {oldBetslip.total_odds}</div>
				</div>}
			*/}
                </ul>

			</div>
		</div>
		)
}





export default PostBet;