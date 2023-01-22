import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { FaBars } from "react-icons/fa";
import Dropdown from 'react-bootstrap/Dropdown';

function HeaderMenuToggle() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="top-menu-btn" id="dropdown-basic">
        <div><FaBars size={25} /></div>
        Menu
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default React.memo(HeaderMenuToggle);