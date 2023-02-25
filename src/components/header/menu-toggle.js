import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { FaBars, FaUserAlt } from "react-icons/fa";
import Dropdown from 'react-bootstrap/Dropdown';
import {faLock, faCoins } from "@fortawesome/free-solid-svg-icons";
import { formatNumber } from "../utils/betslip";

import depositIcon from "../../assets/svg/deposit.svg"
import withdrawIcon from "../../assets/svg/withdraw.svg"
import appIcon from "../../assets/svg/download-app.svg"
import helpIcon from "../../assets/svg/help.svg"
import logoutIcon from "../../assets/svg/logout.svg"
import accountIcon from "../../assets/svg/message.svg"
import mybetsIcon from "../../assets/svg/my-bets.svg"
import transactionsIcon from "../../assets/svg/transactions.svg"

const HeaderMenuToggle = (props) => {
  const { user } = props;

  return (
    <>
      <Dropdown>
      <Dropdown.Toggle variant="top-menu-btn" id="dropdown-basic">
        <div><FaBars size={25} /></div>
      </Dropdown.Toggle>

      <Dropdown.Menu>


        {user?<Dropdown.Item href="/my-account"><img style={{width:"15px", marginRight:"10px"}} src={accountIcon} alt="" />MY ACCOUNT</Dropdown.Item>:""}
        {user?<Dropdown.Item href="/my-bets"><img style={{width:"15px", marginRight:"10px"}} src={mybetsIcon} alt="" />MY BETS</Dropdown.Item>:""}
        <Dropdown.Item href="/deposit" ><img style={{width:"15px", marginRight:"10px"}} src={depositIcon} alt="" />DEPOSIT</Dropdown.Item>
        <Dropdown.Item href="/withdraw"><img style={{width:"15px", marginRight:"10px"}} src={withdrawIcon} alt="" />WITHDRAW</Dropdown.Item>          
        {user?<Dropdown.Item href="/transactions"><img style={{width:"15px", marginRight:"10px"}} src={transactionsIcon} alt="" />TRANSACTIONS</Dropdown.Item>:""}          
        <Dropdown.Item href="/app"><img style={{width:"15px", marginRight:"10px"}} src={appIcon} alt="" />DOWNLOAD APP</Dropdown.Item>
        <Dropdown.Item href="/help"><img style={{width:"15px", marginRight:"10px"}} src={helpIcon} alt="" />HELP</Dropdown.Item>
        {user?<Dropdown.Item href="/logout"><img style={{width:"15px", marginRight:"10px"}} src={logoutIcon} alt="" />LOGOUT</Dropdown.Item>:<Dropdown.Item href="/login"><img style={{width:"15px", marginRight:"10px"}} src={logoutIcon} alt="" />Login</Dropdown.Item>}
      </Dropdown.Menu>
    </Dropdown>
    </>
  );
}

export default HeaderMenuToggle;
