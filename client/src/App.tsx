import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ZimanyHome } from "./pages/MainPage";
import HomeAccomodation from "./pages/HostAccomodationPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ZimanyHome />} />
        {/* Add other routes as needed */}
        <Route path="/accommodations" element={<HomeAccomodation />} />
        <Route path="/earnings" element={<div>Earnings Page</div>} />
        <Route path="/favorites" element={<div>Favorites Page</div>} />
        <Route path="/chat" element={<div>Chat Page</div>} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
