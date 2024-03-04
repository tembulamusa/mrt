import React from "react";
// import IndexCarousel from "./carousels";

const Jumbotron = (props) => {

    return (
        <>
            <section id='jumbotron' className=" text-white text-cent">
                <div className="w-full hero-section py-3">
                    <div className='container py-7 z-50'>
                        <div className="hero-section-center-holder z-50">
                            <div className='w-full py-6 inline-block'>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className='text-3xl md:text-5xl py-3 font-bold leading-9'>Dependable, Revolutionary Tech Systems Engineering</div>
                                        <div className='py-2'>
                                            <TextCarousel />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <ImageCarousel />
                                    </div>  
                                </div>    
                            </div>
                        </div>
                    </div>
                    <div class="hero-background-holder z-10"><img src="https://assets-global.website-files.com/65bd551ce19d3f8a825dfaef/65bd725e87e64441c8d2ba8d_BG%20Gradient.webp" loading="lazy" sizes="100vw" alt="" srcset="https://assets-global.website-files.com/65bd551ce19d3f8a825dfaef/65bd725e87e64441c8d2ba8d_BG%20Gradient-p-500.png 500w, https://assets-global.website-files.com/65bd551ce19d3f8a825dfaef/65bd725e87e64441c8d2ba8d_BG%20Gradient-p-800.png 800w, https://assets-global.website-files.com/65bd551ce19d3f8a825dfaef/65bd725e87e64441c8d2ba8d_BG%20Gradient-p-1080.png 1080w, https://assets-global.website-files.com/65bd551ce19d3f8a825dfaef/65bd725e87e64441c8d2ba8d_BG%20Gradient.webp 1462w" class="hero-background"/></div>
                </div>
            </section>
        </>
    )
}

export default React.memo(Jumbotron);