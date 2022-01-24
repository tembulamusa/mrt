import React from 'react';
import banner1 from "../../assets/img/banner/win-bonus.jpg";
import banner2 from "../../assets/img/banner/banner002.png";
import banner3 from "../../assets/img/banner/banner001.jpeg";
import banner4 from "../../assets/img/banner/boobsafi.jpg";
import banner5 from  "../../assets//img/banner/lottery-02.jpg";
import banner6 from "../../assets/img/banner/banner003.jpg";
import banner7 from "../../assets/img/banner/phase_1_09.jpg";
import Carousel from 'react-bootstrap/Carousel';

const CarouselLoader = (props) => {
    return (
        <Carousel>
         { [banner1,banner2,banner3,banner4,banner5,banner6].map((banner, idx) => (
              <Carousel.Item key={idx}>
                <img
                  className="d-block w-100"
                  src={banner}
                  alt="Batnare"
                />
              </Carousel.Item>
           ))
         }

        </Carousel>
    )
}
export default CarouselLoader;
