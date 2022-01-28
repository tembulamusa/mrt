import React from 'react';
import logo from '../../assets/img/logo.png';
import ProfileMenu from './profile-menu';
import HeaderLogin from './top-login';
import HeaderNav from './header-nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const Header = (props) => {

    return (
       <Container className="shrink-header" id="shrink-header">
            <Row className="ck pc os app-navbar top-nav">
                <div className=" col-sm-3">
                  <div>
                      <a className="e logo" href="/" title="Betnare">
                      <img src={logo} alt="Betnare" title="Betnare" />
                      </a>
                  </div>
                </div>
                <div className="col-sm-9" id="navbar-collapse-main">
                    { props?.user ?  <ProfileMenu /> : <HeaderLogin /> }
                </div>
            </Row>
            <Row className="second-nav ck pc os app-navbar ">
              <HeaderNav />
            </Row>
       </Container>
    )
}
export default Header;
