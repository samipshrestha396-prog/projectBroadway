import { Nav, Navbar, Container, Badge } from "react-bootstrap";
import logo from "../assets/react.svg";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { NavLink } from "react-router";
import { useSelector } from "react-redux";
function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <header>
      <Navbar bg="success" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            <img src={logo} /> PASAL
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="nav-bar" />
          <Navbar.Collapse id="nav-bar">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/cart">
                {" "}
                <FaShoppingCart /> Cart {" "}
                {cartItems.length >0 && (
                  <Badge bg="danger" pill>
                    {cartItems.reduce((acc, item) => acc + Number(item.qty),0)}
                  </Badge>
                )}
              </Nav.Link>

              <Nav.Link as={NavLink} to="/signin">
                {" "}
                <FaUser /> Signin
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
export default Header;
