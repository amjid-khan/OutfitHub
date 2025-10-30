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
  TrendingUp,
  Clock,
  DollarSign,
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
      badgeColor: "bg-red-500",
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
      badgeColor: "bg-blue-500",
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
    <aside className="w-64 bg-gradient-to-b from-gray-50 to-white shadow-2xl border-r border-gray-200 min-h-screen sticky top-0 flex flex-col">
      {/* Admin Header */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500 opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-red-600 opacity-10 rounded-full blur-2xl"></div>
        
        <div className="flex items-center gap-3 relative z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-red-400 rounded-xl blur-md opacity-50 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-red-500 to-red-600 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-200">
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
      <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 py-2 mb-2 flex items-center gap-2">
          <div className="w-1 h-3 bg-gradient-to-b from-red-500 to-red-600 rounded-full"></div>
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
              className={`group relative flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-300 ${
                active
                  ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-200 scale-105"
                  : "text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-red-50 hover:text-red-600 hover:scale-102"
              }`}
            >
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full shadow-lg"></div>
              )}
              
              <div className="flex items-center gap-3 flex-1">
                <div className={`${
                  active 
                    ? "bg-white/20 p-1.5 rounded-lg" 
                    : "group-hover:bg-red-50 p-1.5 rounded-lg transition-all"
                }`}>
                  <Icon
                    size={18}
                    className={`${
                      active ? "text-white" : "text-gray-500 group-hover:text-red-600"
                    } transition-colors`}
                    strokeWidth={2}
                  />
                </div>
                <span className="font-semibold text-sm">{item.label}</span>
              </div>

              {item.badge && (
                <span className={`${item.badgeColor} text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-lg animate-pulse`}>
                  {item.badge}
                </span>
              )}

              <ChevronRight
                size={14}
                className={`${
                  active ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                } transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 ml-2`}
              />
            </Link>
          );
        })}
      </nav>

      {/* Quick Stats */}
      <div className="p-4 border-t border-gray-200 bg-gradient-to-b from-white to-gray-50">
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 py-2 mb-3 flex items-center gap-2">
          <div className="w-1 h-3 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
          Quick Stats
        </div>
        <div className="space-y-3 px-3">
          <div className="group bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl p-3 border border-blue-200 hover:border-blue-300 transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-105 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-blue-300 opacity-20 rounded-full blur-2xl group-hover:opacity-30 transition-opacity"></div>
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-blue-600" strokeWidth={2.5} />
                <span className="text-xs text-blue-600 font-semibold">Total Products</span>
              </div>
              <span className="text-lg font-black text-blue-700">248</span>
            </div>
            <div className="flex items-center gap-1 mt-1 relative z-10">
              <TrendingUp className="w-3 h-3 text-blue-500" />
              <span className="text-xs text-blue-500">+12% this month</span>
            </div>
          </div>

          <div className="group bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-xl p-3 border border-green-200 hover:border-green-300 transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-105 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-green-300 opacity-20 rounded-full blur-2xl group-hover:opacity-30 transition-opacity"></div>
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-green-600" strokeWidth={2.5} />
                <span className="text-xs text-green-600 font-semibold">Pending Orders</span>
              </div>
              <span className="text-lg font-black text-green-700">12</span>
            </div>
            <div className="flex items-center gap-1 mt-1 relative z-10">
              <span className="text-xs text-green-500">Requires attention</span>
            </div>
          </div>

          <div className="group bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-xl p-3 border border-purple-200 hover:border-purple-300 transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-105 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-purple-300 opacity-20 rounded-full blur-2xl group-hover:opacity-30 transition-opacity"></div>
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-600" strokeWidth={2.5} />
                <span className="text-xs text-purple-600 font-semibold">Total Customers</span>
              </div>
              <span className="text-lg font-black text-purple-700">1.2K</span>
            </div>
            <div className="flex items-center gap-1 mt-1 relative z-10">
              <TrendingUp className="w-3 h-3 text-purple-500" />
              <span className="text-xs text-purple-500">+8% this week</span>
            </div>
          </div>

          <div className="group bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 rounded-xl p-3 border border-orange-200 hover:border-orange-300 transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-105 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-orange-300 opacity-20 rounded-full blur-2xl group-hover:opacity-30 transition-opacity"></div>
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-orange-600" strokeWidth={2.5} />
                <span className="text-xs text-orange-600 font-semibold">Revenue Today</span>
              </div>
              <span className="text-lg font-black text-orange-700">$4.2K</span>
            </div>
            <div className="flex items-center gap-1 mt-1 relative z-10">
              <TrendingUp className="w-3 h-3 text-orange-500" />
              <span className="text-xs text-orange-500">+23% vs yesterday</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;