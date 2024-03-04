import React, {useEffect, useCallback, useState, useContext, useRef, Suspense} from 'react';
import { Link} from "react-router-dom"
import Row from 'react-bootstrap/Row';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {Context} from '../../context/store';
import {getFromLocalStorage, setLocalStorage} from '../utils/local-storage';
import makeRequest from '../utils/fetch-request';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {Navbar} from "react-bootstrap";
import ShareModal from "../sharemodal";
import MainHeader from './main-header';
import TeamHeader from './team-header';
import BuyTicketModal from '../buy-ticket-modal';
import { MdPhoneInTalk } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import Logo from '../../assets/img/logo.png';





const Header = (props) => {
    const [user, setUser] = useState(getFromLocalStorage("user"));
    const [state, dispatch] = useContext(Context);
    const {headertype, team} = props;
    
    const currentUser = getFromLocalStorage("user");
    const expand = "md";

    return (
        <>
            <section className='header'>
                <div className='container'>
                    <div className='py-2 pb-1 flex'>
                        <div className='w-20 flex-col'>
                            <img src={Logo} className='md:w-10 inline-block float-start'/>
                            <div className='inline-block text-3xl font-bold pl-2 ml-2 uppercase'>
                                <div className='block text-red-500'>MRT</div>
                                <div className='block text-blue-600 text-xl'>Space</div>
                            </div>
                        </div>
                        <div className='w-50'>
                            <Link to={"/"} className='py-2 pt-3 mr-5 inline-block hover:text-white hover:opacity-70'>Home </Link>
                            <Link to={"/services"} className='py-2 pt-3 mr-5 inline-block hover:text-white hover:opacity-70'>Services </Link>
                            <Link to={"/contact"} className='py-2 pt-3 mr-3 inline-block hover:text-white hover:opacity-70'>Contact Us</Link>
                            <Link to={"/tech-stacks"} className='py-2 pt-3 mr-3 inline-block hover:text-white hover:opacity-70'>Tech Stacks</Link>
                            <Link to={"/customers"} className='py-2 pt-3 mr-3 inline-block hover:text-white hover:opacity-70'>customers</Link>
                        </div>
                        <div className='w-20 flex-col text-align-right'>
                        <div className='float-end'>
                            <button className='px-3 py-2 bg-red-500 text-white my-2 rounded-md shadow'><span className='d-none md:inline-block'>Get a </span>Free Quote</button>
                        </div>
                    </div></div>
                </div>
            </section>
            <section className='bg-blue-600 text-white'>
                <div className='container flex flex-row'>
                    
                    
                </div>
            </section>
        </>
    )
}
export default React.memo(Header);
