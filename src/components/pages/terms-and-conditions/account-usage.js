import {
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import React from "react";

const AccountUsage = () => {
    return (
        <AccordionItem>
            <AccordionItemHeading>
                <AccordionItemButton className='accordion-button'>
                    YOUR BIKOSPORTS ACCOUNT
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className='accordion-item-panel'>
                <ol>
                    <li>
                        In consideration of our accepting your application to open an
                        account, yoEach Client who wants to have access to the services 
                        offered by the Company must firstly open a betting account with the Company. 
                        By opening an account and by placing a bet, the Client warrants that they have 
                        reached the minimum legal age for participation. In addition, 
                        by opening a betting account with the Company and by placing a bet, 
                        the Client confirms that they retain the legal capacity to enter into 
                        an agreement with the Company. If one of these conditions is not respected 
                        the Client's account will be closed.
                    </li>
                    <ul style={{'marginLeft': '30px'}}>
                        <li>
                            The beneficial owner of the linked mobile money account and 
                            the Bikosports account must be the same person.
                        </li>
                        <li>
                            All payouts via wallet transfers can only be made to the person, 
                            who owns the Bikosports account that requested the wallet transfer. 
                            So, the name and the phone number 
                            in the Bikosports account must match with the wallet account holder details, 
                            where the transfer was requested.
                        </li>
                        <li>
                           It is prohibited for Clients to buy, sell or transfer betting 
                           accounts to other Clients or other third parties.
                        </li>
                        <li>
                            When a new account is opened the Client is responsible for the 
                            accuracy of the information provided. The Company reserves the right to close the account 
                            when the information provided is deemed to be false or inaccurate.
                        </li>
                        <li>
                            Every betting account is linked with an individual SIM card (phone number) 
                            and all account transactions are unique to that SIM. 
                            Funds cannot be transferred from one account / SIM to another.
                        </li>
                        <li>
                            The Company retains the right to close the betting account(s) 
                            of any Client who has opened multiple betting accounts under their name,
                             or under different names, or when a Client has placed multiple similar bets, 
                             if it has reasonable grounds to believe that those multiple betting accounts 
                                (even if under different names) or multiple similar bets have been opened with 
                            the intention of deceiving the Company by masking the totality of the betting 
                            activity of any individual or syndicate or to defeat the bet limits set by the Company. 
                            The Company also reserves the right to cancel any transactions related to such deceit. 
                            After opening an account, the Client must keep their account access details secret 
                            as all transactions where access details have been entered correctly will be regarded 
                            as valid. The Company shall not be liable for any claims in the event that the Client gives away, tells, shares, fails to protect or loses their access details.
                             The Client is entitled to apply for the closure or suspension of their account whenever they wish by making a request to Customer Services by email or telephone. The closure of the account will correspond to the termination of the Terms. In case the reason behind the closure of the account is related to concerns about gambling addiction, the Client shall indicate this.
                              In accordance with the Company’s legal obligations, all personal details saved in our system will only be deleted at a Client's express request after the expiration of seven (6) years.
                        </li>
                        </ul>
                    </ol>
            </AccordionItemPanel>
        </AccordionItem>
    )
}

export default AccountUsage
