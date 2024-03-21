import React from "react";
import Heart from "../assets/img/heart.png";
import { Link } from "react-router-dom";



const Fields = (props) => {
    const timeLeft = (endDate) => {
        let dif = (new Date(endDate)) - Date.now();
        let days = Math.floor(dif  / (1000 * 60 * 60 * 24));
        let hrs = Math.floor((dif - (days * 1000 * 60 * 60 * 24)) /(1000 * 60 * 60));
        if (days > 0) {
            days = `${days} days`
        } else {
            days = ""
        }

        if (hrs > 0) {
            hrs = `${hrs} hrs`;
        } else {
            hrs = ""
        }
        return `${days} ${hrs}`
    }
    return (
        <section className="cause-area pb-5 md:pb-100">
            <div className="container">
                <div className="section-title text-center mt-4">
                    <h1>Featured <span className="primary-text-color">Field Cases</span></h1>
                    <img src={Heart} alt="" className="mx-auto"/>
                </div>

                <div className="row">
                    <div className="col-md-4 col-sm-6">
                        <div className="ht-single-cause mb-3">
                            <div className="ht-cause-img">
                                <a href="cause-details.html">
                                    <img src={require("../assets/img/fields/1.png")} className="w-full" alt=""/>
                                </a>
                            </div>
                            <div className="ht-cause-text">
                                <div className="progress-wrap">
                                    <div className="progress">
                                        <div className="progress-bar wow fadeInLeft" data-progress="60%" style={{width: '60%', visibility: "visible", animationDuration: "1.5s", animationDelay: "0.3s", animationName: "fadeInLeft"}} data-wow-duration="1.5s" data-wow-delay=".3s">
                                            <div className="text-top z-index-90">60%</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="ht-cause-info">
                                    <span className="ht-s-info">SME 600+</span>
                                    <span className="ht-s-info">Large 400+ </span>
                                </div>
                                <h3 className="text-center cause-title"><a href="cause-details.html">Web Systems Engineering</a></h3>
                                <div className="cause-desc">
                                    <p>
                                        As distinguished members of the web systems engineering community, we would like to guide you on how some cases of the web development represent your case. Ranging from high traffic, high security, compelx featured systems to simple business web systems, we illustrate cases that apply to your circumstance
                                    </p>
                                </div> 
                                <Link to={"/what-we-do#democracy-and-governance"} className="cause-read-more">Read more</Link>
                                <div className="cause-btn-time">
                                    <Link className='mt-3 md:mt-2 w-full md:w-auto btn rounded-md shadow-sm btn-primar bg-purple bg-primary text-white md:mt-3 px-2' to={`/fields/web-systems-development`}>Check out</Link>
                                    <span className="cause-time font-bold capitalize">{`1000+ Web systems`}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6">
                        <div className="ht-single-cause mb-3">
                            <div className="ht-cause-img">
                                <a href="cause-details.html">
                                    <img src={require("../assets/img/fields/2.png")} className="w-full" alt=""/>
                                </a>
                            </div>
                            <div className="ht-cause-text">
                                <div className="progress-wrap">
                                    <div className="progress">
                                        <div className="progress-bar wow fadeInLeft" data-progress="80%" style={{width: '80%', visibility: "visible", animationDuration: "1.5s", animationDelay: "0.3s", animationName: "fadeInLeft"}} data-wow-duration="1.5s" data-wow-delay=".3s">
                                            <span className="text-top">80%</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="ht-cause-info">
                                <span className="ht-s-info">SME 25+</span>
                                    <span className="ht-s-info">Large 5+</span>
                                </div>
                                <h3 className="text-center cause-title"><a href="cause-details.html">IOT and Embeded Systems</a></h3>
                                <div className="cause-desc">
                                    <p>
                                        IOT and embeded systems command a large stake in the industry 4 revolution. If you are in the industry by whichever means, then you are enroute to greatness. Our dedicated department in this area is very specific in addressing the issues one of which you could be particularly interested in. We have a variety of cases that probably apply to your case. We demonstrate to you how several cases were tackled to achieve the best of results with the respective clients.
                                    </p>
                                </div>
                                <Link to={"/what-we-do#democracy-and-governance"} className="cause-read-more">Read more</Link>
                                <div className="cause-btn-time">
                                    <Link className='mt-3 md:mt-2 w-full md:w-auto btn rounded-md shadow-sm btn-primar bg-purple bg-primary text-white md:mt-3 px-2' to={`/fields/iot-embeded-systems`}>Check out</Link>
                                    <span className="cause-time font-bold capitalize">{`30+ projects`}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6">
                        <div className="ht-single-cause mb-3">
                            <div className="ht-cause-img">
                                <a href="cause-details.html">
                                    <img src={require("../assets/img/fields/3.png")} className="w-full" alt=""/>
                                </a>
                            </div>
                            <div className="ht-cause-text">
                                <div className="progress-wrap">
                                    <div className="progress">
                                        <div className="progress-bar wow fadeInLeft" data-progress="60%" style={{width: '60%', visibility: "visible", animationDuration: "1.5s", animationDelay: "0.3s", animationName: "fadeInLeft"}} data-wow-duration="1.5s" data-wow-delay=".3s">
                                            <span className="text-top">60%</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="ht-cause-info">
                                <span className="ht-s-info">Raised: Over 3,000,000</span>
                                    <span className="ht-s-info">Target: 5,000,000</span>
                                </div>
                                <h3 className="text-center cause-title"><a href="cause-details.html">Mobile Development</a></h3>
                                <div className="cause-desc">
                                    <p>
                                        Though not always, web systems are inseparable from mobile systems. depending on the circumstance, a single system may require different clients including mobile as an app. The choice of the approach is very subjective. As distinguished members of the society in the industry, we have an assortment of cases with different setttings and approach. From these cases, you can classify your particular case.
                                    </p>
                                </div>
                                <Link to={"/what-we-do#democracy-and-governance"} className="cause-read-more">Read more</Link>
                                <div className="cause-btn-time">
                                    <Link className='mt-3 md:mt-2 w-full md:w-auto btn rounded-md shadow-sm btn-primar bg-purple bg-primary text-white md:mt-3 px-2' to={`/fields/mobile-systems`}>Check out</Link>
                                    <span className="cause-time font-bold capitalize">{`50+ mobile apps`}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default React.memo(Fields);