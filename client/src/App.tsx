import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ZimanyHome } from "./components/zimany/ZimanyHome";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ZimanyHome />} />
        {/* Add other routes as needed */}
        <Route path="/accommodations" element={<div>Accommodations Page</div>} />
        <Route path="/earnings" element={<div>Earnings Page</div>} />
        <Route path="/favorites" element={<div>Favorites Page</div>} />
        <Route path="/chat" element={<div>Chat Page</div>} />
      </Routes>
    </Router>
  );
};

export default App;