import React, {useCallback, useEffect, useState, useContext} from 'react';
import {
    ProSidebar, 
    Menu, 
    MenuItem, 
    SubMenu, 
    SidebarHeader, 
    SidebarContent 
} from 'react-pro-sidebar';
import {
    faSearch,
    faPrint,
    faQuestionCircle,
    faTimes,
    faLaptop,
    faClock,
    faMagnet,
    faHome,
    faDiamond,
    faMagic, faInfo, faChessBoard, faDice
} from '@fortawesome/free-solid-svg-icons'
import {faMobile, faCoins} from "@fortawesome/free-solid-svg-icons";
import 'react-pro-sidebar/dist/css/styles.css';
import {getFromLocalStorage, setLocalStorage} from "../../utils/local-storage";
import makeRequest from "../../utils/fetch-request";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import {Context} from '../../../context/store';
import HomeIcon from "../../../assets/svg/Home.svg";
import JackpotIcon from "../../../assets/svg/JACKPOT.svg";
import LiveIcon from "../../../assets/svg/LIVENOW.svg";
import MobileAppIcon from "../../../assets/svg/MOBILEAPP.svg";
import LivescoreIcon from "../../../assets/svg/LIVESCORE.svg";
import LotteryIcon from "../../../assets/svg/LOTTERY.svg";
import Others from "../../../assets/svg/others.svg";
import TopLeagues from "../../../assets/svg/top-leagues.svg";
import MostLikedIcon from "../../../assets/svg/MOSTLIKEDOPTIONS.svg";
import DepositIcon from "../../../assets/svg/deposit.svg";
import HOWToPlayIcon from "../../../assets/svg/how-to-play.svg";
import PromotionIcon from "../../../assets/svg/Promotions.svg";
import CircleSvg from "../../../assets/img/circle.svg";
import ShareModal from "../../sharemodal";
import {useLocation, useParams, Link} from 'react-router-dom';

