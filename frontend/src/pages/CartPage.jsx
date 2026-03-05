import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart,clearCart } from "../slices/cartSlice";

function CartPage() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const updateHandler = (item, qty) => {
    dispatch(addToCart({ ...item, qty }));
  };
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

const clearCartHandler=()=>{
    dispatch(clearCart())
}
  return (
    <>
      <Row className=" my-4 mx-1 shadow-lg bg-muted">
        <Col md={8}>
          <h2 className="text-center"> Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty.<Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush" className="shadow-lg pb-2">
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="p-3">
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={2} className="p-5">
                      <Link to={`/product/${item._id}`}>
                        <strong>{item.name}</strong>
                      </Link>
                    </Col>
                    <Col md={2} className="p-5">
                      <strong> ${item.price}</strong>
                    </Col>
                    <Col md={2} className="p-5">
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) => updateHandler(item, e.target.value)}
                      >
                        {[...Array(item.count_in_stock).keys()].map((x) => (
                          <option key={x + 1}>{x + 1}</option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col className="p-5">
                      <Button
                        variant="light"
                        onClick={() => removeFromCartHandler(item._id)}
                      >
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
              <ListGroup.Item>
                 <Button variant="danger" className="my-2" onClick={()=> clearCartHandler()}>Clear Cart</Button>
              </ListGroup.Item>
            </ListGroup>
          )}
        </Col>
       

        <Col md={4}>
          <Card sm={4} style={{width:"20rem",position:"sticky",top:"0px"}} className="shadow-lg my-5 m-auto">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h5>
                  Total Items:{" "}
                  {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}
                </h5>
              </ListGroup.Item>

              <ListGroup.Item >
                <h6>
                  Total Price: $
                  {cartItems
                    .reduce((acc, item) => acc + item.price * item.qty, 0)
                    .toFixed(2)}
                </h6>
              </ListGroup.Item>
            </ListGroup>

            <ListGroup.Item>
              <Button variant="success" size="sm" disabled={cartItems.length == 0} style={{width:"20rem"}}>
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export { CartPage };
