import React, {useEffect, useState} from "react";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import {useParams} from "react-router-dom";
import makeRequest from "../../utils/fetch-request";

const GamePlay = (props) => {
    const {game_id} = useParams()

    const [gameUrl, setGameUrl] = useState('')

    const [gameUrlLoaded, setGameUrlLoaded] = useState(false)

    const createPlayer = async () => {

        let endpoint = '/v1/casino/create/player'

        let method = "GET"

        await makeRequest({url: endpoint, method: method}).then(([status, result]) => {
            if (status === 200) {
                console.log(result)
            }
        });
    }

    const startGame = async (game_id) => {

        let endpoint = `/v1/casino/start/game?game-id=${game_id}`

        let method = "GET"

        await makeRequest({url: endpoint, method: method}).then(([status, result]) => {
            if (status === 200) {
                setGameUrl(result?.result.gameURL)
                setGameUrlLoaded(true)
            }
        });
    }

    useEffect(() => {
        createPlayer().then(()=>{
            startGame(game_id)
        })

    }, [])
    return (
        <>
            <Header/>
            <div className="amt">
                <div className="d-flex flex-row justify-content-between">
                    <div className="col-md-12">
                        <div className="homepage">
                            <div
                                className={`col-md-12  text-center alert alert-warning ${gameUrlLoaded ? 'd-none' : 'd-block'}`}>
                                Getting game details. Please wait ...
                            </div>
                            {gameUrlLoaded && <>
                                <iframe src={gameUrl} title="Gadme" width={'100%'} height={'500px'}></iframe>
                            </>}
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default GamePlay