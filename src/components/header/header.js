import React, {useEffect, useCallback, useState, useContext, useRef, Suspense} from 'react';
import { Link} from "react-router-dom"
import Row from 'react-bootstrap/Row';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {Context} from '../../context/store';
import {getFromLocalStorage, setLocalStorage} from '../utils/local-storage';
import makeRequest from '../utils/fetch-request';
import 'react-lazy-load-image-component/src/effects/blur.css';
import logo from '../../assets/img/logo.png';
import {Navbar} from "react-bootstrap";
import ShareModal from "../sharemodal";
import MainHeader from './main-header';
import TeamHeader from './team-header';

const Header = (props) => {
    const [user, setUser] = useState(getFromLocalStorage("user"));
    const [state, dispatch] = useContext(Context);
    const {headertype, team} = props;
    
    const currentUser = getFromLocalStorage("user");
    const expand = "md";

    return (
        <section className='absolute w-100 left-0 right-0 text-white'>
            <div className='container'>
                {headertype == "main" ? <MainHeader /> : <TeamHeader /> }
            </div>
            
        </section>
    )
}
export default React.memo(Header);
