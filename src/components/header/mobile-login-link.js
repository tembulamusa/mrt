// import React, {useContext, useEffect, useCallback, useState, useRef} from "react";
import Row from 'react-bootstrap/Row';

const MobileLogin = (props) => {

    return (
    	<>
    	<div className="right-text reg-login" style={{padding: '20px'}}>

    	<a href="/login" className="bold white-text" style={{paddingRight: '20px', color:'#ffffff'}}>Login</a>
    	
    		<a className="cg login-button signup-btn btn" href="/signup">Register</a>
    	</div>
    	</>
	)
}

export default MobileLogin;
