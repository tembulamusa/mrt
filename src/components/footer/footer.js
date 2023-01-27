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
                <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 text-white right-border">
                    
                    <ul>
                        <li className="">
                            <span href="#">Customer Care- Call <span className="bold white-text">022 222 0100 </span></span>
                        </li>
                        <li className="">
                            <FontAwesomeIcon icon={faFacebook}/>
                            <img src={faFacebook} alt="" className="svg-menu-img-icon hide1" />
                            Facebook- <span className="bold white-text">@BikoSports</span>
                        </li>
                        <li className="">
                            <FontAwesomeIcon icon={faInstagram}/>
                            <img src={faFacebook} alt="" className="svg-menu-img-icon hide1" />
                            Instagram- <span className="bold white-text">@BikoSports</span>
                        </li>
                        <li className="">
                            <FontAwesomeIcon icon={faTwitter}/>
                            <img src={faFacebook} alt="" className="svg-menu-img-icon hide1" />
                            Twitter- <span className="bold white-text">@BikoSports</span>
                        </li>
                        
                    </ul>
                </div>
                <div className="col-xs-12 col-md-6 col-lg-6">
                    <div className="row">
                        <div className="col-12">
                            &copy; {new Date().getFullYear()} All rights Reserved. BIKOSPORTS, a trade mark of MOBIBET COMPANY LTD. TIN: 127-321-361. Reg. Company N: 118069
Tanzania, Dar es Salaam. Office Address: 45 MIGOMBANI STREET 116, DAR ES SALAAM, P.O.BOX 3254. Tel: 022 222 0100
                        </div>


                    </div>
                </div>

                <div className="col-xs-12 col-md-3 center-text" style={{marginTop:"0"}}>
                    
                </div>

            </div>
            <div className="container" id="navbar-collapse-main">
                <div className="footer-bottom text-center">
                    Copyright 
                </div>
            </div>
        </footer>
    )
}

export default Footer
