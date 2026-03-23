import FormContainer from "../../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import {
  useGetProductsByIdQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../slices/productApiSlice";
import { useParams } from "react-router";
import { Link } from "react-router";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
function ProductEditPage() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);
  const [count_in_stock, setCount_in_stock] = useState(1);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const { data: product } = useGetProductsByIdQuery(id);
  const [updateProduct, {}] = useUpdateProductMutation();
  const [uploadProductImage, { isLoading }] = useUploadProductImageMutation();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setBrand(product.brand);
      setPrice(product.price);
      setCategory(product.category);
      setDescription(product.description);
      setCount_in_stock(product.count_in_stock);
    }
  }, [product]);
  const updateProductHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProduct({
        name,
        brand,
        price,
        category,
        count_in_stock,
        image,
        description,
        _id: product._id,
      }).unwrap();
      toast.success(res.message);
    } catch (err) {
      toast.error(err?.data?.error);
    }
  };

  const uploadImageHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      setImage(res.image);
      toast.success(res.message);
    } catch (err) {
      toast.error(err?.data?.error);
    }
  };
  return (
    <>
      <Button as={Link} to="/admin/products" className="btn btn-light ms-4">
        Back
      </Button>
      <FormContainer>
        <h3>Edit Product Details</h3>
        <Form className="my-2" onSubmit={updateProductHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <Form.Control
              type="file"
              onChange={uploadImageHandler}
              disabled={isLoading}
            />
            {isLoading && <Loader height="20px" width="20px"/>}
          </Form.Group>
          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="stock">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              value={count_in_stock}
              onChange={(e) => setCount_in_stock(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write something about product"
            />
          </Form.Group>

          <Button type="submit" className="btn my-2">
            Edit & Save
          </Button>
        </Form>
      </FormContainer>
    </>
  );
}
export default ProductEditPage;
