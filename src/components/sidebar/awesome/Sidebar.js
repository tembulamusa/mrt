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
import Flag from "../../../assets/svg/flag.svg";
import MostLikedIcon from "../../../assets/svg/MOSTLIKEDOPTIONS.svg";
// import LivescoreIcon from "../../../assets/svg/LIVESCORE.svg";
import DepositIcon from "../../../assets/svg/deposit.svg";
import HOWToPlayIcon from "../../../assets/svg/how-to-play.svg";
import PromotionIcon from "../../../assets/svg/Promotions.svg";
import ShareModal from "../../sharemodal";

const Sidebar = (props) => {

    const [collapsed, setCollapsed] = useState(false)
    const [toggled, setToggled] = useState(false)
    const [sport, setSport] = useState(79)
    const [, dispatch] = useContext(Context);
    const pathname = window.location.pathname;

    const handleCollapsedChange = (checked) => {
        setCollapsed(checked);
    };

    const handleToggleSidebar = (value) => {
        setToggled(value);
    };

    const [competitions, setCompetitions] = useState(props?.competitions);

    const fetchData = useCallback(async () => {
        let cached_competitions =  getFromLocalStorage('categories');
        let endpoint = "/v1/categories";

        if (!cached_competitions) {
            const [competition_result] = await Promise.all([
                makeRequest({url: endpoint, method: "get", data: null}),
            ]);
            let [c_status, c_result] = competition_result

            if (c_status === 200) {
                setCompetitions(c_result);
                setLocalStorage('categories', c_result);
                dispatch({type:"SET", key:"categories", payload:c_result});
            } else {
                fetchData()
            }
        } else {
            setCompetitions(cached_competitions);
            dispatch({type:"SET", key:"categories", payload:cached_competitions});
        }

    }, []);


    useEffect(() => {
        const abortController = new AbortController();
        fetchData();

        return () => {
            abortController.abort();
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

    const getDefaultMarketsForSport = (competition) => {
        return competition?.default_display_markets
    }

    return (
        <div style={{
            display: 'flex',
            overflow: 'scroll initial',
            zIndex: 10,
            // marginRight: '2px',
            top: "84px"
        }}
             className={`vh-100 text-white sticky-top up`}>
            <ProSidebar

                style={{backgroundColor: '#16202c !important'}}
                image={false}
                onToggle={handleToggleSidebar}
                collapsed={collapsed}
                toggled={toggled}>
        {/** <SidebarHeader>
                    <div
                        style={{
                            padding: '5px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}>
                        <div className="d-flex justify-content-end">

                            <span onClick={() => setCollapsed(!collapsed)} className={'cursor-pointer'}>
                               {collapsed ? (
                                   <>
                                       Show <FontAwesomeIcon icon={faArrowRight}/>
                                   </>
                               ) : (
                                   <>
                                       <FontAwesomeIcon icon={faArrowLeft}/> Hide
                                   </>
                               )}
                            </span>
                        </div>
                    </div>
                </SidebarHeader>
                */}
                <SidebarContent>
                    <Menu iconShape="circle">
                        <div className=" left-menu base-submenu uppercase bold">
                            <MenuItem className={pathname === '/' ? "active" : ''}>
                                <a href="/" title="Home">
                                <FontAwesomeIcon icon={faHome} className="hi"/> Home
                                </a>
                            </MenuItem>

                            <MenuItem className={`live-game ${pathname === '/live' ? 'active' : ''}`}>
                                <a href="/live"
                                   title="Live" className="red-color"><img src={LiveIcon} alt="" className="svg-menu-img-icon hi1" />Live Now</a>
                            </MenuItem>

                            <MenuItem className={`${pathname === '/highlights' ? 'active' : ''}`}>
                                <a href="/highlights"
                                   title="Highlights"><img src={MostLikedIcon} alt="" className="svg-menu-img-icon " />Mechi Kali</a>
                            </MenuItem> 
                            <MenuItem className={`${pathname === '/jackpot' ? 'active' : ''}`}>
                                <a href="/jackpot"
                                   title="Jackpot"><img src={JackpotIcon} alt="" className="svg-menu-img-icon " />Jackpot</a>
                            </MenuItem>
                            <MenuItem className={`${pathname === '/app' ? 'active' : ''}`}>
                                <a href="/app"
                                   title="Mobile App">
                                   <img src={MobileAppIcon} alt="" className="svg-menu-img-icon " />Mobile App
                                </a>
                            </MenuItem>
                            <MenuItem className={`${pathname === '/help' ? 'active' : ''}`}>
                                <a href="/help"
                                   title="Jinsi Ya Kucheza">
                                   <img src={HOWToPlayIcon} alt="" className="svg-menu-img-icon " />Jinsi Ya Kucheza
                                   </a>
                            </MenuItem>
                            <MenuItem className={`${pathname === '/deposit' ? 'active' : ''}`}>
                                <a href="/deposit"
                                   title="DEPOSIT">
                                   <img src={DepositIcon} alt="" className="svg-menu-img-icon " />DEPOSIT
                                </a>
                            </MenuItem>
                            <MenuItem className={`${pathname === '/lottery' ? 'active' : ''}`}>
                                <a href="https://www.biko.co.tz/sw"
                                   title="Live">
                                   <img src={LotteryIcon} alt="" className="svg-menu-img-icon" />Cheza Biko SMS Lottery
                                </a>
                            </MenuItem>
                            <MenuItem className={`${pathname === '/news' ? 'active' : ''}`}>
                                <a href="https://blog.bikosports.co.tz/?amount=&loggedOn=0&phone="
                                   title="Live Score">
                                   <img src={LivescoreIcon} alt="" className="svg-menu-img-icon " />Sports news
                                </a>
                            </MenuItem>
                        </div>

                        <div className="left-menu">
                            
                            <SubMenu className="left-menu-item-1" title={'Top Leagues'} >
                            {competitions?.top_soccer?.map((top_league, index) => (
                                <MenuItem key={`l_${index}`}
                                          icon={<img
                                             src={getSportImageIcon(top_league?.flag, 'img/flags-1-1', true)}
                                             style={{borderRadius: "10%", height: "15px"}}></img>}>
                                   <a href={`/competition/${top_league.sport_id}/${top_league.category_id}/${top_league.competition_id}`}>
                                        {top_league?.competition_name}
                                    </a>
                                </MenuItem>
                            ))}
                        </SubMenu>


                        <SubMenu className="left-menu-item-1" title={'Top Countries'}>



                            { competitions?.top_countries.map((country, index) => (

                                <MenuItem title={country.category_name}
                                     icon={<img style={{borderRadius: '10%', height: '15px'}}
                                     src={getSportImageIcon(country.flag_icon, 'img/flags-1-1')}
                                     />} key={index} >

                                        <a href={`/competition/${country.sport_id}/${country.category_id}/all`}
                                           onClick={() => setLocalStorage('active_item', country.sport_id)}>
                                            {country.category_name}
                                        </a>
                                </MenuItem>
                             
                            ))}
                        </SubMenu>


                        <SubMenu className="left-menu-item-1" title={'Other Sports(A-Z)'} >
                            {competitions?.all_sports.map((competition, index) => (

                                <SubMenu title={competition.sport_name} defaultOpen={getActiveSport(competition.sport_id) && index !== 0}
                                         icon={<img style={{borderRadius: '10%', height: '30px'}}
                                                    src={getSportImageIcon(competition.sport_name)}/>}
                                         key={index}>
                                {/* <SubMenu title={'Countries'}
                                             style={{maxHeight: '300px', overflowY: 'auto', overflowX: 'hidden'}}> */}
                                        <PerfectScrollbar >
                                        {competition?.categories.map((country, countryKey) => (
                                                <MenuItem title={country.category_name}
                                                         icon={<img style={{borderRadius: '10%', height: '15px'}}
                                                         src={getSportImageIcon(country.cat_flag, 'img/flags-1-1')}
                                                         />} key={countryKey} >

                                                            <a href={`/competition/${competition.sport_id}/${country.category_id}/all`}
                                                               onClick={() => setLocalStorage('active_item', competition.sport_id)}>
                                                                {country.category_name}
                                                            </a>
                                                </MenuItem>
                                        ))}
                                        </PerfectScrollbar >
                                { /* </SubMenu> */}
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
