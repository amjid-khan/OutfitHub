// ===== Sidebar.jsx =====
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
      badge: "12",
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
      badge: "3",
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
    <aside className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen sticky top-0 flex flex-col">
      {/* Admin Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-red-500 to-red-600 w-10 h-10 rounded-xl flex items-center justify-center shadow-md">
            <ShoppingCart className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">
              SHOP<span className="text-red-500">MART</span>
            </h1>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = item.exact
            ? location.pathname === item.path
            : item.path !== "/admin" && location.pathname.startsWith(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`group relative flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
                active
                  ? "bg-red-50 text-red-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-red-500 rounded-r-full"></div>
              )}
              
              <div className="flex items-center gap-3 flex-1">
                <Icon
                  size={20}
                  className={`${
                    active ? "text-red-500" : "text-gray-400"
                  } transition-colors`}
                  strokeWidth={2}
                />
                <span className={`font-medium text-sm ${active ? "text-red-600" : ""}`}>
                  {item.label}
                </span>
              </div>

              {item.badge && (
                <span className="bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;