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
          <div className="d-none d-md-block col-12">
            
              <div className="row uppercase">
                <div className="col-3 right-bordered-col">
                  <FontAwesomeIcon icon={faUser} className="profile-icon float-end"/>
                </div>
                <div className="col-3 right-bordered-col">
                  <div className="cream-text">User Profile</div>
                  {user?.msisdn}
                </div>
                <div className="col-3 right-bordered-col">
                  <div className="cream-text">A/C Balance</div>
                  Tsh. {formatNumber(user.balance) || 0}
                </div>
                <div className="col-3">
                  <div className="cream-text">Bonus</div>
                  Tsh. {formatNumber(user.bonus) || 0}
                </div>
                
              </div>
          </div>         

        </div>


      )}
    </>
  );
};

export default ProfileMenu;
