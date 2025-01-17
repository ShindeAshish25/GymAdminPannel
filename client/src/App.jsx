import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Customer from "./Pages/Customer";
import Navbar from "./Pages/NavBar";
import OverdueMemberships from "./Pages/OverdueMemberships";
import OldMemberships from "./Pages/OldMemberships";
import "./App.css";
import LoginPage from "./Pages/LoginPage";
import Footer from "./Pages/Footer";

function AuthenticatedLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

function App() {
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
