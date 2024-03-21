import React from 'react';
import { MDBCarousel, MDBCarouselItem, MDBCarouselCaption } from 'mdb-react-ui-kit';
import Design from "../../../assets/img/slider/slider.png";



const RightCarousel = (props) => {

    return (
        <>
            <MDBCarousel showControls={false} interval={12000}>
                <MDBCarouselItem itemId={1}>
                    <h1>Some text/content is here</h1>
                </MDBCarouselItem>
                <MDBCarouselItem itemId={2}>
                    <div className='bg-white h-100 top-3 w-full'>
                        <h1 className='mt-3 text-2xl uppercase'>
                            Test heading
                        </h1>
                        <h1 className='text-3xl'>This is Form for action</h1>
                    </div>
                </MDBCarouselItem>
                <MDBCarouselItem> 
                    <img src={Design}/>
                </MDBCarouselItem>
            </MDBCarousel>
        </>
    )
}

export default React.memo(RightCarousel);