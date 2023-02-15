import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import SidebarMobile from "../sidebar/awesome/SidebarMobile";
import SideBar from "../sidebar/awesome/Sidebar";
import Navbar from 'react-bootstrap/Navbar';
import { FaBars, FaUserAlt } from "react-icons/fa";

function MobileToggleMkts() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <span className="d-lg-none d-md-none d-sm-block d-lg-none d-md-none">

      <Button variant="toggle-menu" onClick={handleShow}>
        <div><FaBars size={25} /></div>
      </Button>
        sports

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Games</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>

          <SidebarMobile/>



        </Offcanvas.Body>
      </Offcanvas>
    </span>
  );
}

export default MobileToggleMkts;