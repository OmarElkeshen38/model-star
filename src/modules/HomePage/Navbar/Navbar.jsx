import React, { useEffect } from 'react'
import { useState } from "react";
import {
  NavLink





  , Link
} from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };


  return (
    <nav className="bg-white shadow-md px-6 py-6 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          ModelStar
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-indigo-600 hover:underline underline-offset-4 transition ${isActive ? "text-indigo-600 font-semibold underline" : ""
              }`
            }
          >
            {t("nav.home")}
          </NavLink>

          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `hover:text-indigo-600 hover:underline underline-offset-4 transition ${isActive ? "text-indigo-600 font-semibold underline" : ""
              }`
            }
          >
            {t("nav.shop")}
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `hover:text-indigo-600 hover:underline underline-offset-4 transition ${isActive ? "text-indigo-600 font-semibold underline" : ""
              }`
            }
          >
            {t("nav.cart")}
          </NavLink>

          <NavLink
            to="/my-orders"
            className={({ isActive }) =>
              `hover:text-indigo-600 hover:underline underline-offset-4 transition ${isActive ? "text-indigo-600 font-semibold underline" : ""
              }`
            }
          >
            {t("nav.orders")}
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `hover:text-indigo-600 hover:underline underline-offset-4 transition ${isActive ? "text-indigo-600 font-semibold underline" : ""
              }`
            }
          >
            {t("nav.about")}
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `hover:text-indigo-600 hover:underline underline-offset-4 transition ${isActive ? "text-indigo-600 font-semibold underline" : ""
              }`
            }
          >
            {t("nav.contact")}
          </NavLink>
        </div>


        {/* Auth + Language */}
        <div className="hidden md:flex space-x-4 items-center">
          <select
            className="cursor-pointer text-gray-800 border-none rounded-md px-2 py-1 text-sm focus:outline-none"
            value={i18n.language}
            onChange={(e) => changeLanguage(e.target.value)}
          >
            <option className="bg-gray-700 text-white" value="en">English</option>
            <option className="bg-gray-700 text-white" value="ar">العربية</option>
          </select>
          <Link
            to="/login"
            className="text-sm text-gray-600 hover:text-indigo-600 transition"
          >
            {t("nav.login")}
          </Link>
          <Link
            to="/register"
            className="text-sm text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded transition"
          >
            {t("nav.register")}
          </Link>

        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pt-4 pb-2 space-y-3 text-gray-700">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block hover:text-indigo-600 hover:underline underline-offset-4 transition ${isActive ? "text-indigo-600 font-semibold underline" : ""
              }`
            }
          >
            {t("nav.home")}
          </NavLink>

          <NavLink
            to="/shop"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block hover:text-indigo-600 hover:underline underline-offset-4 transition ${isActive ? "text-indigo-600 font-semibold underline" : ""
              }`
            }
          >
            {t("nav.shop")}
          </NavLink>

          <NavLink
            to="/cart"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block hover:text-indigo-600 hover:underline underline-offset-4 transition ${isActive ? "text-indigo-600 font-semibold underline" : ""
              }`
            }
          >
            {t("nav.cart")}
          </NavLink>

          <NavLink
            to="/my-orders"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block hover:text-indigo-600 hover:underline underline-offset-4 transition ${isActive ? "text-indigo-600 font-semibold underline" : ""
              }`
            }
          >
            {t("nav.orders")}
          </NavLink>

          <NavLink
            to="/about"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block hover:text-indigo-600 hover:underline underline-offset-4 transition ${isActive ? "text-indigo-600 font-semibold underline" : ""
              }`
            }
          >
            {t("nav.about")}
          </NavLink>

          <NavLink
            to="/contact"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block hover:text-indigo-600 hover:underline underline-offset-4 transition ${isActive ? "text-indigo-600 font-semibold underline" : ""
              }`
            }
          >
            {t("nav.contact")}
          </NavLink>

          <hr />

          <NavLink
            to="/login"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block hover:text-indigo-600 transition ${isActive ? "text-indigo-600 font-semibold underline" : ""
              }`
            }
          >
            {t("nav.login")}
          </NavLink>

          <NavLink
            to="/register"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition ${isActive ? "ring-2 ring-indigo-400" : ""
              }`
            }
          >
            {t("nav.register")}
          </NavLink>

          <select
            className="mt-2 w-full px-2 py-1 rounded text-sm text-gray-800 border border-gray-200"
            value={i18n.language}
            onChange={(e) => {
              changeLanguage(e.target.value);
              setIsOpen(false);
            }}
          >
            <option value="en">English</option>
            <option value="ar">العربية</option>
          </select>
        </div>
      )}

    </nav>
  );
}
