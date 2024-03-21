import React from 'react';
import { MDBCarousel, MDBCarouselItem, MDBCarouselCaption } from 'mdb-react-ui-kit';
import Typewriter from '../../utils/typewriter-effect';



const LeftCarousel = (props) => {

    return (
        <>
            <MDBCarousel showControls={false} showIndicators={false} fade interval={8000}>
                <MDBCarouselItem itemId={1}>
                    <h1 className='text-6xl mb-2'>System Development</h1>
                    <div className='my-3 text-2xl uppercase'>We help you develop your Systems from any stage.</div>
                    <div className=''>It never matters where we pick it from. Delivery of the product is our Priority</div>
                </MDBCarouselItem>
                <MDBCarouselItem itemId={2}>
                    <h1 className='text-6xl'>To Businesses</h1>
                    <div className='my-3 text-2xl uppercase'>From simple, to Gigantic Systems: Web Systems, Mobile Apps, SMS Systems, Large systems, Medium Systems, Small Systems</div>
                    {/* <div>We Help your business to become better by providing our cutting edge solutions, to the best of your business's convenience</div> */}
                    {/* <div className=''>Example Systems include, but not limited to: Web Systems, Mobile Apps, SMS Systems, Large systems, Medium Systems, Small Systems</div> */}
                </MDBCarouselItem>
                <MDBCarouselItem itemId={2}>
                    <h1 className='text-4xl'>Integrations</h1>
                    <div className='my-3 text-2xl uppercase'>We help with SAAS integrations including Odoo, Microsoft, CMS, and many more</div>
                    {/* <div className=''>Example Systems include, but not limited to: Odoo, Microsoft, CMS, and many more.</div> */}

                </MDBCarouselItem>
                <MDBCarouselItem itemId={2}>
                    <h1 className='text-4xl'>To Tech Companies</h1>
                    <div className='my-3 text-2xl uppercase'>We Sub-Contract: <code className=''>You are Well Covered with A wide Range of Tech Stacks</code></div>
                    {/* <div>We have been around enough to understand that Sometimes, There could be a backlog. We take up the sub-contracts. We deal with varied Tech stacks, and varied tech activities, including managing, deployment, development and any phase of system development</div> */}
                </MDBCarouselItem>
            </MDBCarousel>

            <div className='mt-3'>
                <button className='btn rounded-md shadow-sm btn-primar bg-red-500 text-white mt-3 px-4 uppercase'>Free Cosultation</button>
            </div>
        </>
    )
}

export default React.memo(LeftCarousel);