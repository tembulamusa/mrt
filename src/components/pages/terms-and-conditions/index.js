import React from "react";

import {
    Accordion,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';


import General from './general';
import AccountUsage from './account-usage';
import Deposits from './deposits';
import Withdrawals from './withdrawals';
import LiveBetting from './live-betting';
import BonusesAndPromotions from './bonuses-and-promotions';
import Complaints from './complaints';
import Misconduct from './misconduct';
import ErrorsOrOmissions from './errors-or-omissions';
import IntellectualProperty from './intellectual-property';
import ThirdPartyLinking from './third-party-linking';
import Assignment from './assignment';
import Indemnification from './indemnification';
import Waiver from './waiver';
import Severability from './severability';
import DisputeResolution from './dispute-resolution';
import Ammendments from './ammendments';
import CommunicationsAndNotices from './communications-and-notices';
import ApplicableLaw from './applicable-law';
import TermAndTermination from './term-and-termination';


import BikoTermsIndex from './biko-terms-index';


const TermsAndConditions = (props) => {
    return (
        <>
        <div className='col-md-12 primary-bg p-2'>
            <h4 className="inline-block">
                BIKO SPORTS TERMS AND CONDITIONS
            </h4>
        </div>

        <BikoTermsIndex />


        </>
    )
}

export default TermsAndConditions
