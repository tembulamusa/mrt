import React, {useEffect, useCallback, useState, useContext, useRef} from 'react';
import {useNavigate} from "react-router-dom"
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {Context} from '../../context/store';
import {getFromLocalStorage, setLocalStorage} from '../utils/local-storage';
import {ToastContainer} from 'react-toastify';
import makeRequest from '../utils/fetch-request';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {
    faSearch,
    faPrint,
    faQuestionCircle,
    faTimes,
    faLaptop,
    faClock,
    faMagnet,
    faMagic, faInfo, faChessBoard, faDice
} from '@fortawesome/free-solid-svg-icons'
import { FaSearch } from "react-icons/fa";

import logo from '../../assets/img/logo.png';
import logo2 from '../../assets/img/biko-logo.png';
import {Navbar, Nav, Offcanvas} from "react-bootstrap";
import SideBar from "../sidebar/awesome/Sidebar";
import {Menu, MenuItem, ProSidebar, SidebarContent, SidebarHeader, SubMenu} from "react-pro-sidebar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import SidebarMobile from "../sidebar/awesome/SidebarMobile";
import ShareModal from "../sharemodal";

const ProfileMenu = React.lazy(() => import('./profile-menu'));
const HeaderLogin = React.lazy(() => import('./top-login'));
const HeaderMenuToggle = React.lazy(() => import('./menu-toggle'));
const HeaderNav = React.lazy(() => import('./header-nav'));
const MobileLogin = React.lazy(() => import('./mobile-login-link'));
const MobileToggleMkts = React.lazy(() => import('./mobile-toggle-markets'));
const MobileMenu = React.lazy(() => import('./mobile-menu'));

const Header = (props) => {
    const [user, setUser] = useState(getFromLocalStorage("user"));
    const [state, dispatch] = useContext(Context);
    const history = useNavigate();
    const containerRef = useRef();
    const {current} = containerRef;
    const pathname = window.location.pathname;
    const [searching, setSearching] = useState(false)
    const [matches, setMatches] = useState([])
    const searchInputRef = useRef(null)
    const [time, setTime] = useState();
    

    useEffect(() => {
        fetchMatches()
    }, [searching])


    useEffect(() => {
        const timer = setInterval(() => {
          setTime(new Date().toLocaleString().slice(12,22));
        }, 1000);

        return () => {
          clearInterval(timer);
        };
      }, []);

    const fetchMatches = async (search) => {
        if (search && search.length >= 3) {
            let method = "POST"
            let endpoint = "/v1/matches?page=" + (1) + `&limit=${10}&search=${search}`;
            await makeRequest({url: endpoint, method: method, data: []}).then(([status, result]) => {
                if (status === 200) {
                    setMatches(result?.data || result)
                }
            });
        }

    };

    const showSearchBar = () => {
        setSearching(true)
        // searchInputRef.current.focus()
    }

    const dismissSearch = () => {
        setSearching(false)
        setMatches([])
    }
    const NotifyToastContaner = () => {
        return <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    };
    const updateUserOnHistory = useCallback(() => {
        if (!user) {
            return false;
        }
        let endpoint = "/v1/balance";
        let udata = {
            token: user.token
        }
        makeRequest({url: endpoint, method: "post", data: udata}).then(([_status, response]) => {
            if (_status == 200) {
                let u = {...user, ...response.user};
                setLocalStorage('user', u);
                setUser(u)
                dispatch({type: "SET", key: "user", payload: user});
            }
        });

    }, [current]);

    const updateUserOnLogin = useCallback(() => {
        dispatch({type: "SET", key: "user", payload: user});
    }, [user?.msisdn, user?.balance]);


    useEffect(() => {
        updateUserOnHistory()
    }, [updateUserOnHistory])


    useEffect(() => {
        updateUserOnLogin()
    }, [updateUserOnLogin])


    useEffect(() => {
        if(state?.user){
           setUser(state?.user);
           setLocalStorage('user', state?.user);
        }
    
    }, [state?.user])

    const expand = "md"
    return (
        <>
            <Navbar expand="md" className="mb-0 ck pc os app-navbar top-nav" fixed="top" variant="dark">
                <div className={'d-flex justify-content-between mobile-change container-fluid'}>
                    <Row style={{width: "100%",}} className="mobile-row-custom-full">

                    {/* Mobile top */}

                    <div className="col-12 d-sm-flex d-md-none d-flex pr-0">
                        <MobileMenu  user={user}/>
                    </div>

                    <div className="col-3">
                        <Navbar.Brand href="/" className="e logo align-self-start co4" title="Bikosports">
                            <div className="">
                                <div>
                                    <LazyLoadImage src={logo2} alt="Bikosports" title="Bikosports" effects="blur"/>
                                </div>
                            </div>
                        </Navbar.Brand>
                    </div>
                    <div className="col-9 change-size pt-3" id="navbar-collapse-main">

                        <div className="row">
                            <div id="navbar-collapse-main"
                                       className={`col-7 fadeIn header-menu d-none d-md-flex justify-content-center relative-pos`}>
                                            <input type="text" placeholder="Search for Events and Tournaments" ref={searchInputRef}
                                                   onInput={(event) => fetchMatches(event.target.value)}
                                                   className={'form-control input-field border-0  no-border-radius'}/>
                                                   <span className="top-search-icon" style={{margin:"3px 10px"}}><FaSearch size={21}/></span>
                                        
                                    <div
                                        className={`autocomplete-box position-fixed bg-white border-dark col-md-5 mt-1 shadow-lg text-start`}>
                                        {matches.map((match, index) => (
                                            <a href={`/?search=${match.home_team}`} key={index}>
                                                <li style={{borderBottom: "1px solid #eee"}}>
                                                    {match.home_team}
                                                </li>
                                            </a>
                                        ))}
                                    </div>
                            </div>


                            <div className="col-sm-12 col-md-5 disable-ipd d-md-block">
                                {user ? <ProfileMenu user={user}/> : 
                                <div className="top-login float-end">
                                <a href="/login" className="cg login-button btn width-auto">LOGIN</a>
                                <a href="/signup" className="cg btn btn-primary width-auto">REGISTER</a>
                                </div>}
                            </div>
                            {/*For the mobile*/}
                            
                        </div>
                        <div className={!user?"unlogged-mobile-spacer-height":""}></div>
                    </div>
                    { /* Mobile version user profile */}
                    
                   </Row>

                   {/*
                    <Row className="second-nav ck pc os app-navbar app-header-nav">
                */}
                        {/*<HeaderNav/>*/}
                    <div className="col-sm-3 col-3 vissible-mobile d-lg-none float-end header-navigation" id="header">
                        {/* Add menus for the mobile*/}

                        
                         
                        
                    </div>
                    {/*
                    </Row>
                */}

                <span className="d-none d-md-flex ml-1"><div className="">{user ? <HeaderMenuToggle user={user}/> : <HeaderMenuToggle />}</div></span>

        { /** <Navbar.Offcanvas
                        style={{width: "100% !important", height: "100%"}}
                        className='off-canvas background-primary p-0'
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="start">
                        <Offcanvas.Header closeButton className='text-white'>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                <div className="col-3">
                                    <div>
                                        <LazyLoadImage src={logo} alt="Bikosports" title="Bikosports" effects="blur"/>
                                    </div>
                                </div>
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <SidebarMobile/>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas> */}
                </div>
            </Navbar>

          <ShareModal shown={state?.showsharemodal === true} />

        </>

    )
}
export default React.memo(Header);
