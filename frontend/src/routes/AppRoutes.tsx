import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminProtectedRoute from "../components/AdminProtectedRoute";
import NotFound from "../pages/Notfound";
import Loading from "../components/Loading";

const Login = lazy(() => import("../pages/td/Login"));
const Home = lazy(() => import("../pages/td/Home"));
const AdminLogin = lazy(() => import("../pages/admin/AdminLogin"));

const AdminDashboardPage = lazy(() => import("../pages/admin/AdminDashboardPage"));
const TruckDriversList = lazy(() => import("../pages/admin/truck-driver/TruckDriversList"));
const VendorsList = lazy(() => import("../pages/admin/vendor/VendorList"));
const ProductsList = lazy(() => import("../pages/admin/product/ProductList"));
const AddTruckDriver = lazy(() => import("../pages/admin/truck-driver/AddTruckDriver"));
const EditTruckDriver = lazy(() => import("../pages/admin/truck-driver/EditTruckDriver"));
const AddVendor = lazy(() => import("../pages/admin/vendor/AddVendor"));
const EditVendor = lazy(() => import("../pages/admin/vendor/EditVendor"));
const AddProduct = lazy(() => import("../pages/admin/product/AddProduct"));
const EditProduct = lazy(() => import("../pages/admin/product/EditProduct"));
const OrderList = lazy(() => import("../pages/admin/order/OrderList"));

const Products = lazy(() => import("../pages/td/Products"));
const Cart = lazy(() => import("../pages/td/Cart"));
const TruckDriverOrderCard = lazy(() => import("../pages/td/GetOrder"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route element={<ProtectedRoute role={"truck driver"} />}>
          <Route path="/" element={<Home />} />
          <Route path="/create-order" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/get-order" element={<TruckDriverOrderCard />} />
        </Route>

        <Route element={<AdminProtectedRoute role={"admin"} />}>
          <Route path="/admin" element={<AdminDashboardPage />}>
            <Route path="truck-driver" element={<TruckDriversList />} />
            <Route path="truck-driver/add" element={<AddTruckDriver />} />
            <Route path="truck-driver/edit/:id" element={<EditTruckDriver />} />

            <Route path="vendor/add" element={<AddVendor />} />
            <Route path="vendor" element={<VendorsList />} />
            <Route path="vendor/edit/:id" element={<EditVendor />} />

            <Route path="product/add" element={<AddProduct />} />
            <Route path="product" element={<ProductsList />} />
            <Route path="product/edit/:id" element={<EditProduct />} />

            <Route path="order" element={<OrderList />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
