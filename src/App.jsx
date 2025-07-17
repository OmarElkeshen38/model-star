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
        { path: "checkout", element: <Checkout /> },
        { path: "shop", element: <AllProducts /> },
        { path: "/product/:id", element: <ProductDetails /> },
        { path: "contact", element: <ContactUs /> },
        { path: "about", element: <AboutUs /> },
        { path: "user-profile", element: <UserProfile /> },
        { path: "/edit-user-data", element: <EditProfile /> },
        { path: "/edit-user-password", element: <ChangePassword /> },
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
    {
      path: "/dashboard",
      element: <MainLayout />,
      errorElement: <NotFound />,
      children: [
        // { index: true, element: <DashboardHome /> },
      ],
    }
  ]);

  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer />
    </>
  );
}

export default App;
