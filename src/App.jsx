import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Customer from "./Pages/Customer";
import Navbar from "./Pages/NavBar";
import OverdueMemberships from "./Pages/OverdueMemberships";
import OldMemberships from "./Pages/OldMemberships";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/Customer" element={<Customer />} />
          <Route path="/overduememberships" element={<OverdueMemberships />} />
          <Route path="/oldmemberships" element={<OldMemberships />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
