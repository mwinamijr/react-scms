import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, Row, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import SearchBox from './SearchBox'

function Header() {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    return (
      <header>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
                <Nav className="ml-auto float-right">
                    <NavDropdown title={userInfo.first_name} id='username'>
                      <Link to='/profile'>
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </Link>

                      <NavDropdown.Item >Logout</NavDropdown.Item>

                    </NavDropdown>

                </Nav>
          </Container>
        </Navbar>
      </header>
    )
}

export default Header
