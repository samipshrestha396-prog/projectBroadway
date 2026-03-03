import { Navbar, Nav, Container, } from "react-bootstrap";
import {NavLink} from "react-router";
import { FaUser, FaShoppingCart } from "react-icons/fa";


import logo from "../assets/react.svg";
function Header() {
  return (
    <header>
      <Navbar bg="secondary" expand="lg" variant="dark" collapseOnSelect>
        <Container>
          <Nav.Link as={NavLink} to="/">
          <Navbar.Brand>
            <img src={logo} alt="brand-logo" />
            PASAL
          </Navbar.Brand>
          </Nav.Link>
          <Navbar.Toggle aria-controls="nav-bar" />
          <Navbar.Collapse id="nav-bar">
            <Nav className="ms-auto ">
              <Nav.Link as={NavLink} to="/cart" className="d-flex align-items-center gap-1">
                <FaShoppingCart />
                Cart
              </Nav.Link  >
              <Nav.Link as={NavLink} to="/signin" className="d-flex align-items-center gap-1"> 
                <FaUser />{" "}
                Signin
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
export default Header;
