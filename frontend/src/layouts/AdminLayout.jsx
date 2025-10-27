import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Admin Content */}
      <div className="flex-1 p-6">
        <header className="mb-4 border-b pb-2">
          <h1 className="text-2xl font-semibold text-gray-800">Admin Panel</h1>
        </header>

        {/* Outlet for nested admin pages */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
