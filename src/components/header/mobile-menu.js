import React, {useCallback, useContext, useEffect, useState, useRef} from 'react';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { FaBars, FaTrophy, FaSearch, FaClipboard } from "react-icons/fa";
import Dropdown from 'react-bootstrap/Dropdown';
import { faUser, faLock, faCoins } from "@fortawesome/free-solid-svg-icons";
import { formatNumber } from "../utils/betslip";
import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import {Context} from '../../context/store';
import {getFromLocalStorage, setLocalStorage} from "../utils/local-storage";

import {
    faSearch,
    faPrint,
    faQuestionCircle,
    faTimes,
    faLaptop,
    faMagnet,
    faMagic, faInfo, faChessBoard, faDice
} from '@fortawesome/free-solid-svg-icons'
import makeRequest from "../utils/fetch-request";

// const VissibleItemsMobile = React.lazy(() => import('./mobile-menu/vissible-items'));
const HeaderMenuToggle = React.lazy(() => import('./menu-toggle'));
const MobileToggleMkts = React.lazy(() => import('./mobile-toggle-markets'));

const MobileMenu = (props) => {
  const { user } = props;
  const gaEventTracker = useAnalyticsEventTracker('Navigation');
  const [state,] = useContext(Context);
  const pathname = window.location.pathname;
  const [searching, setSearching] = useState(false)
  const searchInputRef = useRef(null)
  const [matches, setMatches] = useState([])


  useEffect(() => {
        fetchMatches()
    }, [searching])

const fetchMatches = async (search) => {
        if (search && search.length >= 3) {
            gaEventTracker('Searching')
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
        searchInputRef.current.focus()
        gaEventTracker('Clicked on Search')
    }

    const dismissSearch = () => {
        setSearching(false)
        setMatches([])
    }

    // The competitions menu

    const [sport, setSport] = useState(79)
    const [competitions, setCompetitions] = useState(props?.competitions);

    const fetchData = useCallback(async () => {
        let cached_competitions = getFromLocalStorage('categories');
        let endpoint = "/v1/categories";

        if (!cached_competitions) {
            const [competition_result] = await Promise.all([
                makeRequest({url: endpoint, method: "get", data: null}),
            ]);
            let [c_status, c_result] = competition_result

            if (c_status === 200) {
                setCompetitions(c_result);
                setLocalStorage('categories', c_result);
            } else {
                fetchData()
            }
        } else {
            setCompetitions(cached_competitions);
        }

    }, []);

    useEffect(() => {
        const abortController = new AbortController();
        fetchData();

        return () => {
            abortController.abort();
        };
    }, [fetchData]);


    const updateMenubarState = () => {
        let sport_id = (new URL(window.location.href).searchParams.get('sport_id'))
        if (sport_id === null && window.location.pathname === '/') {
            sport_id = 79
        }
        setSport(sport_id)
    }

    const getActiveSport = (matchId) => {
        return (Number(sport) === Number(matchId))

    }


  return (
    <>
    <div className="top-nav-mobile">
      <div className="row">
        <div className="col-2 capitalize">
            
        <MobileToggleMkts />

        </div>
        <div className="col-3 capitalize">

        <a href = "/jackpot"><div><FaTrophy size={25} /></div></a>
        Jackpots

        </div>
        <div className="col-3 capitalize" onClick={() => showSearchBar()}>

          <div><FaSearch size={25}/></div>
          Search
          <span className={'hide2'}>Search</span>
        </div>
        <div className="col-2 capitalize">
          <a href="/betslip">
          <div><FaClipboard size={25}/></div>
          Slip
          </a>
        </div>

        <div className="col-2 capitalize">
          <HeaderMenuToggle />
          Menu
        </div>


        <Container id="navbar-collapse-main"
                       className={`high-first-z-index fadeIn mobile-search-input-div header-menu d-flex justify-content-center px-4 ${searching ? 'd-block' : 'd-none'}`}>
                <ListGroup as="ul" horizontal className="nav navbar-nav og ale ss text-center" style={{width:"100%",}}>
                    <div className="d-flex">
                        <div className="col-10">
                            <input type="text" placeholder={'Start typing to search for team ...'} ref={searchInputRef}
                                   onInput={(event) => fetchMatches(event.target.value)}
                                   className={'form-control input-field border-0 full-width text-white no-border-radius'}/>
                        </div>

                        <button className={'btn text-white -align-right search-close-btn'} onClick={() => dismissSearch()}>
                            <FontAwesomeIcon icon={faTimes}/> Close
                        </button>
                    </div>
                    <div
                        className={`autocomplete-box position-fixed bg-white border-dark col-md-5 mt-1 shadow-lg text-start`}
                        onClick={() => gaEventTracker('View Search Results')}>
                        {matches.map((match, index) => (
                            <a href={`/?search=${match.home_team}`} key={index} className="primary-text-color search-result-item">
                                <li>
                                    {match.home_team}
                                </li>
                            </a>
                        ))}
                    </div>
                </ListGroup>
            </Container>
      </div>

      </div>


    </>
  );
}

export default MobileMenu;