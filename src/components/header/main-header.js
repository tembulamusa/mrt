import React, {useEffect, useContext} from "react";
import Logo from '../../assets/svg/logo.svg';
import { Link } from "react-router-dom";
import { FaSearch, FaTrash } from "react-icons/fa";


const MainHeader = props => {

    return (
        <>
            <div className="flex ">
                <div id="logo" className="flex flex-col w-20">
                    <img src={Logo} width="150px"/>
                </div>
                <div id="menu" className="flex w-60 text-align-right uppercase">
                    <Link to="/" className="item">FKF</Link>
                    <Link to="/" className="item">FKF WPL</Link>
                    <Link to="/" className="item">NHL</Link>
                    <Link to="/" className="item">MLB</Link>
                    <Link to="/" className="item">MLB</Link>
                    <Link to="/" className="item">SOccer</Link>
                    <Link to="/" className="item">Fantasy</Link>
                    <Link to="/" className="item">Nascar</Link>
                    
                </div>
                <div id="auth" className="flex w-20">
                    <FaSearch className="inline-block"/>
                    <Link to="/" className="item">Login</Link>
                </div>
            </div>
            
        </>
    )
}


export default React.memo(MainHeader);