import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Customer from "./Pages/Customer";
import Navbar from "./Pages/NavBar";
import OverdueMemberships from "./Pages/OverdueMemberships";
import AllMemberships from "./Pages/OldMemberships";
import LoginPage from "./Pages/LoginPage";
import Report from "./Pages/Report";
import Footer from "./Pages/Footer";
import Indexhtml from "./Website/Indexhtml.jsx";
import Galleryhtml from "./Website/Galleryhtml.jsx";
import Contacthtml from "./Website/Contacthtml.jsx";
import "./App.css";
import Error from "./Pages/Error.jsx";

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

  const ProtectedRoute = ({ children }) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    return isLoggedIn ? children : <Navigate to="/login" replace />;
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Unauthenticated Routes */}
          <Route path="/" element={<Indexhtml />} />
          <Route path="/gallery" element={<Galleryhtml />} />
          <Route path="/contact" element={<Contacthtml />} />

          {/* Protected Routes */}
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/customer"
            element={
              <ProtectedRoute>
                <AuthenticatedLayout>
                  <Customer />
                </AuthenticatedLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/overduememberships"
            element={
              <ProtectedRoute>
                <AuthenticatedLayout>
                  <OverdueMemberships />
                </AuthenticatedLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/allmemberships"
            element={
              <ProtectedRoute>
                <AuthenticatedLayout>
                  <AllMemberships />
                </AuthenticatedLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/report"
            element={
              <ProtectedRoute>
                <AuthenticatedLayout>
                  <Report />
                </AuthenticatedLayout>
              </ProtectedRoute>
            }
          />

          {/* Catch-all Route for Error Page */}
          <Route path="/*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
