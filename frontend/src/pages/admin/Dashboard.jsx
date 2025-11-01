import React, { useState } from 'react';
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
  Eye,
  Target,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');

  // Stats data with mini chart data
  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,231',
      change: '+20.1%',
      subtext: 'from last month',
      isPositive: true,
      icon: DollarSign,
      chartData: [
        { value: 20 }, { value: 35 }, { value: 28 }, { value: 45 }, 
        { value: 38 }, { value: 52 }, { value: 48 }, { value: 65 }
      ],
      color: '#3b82f6',
      lightColor: '#dbeafe',
      bgColor: 'bg-blue-50/50',
    },
    {
      title: 'Total Orders',
      value: '2,845',
      change: '+12.5%',
      subtext: 'from last month',
      isPositive: true,
      icon: ShoppingBag,
      chartData: [
        { value: 30 }, { value: 40 }, { value: 35 }, { value: 50 }, 
        { value: 45 }, { value: 55 }, { value: 60 }, { value: 58 }
      ],
      color: '#10b981',
      lightColor: '#d1fae5',
      bgColor: 'bg-emerald-50/50',
    },
    {
      title: 'Total Products',
      value: '1,234',
      change: '+8.2%',
      subtext: 'active products',
      isPositive: true,
      icon: Package,
      chartData: [
        { value: 25 }, { value: 30 }, { value: 28 }, { value: 35 }, 
        { value: 40 }, { value: 38 }, { value: 45 }, { value: 42 }
      ],
      color: '#8b5cf6',
      lightColor: '#ede9fe',
      bgColor: 'bg-violet-50/50',
    },
    {
      title: 'Total Customers',
      value: '8,462',
      change: '+15.3%',
      subtext: 'registered users',
      isPositive: true,
      icon: Users,
      chartData: [
        { value: 35 }, { value: 40 }, { value: 45 }, { value: 48 }, 
        { value: 50 }, { value: 55 }, { value: 58 }, { value: 62 }
      ],
      color: '#f59e0b',
      lightColor: '#fef3c7',
      bgColor: 'bg-amber-50/50',
    },
  ];

  // Revenue data for chart
  const revenueData = [
    { name: 'Jan', revenue: 12000, orders: 450, customers: 280 },
    { name: 'Feb', revenue: 19000, orders: 680, customers: 420 },
    { name: 'Mar', revenue: 15000, orders: 590, customers: 350 },
    { name: 'Apr', revenue: 25000, orders: 820, customers: 580 },
    { name: 'May', revenue: 22000, orders: 750, customers: 520 },
    { name: 'Jun', revenue: 30000, orders: 980, customers: 680 },
    { name: 'Jul', revenue: 35000, orders: 1120, customers: 790 },
  ];

  // Sales by category
  const categoryData = [
    { name: 'Electronics', value: 35, color: '#3b82f6' },
    { name: 'Fashion', value: 25, color: '#ec4899' },
    { name: 'Home', value: 20, color: '#10b981' },
    { name: 'Sports', value: 12, color: '#f59e0b' },
    { name: 'Books', value: 8, color: '#8b5cf6' },
  ];

  // Top products data
  const topProducts = [
    { name: 'Wireless Headphones', sales: 1245, revenue: '$24,890', trend: '+12%', color: '#3b82f6' },
    { name: 'Smart Watch Pro', sales: 982, revenue: '$19,640', trend: '+8%', color: '#8b5cf6' },
    { name: 'Laptop Stand', sales: 856, revenue: '$8,560', trend: '+15%', color: '#10b981' },
    { name: 'USB-C Hub', sales: 742, revenue: '$7,420', trend: '+5%', color: '#f59e0b' },
    { name: 'Mechanical Keyboard', sales: 634, revenue: '$12,680', trend: '+10%', color: '#ec4899' },
  ];

  // Order status data
  const orderStatus = [
    { label: 'Pending', count: 145, icon: Clock, color: '#f59e0b', bgColor: 'bg-amber-50/50' },
    { label: 'Processing', count: 289, icon: Truck, color: '#3b82f6', bgColor: 'bg-blue-50/50' },
    { label: 'Completed', count: 2234, icon: CheckCircle, color: '#10b981', bgColor: 'bg-emerald-50/50' },
    { label: 'Cancelled', count: 177, icon: XCircle, color: '#ef4444', bgColor: 'bg-red-50/50' },
  ];

  // Recent orders
  const recentOrders = [
    { id: '#ORD-2401', customer: 'John Doe', amount: '$234.00', status: 'Completed', statusColor: 'bg-emerald-50 text-emerald-700 border border-emerald-200', time: '2 min ago' },
    { id: '#ORD-2402', customer: 'Jane Smith', amount: '$145.50', status: 'Processing', statusColor: 'bg-blue-50 text-blue-700 border border-blue-200', time: '15 min ago' },
    { id: '#ORD-2403', customer: 'Mike Johnson', amount: '$567.80', status: 'Pending', statusColor: 'bg-amber-50 text-amber-700 border border-amber-200', time: '1 hour ago' },
    { id: '#ORD-2404', customer: 'Sarah Wilson', amount: '$89.99', status: 'Completed', statusColor: 'bg-emerald-50 text-emerald-700 border border-emerald-200', time: '2 hours ago' },
  ];

  // Low stock products
  const lowStockProducts = [
    { name: 'iPhone 14 Pro', category: 'Electronics', stock: 5, sku: 'ELEC-001' },
    { name: 'Nike Air Max', category: 'Fashion', stock: 8, sku: 'FASH-102' },
    { name: 'Gaming Mouse', category: 'Electronics', stock: 3, sku: 'ELEC-045' },
  ];

  // Traffic sources
  const trafficData = [
    { source: 'Direct', visits: 4250, color: '#3b82f6' },
    { source: 'Social', visits: 3180, color: '#ec4899' },
    { source: 'Search', visits: 2890, color: '#10b981' },
    { source: 'Referral', visits: 1560, color: '#f59e0b' },
  ];

  return (
    <div className="space-y-6 bg-gray-50 p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Dashboard</h1>
          <p className="text-gray-500">Welcome back! Here's your store overview</p>
        </div>
        <div className="flex gap-2">
          {['24h', '7d', '30d', '1y'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                timeRange === range
                  ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                  : 'text-gray-600 hover:bg-white/50'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid with Mini Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`${stat.bgColor} border border-gray-200/50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 bg-white rounded-xl shadow-sm">
                  <Icon size={20} style={{ color: stat.color }} strokeWidth={2} />
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${stat.isPositive ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'}`}>
                  {stat.isPositive ? <ArrowUp size={12} className="text-emerald-600" /> : <ArrowDown size={12} className="text-red-600" />}
                  <span className={`text-xs font-semibold ${stat.isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 font-medium mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.subtext}</p>
              </div>

              {/* Mini Chart */}
              <div className="h-12 -mx-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stat.chartData}>
                    <defs>
                      <linearGradient id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={stat.color} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={stat.color} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke={stat.color}
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill={`url(#gradient-${index})`} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          );
        })}
      </div>

      {/* Revenue Chart */}
      <div className="bg-white border border-gray-200/50 rounded-2xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Revenue Overview</h3>
            <p className="text-sm text-gray-500">Track your revenue performance</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium border border-gray-200 hover:bg-gray-100">Revenue</button>
            <button className="px-4 py-2 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50">Orders</button>
            <button className="px-4 py-2 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50">Customers</button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="#9ca3af" 
              style={{ fontSize: '12px', fontWeight: '500' }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#9ca3af" 
              style={{ fontSize: '12px', fontWeight: '500' }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e5e7eb', 
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
              }} 
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#3b82f6" 
              strokeWidth={2.5}
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Order Status & Sales by Category */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order Status */}
        <div className="bg-white border border-gray-200/50 rounded-2xl p-8">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-1">Order Status</h3>
            <p className="text-sm text-gray-500">Current order distribution</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {orderStatus.map((status, index) => {
              const Icon = status.icon;
              return (
                <div key={index} className={`${status.bgColor} border border-gray-200/50 rounded-xl p-5 hover:shadow-md transition-all`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <Icon size={18} style={{ color: status.color }} strokeWidth={2} />
                    </div>
                    <p className="text-sm font-medium text-gray-700">{status.label}</p>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{status.count}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sales by Category */}
        <div className="bg-white border border-gray-200/50 rounded-2xl p-8">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-1">Sales by Category</h3>
            <p className="text-sm text-gray-500">Product category distribution</p>
          </div>
          <div className="flex items-center justify-center mb-4">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {categoryData.map((cat, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></div>
                <span className="text-sm font-medium text-gray-700">{cat.name}</span>
                <span className="text-xs text-gray-500 ml-auto font-semibold">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white border border-gray-200/50 rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Top Selling Products</h3>
            <p className="text-sm text-gray-500">Best performers this month</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-700 text-sm font-medium hover:bg-gray-50 rounded-lg border border-gray-200">
            View All <ArrowUpRight size={16} />
          </button>
        </div>
        <div className="space-y-3">
          {topProducts.map((product, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-gray-200/50 hover:shadow-sm transition-all">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${product.color}15` }}>
                  <Package size={20} style={{ color: product.color }} strokeWidth={2} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{product.name}</p>
                  <p className="text-xs text-gray-500">{product.sales} units sold</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">{product.revenue}</p>
                <span className="text-xs px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full font-medium border border-emerald-200">
                  {product.trend}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders & Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white border border-gray-200/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Recent Orders</h3>
              <p className="text-sm text-gray-500">Latest transactions</p>
            </div>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-gray-200/50">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{order.id}</p>
                  <p className="text-xs text-gray-600">{order.customer}</p>
                  <p className="text-xs text-gray-400 mt-1">{order.time}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900 mb-1">{order.amount}</p>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${order.statusColor}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Products */}
        <div className="bg-white border border-gray-200/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Low Stock Alert</h3>
              <p className="text-sm text-gray-500">Items need restocking</p>
            </div>
          </div>
          <div className="space-y-3">
            {lowStockProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-red-50/30 rounded-xl border border-red-200/50">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{product.name}</p>
                  <p className="text-xs text-gray-600">{product.category}</p>
                  <p className="text-xs text-gray-400 mt-1">SKU: {product.sku}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-red-600 mb-1">{product.stock} left</p>
                  <button className="text-xs text-red-600 hover:text-red-700 font-medium">Restock</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Traffic Sources */}
      <div className="bg-white border border-gray-200/50 rounded-2xl p-8">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-1">Traffic Sources</h3>
          <p className="text-sm text-gray-500">Where your visitors come from</p>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={trafficData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis 
              dataKey="source" 
              stroke="#9ca3af" 
              style={{ fontSize: '12px', fontWeight: '500' }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#9ca3af" 
              style={{ fontSize: '12px', fontWeight: '500' }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e5e7eb', 
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
              }} 
            />
            <Bar dataKey="visits" radius={[8, 8, 0, 0]} barSize={60}>
              {trafficData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-gray-200/50 rounded-2xl p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center gap-3 p-6 bg-blue-50/50 border border-blue-200/50 rounded-xl hover:shadow-md transition-all">
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <Package size={24} className="text-blue-600" strokeWidth={2} />
            </div>
            <span className="text-sm font-semibold text-gray-900">Add Product</span>
          </button>
          <button className="flex flex-col items-center gap-3 p-6 bg-emerald-50/50 border border-emerald-200/50 rounded-xl hover:shadow-md transition-all">
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <ShoppingBag size={24} className="text-emerald-600" strokeWidth={2} />
            </div>
            <span className="text-sm font-semibold text-gray-900">View Orders</span>
          </button>
          <button className="flex flex-col items-center gap-3 p-6 bg-violet-50/50 border border-violet-200/50 rounded-xl hover:shadow-md transition-all">
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <Users size={24} className="text-violet-600" strokeWidth={2} />
            </div>
            <span className="text-sm font-semibold text-gray-900">Customers</span>
          </button>
          <button className="flex flex-col items-center gap-3 p-6 bg-amber-50/50 border border-amber-200/50 rounded-xl hover:shadow-md transition-all">
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <TrendingUp size={24} className="text-amber-600" strokeWidth={2} />
            </div>
            <span className="text-sm font-semibold text-gray-900">Analytics</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;