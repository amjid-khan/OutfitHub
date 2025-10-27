import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Admin Menu</h2>
      <nav className="flex flex-col space-y-2">
        <Link to="/admin" className="hover:bg-gray-100 px-2 py-1 rounded">Dashboard</Link>
        <Link to="/admin/products" className="hover:bg-gray-100 px-2 py-1 rounded">Products</Link>
        <Link to="/admin/orders" className="hover:bg-gray-100 px-2 py-1 rounded">Orders</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
