import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { saveShippingAddress } from "../slices/cartSlice";
import { useNavigate } from "react-router";

function ShippingPage() {
  const { shippingAddress  } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalcode, setPostalCode] = useState(shippingAddress.postalcode || "");
  const [country, setCountry] = useState(shippingAddress.country || "");
  const [phone, setPhone] = useState(shippingAddress.phone || "");
  const saveShippingAddressHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ address, city, postalcode, country, phone }),
    );
    navigate("/payment")
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h3>Shipping Details:</h3>
      <Form onSubmit={saveShippingAddressHandler}>
        <Form.Group className="my-2" controlId="address">
          <Form.Label>Address:</Form.Label>
          <Form.Control
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="my-2" controlId="city">
          <Form.Label>City:</Form.Label>
          <Form.Control
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="my-2" controlId="postalcode">
          <Form.Label> Postal Code:</Form.Label>

          <Form.Control
            type="text"
            value={postalcode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="my-2" controlId="country">
          <Form.Label>Country:</Form.Label>
          <Form.Control
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="my-2" controlId="phone">
          <Form.Label>Phone:</Form.Label>
          <Form.Control
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Group>
        <Button
          type="submit"
          className="btn btn-success btn-md"
          onClick={saveShippingAddressHandler}
        >
          Proceed to payment
        </Button>
      </Form>
    </FormContainer>
  );
}

export default ShippingPage;
