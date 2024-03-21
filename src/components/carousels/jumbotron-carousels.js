import React from "react";
import RightCarousel from "./jumbotron-carousels/right-carousel";
import LeftCarousel from "./jumbotron-carousels/left-carousel";

const Left = (props) => {

    return (
        <>
            <LeftCarousel />
        </>
    )
}


export const Right = (props) => {
    return (
        <>
            <RightCarousel />
        </>
    )
}

export default React.memo(Left);