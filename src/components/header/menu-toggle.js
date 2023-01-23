import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { FaBars } from "react-icons/fa";
import Dropdown from 'react-bootstrap/Dropdown';
import { faUser, faLock, faCoins } from "@fortawesome/free-solid-svg-icons";
import { formatNumber } from "../utils/betslip";

const HeaderMenuToggle = (props) => {
  const { user } = props;

  return (
    <>
      <Dropdown>
      <Dropdown.Toggle variant="top-menu-btn" id="dropdown-basic">
        <div><FaBars size={25} /></div>
        Menu
      </Dropdown.Toggle>

      <Dropdown.Menu>


        <Dropdown.Item href="/my-account">My Account</Dropdown.Item>
        <Dropdown.Item href="/my-bets">My Bets</Dropdown.Item>
        <Dropdown.Item href="/deposit">Deposit</Dropdown.Item>
        <Dropdown.Item href="/withdraw">Withdrawal</Dropdown.Item>          
        <Dropdown.Item href="/app">Download App</Dropdown.Item>
        <Dropdown.Item href="/how-to-play">Help</Dropdown.Item>
        <Dropdown.Item href="/logout">Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </>
  );
}

export default HeaderMenuToggle;