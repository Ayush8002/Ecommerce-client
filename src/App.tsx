import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loading } from "./components/Loading/Loading";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { getUser } from "./redux/api/userAPI";
import { userExist, userNotExist } from "./redux/reducer/userReducer";
import { RootState } from "./redux/store";
import ProtectedRoute from "./components/Pages/ProtectedRoute";

//pages component
const Login = lazy(() => import("./components/Pages/Login"));
const Profile = lazy(() => import("./components/Profile/Profile"));
const Shipping = lazy(() => import("./components/Shipping/Shipping"));
const Orders = lazy(() => import("./components/Pages/Orders"));
const OrderDetails = lazy(() => import("./components/Pages/OrderDetails"));
const CheckOut = lazy(() => import("./components/Pages/CheckOut"));
const ErrorPage = lazy(() => import("./components/Pages/ErrorPage"));

// layouts components
const Home = lazy(() => import("./components/Home/Home"));
const About = lazy(() => import("./components/About/About"));
const Contact = lazy(() => import("./components/Contact/Contact"));
const Products = lazy(() => import("./components/Product/Products"));
const SingleProduct = lazy(() => import("./components/Product/SingleProduct"));
const Cart = lazy(() => import("./components/Cart/Cart"));

// Admin components
const Dashboard = lazy(
  () => import("./components/Admin/pages/dashboard/Dashboard")
);
const AdminProducts = lazy(
  () => import("./components/Admin/pages/dashboard/AdminProducts")
);
const Customers = lazy(
  () => import("./components/Admin/pages/dashboard/Customers")
);
const Transactions = lazy(
  () => import("./components/Admin/pages/dashboard/Transactions")
);
const NewProduct = lazy(
  () => import("./components/Admin/pages/management/NewProduct")
);
const ProductManagement = lazy(
  () => import("./components/Admin/pages/management/ProductManagement")
);
const TransactionManagement = lazy(
  () => import("./components/Admin/pages/management/TransactionManagement")
);

// admin charts
const BarCharts = lazy(
  () => import("./components/Admin/pages/charts/BarCharts")
);
const PieCharts = lazy(
  () => import("./components/Admin/pages/charts/PieCharts")
);
const LineCharts = lazy(
  () => import("./components/Admin/pages/charts/LineCharts")
);

// admin Apps
const Toss = lazy(() => import("./components/Admin/pages/apps/Toss"));
const StopWatch = lazy(() => import("./components/Admin/pages/apps/Stopwatch"));
const Coupons = lazy(() => import("./components/Admin/pages/apps/Coupons"));

const App = () => {
  const { user: UserAuth, loading } = useSelector(
    (state: RootState) => state.userReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getUser(user.uid);
        dispatch(userExist(data.user));
      } else dispatch(userNotExist());
    });
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <BrowserRouter>
      <Toaster position="bottom-center" />
      <Header />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route path="/pay" element={<CheckOut />} />
          <Route path="/singleProduct/:id" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/login" element={<Login />} />
          {/* Not logged In Route */}
          <Route
            element={
              <ProtectedRoute isAuthenticated={UserAuth ? true : false} />
            }
          >
            <Route path="/profile" element={<Profile />} />
          </Route>
          {/* Admin Routes  */}
          <Route
            element={
              <ProtectedRoute
                isAuthenticated={true}
                adminRoute={true}
                isAdmin={UserAuth?.role === "admin" ? true : false}
              />
            }
          >
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/product" element={<AdminProducts />} />
            <Route path="/admin/customers" element={<Customers />} />
            <Route path="/admin/transaction" element={<Transactions />} />

            {/* Charts */}
            <Route path="/admin/chart/bar" element={<BarCharts />} />
            <Route path="/admin/chart/pie" element={<PieCharts />} />
            <Route path="/admin/chart/line" element={<LineCharts />} />

            {/* Apps  */}
            <Route path="/admin/app/stopwatch" element={<StopWatch />} />
            <Route path="/admin/app/coupon" element={<Coupons />} />
            <Route path="/admin/app/toss" element={<Toss />} />

            {/* Management  */}
            <Route path="/admin/product/new" element={<NewProduct />} />
            <Route path="/admin/product/:id" element={<ProductManagement />} />
            <Route
              path="/admin/tranaction/:id"
              element={<TransactionManagement />}
            />
          </Route>
          <Route path="*" element={<ErrorPage/>}/>
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
