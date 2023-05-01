import React, {useEffect, useState} from 'react';
import makeRequest from "../../utils/fetch-request";
import {getFromLocalStorage, setLocalStorage} from "../../utils/local-storage";
import Notify from "../../utils/Notify";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChair, faCircle, faDotCircle} from "@fortawesome/free-solid-svg-icons";

const LiveCasino = (props) => {

    const [dgaConnected, setDgaConnected] = useState(false)
    const [tableKeys, setTableKeys] = useState({})
    const [tableData, setTableData] = useState([])

    const [user] = useState(getFromLocalStorage("user"));

    const [categories, setCategories] = useState([])

    const [games, setGames] = useState([])

    const fetchGames = async (category = 'vs') => {
        let endpoint = "/v1/casino-games?game-type-id=" + category
        let method = "GET"
        await makeRequest({url: endpoint, method: method}).then(([status, result]) => {
            if (status === 200) {
                setCategories(result.types)
                setGames(result.data)
                setLocalStorage('category_games', result.data)
            }
        });
    }

    const showLoginNotification = () => {
        let message = {
            status: 500,
            message: "Please Log In to continue."
        }
        Notify(message)
    }

    const launchGame = (game_id) => {

        if (user?.token) {
            return window.location.href = `/virtuals/launch/${game_id}?live=1`
        }

        return showLoginNotification()
    }

    const initializeDGAEvents = async () => {
        window.dga.onWsError = (err) => {
            setDgaConnected(false)
        }
        window.dga.onConnect = () => {
            setDgaConnected(true)
        }
        window.dga.onMessage = (data) => {
            let dataResult = []
            if (data.hasOwnProperty('tableKey')) {
                data?.tableKey?.forEach((key) => {
                    let result = {
                        id: key,
                        data: {}
                    }
                    dataResult.push(result)
                })
                setTableKeys(dataResult)
            } else {
                let localData = tableData
                let index = tableData.findIndex((item) => item.tableId === data?.tableId)
                if (index !== -1) {
                    // exists, updating request received...
                    localData[index] = data
                } else {
                    let length = localData.length
                    if (length === 0) {
                        localData[0] = data
                    } else {
                        localData[length] = data
                    }
                }
                setTableData([...localData])

            }
        }
    }

    const initializeDGA = async () => {
        try {
            let url = "prelive-dga0.pragmaticplaylive.net/ws?key=testKey&stylename=lmntgmng_bikosports";
            window.dga.connect(url)
        } catch (e) {
        }
    }

    const getCasinoGames = () => {
        if (dgaConnected) {
            window.dga.available('ppcdk00000010157')
        }
    }

    const getGamesForTableKeys = () => {
        Object.values(tableKeys).forEach((data, key) => {
            window.dga.subscribe('ppcdk00000010157', data?.id, 'Ksh')
        })
    }

    useEffect(() => {
        initializeDGA().then(() => {
            initializeDGAEvents()
        })
        //fetchGames()
    }, [])

    useEffect(() => {
        getCasinoGames()
    }, [dgaConnected])

    useEffect(() => {
        getGamesForTableKeys()
    }, [tableKeys])

    useEffect(() => {
    }, [tableData])


    return (
        <>
        <div className="col-md-12 d-flex flex-column">
            <div className="col">
                <div className={'row text-white p-2 shadow-lg'}>
                    <div className="row">
                        {tableData?.map((tableDataItem) => (
                            <div className={'col-md-3 p-2'}
                                 onClick={() => launchGame(tableDataItem?.tableId)}>
                                <div
                                    className="col shadow-lg p-2 cursor-pointer virtual-game-container"
                                    style={{borderRadius: "4px"}}>
                                    <div className="col text-uppercase text-center bold" style={{
                                        color: "#2c2457"
                                    }}>
                                        {tableDataItem?.tableName}
                                    </div>
                                    <LazyLoadImage src={`${tableDataItem?.tableImage}`}
                                                   style={{borderRadius: "4px"}}
                                                   className={'casino-game-image'}/>
                                    <div className="row d-flex flex-column">
                                        <div className="col">
                                            <div className="d-flex flex-row">
                                                <div className={'col-md-6 flex-row'}>
                                                    <FontAwesomeIcon icon={faChair}
                                                                     className={'text-warning'}/>
                                                    <span style={{color:"#6082B6"}}>&nbsp;{tableDataItem?.totalSeatedPlayers} seats</span>
                                                </div>
                                                <div className={'col-md-6 text-end'} style={{color:"#6082B6"}}>
                                                    <FontAwesomeIcon icon={faCircle}
                                                                     className={`${tableDataItem?.tableOpen ? 'text-success' : 'text-danger'}`}/>
                                                    {tableDataItem?.tableOpen ? ' Table Open' : ' Table Closed'}
                                                </div>
                                            </div>
                                            <div
                                                 className={'mt-1 flex-row row'}>
                                                <div className={'col flex-column text-secondary'}>
                                                    <div className={'small'}>
                                                        Max Bet
                                                    </div>
                                                    <div>
                                                        {tableDataItem?.tableLimits?.maxBet}
                                                    </div>
                                                </div>
                                                <div
                                                    className={'col flex-column text-center text-secondary'}>
                                                    <div className={'small'}>
                                                        Max Players
                                                    </div>
                                                    <div>
                                                        {tableDataItem?.tableLimits?.maxPlayers}
                                                    </div>

                                                </div>
                                                <div
                                                    className={'col flex-column text-end text-secondary'}>
                                                    <div className={'small'}>
                                                        Min Bet
                                                    </div>
                                                    <div>
                                                        {tableDataItem?.tableLimits?.minBet}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <button className={'btn btn-lg col-md-12'} style={{
                                                background: "#C6224E"
                                            }}>
                                                <strong className={'text-white'}>
                                                    Play {tableDataItem?.tableName}
                                                </strong>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </>
    )

}


export default LiveCasino;

