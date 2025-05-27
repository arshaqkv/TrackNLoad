import { Box, Car, LogOut, ShoppingBasket, User } from "lucide-react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

import { logoutUser } from "../../features/user/authThunk";
import toast from "react-hot-toast";
import { useAppDispatch } from "../../app/hooks";

const AdminDashboardPage = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const menuItems = [
    {
      icon: Car,
      label: "Truck Drivers",
      path: "/admin/truck-driver",
    },
    {
      icon: User,
      label: "Vendors",
      path: "/admin/vendor",
    },
    {
      icon: Box,
      label: "Products",
      path: "/admin/product",
    },
    {
      icon: ShoppingBasket,
      label: "Orders",
      path: "/admin/order",
    },

    {
      icon: LogOut,
      label: "Logout",
      path: null,
    },
  ];

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("Logged out successfully");
  };

  return (
    <div className="flex h-full min-h-screen shadow-md bg-gray-100">
      <aside className="w-72 bg-white shadow-md hidden md:block">
        <div className="p-4">
          <h1 className="text-3xl mb-2 font-bold text-center">TrackNLoad</h1>
          <p className="text-gray-500 text-center mb-4">Admin</p>
          <nav className="space-y-2">
            {menuItems.map((menuItem) =>
              menuItem.path ? (
                <NavLink
                  key={menuItem.path}
                  to={menuItem.path}
                  className={() =>
                    `flex items-center w-full p-2 rounded-md transition-colors text-lg ${
                      location.pathname.includes(menuItem.path) // Match partial path for similar routes
                        ? "bg-green-200 text-gray-900"
                        : "text-gray-600 hover:bg-green-100"
                    }`
                  }
                >
                  <menuItem.icon className="mr-2 h-5 w-5" />
                  {menuItem.label}
                </NavLink>
              ) : (
                <button
                  key="logout"
                  className="w-full p-3 rounded flex items-center justify-start hover:bg-emerald-900 hover:text-white  hover:cursor-pointer "
                  onClick={handleLogout}
                >
                  <menuItem.icon className="mr-2 h-5 w-5" />
                  {menuItem.label}
                </button>
              )
            )}
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto max-h-screen">
          {/* Outlet will render the child routes */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardPage;
