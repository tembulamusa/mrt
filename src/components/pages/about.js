import React from "react";
const About = (props) => {

    return (
        <>
            <section className="page-header">
                <div className="container">
                    <h1>About Us</h1>
                </div>
            </section>

            <section className="py-3">
                <div className="">Some about us</div>
            </section>
        </>
    )
}

export default React.memo(About);