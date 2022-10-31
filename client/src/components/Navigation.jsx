import React from 'react'
import { Nav, Navbar, Container, Button, NavDropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLogoutUserMutation } from "../services/appApi";
import { LinkContainer } from "react-router-bootstrap";
import Logo from '../assets/logo.png'

//import {Link,useNavigate} from "react-router-dom"
const Navigation = () => {
  const user = useSelector((state) => state.user);
  const [logoutUser] = useLogoutUserMutation();
 // console.log(user)
 async function handleLogout(e) {
  e.preventDefault();
  await logoutUser(user);
  // redirect to home page
  window.location.replace("/");
}
 
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/">
      <Navbar.Brand >
      <img src={Logo} style={{ width: 70, height: 70 }} />
      </Navbar.Brand>
            
            </LinkContainer>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          <LinkContainer to="/">
            <Nav.Link >Home</Nav.Link>
            </LinkContainer>
            {!user && (
                            <LinkContainer to="/login">
                                <Nav.Link>Login</Nav.Link>
                            </LinkContainer>
                        )}
           
            <LinkContainer to="/chat">
            <Nav.Link >Chat</Nav.Link>
            </LinkContainer>
            {user && (
            <NavDropdown title={
              <>
             <img src={user.picture} style={{ width: 30, height: 30, marginRight: 10, objectFit: "cover", borderRadius: "50%" }} />
                                      {user.name}

              </>
            } id="basic-nav-dropdown">
              <NavDropdown.Item>
                <Button variant='info'>Profile</Button>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Button variant='primary'>Edit Profile</Button>
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                <Button variant='danger'>Delete Account</Button>
              </NavDropdown.Item>
              
              <NavDropdown.Item>
                <Button variant='danger' onClick={handleLogout}>Logout</Button>
              </NavDropdown.Item>
            </NavDropdown>
            )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation