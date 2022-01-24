import React from 'react';
import logo from '../../assets/img/new/logo.png';
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
                  <div className="thedate">
                    <span><i className="fa fa-clock-o" aria-hidden="true"></i></span>
                          <span id="date-part" className="nav navbar-nav ss">{ "12:01" }
                          </span>
                  </div>
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
