import React from 'react';
import {
  Package,
  ShoppingBag,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  ArrowUpRight,
  Star,
  Zap,
  Activity,
} from 'lucide-react';

const Dashboard = () => {
  // Stats data - All zeros by default
  const stats = [
    {
      title: 'Total Revenue',
      value: '$0',
      change: '0%',
      subtext: 'from last month',
      isPositive: true,
      icon: DollarSign,
      bgGradient: 'from-blue-500 via-blue-600 to-indigo-600',
      lightBg: 'from-blue-50 via-indigo-50 to-blue-100',
      borderColor: 'border-blue-300',
      textColor: 'text-blue-700',
      accentColor: 'bg-blue-500',
    },
    {
      title: 'Total Orders',
      value: '0',
      change: '0%',
      subtext: 'from last month',
      isPositive: true,
      icon: ShoppingBag,
      bgGradient: 'from-emerald-500 via-green-600 to-teal-600',
      lightBg: 'from-emerald-50 via-green-50 to-emerald-100',
      borderColor: 'border-emerald-300',
      textColor: 'text-emerald-700',
      accentColor: 'bg-emerald-500',
    },
    {
      title: 'Total Products',
      value: '0',
      change: '0%',
      subtext: 'active products',
      isPositive: false,
      icon: Package,
      bgGradient: 'from-purple-500 via-violet-600 to-purple-600',
      lightBg: 'from-purple-50 via-violet-50 to-purple-100',
      borderColor: 'border-purple-300',
      textColor: 'text-purple-700',
      accentColor: 'bg-purple-500',
    },
    {
      title: 'Total Customers',
      value: '0',
      change: '0%',
      subtext: 'registered users',
      isPositive: true,
      icon: Users,
      bgGradient: 'from-orange-500 via-amber-600 to-orange-600',
      lightBg: 'from-orange-50 via-amber-50 to-orange-100',
      borderColor: 'border-orange-300',
      textColor: 'text-orange-700',
      accentColor: 'bg-orange-500',
    },
  ];

  // Order status data
  const orderStatus = [
    { label: 'Pending', count: 0, icon: Clock, gradient: 'from-yellow-400 to-amber-500', bg: 'from-yellow-50 to-amber-50', border: 'border-yellow-300', text: 'text-yellow-700' },
    { label: 'Processing', count: 0, icon: Truck, gradient: 'from-blue-400 to-cyan-500', bg: 'from-blue-50 to-cyan-50', border: 'border-blue-300', text: 'text-blue-700' },
    { label: 'Completed', count: 0, icon: CheckCircle, gradient: 'from-green-400 to-emerald-500', bg: 'from-green-50 to-emerald-50', border: 'border-green-300', text: 'text-green-700' },
    { label: 'Cancelled', count: 0, icon: XCircle, gradient: 'from-red-400 to-rose-500', bg: 'from-red-50 to-rose-50', border: 'border-red-300', text: 'text-red-700' },
  ];

  // Recent orders - Empty by default
  const recentOrders = [];

  // Low stock products - Empty by default
  const lowStockProducts = [];

  return (
    <div className="space-y-8">
      {/* Page Header with Animated Gradient */}
      <div className="relative overflow-hidden bg-gradient-to-r from-red-500 via-pink-500 to-red-600 rounded-2xl p-8 shadow-2xl">
        <div className="absolute inset-0 bg-black opacity-5"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
              <Activity className="text-white" size={24} strokeWidth={2.5} />
            </div>
            <h2 className="text-4xl font-black text-white tracking-tight">Dashboard</h2>
          </div>
          <p className="text-white/90 text-lg font-medium">Welcome back! Here's your store overview</p>
          <div className="mt-4 flex items-center gap-2">
            <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
              <span className="text-white text-sm font-semibold">Live Updates</span>
            </div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Stats Grid with Enhanced Design */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Animated Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.lightBg} opacity-60`}></div>
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.bgGradient} opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500`}></div>
              
              {/* Border Effect */}
              <div className={`absolute inset-0 border-2 ${stat.borderColor} rounded-2xl`}></div>
              
              <div className="relative p-6 z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 bg-gradient-to-br ${stat.bgGradient} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="text-white" size={28} strokeWidth={2.5} />
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${stat.isPositive ? 'bg-green-100' : 'bg-red-100'}`}>
                    {stat.isPositive ? <TrendingUp size={14} className="text-green-600" /> : <TrendingDown size={14} className="text-red-600" />}
                    <span className={`text-xs font-bold ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-600 text-sm font-semibold mb-2">{stat.title}</p>
                  <p className={`text-4xl font-black ${stat.textColor} mb-1`}>{stat.value}</p>
                  <p className="text-xs text-gray-500 font-medium">{stat.subtext}</p>
                </div>
                {/* Animated Bar */}
                <div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div className={`h-full ${stat.accentColor} rounded-full w-0 group-hover:w-full transition-all duration-1000`}></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Order Status Overview with Modern Cards */}
      <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-black text-gray-900 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg shadow-lg">
              <ShoppingCart size={24} className="text-white" strokeWidth={2.5} />
            </div>
            Order Status Overview
          </h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg font-semibold text-sm hover:shadow-lg transition-all duration-200">
            View All <ArrowUpRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {orderStatus.map((status, index) => {
            const Icon = status.icon;
            return (
              <div key={index} className="group relative overflow-hidden bg-white rounded-xl border-2 border-gray-200 hover:border-gray-300 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className={`absolute inset-0 bg-gradient-to-br ${status.bg} opacity-80`}></div>
                <div className="relative p-5 z-10">
                  <div className={`inline-flex p-3 bg-gradient-to-br ${status.gradient} rounded-xl shadow-lg mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="text-white" size={24} strokeWidth={2.5} />
                  </div>
                  <p className="text-sm font-bold text-gray-700 mb-1">{status.label}</p>
                  <p className={`text-3xl font-black ${status.text}`}>{status.count}</p>
                  <div className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${status.gradient} w-0 group-hover:w-full transition-all duration-700`}></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Orders & Low Stock Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-6 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg shadow-lg">
                <ShoppingBag size={20} className="text-white" strokeWidth={2.5} />
              </div>
              Recent Orders
            </h3>
            <Zap size={18} className="text-yellow-500" />
          </div>
          {recentOrders.length === 0 ? (
            <div className="text-center py-16 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 opacity-50 rounded-xl"></div>
              <div className="relative z-10">
                <div className="inline-flex p-4 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl mb-4 shadow-inner">
                  <ShoppingBag size={48} className="text-gray-400" strokeWidth={1.5} />
                </div>
                <p className="text-gray-700 font-bold text-lg mb-1">No orders yet</p>
                <p className="text-gray-500 text-sm">Orders will appear here once placed</p>
                <button className="mt-4 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold text-sm hover:shadow-lg transition-all duration-200">
                  Create Test Order
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200 hover:shadow-md transition-all">
                  <div>
                    <p className="font-black text-gray-900">{order.id}</p>
                    <p className="text-sm text-gray-600 font-medium">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-gray-900">{order.amount}</p>
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold ${order.statusColor}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Low Stock Products */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-6 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg shadow-lg animate-pulse">
                <AlertCircle size={20} className="text-white" strokeWidth={2.5} />
              </div>
              Low Stock Alert
            </h3>
            <Star size={18} className="text-amber-500" />
          </div>
          {lowStockProducts.length === 0 ? (
            <div className="text-center py-16 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-100 opacity-50 rounded-xl"></div>
              <div className="relative z-10">
                <div className="inline-flex p-4 bg-gradient-to-br from-green-200 to-emerald-300 rounded-2xl mb-4 shadow-inner">
                  <Package size={48} className="text-green-600" strokeWidth={1.5} />
                </div>
                <p className="text-gray-700 font-bold text-lg mb-1">All products in stock</p>
                <p className="text-gray-500 text-sm">Low stock items will appear here</p>
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold text-sm">
                  <CheckCircle size={16} />
                  <span>Everything looks good!</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {lowStockProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-br from-red-50 to-pink-100 rounded-xl border-2 border-red-200 hover:shadow-md transition-all">
                  <div>
                    <p className="font-black text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600 font-medium">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-red-600">{product.stock} left</p>
                    <button className="text-xs text-red-600 hover:text-red-800 font-bold hover:underline">Restock Now</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions with Enhanced Styling */}
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border-2 border-gray-100 p-8">
        <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
          <Zap className="text-yellow-500" size={28} strokeWidth={2.5} />
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="group relative overflow-hidden flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200 rounded-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Package className="text-white" size={28} strokeWidth={2.5} />
            </div>
            <span className="text-sm font-black text-blue-900 relative z-10">Add Product</span>
          </button>
          <button className="group relative overflow-hidden flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-200 rounded-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
              <ShoppingBag className="text-white" size={28} strokeWidth={2.5} />
            </div>
            <span className="text-sm font-black text-green-900 relative z-10">View Orders</span>
          </button>
          <button className="group relative overflow-hidden flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-purple-50 to-violet-100 border-2 border-purple-200 rounded-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-violet-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <div className="p-3 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Users className="text-white" size={28} strokeWidth={2.5} />
            </div>
            <span className="text-sm font-black text-purple-900 relative z-10">Customers</span>
          </button>
          <button className="group relative overflow-hidden flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-orange-50 to-amber-100 border-2 border-orange-200 rounded-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <div className="p-3 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="text-white" size={28} strokeWidth={2.5} />
            </div>
            <span className="text-sm font-black text-orange-900 relative z-10">Analytics</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;