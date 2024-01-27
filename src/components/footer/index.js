import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
// import {FaFacebook, FaInstagram, faTwitter, faYoutube} from "@fortawesome/free-brands-svg-icons"
import { Link } from 'react-router-dom';
import { FaInstagram } from "react-icons/fa";
import { RiFacebookBoxLine } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa";





const Footer = (props) => {

    return (
        <footer className="absolute w-full bottom-0">
            <div className="container text-left py-3">
                <div className="inline-block uppercase w-1/3">
                    
                    <Link to={"/about"} className='mr-2 opacity-50 hover:opacity-100 hover:text-white'>About</Link>
                    <Link to={"/contact-us"} className='mr-2 opacity-50 hover:opacity-100 hover:text-white'>Contact Us</Link>
                    <Link to={"/help"} className='mr-2 opacity-50 hover:opacity-100 hover:text-white'>Help</Link>
                    <Link to={"/Legal"} className='mr-2 opacity-50 hover:opacity-100 hover:text-white'>Legal</Link>
                    <Link to={"/store"} className='mr-2 opacity-50 hover:opacity-100 hover:text-white'>Store</Link>
                </div>

                <div className="inline-block w-1/3 text-center">
                    <Link to={"/about"} className='mr-2 opacity-50 hover:opacity-100 hover:text-white'><FaInstagram className='inline-block'/></Link>
                    <Link to={"/contact-us"} className='mr-2 opacity-50 hover:opacity-100 hover:text-white'><RiFacebookBoxLine className='inline-block' /></Link>
                    <Link to={"/help"} className='mr-2 opacity-50 hover:opacity-100 hover:text-white'><FaTwitter className='inline-block'/></Link>
                </div>

                <div className="inline-block w-1/3 opacity-50">
                    &copy;2020 sportsblog.com <span className='opacity-35'>A GoBlog Site</span>
                </div>

            </div>
            
        </footer>
    )
}

export default Footer
