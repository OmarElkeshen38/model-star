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
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { path: "login", element: <Login /> },
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
