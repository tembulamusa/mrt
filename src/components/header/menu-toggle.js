import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { FaBars, FaUserAlt } from "react-icons/fa";
import Dropdown from 'react-bootstrap/Dropdown';
import {faLock, faCoins } from "@fortawesome/free-solid-svg-icons";
import { formatNumber } from "../utils/betslip";

const HeaderMenuToggle = (props) => {
  const { user } = props;

  return (
    <>
      <Dropdown>
      <Dropdown.Toggle variant="top-menu-btn" id="dropdown-basic">
        <div><FaUserAlt size={25} /></div>
      </Dropdown.Toggle>

      <Dropdown.Menu>


        {user?<Dropdown.Item href="/my-account">MY ACCOUNT</Dropdown.Item>:""}
        {user?<Dropdown.Item href="/my-bets">MY BETS</Dropdown.Item>:""}
        <Dropdown.Item href="/deposit">DEPOSIT</Dropdown.Item>
        <Dropdown.Item href="/withdraw">WITHDRAW</Dropdown.Item>          
        {user?<Dropdown.Item href="/transactions">TRANSACTIONS</Dropdown.Item>:""}          
        <Dropdown.Item href="/app">DOWNLOAD APP</Dropdown.Item>
        <Dropdown.Item href="/how-to-play">HELP</Dropdown.Item>
        {user?<Dropdown.Item href="/logout">LOGOUT</Dropdown.Item>:<Dropdown.Item href="/login">Login</Dropdown.Item>}
      </Dropdown.Menu>
    </Dropdown>
    </>
  );
}

export default HeaderMenuToggle;
