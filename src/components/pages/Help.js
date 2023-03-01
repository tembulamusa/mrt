import React, {useCallback, useEffect, useState, useContext} from "react";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import makeRequest from "../utils/fetch-request";
import {
    getFromLocalStorage,
    setLocalStorage
} from '../utils/local-storage';
import {getBetslip} from '../utils/betslip' ;
import {Context} from '../../context/store';
import {AccordionButton} from "react-bootstrap";
import Index from '../../assets/img/payment_logos/index.png'
import Mpesa from '../../assets/img/payment_logos/mpesa-logo.png'
import Tigo from '../../assets/img/payment_logos/tigo_pesa.png'

const Header = React.lazy(() => import('../header/header'));
const Footer = React.lazy(() => import('../footer/footer'));
const SideBar = React.lazy(() => import('../sidebar/awesome/Sidebar'));
const Right = React.lazy(() => import('../right/index'));
const Help = (props) => {
    const [, dispatch] = useContext(Context);
    useEffect(() => {
        let betslip = getBetslip();
        if (betslip) {
            dispatch({type: "SET", key: "betslip", payload: betslip});
        }
    }, []);
    return (
        <>
            <Header/>
            <div className="amt">
                <div className="d-flex flex-row justify-content-between">
<<<<<<< HEAD
                    <SideBar loadCompetitions/>
=======
                    <div className="d-md-block d-none"><SideBar loadCompetitions/></div>
>>>>>>> 2e3687246efd44c770b90f72b47b91b4297829e7
                    <div className="gz home" style={{width: '100%'}}>
                        <div className="homepage child-box-relative-pos">
                            <div className='col-md-12 biko-bg p-2'>
                                <h4 className="inline-blok cap-text center-text">Help</h4>
                            </div>

                            <div className="card">
                                <div className="card-body">
                                    <h4>Frequently Asked Questions</h4>
                                    <div className="small-box-content">How do I register for BikoSports?</div>
                                    <p>Sign-up via link given below
                                        Enter your number and pick yourself a 4-digit password
                                        Agree with our T&C and hit Submit
                                        Note:
                                        Password set during account registration will be used whenever you login to your BIKOSPORTS account.
                                        Proceed to our Registration Pag
                                    </p>
                                    <div className="small-box-content">How do I reset my password?</div>
                                    <p>
                                    Reset password via ‘Password reset’ page linked below
                                    Enter your account phone number if not prefilled
                                    Enter the one-time PIN sent to your phone and hit VERIFY ACCOUNT
                                    To complete the process, set, confirm, and save your new 4-digit password
                                    Proceed to our <a href="/reset-password">Reset Password Page</a>
                                    </p>

                                    <div className="small-box-content">How do I deposit funds into my BIKOSPORTS account ?</div>
                                    <p>
                                        Log into your account and open BIKOSPORTS Deposit page linked below
                                        Enter your desired amount and click ‘Deposit’
                                        Confirm payment in the approval request sent to your phone and your account balance will be credited instantly.
                                        Proceed to our <a href="/deposit"> Deposit page</a>
                                    </p>

                                    <div className="small-box-content">How do I reset my password?</div>
                                    <p>
                                        Reset password via ‘Password reset’ page linked below
                                        Enter your account phone number if not prefilled
                                        Enter the one-time PIN sent to your phone and hit VERIFY ACCOUNT
                                        To complete the process, set, confirm, and save your new 4-digit password
                                        Proceed to our <a href="reset-password">Reset Password Page</a>
                                    </p>


                                    <div className="small-box-content">How can I contact BIKO SPORTS customer care?</div>
                                    <p>
                                        Email us: help@bikosports.co.tz<br/>
                                        Chat with us on:<br/>
                                        Phone: 022 222 0100 (calls only)<br/>
                                        Facebook: @BikoSports<br/>
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <Right/>
                </div>
            </div>
            <Footer/>
        </>
    )
}
export default Help
