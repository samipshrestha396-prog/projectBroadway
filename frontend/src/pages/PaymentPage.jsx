import { useState } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";
import { Form, Col, Button } from "react-bootstrap";
import { savePaymentMethod } from "../slices/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
function PaymentPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { paymentMethod, shippingAddress } = useSelector((state) => state.cart);
  const [payment, setPayment] = useState(paymentMethod || "cod");

  useEffect(() => {
    if (
      !shippingAddress.address ||
      !shippingAddress.city ||
      !shippingAddress.phone ||
      !shippingAddress.country
    ) {  
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);
  const savePaymentMethodHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(payment));
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h3>Payment Method:</h3>
      <Form onSubmit={savePaymentMethodHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              className="my-2"
              type="radio"
              label="Cash on Delivery"
              id="cod"
              name="payment method"
              value="cod"
              checked={payment == "cod"}
              onChange={(e) => setPayment(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Check
              className="my-2"
              type="radio"
              label="E-Sewa"
              id="esewa"
              name="payment method"
              value="esewa"
              checked={payment == "esewa"}
              onChange={(e) => setPayment(e.target.value)}
            />
          </Col>
          <Button type="submit" variant="success" className="my-2">
            Proceed
          </Button>
        </Form.Group>
      </Form>
    </FormContainer>
  );
}

export default PaymentPage;
