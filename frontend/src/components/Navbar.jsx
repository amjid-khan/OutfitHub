import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">
        ShoeStore
      </Link>
      <div className="space-x-4">
        <Link to="/" className="hover:text-blue-500">Home</Link>
        <Link to="/cart" className="hover:text-blue-500">Cart</Link>
        <Link to="/admin" className="hover:text-blue-500">Admin</Link>
      </div>
    </nav>
  );
};

export default Navbar;
