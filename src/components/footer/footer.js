import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {faFacebook, faInstagram, faTwitter, faYoutube} from "@fortawesome/free-brands-svg-icons"
import Gbt from '../../assets/img/gbt.png'
import logo from '../../assets/img/logo.png';
import Eighteen from '../../assets/img/eighteen.PNG';



const Footer = (props) => {

    return (
        <footer className="mt-auto border-t bg-white border-gray-200/100">
            <div className="row py-2 px-2">
                <div className="col-xs-12 col-sm-6 col-md-4 right-border">
                    
                    <ul>
                        <li className="">
                            <span href="#">Customer Care- Call <span className="bold">1234567890 </span></span>
                        </li>
                                                
                    </ul>
                </div>
                <div className="col-xs-12 col-md-4">
                    &copy; {new Date().getFullYear()} All rights Reserved. Traveller

                </div>

                <div className="col-md-4 col-sm-12">
                    <div className=''>Izwof</div>
                </div>

            </div>
            
        </footer>
    )
}

export default Footer
