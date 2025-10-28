import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  BarChart3,
  Settings,
  Tags,
  Truck,
  MessageSquare,
  FileText,
  ChevronRight,
  ShoppingCart,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      path: "/admin",
      icon: LayoutDashboard,
      label: "Dashboard",
      exact: true,
    },
    {
      path: "/admin/products",
      icon: Package,
      label: "Products",
    },
    {
      path: "/admin/orders",
      icon: ShoppingBag,
      label: "Orders",
    },
    {
      path: "/admin/customers",
      icon: Users,
      label: "Customers",
    },
    {
      path: "/admin/categories",
      icon: Tags,
      label: "Categories",
    },
    {
      path: "/admin/analytics",
      icon: BarChart3,
      label: "Analytics",
    },
    {
      path: "/admin/shipping",
      icon: Truck,
      label: "Shipping",
    },
    {
      path: "/admin/reviews",
      icon: MessageSquare,
      label: "Reviews",
    },
    {
      path: "/admin/reports",
      icon: FileText,
      label: "Reports",
    },
    {
      path: "/admin/settings",
      icon: Settings,
      label: "Settings",
    },
  ];

  return (
    <aside className="w-64 bg-white shadow-xl border-r border-gray-200 min-h-screen sticky top-0">
      {/* Admin Header */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="bg-gradient-to-br from-red-500 to-red-600 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg">
              <ShoppingCart className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <div>
            <h1 className="text-lg font-black text-white tracking-tight">
              SHOP<span className="text-red-400">MART</span>
            </h1>
            <p className="text-xs text-gray-300 tracking-wide">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-1">
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 py-2 mb-2">
          Main Menu
        </div>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = item.exact
            ? location.pathname === item.path
            : item.path !== "/admin" && location.pathname.startsWith(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`group flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 ${
                active
                  ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-200"
                  : "text-gray-700 hover:bg-gray-50 hover:text-red-600"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  size={18}
                  className={`${
                    active ? "text-white" : "text-gray-500 group-hover:text-red-600"
                  } transition-colors`}
                  strokeWidth={2}
                />
                <span className="font-semibold text-sm">{item.label}</span>
              </div>
              <ChevronRight
                size={14}
                className={`${
                  active ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                } transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0`}
              />
            </Link>
          );
        })}
      </nav>

      {/* Quick Stats */}
      <div className="p-4 mt-4 border-t border-gray-200">
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 py-2 mb-2">
          Quick Stats
        </div>
        <div className="space-y-3 px-3">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 border border-blue-200">
            <div className="flex items-center justify-between">
              <span className="text-xs text-blue-600 font-semibold">Total Products</span>
              <span className="text-lg font-black text-blue-700">248</span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 border border-green-200">
            <div className="flex items-center justify-between">
              <span className="text-xs text-green-600 font-semibold">Pending Orders</span>
              <span className="text-lg font-black text-green-700">12</span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3 border border-purple-200">
            <div className="flex items-center justify-between">
              <span className="text-xs text-purple-600 font-semibold">Total Customers</span>
              <span className="text-lg font-black text-purple-700">1.2K</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;