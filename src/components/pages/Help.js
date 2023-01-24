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
import AccountSelect from '../../assets/img/screenshots/account-selection.png'
import PickGame from '../../assets/img/screenshots/pick-game.png'
import PickedGame from '../../assets/img/screenshots/picked-game.png'
import SUccessfulBet from '../../assets/img/screenshots/successful-bet.png'

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
                    <SideBar loadCompetitions/>
                    <div className="gz home" style={{width: '100%'}}>
                        <div className="homepage child-box-relative-pos">
                            <div className='col-md-12 primary-bg p-2 text-cente'>
                                <h4 className="inline-blok cap-tex">Help</h4>
                            </div>

                            <div className="card">
                                <div className="card-body">
                                    <h4>Frequently Asked Questions</h4>
                                </div>
                                <div className="">How do I register for BikoSports?</div>
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
