import Header from "../../header/header";
import Footer from "../../footer/footer";
import React from "react";

const LiveScore = () => {
    return (
        <>
            <Header/>
            <div className="amt" style={{marginTop:"70px"}}>
                <div className="d-flex flex-row">
                    <div className="gz home" style={{width: '100%'}}>
                        <div className="homepage">
                            <div className="col-md-12 d-flex flex-column">
                                <div
                                    className='col-md-12 primary-bg p-4 text-center d-flex d-none flex-row justify-content-center'>
                                    <h5 className="inline-block align-self-center text-uppercase">
                                        Live Score
                                    </h5>
                                </div>
                                <div className="col">
                                    <div className={'row '}>
                                        <div className="col-md-12 d-flex flex-row shadow-lg p-3">
                                            <div className="col-md-12">
                                                <div className="d-flex flex-column">
                                                      <iframe src="https://ls.sir.sportradar.com/bikosportsinhouse"
                                                            height={'100%'} className={'vh-100 frame-spacing'}
                                                            title="Bikosports Livescore"></iframe>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>)
}

export default LiveScore
