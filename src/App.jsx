import React, { useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layouts
import AuthLayout from './modules/Shared/AuthLayout/AuthLayout';
import MainLayout from './modules/Shared/MainLayout/MainLayout';

// Pages
import HomePage from './modules/HomePage/HomePage/HomePage';
import Home from './modules/HomePage/Home/Home';
import NotFound from './modules/Shared/NotFound/NotFound';
import Login from './modules/Authentication/Login/Login';
import ForgetPass from './modules/Authentication/ForgetPass/ForgetPass';
import ResetPass from './modules/Authentication/ResetPass/ResetPass';
import Register from './modules/Authentication/Register/Register';
import Cart from './modules/Cart/Cart';
import Checkout from './modules/Checkout/Checkout';
import AllProducts from './modules/Products/AllProducts/AllProducts';
import ContactUs from './modules/ContactUs/ContactUs';
import AboutUs from './modules/AboutUs/AboutUs';
import ProductDetails from './modules/Products/ProductDetails/ProductDetails';
import UserProfile from './modules/User/UserProfile/UserProfile';
import EditProfile from './modules/User/EditProfile/EditProfile';
import ChangePassword from './modules/User/ChangePassword/ChangePassword';
import AdminLayout from './modules/Admin/AdminLayout/AdminLayout';
import AdminDashboard from './modules/Admin/AdminDashboard/AdminDashboard';
import AdminProducts from './modules/Admin/AdminProducts/AdminProducts';
import AdminOrders from './modules/Admin/AdminOrders/AdminOrders';
import AdminUsers from './modules/Admin/AdminUsers/AdminUsers';
import AdminSettings from './modules/Admin/AdminSettings/AdminSettings';
import RoleBasedRoute from './modules/RoleBasedRoute/RoleBasedRoute';
import ProtectedRoute from './modules/ProtectedRoute/ProtectedRoute';

function App() {
  const { i18n } = useTranslation();

  const fontClass = i18n.language === "ar" ? "font-cairo" : "font-inter";

  useEffect(() => {
    const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "cart", element: <Cart /> },
        {
          path: "checkout", element: (
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          )
        },
        { path: "products", element: <AllProducts /> },
        { path: "/product/:id", element: <ProductDetails /> },
        { path: "contact", element: <ContactUs /> },
        { path: "about", element: <AboutUs /> },

        // صفحات المستخدم
        {
          path: "user-profile",
          element: (
            <RoleBasedRoute allowedRoles={["user"]}>
              <UserProfile />
            </RoleBasedRoute>
          ),
        },
        {
          path: "/edit-user-data",
          element: (
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          ),
        },
        {
          path: "/edit-user-password",
          element: (
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          ),
        },

        // صفحات الأدمن
        {
          path: "/admin",
          element: (
            <RoleBasedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </RoleBasedRoute>
          ),
          children: [
            { index: true, element: <AdminDashboard /> },
            { path: "products", element: <AdminProducts /> },
            { path: "orders", element: <AdminOrders /> },
            { path: "users", element: <AdminUsers /> },
            { path: "settings", element: <AdminSettings /> },
          ],
        },
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forget-password", element: <ForgetPass /> },
        { path: "reset-password", element: <ResetPass /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer />
    </>
  );
}

export default App;
