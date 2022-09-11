import React from 'react';
import RightBanner from '../../assets/img/Virtual-side-Banner.png'
import PayBill from '../../assets/img/PayBill.png'

const CompanyInfo = (props) => {

    return (
        <div className="qv rc alu show-on-affix">
            <div className="qv rc alu paybill block-shadow bottom-std-margin-spacing" style={{margin:"5px"}}>
                <div className="">
                    <div className="">
                        <span className="col-sm-4 h-50">
                         <img src={PayBill} alt=" " style={{width:"100%", marginBottom:"5px"}}/>
                        </span>
                        <span className="col-sm-8">
                            <img src={RightBanner} alt="" className='w-100'/>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default CompanyInfo;
