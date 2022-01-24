import React from 'react';

const Competitions = (props) => {

    return (

            <ul className="aoi nav base-bg">
            { props?.competitions && props?.competitions.map((competition, index)  => (
                <li className="li-white-h">
                    <a className="col-sm-12" href="/competition/{competition.id}&sp={competition.sport_id}">
                        <span className="col-sm-1" style="padding:0;"><img className="side-icon" src={competition.flag} /> </span>
                        <span className="col-sm-9 topl" >{competition.category} ' - ' {competition.competition_name}</span>
                    </a>
                </li>)
              )
            }
            </ul>
    )
}
export default Competitions;
