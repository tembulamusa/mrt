import React, {useContext, useEffect, useState} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import {Context} from '../../context/store';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch, faPrint, faQuestionCircle, faTimes} from '@fortawesome/free-solid-svg-icons'
import makeRequest from "../utils/fetch-request";

const HeaderNav = (props) => {
    const [state,] = useContext(Context);
    const pathname = window.location.pathname;

    const [searching, setSearching] = useState(false)

    const [matches, setMatches] = useState([])

    useEffect(() => {
        fetchMatches()
    }, [searching])

    const fetchMatches = async () => {
        let method = "POST"
        let endpoint = "/v1/matches?page=" + (1) + `&limit=${5}&search=arsenal`;
        await makeRequest({url: endpoint, method: method, data: []}).then(([status, result]) => {
            if (status == 200) {
                setMatches(result?.data || result)
            }
        });
    };

    const dismissSearch = () => {
        setSearching(false)
        setMatches([])
    }
    return (
        <>
            <Container id="navbar-collapse-main" className={`header-menu ${searching ? 'd-none' : 'd-block'}`}>

                <ListGroup as="ul" xs="9" horizontal className="nav navbar-nav og ale ss">

                    <li className={pathname === '/' ? "active" : ''}>
                        <a className="cg fm ox anl url-link not-selectable" href="/" title="Home">Home</a>
                    </li>
                    <li>
                        <a className={`g url-link live-game ${pathname === '/live' ? 'active' : ''}`} href="/live"
                           title="Live">Live</a>
                    </li>
                    <li className={pathname === '/highlights' ? 'active' : ''}>
                        <a className="cg fm ox anl url-link" href="/highlights" title="Todays Highlights">Highlights</a>
                    </li>

                    <li className={pathname === '/jackpot' ? 'active' : ''}>
                        <a className="cg fm ox anl url-link" href="/jackpot" title="Jackpot">Jackpot</a>
                    </li>
                    <li className={pathname === '/app' ? 'active' : ''}>
                        <a className="g url-link" href="/app" title="App">APP </a>
                    </li>
                    {state?.user &&
                        <>
                            <li className={pathname === '/deposit' ? 'active' : ''}>
                                <a className="url-link" href="/deposit" title="Deposit"> Deposit</a>
                            </li>
                            <li className={pathname === 'withdraw' ? 'active' : ''}>
                                <a className="url-link" href="/withdraw" title="Withdraw"> Withdraw</a>
                            </li>
                            <li className={pathname === '/my-bets' ? 'active' : ''}>
                                <a className="url-link" href="/my-bets" title="My bets">My Bets</a>
                            </li>
                        </>
                    }
                </ListGroup>
                <ListGroup className={'right nav navbar-nav ss '} as={'ul'}>
                    <li className={pathname === '/print-matches' ? '' : ''}>
                        <a className="g url-link" href="javascript:void(0)" title="Search"
                           onClick={() => setSearching(true)}>
                            <FontAwesomeIcon icon={faSearch}/> Search
                        </a>
                    </li>
                    <li className={pathname === '/how-to-play' ? 'active' : ''}>
                        <a className="g url-link" href="/how-to-play" title="How to play">
                            <FontAwesomeIcon icon={faQuestionCircle}/> Help
                        </a>
                    </li>
                    <li className={pathname === '/print-matches' ? 'active' : 'fa-border'}>
                        <a className="g url-link" href="/print-matches" title="Print Matches">
                            <FontAwesomeIcon icon={faPrint}/> Print Matches
                        </a>
                    </li>
                </ListGroup>
            </Container>
            <Container id="navbar-collapse-main"
                       className={`fadeIn header-menu d-flex justify-content-center ${searching ? 'd-block' : 'd-none'}`}>
                <ListGroup as="ul" xs="9" horizontal className="nav navbar-nav og ale ss col-md-6 text-center">
                    <div className="d-flex">
                        <div className="col-md-10">
                            <input type="text" placeholder={'Start typing to search for team ...'}
                                   className={'form-control input-field border-0 bg-dark text-white no-border-radius'}/>
                        </div>

                        <button className={'btn text-white -align-right'} onClick={() => dismissSearch()}>
                            <FontAwesomeIcon icon={faTimes}/> Close
                        </button>
                    </div>
                    <div
                        className={`autocomplete-box position-fixed bg-white border-dark col-md-5 mt-1 shadow-lg text-start`}>
                        {matches.map((match, index) => (
                            <li key={index}>
                                {match.home_team}
                            </li>
                        ))}
                    </div>
                </ListGroup>
            </Container>
        </>
    )

}
export default React.memo(HeaderNav);
