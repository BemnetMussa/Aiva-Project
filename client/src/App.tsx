import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ZimanyHome } from "./pages/MainPage";
import { HostAccommodation } from "./pages/HostAccomodationPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import AddPropertyPage from "./pages/AddPropertyPage";
import DetailPropertyPage from "./pages/DetailPropertyPage";
import ChatPage from "./pages/ChatPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ZimanyHome />} />
        {/* Add other routes as needed */}
        <Route path="/accommodations" element={<HostAccommodation />} />
        {/*1 */}
        <Route path="/earnings" element={<div>Earnings Page</div>} /> {/*2 */}
        <Route path="/favorites" element={<div>Favorites Page</div>} /> {/*3 */}
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/add-property" element={<AddPropertyPage />} />
        <Route path="/property-detail" element={<DetailPropertyPage />} />
      </Routes>
    </Router>
  );
};

export default App;
