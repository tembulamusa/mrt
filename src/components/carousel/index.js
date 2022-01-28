import React, {useState} from 'react';
import banner1 from "../../assets/img/banner/banner001.jpeg";
import banner2 from "../../assets/img/banner/win-bonus.jpg";
import banner3 from "../../assets/img/banner/banner002.png";
import banner4 from "../../assets/img/banner/boobsafi.jpg";
import banner5 from  "../../assets//img/banner/lottery-02.jpg";
import banner6 from "../../assets/img/banner/banner003.jpg";
import banner7 from "../../assets/img/banner/phase_1_09.jpg";
import Carousel from 'react-bootstrap/Carousel';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const CarouselLoader = (props) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const onImageLoaded = () => {
        console.log("on image loaded");
        setImageLoaded(true);
    }

    return (
        <Carousel>
         { [banner1].map((banner, idx) => (
              <Carousel.Item key={idx}>
                <img
                  className="d-block w-100"
                  style={{display: imageLoaded? 'block': 'none'}}
                  src={banner}
                  onLoad={onImageLoaded}
                  alt="Batnare"
                />
               { !imageLoaded && (
                   <div className="react-loading">
                       <Skeleton height={152}/>
                  </div>) 
               }
              </Carousel.Item>
           ))
         }

        </Carousel>
    )
}
export default CarouselLoader;
