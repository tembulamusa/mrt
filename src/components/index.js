import {useLocation, useParams, useSearchParams} from 'react-router-dom';
import {Context} from '../context/store';
import makeRequest from './utils/fetch-request';
import Header from './header/header.js'
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { GiGamepad } from "react-icons/gi";
import Events from './events/index.js';
import Shop from './shop/index.js';
import AppDownload from './download_app.js';
import News from './news.js';
import Subscribe from './subscribe.js';
import StartBlog from './start-blog.js';
import Footer from './footer/index.js';
import Jumbotron from './jumbotron.js';
import OurPromise from './our-promise.js';
import { useContext } from 'react';
import FeaturedEvents from './featured-events.js';



const Index = (props) => {
    const [state, dispatch] = useContext(Context);
    
    return (
        <div className='main w-100'>
            <Header headertype="main" />
            
            <Jumbotron />

            <OurPromise />

            <FeaturedEvents />
            
            <Events />
            
            <hr className='container'/>
            <section id='fkf-shop' className='bg-white'>
                <div className='container py-8'>
                    <Shop />
                </div>
            </section>

            <section>
                <AppDownload />
            </section>

            <section>
                <News />
            </section>
            
            <section className='py-7 text-white text-center start-blog' id='start-blog'>
                <StartBlog />
            </section>
            
            <section className='py-7 text-white text-center' id='subscribe'>
                <Subscribe />
                <Footer />
            </section>
           
        </div>
    )
}

export default Index;
