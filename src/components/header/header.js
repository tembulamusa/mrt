import React, {useEffect, useCallback, useState, useContext, useRef, Suspense} from 'react';
import { Link} from "react-router-dom"
import Row from 'react-bootstrap/Row';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {Context} from '../../context/store';
import {getFromLocalStorage, setLocalStorage} from '../utils/local-storage';
import makeRequest from '../utils/fetch-request';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { FaSearch, FaTrash } from "react-icons/fa";
import NewMemoServiceItemModal from '../memos/new-memo-service-item-modal';
import logo from '../../assets/img/logo.png';
import {Navbar} from "react-bootstrap";
import ShareModal from "../sharemodal";
import NewMemoModal from "../memos/new-memo-modal";

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
    const currentUser = getFromLocalStorage("user");
    const expand = "md"
    return (
        <Suspense fallback={<div></div>} >
                <header className={'header bg-white shadow-sm mb-1 py-3 px-4'}>
                    <div className="header-content flex items-center flex-row">

                    {/* Mobile top */}

                    <div className="col-3">
                            <div className="">
                                <div>
                                    {/* <LazyLoadImage src={logo} alt="Travellers" title="Bikosports" effects="blur"/> */}
                                    {/* if not logged in, show user */}
                                    <div className='text-3xl font-bold text-blue-500'>PSC</div>
                                    
                                </div>
                            </div>
                    </div>
                    <div className="col-9 change-size pt-3" id="navbar-collapse-main">

                        <div className="row">
                            <div id="navbar-collapse-main"
                                       className={`col-7 fadeIn header-menu d-none d-md-flex justify-content-center relative-pos`}>
                                            <input type="text" placeholder={searchText || "Search for items"} ref={searchInputRef}
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
                                {currentUser 
                                    ? <div className='float-right'><Link to="/logout" className="width-auto mr-2 rounded shadow-sm bg-blue-500 text-white px-4 py-2">Logout </Link> <Link to="/help" className="cg bg-gray-200 text-gray-700 rounded shadow-sm  px-4 py-2 width-auto float-riht">Help?</Link></div>
                                    : (
                                        <div className="float-right">
                                        <Link to="/login" className="cg bg-blue-500 text-white rounded shadow-sm mr-2 px-4 py-2">Login </Link>
                                        <Link to="/help" className="cg bg-gray-200 text-gray-700 rounded shadow-sm  px-4 py-2 width-auto float-riht">Help?</Link>
                                        </div>
                                        
                                    )
                                }
                            </div>
                            
                            
                        </div>
                    </div>
                    
                   </div>
                    <div className="col-sm-3 col-3 vissible-mobile d-lg-none float-end header-navigation" id="header">
                        {/* Add menus for the mobile*/}

                        
                         
                        
                    </div>
                    {/*
                    </Row>
                */}

                </header>
                <ShareModal shown={state?.showsharemodal === true} />
                <NewMemoModal shown={state?.shownewmemomodal === true} />
                <NewMemoServiceItemModal show={state?.shownewmemoserviceitemmodal === true } />

                

        </Suspense>

    )
}
export default React.memo(Header);
