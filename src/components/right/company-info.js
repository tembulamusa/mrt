import React from 'react';
import RightBanner from '../../assets/img/Virtual-side-Banner.png'

const CompanyInfo = (props) => {

    return (
        <div className="qv rc alu show-on-affix">
            <div className="qv rc alu paybill block-shadow bottom-std-margin-spacing pb- pt-" style={{margin:"5px"}}>
                <div className="">
                    <div className="">
                        <div className="col-sm-12 h-30">
                         <div className="company-info ">
                            <h4 className="info-guide">Company Number</h4>
                            <h3 className="contact">101010</h3>
                         </div>
                        </div>
                        <div className="col-sm-12 h-30 " style={{
                            
                        }}>
                            <div className="company-info secondary-red-bg">
                              <h4 className="info-guide">Need Help!? Customer Care</h4>
                              <h3 className="contact">022 222 0100 </h3>
                            </div>
                        </div>
                        <div className="col-sm-12">
        { /**  <img src={RightBanner} alt="" className='w-100'/> **/ }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default CompanyInfo;
