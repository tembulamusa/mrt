import React from "react";
import { faUser, faLock, faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatNumber } from "../utils/betslip";
import { Link } from "react-router-dom";
import {Navbar} from "react-bootstrap";

const ProfileMenu = (props) => {
  const { user } = props;
  return (
    <>
      {user && (
        <div className="ale ss profile  row  float-end">
          <div className="d-none d-md-block col-12">
            <a
              href="/deposit"
              className={"btn profile-item"}
              style={{ fontSize: "16px", fontWeight: "bold", background:"#39b54a", borderRadius:"3px",padding:"10px 30px", width:"max-content"}}
            >
              <span className="font-tbt overflow-hidden justify-content-center  rescale">
               <span className=" space-icons"> <FontAwesomeIcon icon={faCoins} /></span> Deposit 
              </span>
            </a>
              <span className="profile-item">
                <div className="">Bonus  {formatNumber(user.bonus) || 0} </div>
                <span className="">Balance  {formatNumber(user.balance) || 0} </span>
              </span>
              
         

              <a href="/withdraw" className="profile-item">
                <span className="">
                <span className=" space-icons"><FontAwesomeIcon icon={faCoins} /> </span>Withdraw
                </span>
              </a>
             
              <a href={{ pathname: "/my-bets" }} className={"profile-item"}>
                <span className="">
                <span className=" space-icons"><FontAwesomeIcon icon={faCoins} /> </span>My Bets
                </span>
              </a>
              <span className="profile-item">
              <span className=" space-icons"><FontAwesomeIcon icon={faUser} /> </span>{user?.msisdn}
              <a href="/logout" className="d-block">
                <span className="">
                <span className=" space-icons"> <FontAwesomeIcon icon={faLock} /> </span>Logout
                </span>
              </a>
              </span>
              
            
          </div>


        {/* Style for the mobile */}
          <div className="col-sm-12 d-md-none col-lg-none col-sm-block mobile-profile-menu" style={{textAlign:"left"}}>
            <div className="bal">
                <span className="" style={{paddingRight: "10px"}}>Biko Bonus  {formatNumber(user.bonus) || 0} </span>
                <span className="">Balance  {formatNumber(user.balance) || 0} </span>
            </div>

            <a href="/deposit" className={"btn   "}
              style={{background:"#39b54a", borderRadius:"3px"}}
            >
              <span className="font-tbt overflow-hidden justify-content-center  rescale">
               <span className=""> <FontAwesomeIcon icon={faCoins} /></span> Deposit 
              </span>
            </a>

            <a href="/withdraw">
                <span className="font-tbt pad-2">
                <span className=""><FontAwesomeIcon icon={faCoins} /> </span>Withdraw
                </span>
              </a>
            <a href="/my-bets">My Bets</a>
            <a href="/logout" className="mobile-profile-menu-ietm">
                <span className="font-tbt py-0">
                <span className=""> <FontAwesomeIcon icon={faLock} /> </span>Logout
                </span>
              </a>
          </div>

        </div>


      )}
    </>
  );
};

export default ProfileMenu;
