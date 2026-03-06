import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router";

function LayoutPage() {
  return (
    <>
      <Header />
      <main className="my-2">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
export default LayoutPage;
