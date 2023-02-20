import React, {useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import banner1 from '../../assets/img/banner/banner-1-1000x3000.png'
import banner2 from '../../assets/img/banner/banner2-1000x3000x.png'
import banner3 from '../../assets/img/banner/banner-3-1000x3000.png'
import banner5 from '../../assets/img/banner/banner-4-1000x3000c.png'

const banners = [
    banner1, banner2, banner3, banner5
]

const CarouselLoader = (props) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const onImageLoaded = () => {
        setImageLoaded(true);
    }

    return (
        <Carousel>
            {banners.map((banner, idx) => (
                <Carousel.Item key={idx}>
                    <LazyLoadImage
                        className="d-block"
                        style={{display: imageLoaded ? 'block' : 'none', height:"300px"}}
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
