import React, {useState} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import banner0 from '../../assets/img/banner/banner-0-1000x250.png'
import banner1 from '../../assets/img/banner/banner-1-1000x250.png'
import banner2 from '../../assets/img/banner/banner2-1000x250x.png'
import banner3 from '../../assets/img/banner/banner-3-1000x250.png'
import banner5 from '../../assets/img/banner/banner-4-1000x250c.png'

const banners = [
    banner0, banner1, banner2, banner3, banner5
]

const CarouselLoader = (props) => {
    const navigate = useNavigate();

    const [imageLoaded, setImageLoaded] = useState(false);
    const onImageLoaded = () => {
        setImageLoaded(true);
    }

/*    const bannerImageClicked = (index) => {
        //banner 0 redirect to biko sms
        if(index === 0){
            let url = "https://www.biko.co.tz/sw";
            window.location.replace('https://www.biko.co.tz/sw');
        } else if (index === 1 || index == 2) {
            navigate("/jackpot");
        }
    }
*/
    return (
        <Carousel>
            {banners.map((banner, idx) => (
                <Carousel.Item key={idx} >
                    <LazyLoadImage
                        className="d-block"
                        style={{display: imageLoaded ? 'block' : 'none', height:"250px"}}
                        src={banner}
                        onLoad={onImageLoaded}
                        alt="Bikosports"
                        effects="blur"
                    />
                </Carousel.Item>
            ))
            }

        </Carousel>
    )
}
export default CarouselLoader;
