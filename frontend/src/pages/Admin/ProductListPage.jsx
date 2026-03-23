import { Row, Col, Button, Container, Table } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../slices/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { toast } from "react-toastify";

function ProductListPage() {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const [createProduct, {}] = useCreateProductMutation();
  const [deleteProduct, {}] = useDeleteProductMutation();

  const createProductHandler = async () => {
    try {
      
        const res = await createProduct().unwrap();
        toast.success(res.message);
      
    } catch (err) {
      toast.error(err?.data?.error);
    }
  };

  const deleteProductHandler = async (productId) => {
    try {
      if (window.confirm("Are you sure you want to delete?")){
      const res = await deleteProduct({ productId }).unwrap();
      toast.success(res.message);}
    } catch (err) {
      toast.error(err?.data?.error);
    }
  };
  return (
    <Container>
      <Row>
        <Col>
          <h3>Products</h3>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm fw-bold" onClick={createProductHandler}>
            <FaPlus style={{ marginTop: "-3px" }} /> Create Product
          </Button>
        </Col>

        <Table responsive striped hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>BRAND</th>
              <th>CATEGORY</th>
              <th>PRICE</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td>
                  <Loader />
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td>
                  <Message>{error.data.error}</Message>
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.brand}</td>
                  <td>{product.category}</td>
                  <td>${product.price}</td>
                  <td>
                    <Button className="btn btn-sm btn-success mx-2">
                      <FaEdit />
                    </Button>
                    <Button
                      className="btn btn-sm btn-danger mx-2"
                      onClick={() => deleteProductHandler(product._id)}
                    >
                      <FaTrash></FaTrash>
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}
export default ProductListPage;
