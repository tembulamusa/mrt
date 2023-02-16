import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { FaBars, FaTrophy, FaSearch, FaClipboard } from "react-icons/fa";
import Dropdown from 'react-bootstrap/Dropdown';
import { faUser, faLock, faCoins } from "@fortawesome/free-solid-svg-icons";
import { formatNumber } from "../utils/betslip";
const HeaderMenuToggle = React.lazy(() => import('./menu-toggle'));
const MobileToggleMkts = React.lazy(() => import('./mobile-toggle-markets'));

const MobileMenu = (props) => {
  const { user } = props;

  return (
    <>
    <div className="top-nav-mobile">
      <div className="row">
        <div className="col-2 capitalize">
            
        <MobileToggleMkts />

        </div>
        <div className="col-3 capitalize">

        <a href = "/jackpot"><div><FaTrophy size={25} /></div></a>
        Jackpots

        </div>
        <div className="col-3 capitalize">

          <div><FaSearch size={25}/></div>
          Search
        </div>
        <div className="col-2 capitalize">
          <a href="/betslip">
          <div><FaClipboard size={25}/></div>
          Slip
          </a>
        </div>

        <div className="col-2 capitalize">
          <HeaderMenuToggle />
          Menu
        </div>
      </div>
      </div>
    </>
  );
}

export default MobileMenu;
