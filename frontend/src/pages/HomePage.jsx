import axios from "axios";
import { useEffect, useState } from "react";
import Product from "../components/Product";
import { Row, Col } from "react-bootstrap";
import { useGetProductsQuery } from "../slices/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
function HomePage() {
  //................................. calling api usinng fetch.............................
  // useEffect(()=>{
  //     fetch("/api/products")
  //     .then(resp=>resp.json())
  //     .then(data=>console.log(data))
  //     .catch(err=>console.log(err.message))
  // },[])

  //............................CALLING API USING AXIOS.................

  // const [products, setProducts] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get("/api/products")
  //     .then((resp) => setProducts(resp.data))
  //     .catch((err) => console.log(err.message));
  // }, []);

  const { data:products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      <h2>Latest Products</h2>
      {isLoading ? (
        <Loader/>
      ) : error ? (
        <Message type="danger">{error?.data?.message || error?.error}</Message>
      ) : (
        <Row>
          { products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}
export default HomePage;
