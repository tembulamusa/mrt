import React, { usePrams, useEffect, useState} from 'react';
import {
  useParams,
} from "react-router-dom";
import downArrow from '../../assets/img/down-arrow.svg';

export const SportItem = (props) => {
    console.log("Reading in SportItem ", props);
    const {
        sport, 
        sport_id, 
        } = props;

    const {spid} = useParams('sp');
    const [activeClass, setActiveClass] = useState('');

    const handleMenuToggle = () => {
        if(activeClass === ''){
            setActiveClass("active");
        } else {
            setActiveClass('');
        }
    }

    useEffect(() => {
        if (sport_id == spid) {
            setActiveClass('active');
        }
    }, []);

    const default_img = 'default_sport';
    let sport_image = null;

    try { 
        sport_image = require(`../../assets/svg/${sport?.sport_name}.svg`);
    } catch(error){
        sport_image = require(`../../assets/svg/${default_img}.svg`);
    }
    
    return (
        <li className={`treeview ${activeClass}`} >
            <a href="#" onClick={handleMenuToggle}>
                <span style={{"padding":0}}>
                   <img  
                       className="side-icon" 
                       src={sport_image} 
                       /> </span>
                <span className="topl"> { sport.sport_name } </span>
                <img className="down-arrow pull-right" src={downArrow} />
            </a>
            <ul className="treeview-menu">
              {
                  sport?.categories && Object.entries(sport.categories).map(
                      ([category_id, category]) => (
                          <CategoryItem 
                              category={category} 
                              key={category_id} 
                              active_class={activeClass}
                              category_id={category_id} 
                               />
                      )
                  )
              }
            </ul>
        </li>
    )
}

export const CategoryItem = (props) => {
    const {category, category_id } = props;
    const {ctid} = useParams('id');
    const [activeClass, setActiveClass] = useState('');
    useEffect(() => {
        if(ctid == category_id){
            setActiveClass('menu-open')
        }
    }, [])
    const active = ctid == category_id ? 'active': '';
    return (
        <li className={`treeview ${active}`}>
           <a href="#">
                <img className="side-icon" src={category.flag}/>
                <span className="topl"> {category.category_name} </span>
            </a>
            <ul className={`treeview-menu second-child ${activeClass}`}>
                { 
                    category.competitions && 
                       Object.entries(category.competitions).map(
                        ([competition_id,competition]) => (
                            <CompetitionItem 
                                competition={competition} 
                                competition_id={competition_id} 
                                key={competition_id} />
                        )
                    )
                }
            </ul>
        </li>
    )
}

export const CompetitionItem = (props) => {
    const { competition, competition_id } = props;
    const {cmid} = useParams('cmid');
    const {spid} = useParams('sp');
    const active = cmid == competition_id ? 'selected': '';
    return (
        <li className={active}>
            <a href={`/competition?sp=${spid}&id=${competition.competition_id}`}>
              <span className="topl"> {competition.competition_name } </span>
              <span style={{float:"right"}}>{competition.games_count }</span>
            </a>
        </li>
    )
}

const AllSportCompetitions = (props) => {
    console.log("categories from sidebar", props?.categories);

    return (
        <ul className="sidebar-menu aoi nav base-bg">
            {
                props?.categories && 
                  Object.entries(props.categories).map(
                      ([sport_id, sport]) => ( 
                           <SportItem 
                              sport={sport} 
                              sport_id={sport_id} 
                              key={sport_id} /> 
                      )
                      
                  )
            }
        </ul>
    )
}
export default AllSportCompetitions;
