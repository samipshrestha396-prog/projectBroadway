import { Nav, Navbar, Container, Badge, NavDropdown } from "react-bootstrap";
import logo from "../assets/react.svg";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { NavLink } from "react-router";
import { useSelector } from "react-redux";
import { useLogoutMutation } from "../slices/userApiSlice";
import { useDispatch } from "react-redux";
import { clearCredentials } from "../slices/authSlice";
import { useNavigate } from "react-router";
import { Link } from "react-router";
function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [Logout, {}] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      dispatch(clearCredentials());
      const res = await Logout().unwrap();
      navigate("/signin");
      console.log(res);
    } catch (err) {
      console.log(err?.data?.message) || err?.error;
    }
  };
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
                <FaShoppingCart /> Cart{" "}
                {cartItems.length > 0 && (
                  <Badge bg="danger" pill>
                    {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}
                  </Badge>
                )}
              </Nav.Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name}>
                  <NavDropdown.Item as={Link} to="/profile">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={NavLink} to="/signin">
                  {" "}
                  <FaUser /> Signin
                </Nav.Link>
              )}
              {userInfo && userInfo.is_admin && (
                <NavDropdown title="Dashboard">
                  <NavDropdown.Item as={Link} to="/admin/orders">
                    Check Orders
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/products">
                   Add Product
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
export default Header;
