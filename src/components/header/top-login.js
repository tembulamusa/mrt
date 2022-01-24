import React from 'react'
import Row from 'react-bootstrap/Row';

const HeaderLogin = (props) => {
    return (
        <form action="/login/authenticate" className="ow og i web-element"  
            method="post" >
           <Row>
                <a className="col-sm-3" href="/signup" title="Join now">
                    <span className="sign-up btn primary-bg">Register
                        <span className="join-desc">Now</span>
                    </span>
                </a>
                <div className="col-sm-4">
                    <input type="text" name="mobile" className="form-control" 
                        data-action="grow" placeholder="+254........." />
                    <br/> 
                    <span className="sticky-hidden">
                        <label><input type="checkbox" name="remember" value="1" />Remember me</label>
                    </span>
                </div>
                <div className="col-sm-3">
                <input type="password" name="password" className="form-control" 
                    data-action="grow" placeholder="Password" />
                <br/>
                <input type="hidden" name="ref" value="{props.refURL}" />
                <a href="/reset/password" title="Reset password">
                    <span className="sticky-hidden">Forgot Password?</span>
                </a>
                </div>
                <div className="col-sm-2">
                    <button className="cg fp ">Login</button>
                </div>
           </Row>
        </form>
    )
}
export default HeaderLogin;
