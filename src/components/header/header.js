import React, {useEffect, useCallback, useState, useContext, useRef, Suspense} from 'react';
import { Link} from "react-router-dom"
import Row from 'react-bootstrap/Row';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {Context} from '../../context/store';
import {getFromLocalStorage, setLocalStorage} from '../utils/local-storage';
import makeRequest from '../utils/fetch-request';
import 'react-lazy-load-image-component/src/effects/blur.css';
import logo from '../../assets/img/logo.png';
import {Navbar} from "react-bootstrap";
import ShareModal from "../sharemodal";
import MainHeader from './main-header';
import TeamHeader from './team-header';
import Logo from '../../assets/svg/logo.svg';
import BuyTicketModal from '../buy-ticket-modal';
import { MdPhoneInTalk } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";




const Header = (props) => {
    const [user, setUser] = useState(getFromLocalStorage("user"));
    const [state, dispatch] = useContext(Context);
    const {headertype, team} = props;
    
    const currentUser = getFromLocalStorage("user");
    const expand = "md";

    return (
        <>  
            <section id='top-header' className='py-2 bg-blue-600 text-white'>
                <div className='container'>
                    <div className='inline-block w-50 py-2'>
                        <MdPhoneInTalk className='inline-block mr-3' size={30}/> Call Mombasa: +254717506069</div>
                    <div className='inline-block w-50'>
                        <div className='float-end' id='social-networks'>
                            <FaFacebookF className='inline-block mr-2' size={20}/>
                            <FaTwitter className='inline-block mr-2' size={20}/>
                            <FaInstagram className='inline-block mr-2' size={20}/>
                            <FaLinkedin className='inline-block' size={20}/>
                        </div>
                    </div>
                </div>
            </section>
            <section className=''>
                <div className='container'>
                    <MainHeader />
                </div>
                
            </section>

            : 
                <section className='relative w-full'>
                    <div className='container'>
                        <div id='team-logo'>
                            <img src='' />
                        </div>
                        <Link to={'/'} className='float-end'>
                            <img src={Logo} width="150px"/>
                        </Link>
                    </div>
                </section> 
            }

            {state?.selectedevent && <BuyTicketModal />}
        </>
    )
}
export default React.memo(Header);
