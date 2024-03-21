import React from "react";
import Left, {Right} from "./carousels/jumbotron-carousels.js"
const Jumbotron = (props) => {

    return (
        <>
            <section id='jumbotron' className=" text-white text-cent">
                <div className="w-full hero-section py-">
                    <div className='container py7 z-50'>
                        <div className="hero-section-center-holder z-50">
                            <div className='w-full py- inline-block'>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className='py-2'>
                                            <Left />
                                        </div>
                                    </div>
                                    <div className="col-md-6 absolute top-0 right-0 p-0 h-100 jumbotron-right">
                                        <div className="">
                                            <Right />
                                        </div>
                                    </div>  
                                </div>    
                            </div>
                        </div>
                    </div>
                    <div className  ="hero-background-holder z-10"><img src="https://assets-global.website-files.com/65bd551ce19d3f8a825dfaef/65bd725e87e64441c8d2ba8d_BG%20Gradient.webp" loading="lazy" sizes="100vw" alt="" srcset="https://assets-global.website-files.com/65bd551ce19d3f8a825dfaef/65bd725e87e64441c8d2ba8d_BG%20Gradient-p-500.png 500w, https://assets-global.website-files.com/65bd551ce19d3f8a825dfaef/65bd725e87e64441c8d2ba8d_BG%20Gradient-p-800.png 800w, https://assets-global.website-files.com/65bd551ce19d3f8a825dfaef/65bd725e87e64441c8d2ba8d_BG%20Gradient-p-1080.png 1080w, https://assets-global.website-files.com/65bd551ce19d3f8a825dfaef/65bd725e87e64441c8d2ba8d_BG%20Gradient.webp 1462w" class="hero-background"/></div>
                </div>
            </section>
        </>
    )
}

export default React.memo(Jumbotron);