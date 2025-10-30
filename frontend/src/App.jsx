import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify"; // 🔹 Import Toastify
import "react-toastify/dist/ReactToastify.css"; // 🔹 Import Toastify CSS

import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/user/Home";
import Dashboard from "./pages/admin/Dashboard";
import Men from "./pages/user/Men";
import Women from "./pages/user/Women";
import Kids from "./pages/user/Kids";
import Sale from "./pages/user/Sale";
import Wishlist from "./pages/user/Wishlist";
import Cart from "./pages/user/Cart";
import Products from "./pages/admin/components/Products";

function App() {
  return (
    <AuthProvider>
      <>
        {/* 🔹 Toastify Container — placed globally */}
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          theme="light"
        />

        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="/men" element={<Men />} />
            <Route path="/women" element={<Women />} />
            <Route path="/kids" element={<Kids />} />
            <Route path="/sale" element={<Sale />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />
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
            <Route path="products" element={<Products />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </>
    </AuthProvider>
  );
}

export default App;
