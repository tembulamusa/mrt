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
                    <SideBar loadCompetitions/>
                    <div className="gz home" style={{width: '100%'}}>
                        <div className="homepage">
                            <div
                                className='col-md-12 primary-bg p-4 text-center d-flex flex-row justify-content-between sticky-top'>
                                <h4 className="inline-block">
                                    Bikosports APP
                                </h4>
                                <DownloadLink
                                    className="btn btn-primary bold btn-danger btn-lg text-white text-decoration-none" 
                                    style={{width: "130px", height: "35px"}}
                                    label="Download App"
                                    filename="bikosports.apk"
                                    exportFile={() => getDownloadFile()}
                                />
                                
                            </div>
                            <div className="col-md-12 mt-2 accordion-container text-start pad-hor-10 pad-vert-10">
                                <Row>
                                    <div className="col-sm-12 col-md-6">
                                    <p>For the best experience with android phone download bikosports app from the link below</p>
                                    <DownloadLink
                                        className="btn btn-primary bold btn-danger btn-lg text-white text-decoration-none"
                                        label="Download App"
                                        filename="bikosports.apk"
                                        exportFile={() => getDownloadFile()}
                                    />
                                    <p>See picture next for details on how android app works.</p>
                                    </div>

                                    <div className="col-sm-12 col-md-6">
                                        <img src={mobileBanner} alt="mobile download"/>
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
