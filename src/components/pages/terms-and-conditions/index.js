import React from "react";

import {
    Accordion,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

const Header = React.lazy(()=>import('../../header/header'));
const Footer = React.lazy(()=>import('../../footer/footer'));
const SideBar = React.lazy(()=>import('../../sidebar/awesome/Sidebar'));
const Right = React.lazy(()=>import('../../right/index'));

const General = React.lazy(()=>import('./general'));
const AccountUsage = React.lazy(()=>import('./account-usage'));
const Deposits = React.lazy(()=>import('./deposits'));
const Withdrawals = React.lazy(()=>import('./withdrawals'));
const LiveBetting = React.lazy(()=>import('./live-betting'));
const BonusesAndPromotions = React.lazy(()=>import('./bonuses-and-promotions'));
const Complaints = React.lazy(()=>import('./complaints'));
const Misconduct = React.lazy(()=>import('./misconduct'));
const ErrorsOrOmissions = React.lazy(()=>import('./errors-or-omissions'));
const IntellectualProperty = React.lazy(()=>import('./intellectual-property'));
const ThirdPartyLinking = React.lazy(()=>import('./third-party-linking'));
const Assignment = React.lazy(()=>import('./assignment'));
const Indemnification = React.lazy(()=>import('./indemnification'));
const Waiver = React.lazy(()=>import('./waiver'));
const Severability = React.lazy(()=>import('./severability'));
const DisputeResolution = React.lazy(()=>import('./dispute-resolution'));
const Ammendments = React.lazy(()=>import('./ammendments'));
const CommunicationsAndNotices = React.lazy(()=>import('./communications-and-notices'));
const ApplicableLaw = React.lazy(()=>import('./applicable-law'));
const TermAndTermination = React.lazy(()=>import('./term-and-termination'));


const BikoTermsIndex = React.lazy(()=>import('./biko-terms-index'));


const TermsAndConditions = (props) => {
    return (
        <>
            <Header/>
            <div className="amt">
                <div className="d-flex flex-row justify-content-between">
                    <SideBar loadCompetitions/>
                    <div className="gz home">
                        <div className="homepage">
                            <div className='col-md-12 primary-bg p-2'>
                                <h4 className="inline-block">
                                    BIKO SPORTS TERMS AND CONDITIONS
                                </h4>
                            </div>

                                <BikoTermsIndex />


                            </div>
                        </div>
                    <Right/>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default TermsAndConditions
