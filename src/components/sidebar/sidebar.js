import React, { useState, useEffect} from 'react';
import football from '../../assets/svg/football.svg'
import Competitions from './competitions';
import AllSportCompetitions from './all-sport-competition';
import useCategories from '../utils/categories';

const SideBar = (props) => {

    const getCategories = useCategories();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
      setCategories(getCategories());
      
    }, []);

    return (
    <div className="gn">
        <div className="qv rc aog alu web-element block-shadow bottom-std-margin-spacing">
            <header>
                <div className="header-holder">
                    <span className="col-sm-10">FOOTBAL</span>
                    <span className="col-sm-2 header-icon"><img height="14px" src={football} alt="" /></span>
                </div>
            </header>
            <Competitions />
        </div>
        <div className="web-element block-shadow bottom-std-margin-spacing">
            <header>
                <div className="header-holder">
                    <span className="col-sm-10">Other Sports (A-Z)</span>
                    <span className="col-sm-2 header-icon"><i className="icon-football fa fa-gamepad" aria-hidden="true"></i></span>
                </div>
            </header>
            <AllSportCompetitions categories={categories}/>
        </div>
    </div>
    )
}
export default SideBar;
