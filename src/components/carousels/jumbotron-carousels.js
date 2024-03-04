import React from "react";

const TextCarousel = (props) => {

    return (
        <>
            <h1 className="text-4xl">Some Text Carousel</h1>
        </>
    )
}


export const ImageCarousel = (props) => {
    return (
        <>
            <h1 className="text-4xl">Image carousels</h1>
        </>
    )
}

export default React.memo(TextCarousel);