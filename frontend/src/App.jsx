// App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/user/Home";
import Dashboard from "./pages/admin/Dashboard";
import Men from "./pages/user/Men";
import NewArrival from "./pages/user/NewArrival";
import Women from "./pages/user/Women";
import Kids from "./pages/user/Kids";
import Sale from "./pages/user/Sale";
import Wishlist from "./pages/user/Wishlist";
import Cart from "./pages/user/Cart";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="/men" element={<Men/>} />
          <Route path="/products" element={<NewArrival/>} />
          <Route path="/women" element={<Women/>} />
          <Route path="/kids" element={<Kids/>} />
          <Route path="/sale" element={<Sale/>} />
          <Route path="/wishlist" element={<Wishlist/>} />
          <Route path="/cart" element={<Cart/>} />
        </Route>
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute adminOnly>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;


