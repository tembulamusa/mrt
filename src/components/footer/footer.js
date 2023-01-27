import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {faFacebook, faInstagram, faTwitter, faYoutube} from "@fortawesome/free-brands-svg-icons"
import Gbt from '../../assets/img/gbt.png'
import logo from '../../assets/img/logo.png';
import Eighteen from '../../assets/img/eighteen.PNG';



const Footer = (props) => {

    return (
        <footer className="footer-custom">
            <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 text-white right-border">
                    <h5>Bikosports, a trade mark of;</h5>
                    <small className="smoke-white-text" >MOBIBET COMPANY LTD.:TIN: 127-321-361<br/>
                    Reg. Company N: 118069 Tanzania, Dar es Salaam <br/>
                    Office Address:45 MIGOMBANI STREET 116,<br/>DAR ES SALAAM<br/>P.O.BOX 3254 Tel: 022 222 0100</small>
                    <hr/>

                    <h5>Terms and Conditions</h5>
                    <ul>
                        <li className="">
                            <a href="/terms-and-conditions">Terms and Conditions</a>
                        </li>
                        <li className="">
                            <a href="/anti-money-laundering">Anti-money Laundering</a>
                        </li>
                        {/* <li className="">
                            <a href="/responsible-gambling">Responsible Gambling</a>
                        </li>
                        <li className="">
                            <a href="/privacy-policy">Privacy Policy</a>
                        </li>
                        <li className="">
                            <a href="/cookie-policy">Cookie Policy</a>
                        </li>
                        <li className="">
                            <a href="/how-to-play">How To Play</a>
                        </li>
                        */
                        }
                    </ul>

                    <hr/>
                    <h5>LEGAL</h5>
                    <ul>
                        <li className="tex-danger">
                            Strictly for persons over 18 Years only.
                        </li>

                        <li className="tex-danger">
                            Help 022 222 0100
                        </li>
                        <li className="tex-danger">
                            customercare@bikosports.com
                        </li>
                        
                    </ul>
                    <hr/>
                    <h5>LICENSING</h5>
                    <div>
                        All correspondence to Director General
                        <div>27th Floor, PSPF Towers, Mission Street <br/>Postal Address: PO Box 1717, Dar es Salaam, TANZANIA</div>
                    </div>
                    <div>
                        Gaming Board of Tanzania Licence Number SBI 000000016
                    </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-8 col-lg-8 left-with-big-pad-desktop">
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                            Customer Care - Call 022 222 0100
                            <ul>
                                <li className="footer-icon">
                                    <a href="http://facebook.com/bikosports">
                                        <FontAwesomeIcon icon={faFacebook}/> Facebook BikoSports
                                    </a>
                                </li>
                                <li className="footer-icon">
                                    <a href="http://twitter.com/_bikosports">
                                        <FontAwesomeIcon icon={faTwitter}/> Twitter BikoSports
                                    </a>
                                </li>
                                <li className="footer-icon">
                                    <a href="http://instagram.com/_bikosports">
                                        <FontAwesomeIcon icon={faInstagram}/> Instagram BikoSports
                                    </a>
                                </li>
                            </ul>
                                <div className="text-center">
                                &copy; 2022. All Rights Reserved. BIKOLSPORTS, 
                                a trademark of MOBIBET COMPANY LTD.:TIN: 127-321-361<br/>
                    Reg. Company N: 118069 Tanzania, Dar es Salaam <br/>
                    Office Address:45 MIGOMBANI STREET 116,<br/>DAR ES SALAAM<br/>P.O.BOX 3254 Tel: 022 222 0100

                                </div>
                                <div className="text-center">
                                    <img style={{width: "100%", maxWidth: "250px"}} src={Gbt} alt="Logo"/>
                                </div>
                                <div className="text-center">All correspondence to Director General
                                <div>27th Floor, PSPF Towers, Mission Street <br/>Postal Address: PO Box 1717, Dar es Salaam, TANZANIA</div>
                                </div>
                        </div>

                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 text-center" style={{marginTop:"0"}}>
                            <div className="text">
                                    <img style={{width: "100%", maxWidth: "250px"}} src={Gbt} alt="Logo"/>
                                </div>
                                All correspondence to Director General
                        <div>27th Floor, PSPF Towers, Mission Street <br/>Postal Address: PO Box 1717, Dar es Salaam, TANZANIA</div>
                        <div>
                            Gaming Board of Tanzania Licence Number SBI 000000016
                        </div>
                            <img style={{width: "100%", maxWidth: "250px"}} src={logo} alt="Logo"/>
                            <div/>   
                            <div/>   
                            <div><img style={{width: "100%", maxWidth: "50px"}} src={Eighteen} alt="Logo"/></div>
                            <div>Please play responsibly. This site is open only to persons over the age of 18 years</div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="container" id="navbar-collapse-main">
                <div className="footer-bottom text-center">
                    Copyright &copy; {new Date().getFullYear()} All rights Reserved.
                </div>
            </div>
        </footer>
    )
}

export default Footer
