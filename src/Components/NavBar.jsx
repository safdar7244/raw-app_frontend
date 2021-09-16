import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import NavItem from 'react-bootstrap/NavItem'
import { Link } from "react-router-dom";

function NavBar() {
 return (
  <div>
   <Navbar bg="dark" variant="dark" expand="lg">
  <Navbar.Brand>Raw App</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
     <NavItem eventkey={1} href="/">
       <Nav.Link as={Link} to="/" >Users</Nav.Link>
      </NavItem>
      
      <NavItem eventkey={2} href="/allcontent">
       <Nav.Link as={Link} to="/allcontent" >All Content</Nav.Link>
      </NavItem>
      
      <NavItem eventkey={3} href="/stats">
       <Nav.Link as={Link} to="/stats" >Stats</Nav.Link>
      </NavItem>
      
      
      <NavItem eventkey={4} href="/newusers">
       <Nav.Link as={Link} to="/newusers" >New Users</Nav.Link>
      </NavItem>

      <NavItem eventkey={5} href="/newvideos">
       <Nav.Link as={Link} to="/newvideos" >New Videos</Nav.Link>
      </NavItem>

      
      <NavItem eventkey={5} href="/flaggedcontent">
       <Nav.Link as={Link} to="/flagged" >Flagged1 Content</Nav.Link>
      </NavItem>
      
      

      
    </Nav>
   
  </Navbar.Collapse>
</Navbar>
  </div>
 )
}

export default NavBar;

