import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ZimanyHome } from "./pages/MainPage";
import { HostAccommodation } from "./pages/HostAccomodationPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import AddPropertyPage from "./pages/AddPropertyPage";
import DetailPropertyPage from "./pages/DetailPropertyPage";
import ChatPage from "./pages/ChatPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { FavoritesPage } from "./pages/FavoritesPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ZimanyHome />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* protected  route */}
        <Route element={<ProtectedRoute />}>
          {/* Add other routes as needed */}
          <Route path="/accommodations" element={<HostAccommodation />} />
          <Route path="/earnings" element={<div>Earnings Page</div>} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/addproperty" element={<AddPropertyPage isOpen={false} onClose={function (): void {
            throw new Error("Function not implemented.");
          } } />} />
          <Route path="/property-detail" element={<DetailPropertyPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
