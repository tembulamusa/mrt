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



const Header = (props) => {
    const [user, setUser] = useState(getFromLocalStorage("user"));
    const [state, dispatch] = useContext(Context);
    const {headertype, team} = props;
    
    const currentUser = getFromLocalStorage("user");
    const expand = "md";

    return (
        <>  
            { !state?.followingclub ?
            <section className='absolute w-100 left-0 right-0 text-white'>
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
        </>
    )
}
export default React.memo(Header);