const Sidebar = (props) => {
    const { mobile }  = props
    const {id, sportid, categoryid, competitionid } = useParams();
    const [collapsed, setCollapsed] = useState(false)
    const [toggled, setToggled] = useState(false)
    const [sport, setSport] = useState(79)
    const [, dispatch] = useContext(Context);
    const pathname = window.location.pathname;
    const [topLeagesOpen, setTopLeagesOpen] = useState(false);
    const [topCountriesOpen, setTopContriesOpen] = useState(false);


    const handleCollapsedChange = (checked) => {
        setCollapsed(checked);
    };

    const handleToggleSidebar = (value) => {
        setToggled(value);
    };

    const [competitions, setCompetitions] = useState(props?.competitions);

    const fetchData = useCallback(async () => {
        let cached_competitions =  getFromLocalStorage('categories');
        let cached_configs =  getFromLocalStorage('bgconfigs');
        let endpoint = "/v1/categories";

        if (!cached_competitions) {
            const [competition_result] = await Promise.all([
                makeRequest({url: endpoint, method: "get", data: null}),
            ]);
            let [c_status, c_result] = competition_result
            if (c_status === 200) {
                let bgconfigs = c_result?.bgconfigs;
                delete c_result.bgconfigs
                setCompetitions(c_result);
                setLocalStorage('categories', c_result);
                setLocalStorage('bgconfigs', bgconfigs);
                dispatch({type:"SET", key:"categories", payload:c_result});
                dispatch({type:"SET", key:"bgconfigs", payload:bgconfigs});
            } else {
                fetchData()
            }
        } else {
            setCompetitions(cached_competitions);
            dispatch({type:"SET", key:"categories", payload:cached_competitions});
            dispatch({type:"SET", key:"bgconfigs", payload:cached_configs});
        }

    }, []);


    useEffect(()=> {
        if(competitions?.top_soccer) {
            setTopLeagesOpen(
               competitions?.top_soccer?.filter((tl) => tl.competition_id == competitionid).length > 0
            )
        }
        return () => setTopLeagesOpen(false)
    }, [competitions?.top_soccer]);

    useEffect(() => {
        const abortController = new AbortController();
        fetchData();

        return () => {
            setCompetitions(null);
        };
    }, [fetchData]);

    const [width, setWidth] = useState(window.innerWidth);

    const updateDimensions = () => {
        setWidth(window.innerWidth);
        if (width >= 768 && width <= 991) {
            setCollapsed(true)
        } else {
            setCollapsed(false)
        }
    }
    const updateSidebarState = () => {
        let sport_id = (new URL(window.location.href).searchParams.get('sport_id'))
        if (sport_id === null && window.location.pathname === '/') {
            sport_id = 79
        }
        setSport(sport_id)
    }

    const getActiveSport = (matchId) => {
        return (Number(sport) === Number(matchId))

    }
    useEffect(() => {
        updateDimensions()
        updateSidebarState()
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, [width]);

    const getSportImageIcon = (sport_name, folder = 'svg', topLeagues = false) => {

        let default_img = 'default_sport'
        let sport_image;
        try {
            sport_image = topLeagues ? require(`../../../assets${sport_name}`) : require(`../../../assets/${folder}/${sport_name}.svg`);
        } catch (error) {
            sport_image = require(`../../../assets/${folder}/${default_img}.svg`);
        }
        return sport_image
    }

    const toggleSideCollapsed = useCallback(() => {
       setCollapsed(collapsed => !collapsed)
     }, [ setCollapsed ])

    return (
        <div style={{
            display: 'flex',
            overflow: 'scroll initial',
            zIndex: 10,
            // marginRight: '2px',
            top: "84px"
        }}
             className={`text-white sticky-top up`}>
            <ProSidebar

                style={{backgroundColor: '#16202c !important'}}
                image={false}
                onToggle={handleToggleSidebar}
                collapsed={collapsed}
                onClick={toggleSideCollapsed}
                toggled={toggled}>
                <SidebarContent>
                    <Menu iconShape="circle">
                        <div className=" left-menu base-submenu uppercase bold">
                            <MenuItem className={pathname === '/' ? "active" : ''}>
                                <Link to="/" title="Home">
                                <FontAwesomeIcon icon={faHome} className="hi"/> Home
                                </Link>
                            </MenuItem>

                            <MenuItem className={`live-game ${pathname === '/live' ? 'active' : ''}`}>
                                <Link to="/live"
                                   title="Live" 
                                   className="red-color"><img src={LiveIcon} alt="" className="svg-menu-img-icon hi1" />Live Now</Link>
                            </MenuItem>

                            <MenuItem className={`${pathname === '/highlights' ? 'active' : ''}`}>
                                <Link to="/highlights"
                                   title="Highlights"><img src={MostLikedIcon} alt="" className="svg-menu-img-icon " />Mechi Kali</Link>
                            </MenuItem> 
                            <MenuItem className={`${pathname === '/jackpot' ? 'active' : ''}`}>
                                <Link to="/jackpot"
                                   title="Jackpot"><img src={JackpotIcon} alt="" className="svg-menu-img-icon " />Jackpot</Link>
                            </MenuItem>
                            <MenuItem className={`${pathname === '/app' ? 'active' : ''}`}>
                                <Link to="/app"
                                   title="Mobile App">
                                   <img src={MobileAppIcon} alt="" className="svg-menu-img-icon " />Mobile App
                                </Link>
                            </MenuItem>

                            <MenuItem className={`${pathname === '/help' ? 'active' : ''}`}>
                                <Link to="/help"
                                   title="Jinsi Ya Kucheza">
                                   <img src={HOWToPlayIcon} alt="" className="svg-menu-img-icon " />Jinsi Ya Kucheza
                                   </Link>
                            </MenuItem>
                            <MenuItem className={`${pathname === '/deposit' ? 'active' : ''}`}>
                                <Link to="/deposit"
                                   title="DEPOSIT">
                                   <img src={DepositIcon} alt="" className="svg-menu-img-icon " />DEPOSIT
                                </Link>
                            </MenuItem>
                        </div>

                        <div className="left-menu">
                            
                            <SubMenu className={`left-menu-item-1`} title={'Top Leagues'} >
                            {competitions?.top_soccer?.map((top_league, index) =>  (
                                <MenuItem key={`l_${index}`}
                                          className={`${pathname.split("/")[4] == top_league.competition_id ? 'active': ''}`}
                                          icon={<img alt="" src={getSportImageIcon(top_league?.flag, 'img/flags-1-1', true)}
                                          style={{borderRadius: "10%", height: "15px"}}></img>} >
                                          
                                   <Link to={`/competition/${top_league.sport_id}/${top_league.category_id}/${top_league.competition_id}`}>
                                        {top_league?.competition_name} <span style={{float:"right"}}>{top_league.games_count} </span> 
                                    </Link>
                                </MenuItem>
                            ))}
                        </SubMenu>


                        <SubMenu className="left-menu-item-1" title={'Top Countries'}>
                            { competitions?.top_countries.map((country, index) => (
                                <MenuItem title={country.category_name}
                                     className={`${pathname.split("/")[3] == country.category_id ? 'active': ''}`}
                                     icon={<img alt="" style={{borderRadius: '10%', height: '15px'}}
                                     src={getSportImageIcon(country.flag_icon, 'img/flags-1-1')}
                                     />} key={index} >

                                        <Link to={`/competition/${country.sport_id}/${country.category_id}/all`}
                                           onClick={() => setLocalStorage('active_item', country.sport_id)}>
                                            {country.category_name} <span style={{float:"right"}}>{country.games_count} </span> 
                                        </Link>
                                </MenuItem>
                             
                            ))}
                        </SubMenu>


                        <SubMenu className="left-menu-item-1" title={'Other Sports(A-Z)'} >
                            {competitions?.all_sports.map((competition, index) => (

                                <SubMenu title={competition.sport_name} defaultOpen={getActiveSport(competition.sport_id) && index !== 0}
                                         icon={<img alt="" style={{borderRadius: '10%', height: '30px'}}
                                                    src={getSportImageIcon(competition.sport_name)}/>}
                                         key={index}>
                                        <PerfectScrollbar >
                                        {competition?.categories.map((country, countryKey) => {

                                             let gcount = country.competitions.reduce((total, c) => total + c.games_count ,0);
                                             let ids = pathname.split("/"); 
                                             return  (<MenuItem title={country.category_name}
                                                         className={`${ids[3] == country.category_id ? 'active': ''}`}
                                                         icon={<img  alt="" style={{borderRadius: '10%', height: '15px'}}
                                                         src={getSportImageIcon(country.cat_flag, 'img/flags-1-1')}
                                                         />} key={countryKey} >

                                                            <Link className={`${ids[3] == country.category_id ? 'active': ''}`} 
                                                               to={`/competition/${competition.sport_id}/${country.category_id}/all`}
                                                               onClick={() => setLocalStorage('active_item', competition.sport_id)}>
                                                                {country.category_name} <span style={{float:"right"}}>{gcount} </span> 
                                                            </Link>
                                                </MenuItem>)
                                        })}
                                        </PerfectScrollbar >
                                </SubMenu>
                            ))}
                        </SubMenu>

                    </div>
                    </Menu>
                </SidebarContent>
            </ProSidebar>
        </div>
    );
};

export default Sidebar;
