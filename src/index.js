import React, {useEffect, useCallback, useContext} from "react";
import {render} from "react-dom";


import {
    BrowserRouter,
    Route,
    Routes,
    useNavigate,
} from 'react-router-dom'

import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/application.css';
import './assets/css/tolkits.css';
import './assets/css/sidebar-menu.css';
import './index.css';

import Store from './context/store';
import {Context} from './context/store';

import Index  from './components/index';
import MatchAllMarkets from  './components/all-markets';
import Jackpot from './components/jackpot';
import Live from './components/live';
import MyBets from './components/my-bets';
import MyBetDetails from './components/my-bets-details';
import HowToPlay from './components/pages/HowToPlay';
import TermsAndConditions from './components/pages/terms-and-conditions/index';
import CookiePolicy from './components/pages/cookie-policy/index';
import DisputeResolution from './components/pages/dispute-resolution/index';
import ResponsibleGambling from './components/pages/responsible-gambling';
import AntimoneyLaundering from './components/pages/anti-money-laundering';
import PrivacyPolicy from './components/pages/privacy-policy/index';
import Withdraw from './components/pages/deposit-withraw/Withdraw';
import Deposit from './components/pages/deposit-withraw/Deposit';
import Signup from './components/pages/signup';
import Login from './components/pages/login';
import ResetPassword from './components/pages/auth/reset-password';
import VerifyAccount from './components/pages/auth/verify-account';
import MobileApp from './components/pages/app';
import ProtectedRoute from './components/utils/protected-route';
import PrintMatches from './components/pages/downloads';
import Casino from './components/pages/casino/Casino';
import LiveCasino from './components/pages/casino/LiveCasino';
import Virtuals from './components/pages/casino/Virtuals';
import CasinoGamePlay from './components/pages/casino/GamePlay';
import Promotions from './components/pages/promotions/Promotions';
import Help from './components/pages/Help';
import Transactions from './components/pages/transactions';
import LiveScore from './components/pages/livescore/LiveScore';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import MatchList from './components/matches/index';
import Right from './components/right/index';
import SideBar from './components/sidebar/awesome/Sidebar';

const Logout = () => {
    let navigate = useNavigate();

    const [state, dispatch] = useContext(Context);
    const out = useCallback(() => {
        localStorage.clear();
        dispatch({type: "DEL", key: "user"});
        navigate("/");
    }, [navigate]);

    useEffect(() => {
        out();
    }, [out]);
    return null;
}

const App = () => {

    const [state, ] = useContext(Context);
    return ( 
            <BrowserRouter>
                <Header/>
                <div className="amt">
                    <div className="d-flex flex-row justify-content-between">
                        <div className="d-md-block d-none"><SideBar loadCompetitions/></div>
                        <div className="gz home" style={{width: '100%'}}>
                            <div className="homepage">
                              <Routes>
                                <Route exact path="/" element={<Index/>}/>
                                <Route exact path="/share/:code" element={<Index/>}/>
                                <Route exact path="/betslip/share/:code" element={<Index/>}/>
                                <Route exact path="/virtuals" element={<Casino/>}/>
                                <Route exact path="/virtuals/index" element={<Virtuals />}/>
                                <Route exact path="/virtuals/casino" element={<Casino />}/>
                                <Route exact path="/livescore" element={<LiveScore/>}/>
                                <Route exact path="/casino" element={<Casino/>}/>
                                <Route exact path="/livecasino" element={<LiveCasino/>}/>
                                <Route exact path="/virtuals/launch/:game_id" element={<CasinoGamePlay/>}/>
                                <Route exact path="/highlights" element={<Index tab={'highlights'}/>} />
                                <Route exact path="/upcoming" element={<Index tab={'upcoming'} />} />
                                <Route exact path="/tomorrow" element={<Index tab={'tomorrow'}/>} />
                                <Route exact path="/competition/:id" element={<Index/>}/>
                                <Route exact path="/competition/:sportid/:categoryid/:competitionid"
                                       element={<Index/>}/>
                                <Route exact path="/match/:id" element={<MatchAllMarkets/>}/>
                                <Route exact path="/match/live/:id" element={<MatchAllMarkets live/>}/>
                                <Route exact path="/jackpot" element={<Jackpot/>}/>
                                <Route exact path="/live" element={<Live/>}/>
                                <Route exact path="/live/:spid" element={<Live/>}/>
                                <Route exact path="/privacy-policy" element={<PrivacyPolicy/>}/>
                                <Route exact path="/anti-money-laundering" element={<AntimoneyLaundering/>}/>
                                <Route exact path="/responsible-gambling" element={<ResponsibleGambling/>}/>
                                <Route exact path="/dispute-resolution" element={<DisputeResolution/>}/>
                                <Route exact path="/cookie-policy" element={<CookiePolicy/>}/>
                                <Route exact path="/terms-and-conditions" element={<TermsAndConditions/>}/>
                                <Route exact path="/how-to-play" element={<HowToPlay/>}/>
                                <Route exact path="/signup" element={<Signup/>}/>
                                <Route exact path="/login" element={<Login/>}/>
                                <Route exact path="/reset-password" element={<ResetPassword/>}/>
                                <Route exact path="/verify-account" element={<VerifyAccount/>}/>
                                <Route exact path="/app" element={<MobileApp/>}/>
                                <Route exact path="/logout" element={<Logout/>}/>
                                <Route exact path="/print-matches" element={<PrintMatches/>}/>
                                <Route exact path="/promotions" element={<Promotions/>}/>
                                <Route exact path="/help" element={<Help/>}/>
                                <Route exact path="/transactions" 
                                    element={<ProtectedRoute><Transactions/> </ProtectedRoute>}/>

                                <Route exact path="/deposit"
                                       element={<ProtectedRoute><Deposit/></ProtectedRoute>}/>
                                <Route exact path="/withdraw"
                                       element={<ProtectedRoute><Withdraw/></ProtectedRoute>}/>
                                <Route exact path="/my-bets"
                                       element={<ProtectedRoute><MyBets/> </ProtectedRoute>}/>
                                <Route exact path="/my-bet-detail/:betid"
                                       element={<ProtectedRoute><MyBetDetails /> </ProtectedRoute>}/>
                                <Route path="*" element={<Index/>}/>
                              </Routes>
                            </div>
                        </div>
                        <Right betslipValidationData={state?.betslipvalidationdata} jackpot={state?.jackpotpage} jackpotData={state?.jackpotmeta}/>
                    </div>
                </div>
                <Footer/>
            </BrowserRouter>
    )
}
const container = document.getElementById("app");
render((
    <Store>
        <App />
    </Store>
), container);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
