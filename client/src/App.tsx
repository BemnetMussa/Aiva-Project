import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ZimanyHome } from "./pages/MainPage";
import { HostAccommodation } from "./pages/HostAccomodationPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import AddPropertyPage from "./pages/AddPropertyPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ZimanyHome />} />
        {/* Add other routes as needed */}
        <Route path="/accommodations" element={<HostAccommodation />} />
        <Route path="/earnings" element={<div>Earnings Page</div>} />
        <Route path="/favorites" element={<div>Favorites Page</div>} />
        <Route path="/chat" element={<div>Chat Page</div>} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/addproperty" element={<AddPropertyPage />} />
      </Routes>
    </Router>
  );
};

export default App;
