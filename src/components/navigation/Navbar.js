import React, { Component } from "react";
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';

class NavbarPage extends Component {
state = {
  isOpen: false
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

render() {
  return (
    <Router>
      <div>
      <Navbar collapseOnSelect expand="lg" bg="info" variant="dark">
          <Navbar.Brand href="/">HAYATUL</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/services">Services</Nav.Link>
            <Nav.Link href="/blog">Blog</Nav.Link>
            <NavDropdown title="Education" id="basic-nav-dropdown">
              <NavDropdown.Item href="/education/nursery">Nursery</NavDropdown.Item>
              <NavDropdown.Item href="/education/primary">Primary</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Secondary</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/health/progress">Health</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

      </div>
    </Router>
    );
  }
}

export default NavbarPage;