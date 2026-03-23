import { BrowserRouter, Routes, Route } from "react-router";
import LayoutPage from "./pages/Layout";
import HomePage from "./pages/HomePage";
import { CartPage } from "./pages/CartPage";
import SigninPage from "./pages/SigninPage";
import ProductPage from "./pages/ProductPage";
import ShippingPage from "./pages/ShippingPage";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrder from "./pages/PlaceOrder";
import RegisterPage from "./pages/RegisterPage";
import { ToastContainer } from "react-toastify";
import OrderPage from "./pages/OrderPage";
import PrivatePage from "./pages/PrivatePage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/Admin/AdminPage";
import OrderListPage from "./pages/Admin/OrderListPage";
import ProductListPage  from "./pages/Admin/ProductListPage";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route path="" element={<HomePage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="signin" element={<SigninPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="" element={<PrivatePage />}>
            <Route path="shipping" element={<ShippingPage />} />
            <Route path="payment" element={<PaymentPage />} />
            <Route path="placeorder" element={<PlaceOrder />} />
            <Route path="order/:id" element={<OrderPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          <Route path="admin" element={<AdminPage />}>
            <Route path="orders" element={<OrderListPage />} />
            <Route path="products" element={<ProductListPage />} />
          </Route>

          <Route path="product/:id" element={<ProductPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
