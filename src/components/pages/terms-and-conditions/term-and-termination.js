import {
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import React from "react";

const TermAndTermination = () => {
    return (
        <AccordionItem>
            <AccordionItemHeading>
                <AccordionItemButton className='accordion-button'>
                    TERM AND TERMINATION
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className='accordion-item-panel'>
                <p>
                   The Company may terminate your account (including your username and password) if we believe that you have breached any of these Terms or any other applicable rules or have acted in a manner inconsistent with the spirit of any of them.
                </p>
                <p>
                    You acknowledge that the Company does not have to give you prior notice of any such termination.
                </p>
                <p>
                    An account temporarily suspended at your request may be reopened and will be subject to the Terms in force at the date of the re-opening.
                </p>
                <p>

                    The Company retains the right to exclude Clients from its services. In this case it will refund the residual credit balance in the account. If the account has been closed due to an infringement pursuant to the Terms or to a prohibited behaviour leading to collusion, fraud or whatsoever criminal activity, the residual credit balance may be forfeited. The same procedure will be applied to open bets that result in winnings.
                </p>
                <p>
                    Should your account become dormant (defined as a period of 12 (twelve) months of inactivity) the Company reserves the right to charge a monthly administration fee.
                </p>
            </AccordionItemPanel>
        </AccordionItem>
    )
}

export default TermAndTermination
