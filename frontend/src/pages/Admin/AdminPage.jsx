import { Outlet, Navigate } from "react-router";
import { useSelector } from "react-redux";

function AdminPage() {
  const { userInfo } = useSelector((state) => state.auth);

  return (userInfo && userInfo.is_admin ? (
    <Outlet />
  ) : (
    <Navigate to="/signim" />
  ));
}

export default AdminPage;
