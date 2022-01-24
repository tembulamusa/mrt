import React from 'react';

const ProfileMenu = (props) =>{

    return (
        <div className="og ale ss profile">
            <i className="fa fa-user" aria-hidden="true"></i>{props?.user?.msisdn} <br/>Balance: KES {props.balance} | Bonus: KES {props.bonus_balance}
            <a href="/withdraw"> Withdraw </a> |
            <a href="/deposit" title="Deposit"> Deposit </a> | 
            <a href="/logout">Logout<i className="fa fa-sign-out" aria-hidden="true"></i> </a>
        </div>

    )
}


export default ProfileMenu;
