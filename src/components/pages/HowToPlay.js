import React, {useCallback, useEffect, useState, useContext} from "react";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import makeRequest from "../utils/fetch-request";
import {
    getFromLocalStorage,
    setLocalStorage
} from '../utils/local-storage';
import {getBetslip} from '../utils/betslip' ;
import {Context} from '../../context/store';
import {AccordionButton} from "react-bootstrap";
import Index from '../../assets/img/payment_logos/index.png';
import Mpesa from '../../assets/img/payment_logos/mpesa-logo.png';
import Tigo from '../../assets/img/payment_logos/tigo_pesa.png';
import AccountSelect from '../../assets/img/screenshots/account-selection.png';
import PickGame from '../../assets/img/screenshots/pick-game.png';
import PickedGame from '../../assets/img/screenshots/picked-game.png';
import SUccessfulBet from '../../assets/img/screenshots/successful-bet.png';



const HowToPlay = (props) => {
    const [, dispatch] = useContext(Context);
    useEffect(() => {
        let betslip = getBetslip();
        if (betslip) {
            dispatch({type: "SET", key: "betslip", payload: betslip});
        }
    }, []);
    return (
        <>
        <div className='col-md-12 primary-bg p-4 text-center'>
        <h4 className="inline-blok cap-text"> JINSI Ya Kucheza</h4>
        </div>
        <div className="col-md-12 p-2">
        <div className="child-box-relative-pos">


        <header className="yellow mb-4" style={{paddingLeft: "15px"}}>
        JINSI YA KUWEKA PESA <img style={{width: "100px"}} src={Mpesa} alt="Logo"/>
        </header>
        <div className="row section-block pl-3 pr-3">
        <div className="col-xs-6 col-sm-4 col-lg-3">
        <div className="circle-border text-center posa yellow counter-badge section-counter"></div>
        <div className="col-xs-12 secondary-bg mg-2 yellow pg-0 border-radius-2">
        <div className="col-xs-12 pg-3 border-radius-2">
        <div className="col-xs-12 white-background center-container pg-0">
        <div className="col-xs-12 centered-content pg-0">
        <h3 className="center-text h3 bold wordwarp">*150*00#</h3>
        </div>
        </div>
        </div>
        </div>
        <div className="col-xs-12 pg-0">
        <small>Bofya *150*00#</small>
        </div>
        </div>
        <div className="col-xs-6 col-sm-4 col-lg-3">
        <div className="circle-border text-center posa yellow counter-badge section-counter"></div>
        <div className="col-xs-12 secondary-bg mg-2 yellow pg-0 border-radius-2">
        <div className="col-xs-12 pg-3 border-radius-2">
        <div className="col-xs-12 white-background center-container pg-0">
        <div className="col-xs-12 pg-0 yellow centered-content">
        <span className="bold ">4. Lipa kwa MPESA</span>
        </div>
        </div>
        </div>
        </div>
        <div className="col-xs-12 pg-0">
        <small>Chagua 4 Lipa kwa MPESA</small>
        </div>
        </div>
        <div className="col-xs-6 col-sm-4 col-lg-3">
        <div className="circle-border text-center posa yellow counter-badge section-counter"></div>
        <div className="col-xs-12 secondary-bg mg-2 yellow pg-0 border-radius-2">
        <div className="col-xs-12 pg-3 border-radius-2">
        <div className="col-xs-12 white-background center-container pg-0">
        <div className="col-xs-12 centered-content pg-0">
        <h3 className="center-text h3 bold wordwarp">101010</h3>
        </div>
        </div>
        </div>
        </div>
        <div className="col-xs-12 pg-0">
        <small>Chagua 4 Weka namba ya kampuni/biashara: 101010</small>
        </div>
        </div>
        <div className="col-xs-6 col-sm-4 col-lg-3">
        <div className="circle-border text-center posa yellow counter-badge section-counter"></div>
        <div className="col-xs-12 secondary-bg mg-2 yellow pg-0 border-radius-2">
        <div className="col-xs-12 pg-3 border-radius-2">
        <div className="col-xs-12 white-background center-container pg-0">
        <div className="col-xs-12 centered-content pg-0">
        <h3 className="center-text h3 bold wordwarp">XXXXXXX</h3>
        </div>
        </div>
        </div>
        </div>
        <div className="col-xs-12 pg-0">
        <small>Weka Namba yako ya Account (phone number) au Receipt (kama unalipia bila account)</small>
        </div>
        </div>
        <div className="col-xs-6 col-sm-4 col-lg-3">
        <div className="circle-border text-center posa yellow counter-badge section-counter"></div>
        <div className="col-xs-12 secondary-bg mg-2 yellow pg-0 border-radius-2">
        <div className="col-xs-12 pg-3 border-radius-2">
        <div className="col-xs-12 white-background center-container pg-0">
        <div className="col-xs-12 centered-content pg-0">
        <h3 className="center-text h3 bold wordwarp">XX,XXX/=</h3>
        </div>
        </div>
        </div>
        </div>
        <div className="col-xs-12 pg-0">
        <small>Weka kiasi: XX,XXX/= , Na namba ya siri kumalizia</small>
        </div>
        </div>
        </div>
        </div>

        {/*How to deposit Tigo*/}
        <header className="yellow mb-4" style={{paddingLeft: "15px"}}>
        JINSI YA KUWEKA PESA <img style={{width: "100px"}} src={Tigo} alt="Logo"/>
        </header>

        <div className="row section-block">
        <div className="col-xs-6 col-sm-4 col-lg-3">
        <div className="circle-border text-center posa yellow counter-badge section-counter"></div>
        <div className="col-xs-12 secondary-bg mg-2 yellow pg-0 border-radius-2">
        <div className="col-xs-12 pg-3 border-radius-2">
        <div className="col-xs-12 white-background center-container pg-0">
        <div className="col-xs-12 centered-content pg-0">
        <h3 className="center-text h3 bold wordwarp">*150*01#</h3>
        </div>
        </div>
        </div>
        </div>
        <div className="col-xs-12 pg-0">
        <small>Bofya *150*01#</small>
        </div>
        </div>
        <div className="col-xs-6 col-sm-4 col-lg-3">
        <div className="circle-border text-center posa yellow counter-badge section-counter"></div>
        <div className="col-xs-12 secondary-bg mg-2 yellow pg-0 border-radius-2">
        <div className="col-xs-12 pg-3 border-radius-2">
        <div className="col-xs-12 white-background center-container pg-0">
        <div className="col-xs-12 pg-0 yellow centered-content">
        <ol className="">
        <li className="bold ">4. Lipa kwa TIGOPESA</li>
        </ol>
        </div>
        </div>
        </div>
        </div>
        <div className="col-xs-12 pg-0">
        <small>Chagua 4 Lipa kwa TIGOPESA</small>
        </div>
        </div>
        <div className="col-xs-6 col-sm-4 col-lg-3">
        <div className="circle-border text-center posa yellow counter-badge section-counter"></div>
        <div className="col-xs-12 secondary-bg mg-2 yellow pg-0 border-radius-2">
        <div className="col-xs-12 pg-3 border-radius-2">
        <div className="col-xs-12 white-background center-container pg-0">
        <div className="col-xs-12 centered-content pg-0">
        <h3 className="center-text h3 bold wordwarp">101010</h3>
        </div>
        </div>
        </div>
        </div>
        <div className="col-xs-12 pg-0">
        <small>Chagua 3 Weka namba ya kampuni/biashara: 101010</small>
        </div>
        </div>
        <div className="col-xs-6 col-sm-4 col-lg-3">
        <div className="circle-border text-center posa yellow counter-badge section-counter"></div>
        <div className="col-xs-12 secondary-bg mg-2 yellow pg-0 border-radius-2">
        <div className="col-xs-12 pg-3 border-radius-2">
        <div className="col-xs-12 white-background center-container pg-0">
        <div className="col-xs-12 centered-content pg-0">
        <h3 className="center-text h3 bold wordwarp">XXXXXXX</h3>
        </div>
        </div>
        </div>
        </div>
        <div className="col-xs-12 pg-0">
        <small>Weka Namba yako ya Account (phone number) au Receipt (kama unalipia bila account)</small>
        </div>
        </div>
        <div className="col-xs-6 col-sm-4 col-lg-3">
        <div className="circle-border text-center posa yellow counter-badge section-counter"></div>
        <div className="col-xs-12 secondary-bg mg-2 yellow pg-0 border-radius-2">
        <div className="col-xs-12 pg-3 border-radius-2">
        <div className="col-xs-12 white-background center-container pg-0">
        <div className="col-xs-12 centered-content pg-0">
        <h3 className="center-text h3 bold wordwarp">XX,XXX/=</h3>
        </div>
        </div>
        </div>
        </div>
        <div className="col-xs-12 pg-0">
        <small>Weka kiasi: XX,XXX/= , Na namba ya siri kumalizia</small>
        </div>
        </div>
        </div>

        {/*END TIGO*/}

        {/*START AIRTEL*/}

        <header className="yellow mb-4" style={{paddingLeft: "15px"}}>
        JINSI YA KUWEKA PESA <img style={{width: "100px"}} src={Index} alt="Logo"/>
        </header>

        <div className="row section-block">
        <div className="col-xs-6 col-sm-4 col-lg-3">
        <div className="circle-border text-center posa yellow counter-badge section-counter"></div>
        <div className="col-xs-12 secondary-bg mg-2 yellow pg-0 border-radius-2">
        <div className="col-xs-12 pg-3 border-radius-2">
        <div className="col-xs-12 white-background center-container pg-0">
        <div className="col-xs-12 centered-content pg-0">
        <h3 className="center-text h3 bold wordwarp">*150*60#</h3>
        </div>
        </div>
        </div>
        </div>
        <div className="col-xs-12 pg-0">
        <small>Bofya *150*60#</small>
        </div>
        </div>
        <div className="col-xs-6 col-sm-4 col-lg-3">
        <div className="circle-border text-center posa yellow counter-badge section-counter"></div>
        <div className="col-xs-12 secondary-bg mg-2 yellow pg-0 border-radius-2">
        <div className="col-xs-12 pg-3 border-radius-2">
        <div className="col-xs-12 white-background center-container pg-0">
        <div className="col-xs-12 pg-0 yellow centered-content">
        <ol className="">
        <li className="bold ">5. Lipa kwa Airtel Money</li>
        </ol>
        </div>
        </div>
        </div>
        </div>
        <div className="col-xs-12 pg-0">
        <small>Chagua 5 Lipa kwa Airtel Money</small>
        </div>
        </div>
        <div className="col-xs-6 col-sm-4 col-lg-3">
        <div className="circle-border text-center posa yellow counter-badge section-counter"></div>
        <div className="col-xs-12 secondary-bg mg-2 yellow pg-0 border-radius-2">
        <div className="col-xs-12 pg-3 border-radius-2">
        <div className="col-xs-12 white-background center-container pg-0">
        <div className="col-xs-12 centered-content pg-0">
        <h3 className="center-text h3 bold wordwarp">101010</h3>
        </div>
        </div>
        </div>
        </div>
        <div className="col-xs-12 pg-0">
        <small>Chagua 4 Weka namba ya kampuni/biashara: 101010</small>
        </div>
        </div>
        <div className="col-xs-6 col-sm-4 col-lg-3">
        <div className="circle-border text-center posa yellow counter-badge section-counter"></div>
        <div className="col-xs-12 secondary-bg mg-2 yellow pg-0 border-radius-2">
        <div className="col-xs-12 pg-3 border-radius-2">
        <div className="col-xs-12 white-background center-container pg-0">
        <div className="col-xs-12 centered-content pg-0">
        <h3 className="center-text h3 bold wordwarp">XXXXXXX</h3>
        </div>
        </div>
        </div>
        </div>
        <div className="col-xs-12 pg-0">
        <small>Weka Namba yako ya Account (phone number) au Receipt (kama unalipia bila account</small>
            </div>
            </div>
            <div className="col-xs-6 col-sm-4 col-lg-3">
            <div className="circle-border text-center posa yellow counter-badge section-counter"></div>
            <div className="col-xs-12 secondary-bg mg-2 yellow pg-0 border-radius-2">
            <div className="col-xs-12 pg-3 border-radius-2">
            <div className="col-xs-12 white-background center-container pg-0">
            <div className="col-xs-12 centered-content pg-0">
            <h3 className="center-text h3 bold wordwarp">XX,XXX/=</h3>
            </div>
            </div>
            </div>
            </div>
            <div className="col-xs-12 pg-0">
            <small>Weka kiasi: XX,XXX/= , Na namba ya siri kumalizia</small>
            </div>
            </div>
            </div>

            {/*END AIRTEL*/}

            {/*Start play by wallet*/}

            <header className="yellow pg-10 mb-4" style={{paddingLeft: "15px"}}>
            Kubashiri Kwa Wallet(Tovuti)
            </header>

            <div className="row section-block">
            <div className="col-xs-6 col-sm-4 col-lg-3">
            <div className="circle-border text-center posa yellow counter-badge section-counter"></div>
            <div className="col-xs-12 secondary-bg mg-2 yellow pg-0 border-radius-2">
            <div className="col-xs-12 pg-3 border-radius-2">
            <div className="col-xs-12 white-background center-container pg-0">
            <div className="col-xs-12 centered-content pg-0">
            <h3 className="center-text h3 bold wordwarp">www.bikosports.co.tz</h3>
            </div>
            </div>
            </div>
            </div>
            <div className="col-xs-12 pg-0">
            <small>Tembelea www.bikosports.co.tz kisha bofya ‘Mechi Kali’.</small>
            </div>
            </div>
            <div className="col-xs-6 col-sm-4 col-lg-3">
            <div className="circle-border text-center posa yellow counter-badge section-counter"></div>
            <div className="col-xs-12 secondary-bg mg-2 yellow pg-0 border-radius-2">
            <div className="col-xs-12 pg-3 border-radius-2">
            <div className="col-xs-12 white-background center-container pg-0">
            <div className="col-xs-12 pg-0 ovh" style={{height: "125px"}}>
            <img src={PickGame} alt="Screenshot"/>
            </div>
            </div>
            </div>
            </div>
            <div className="col-xs-12 pg-0">
            <small>Chagua mechi unayotaka kuwekea odd mfano Manchester United vs Arsenal kisha bonyeza namba husika</small>
            </div>
            </div>
            <div className="col-xs-6 col-sm-4 col-lg-3">
            <div className="circle-border text-center posa yellow counter-badge section-counter"></div>
            <div className="col-xs-12 secondary-bg mg-2 yellow pg-0 border-radius-2">
            <div className="col-xs-12 pg-3 border-radius-2">
            <div className="col-xs-12 white-background center-container pg-0">
            <div className="col-xs-12 pg-0 ovh" style={{height: "125px"}}>
            <img src={PickedGame} alt="Screenshot"/>
            </div>
            </div>
            </div>
            </div>
            <div className="col-xs-12 pg-0">
            <small>Chagua kiasi cha pesa utakachotaka kubashiri.</small>
            </div>
            </div>
            <div className="col-xs-6 col-sm-4 col-lg-3">
            <div className="circle-border text-center posa yellow counter-badge section-counter"></div>
            <div className="col-xs-12 secondary-bg mg-2 yellow pg-0 border-radius-2">
            <div className="col-xs-12 pg-3 border-radius-2">
            <div className="col-xs-12 white-background center-container pg-0">
            <div className="col-xs-12 pg-0 ovh" style={{height: "125px"}}>
            <img src={AccountSelect} alt="Screenshot"/>
            </div>
            </div>
            </div>
            </div>
            <div className="col-xs-12 pg-0">
            <small>Chagua mtandao wako wa simu utakaotumia kulipia bila kusahau namba yako ya simu kisha bofya "place bet"</small>
            </div>
            </div>
            <div className="col-xs-6 col-sm-4 col-lg-3">
            <div className="circle-border text-center posa yellow counter-badge section-counter"></div>
            <div className="col-xs-12 secondary-bg mg-2 yellow pg-0 border-radius-2">
            <div className="col-xs-12 pg-3 border-radius-2">
            <div className="col-xs-12 white-background center-container pg-0">
            <div className="col-xs-12 pg-0 ovh" style={{height: "125px"}}>
            <img src={SUccessfulBet} alt="Screenshot"/>
            </div>
            </div>
            </div>
            </div>
            <div className="col-xs-12 pg-0">
            <small>Tumia namba ya risiti kwenye tiketi ya bet kama kumbukumbu. Piga *150*00# (M-pesa) kulipia tiketi bet kutumia namba ya biashara ya Biko Sports 101010.</small>
            </div>
            </div>
            </div>

            {/*END WALLET PLAY*/}


            {/*END HOW TO PLAY*/}
            </div>
            <div className="col-md-12 py-2 px-1 w-100 text-white accordion-container"></div>
            </>
        )
}
export default HowToPlay
