import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Customer from "./Pages/Customer";
import Navbar from "./Pages/NavBar";
import OverdueMemberships from "./Pages/OverdueMemberships";
import OldMemberships from "./Pages/OldMemberships";
import LoginPage from "./Pages/LoginPage";
import Report from "./Pages/Report";
import Footer from "./Pages/Footer";
import "./App.css";
export const Routing = () => {
  function AuthenticatedLayout({ children }) {
    return (
      <>
        <Navbar />
        {children}
        <Footer />
      </>
    );
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Unauthenticated Routes */}
          <Route path="/" element={<LoginPage />} />

          {/* Authenticated Routes */}
          <Route
            path="/Customer"
            element={
              <AuthenticatedLayout>
                <Customer />
              </AuthenticatedLayout>
            }
          />
          <Route
            path="/overduememberships"
            element={
              <AuthenticatedLayout>
                <OverdueMemberships />
              </AuthenticatedLayout>
            }
          />
          <Route
            path="/oldmemberships"
            element={
              <AuthenticatedLayout>
                <OldMemberships />
              </AuthenticatedLayout>
            }
          />
          <Route
            path="/Report"
            element={
              <AuthenticatedLayout>
                <Report />
              </AuthenticatedLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};
