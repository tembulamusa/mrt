import React from 'react';
import RightBanner from '../../assets/img/Virtual-side-Banner.png'

const CompanyInfo = (props) => {

    return (
        <div className="qv rc alu show-on-affix">
            <div className="qv rc alu paybill block-shadow bottom-std-margin-spacing" style={{margin:"5px"}}>
                <div className="">
                    <div className="">
                        <div className="col-sm-12 h-30">
                         <div className="primary-bg-dark op-8 company-info p-2">
                            <h4>Company Number</h4>
                            <h3>101010</h3>
                         </div>
                        </div>
                        <div className="col-sm-12 h-30 " style={{
                            lineHeight:"20px",
                            background: "#34B3BF",
                            margin: 0, 
                            padding: "10px 5px", 
                            color: "#fff", 
                            fontWeight: "bold",
                            fontSize:"24px"
                        }}>
                          <p style={{fontSize: "15px"}}>Customer Care</p>
                          <p>022 222 0100 </p>
                        </div>
                        <div className="col-sm-12">
                            <img src={RightBanner} alt="" className='w-100'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default CompanyInfo;
