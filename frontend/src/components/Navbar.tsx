import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logoutUser } from "../features/user/authThunk";

const Navbar = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      {/* Logo */}
      <div className="text-2xl font-bold text-green-900">
        <Link to="/">TrackNLoad</Link>
      </div>

      {/* Right side buttons */}
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            {/* Orders Button (only visible when logged in) */}
            <Link
              to="/get-order"
              className="border px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Orders
            </Link>

            <button
              onClick={handleLogout}
              className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-green-900 text-white px-4 py-2 rounded hover:bg-green-800 transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
