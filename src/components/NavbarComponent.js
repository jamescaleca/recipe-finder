import React from "react"
import { Link } from "react-router-dom"
import BeerIcon from "../assets/beer-icon.png"
import FoodIcon from "../assets/food.svg"
import Container from "react-bootstrap/Container"
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavbarBrand from "react-bootstrap/NavbarBrand";
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavbarComponent() {
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <NavbarBrand href="/">
          <img 
            id="food-icon"
            alt="FoodIcon" 
            src={FoodIcon} 
            style={{"width": "2rem"}}
          ></img>
        </NavbarBrand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent