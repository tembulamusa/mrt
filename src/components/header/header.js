import React, {useEffect, useCallback, useState, useContext, useRef, Suspense} from 'react';
import { Link} from "react-router-dom"
import Row from 'react-bootstrap/Row';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {Context} from '../../context/store';
import {getFromLocalStorage, setLocalStorage} from '../utils/local-storage';
import makeRequest from '../utils/fetch-request';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { FaSearch, FaTrash } from "react-icons/fa";

import logo from '../../assets/img/logo.png';
import {Navbar} from "react-bootstrap";
import ShareModal from "../sharemodal";

const ProfileMenu = React.lazy(() => import('./profile-menu'));
const HeaderMenuToggle = React.lazy(() => import('./menu-toggle'));
const MobileMenu = React.lazy(() => import('./mobile-menu'));

const Header = (props) => {
    const [user, setUser] = useState(getFromLocalStorage("user"));
    const [state, dispatch] = useContext(Context);
    const [searching, setSearching] = useState(false)
    const [matches, setMatches] = useState([])
    const searchInputRef = useRef(null)
    const [searchText, setSearchText] = useState();
   

    const fetchMatches =async () => {
        setSearching(true);
        if(!setSearchText) {
            setMatches([]);
            return;
        }
        if (searchText && searchText.length >= 3) {
            let method = "POST"
            let endpoint = "/v1/matches?tab=upcoming&page=" + (1) + `&limit=${10}&search=${searchText}`;
            await makeRequest({url: endpoint, method: method, data: []}).then(([status, result]) => {
                if (status === 200) {
                    setMatches(result?.data || result)
                }
            });
        }

    }

    const onSearchInputChanged = (value) => {
        console.log("Setting value to new value ", value, searching)
        setSearchText(value);
    }
    const onSearchTeamSelected = (value) => {
          console.log("selected search ", value)
          setSearchText(value);
          setMatches([]);
          setSearching(false); 
    }
    

    const showSearchBar = () => {
        setSearching(true)
    }

    const dismissSearch = () => {
        setSearching(false)
        setMatches([])
    }
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
                dispatch({type: "SET", key: "user", payload: u});
                setLocalStorage('user', u);
                setUser(u)
            }
        });

    }, [state?.refreshbalance]);


    useEffect(() => {
        updateUserOnHistory()
    }, [updateUserOnHistory])

    useEffect(() => {
           setUser(state?.user);
           if(state?.user) {
               setLocalStorage('user', state?.user);
           }
    
    }, [state?.user])


    useEffect(() => {
        console.log("Looking for search text again", searchText, searching);
        dispatch({type: "SET", key: "searchterm", payload: searchText});
        fetchMatches()
    }, [searchText]);

    const expand = "md"
    return (
        <Suspense fallback={<div></div>} >
            <Navbar expand="md" className="mb-0 ck pc os app-navbar top-nav" fixed="top" variant="dark">
                <div className={'d-flex justify-content-between mobile-change container-fluid'}>
                    <Row style={{width: "100%",}} className="mobile-row-custom-full">

                    {/* Mobile top */}

                    <div className="col-12 d-sm-flex d-md-none d-flex pr-0">
                        <MobileMenu  user={user}/>
                    </div>

                    <div className="col-3">
                        <Navbar.Brand as={Link} to="/" className="e logo align-self-start co4" title="Bikosports">
                            <div className="">
                                <div>
                                    <LazyLoadImage src={logo} alt="Bikosports" title="Bikosports" effects="blur"/>
                                </div>
                            </div>
                        </Navbar.Brand>
                    </div>
                    <div className="col-9 change-size pt-3" id="navbar-collapse-main">

                        <div className="row">
                            <div id="navbar-collapse-main"
                                       className={`col-7 fadeIn header-menu d-none d-md-flex justify-content-center relative-pos`}>
                                            <input type="text" placeholder={searchText || "Search for Events and Tournaments"} ref={searchInputRef}
                                                   onInput={(event) => onSearchInputChanged(event.target.value)}
                                                   className={'form-control input-field border-0  no-border-radius'} 
                                                   value={searchText}
                                            />
                                       { !searchText 
                                           ? <span className="top-search-icon" style={{margin:"3px 10px"}}><FaSearch size={21}/></span> 
                                           : <span className="top-search-icon" 
                                               style={{margin:"3px 10px", color:"red", opacity:1, fontWeight:100}}
                                               onClick={() => onSearchInputChanged("") } ><FaTrash size={14}/> Clear </span> 
                                       }
                                        
                            </div>  


                            <div className="col-sm-12 col-md-5 disable-ipd d-md-block">
                                {user 
                                    ? <ProfileMenu user={user}/> 
                                    : (
                                        <div className="top-login float-end">
                                        <Link to="/login" className="cg login-button btn width-auto">LOGIN </Link>
                                        <Link to="/signup" className="cg btn btn-primary width-auto">REGISTER</Link>
                                        </div>
                                    )
                                }
                            </div>
                            {/*For the mobile*/}
                            
                        </div>
                        <div className={!user?"unlogged-mobile-spacer-height":""}></div>
                    </div>
                    { /* Mobile version user profile */}
                    
                   </Row>
                    <div className="col-sm-3 col-3 vissible-mobile d-lg-none float-end header-navigation" id="header">
                        {/* Add menus for the mobile*/}

                        
                         
                        
                    </div>
                    {/*
                    </Row>
                */}

                <span className="d-none d-md-flex ml-1"><div className="">{user ? <HeaderMenuToggle user={user}/> : <HeaderMenuToggle />}</div></span>

                </div>
            </Navbar>

          <ShareModal shown={state?.showsharemodal === true} />

        </Suspense>

    )
}
export default React.memo(Header);
