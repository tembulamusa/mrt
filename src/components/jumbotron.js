import React from "react";
import CardHolder from '../assets/svg/card-holder.svg';

const Jumbotron = (props) => {

    return (
        <>
            <section id='' className=" bg-red-600 text-white pt-7">
                <div className='container mt-7 pt-7 flex flex-row'>
                    <div className='w-50 pt-4'>
                        <div className='text-5xl py-3 font-bold'>Kenya’s Premier <br/>Sports Experience <br/>Website</div>
                        <div className=''>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et rhoncus purus, eget pretium lacus. Phasellus semper turpis est, tincidunt volutpat augue porttitor sit amet.</div>
                    </div>
                    <div id='image-section' className='w-50'>
                        <img src={CardHolder} />
                    </div>
                </div>
            </section>
        </>
    )
}

export default React.memo(Jumbotron);