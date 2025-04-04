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
import Indexhtml from "./Website/Indexhtml.jsx";
import Galleryhtml from "./Website/Galleryhtml.jsx";
import Contacthtml from "./Website/Contacthtml.jsx";
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
          <Route path="/" element={<Indexhtml />} />
          <Route path="/gallery" element={<Galleryhtml />} />
          <Route path="/contact" element={<Contacthtml />} />
        </Routes>
        <Routes className="adminPannel">
          <Route path="/login" element={<LoginPage />} />
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
