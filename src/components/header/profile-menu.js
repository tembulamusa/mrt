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
        <div className="profile  row top-profile">
          <div className="d-md-block col-12">
            
              <div className="row uppercase">
                <div className="col-4 d-none d-md-block">
                  &nbsp;
                </div>
                <div className="col-4 col-sm-4 mobile-right-cols">
                  <div className="cream-text">ACCOUNT BALANCE</div>
                  Tsh. {formatNumber(user.balance) || 0}
                </div>
                <div className="col-4 d-none d-md-block">
                    <a href="/deposit" className="cg biko-blue  btn " style={{width:"100%"}}>DEPOSIT</a>
                </div>
                
              </div>
          </div>         

        </div>


      )}
    </>
  );
};

export default ProfileMenu;
