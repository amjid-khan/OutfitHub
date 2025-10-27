import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { LogOut, User } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Prevent going back
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Admin Content */}
      <div className="flex-1">
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Admin Panel</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-medium flex items-center gap-2">
              <User size={18} /> {user?.name}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </header>

        <div className="p-6">
          {/* Outlet for nested admin pages */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
