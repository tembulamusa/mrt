import React from "react";
import 'react-accessible-accordion/dist/fancy-example.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";
import DownloadLink from "react-download-link";
import mobileBanner from '../../../assets/img/mobile/demo.jpg'
import Row from 'react-bootstrap/Row';

const Header = React.lazy(() => import('../../header/header'));
const SideBar = React.lazy(() => import('../../sidebar/awesome/Sidebar'));
const Footer = React.lazy(() => import('../../footer/footer'));
const Right = React.lazy(() => import('../../right/index'));
const downloadAPKFile = React.lazy(() => import('../../../assets/bethipo.apk'));


const MobileApp = () => {

    const getDownloadFile = () => {
        return downloadAPKFile;
    }

    return (
        <>
            <Header/>
            <div className="amt">
                <div className="d-flex flex-row justify-content-between">
                    <div className="d-md-block d-none"><SideBar loadCompetitions/></div>
                    <div className="gz home" style={{width: '100%'}}>
                        <div className="homepage">
                            <div
                                className='col-md-12 primary-bg p-2 text-center d-flex flex-row justify-content-between sticky-top'>
                                <h4 className="inline-block">
                                    Bikosports APP
                                </h4>
                            </div>
                            <div className="col-md-12 mt-2 accordion-container text-start pad-hor-10 pad-vert-10">
                                <Row>
                                    <div className="col-sm-12 col-md-6">
                                    <p className="uppercase bold center-text">bikosports app provides better experience on mobile</p>
                                    <DownloadLink
                                        className="full-width bold btn-danger btn-lg text-white text-decoration-none btn btn-secondary btn-download secondary-red-bg btn-lg p-4 dd"
                                        label="Download App"
                                        filename="bikosports.apk"
                                        exportFile={() => getDownloadFile()}
                                    />
                                    </div>

                                    <div className="col-sm-12 col-md-6">
                                    </div>
                                </Row>
                            </div>
                        </div>
                    </div>
                    <Right/>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default MobileApp
