import {
    removeFromSlip,
    getBetslip,
    clearSlip,
    clearJackpotSlip, formatNumber
} from './utils/betslip';


const PostBet = (props) => {
	// const newBetslip = 
	// const oldBetslip = getFromLocalStorage('old_betslip');
	return (
		<div className="post-bet-details">
			<div className="unpaid-bet">
				Check for if unpaid
			</div>

			<div className="more-bet-options">
				<ul>
					<li>Share your bet <span className="share-links">btn, btn</span></li>
					<li>Rebet(Reuse Bet selections)</li>
					<li>Place New Bet</li>
					<li>Betslip Details</li>
				</ul>


			</div>
		</div>
		)
}





export default PostBet;