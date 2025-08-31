import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { ChevronDown, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { getCategories } from '../../Admin/AdminCategories/categorySlice';

function Navbar() {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [cartCount] = useState(3);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { items: categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  // Navbar Scroll Effect
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => setShowDropdown(prev => !prev);
  const changeLanguage = (lang) => i18n.changeLanguage(lang);

  const handleClick = () => {
    if (!user) {
      navigate("/auth/login");
    } else if (user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/user-profile");
    }
  };

  return (
    <nav className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-transparent"}`}>
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        
        {/* Logo */}
        <Link to="/" className="text-3xl font-extrabold text-indigo-600">
          ModelStar
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-indigo-600"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 text-base font-medium text-gray-700">
          
          <li>
            <NavLink to="/" className={({ isActive }) =>
              `hover:text-indigo-600 transition relative after:block after:h-0.5 after:bg-indigo-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left ${isActive ? "text-indigo-600 font-semibold after:scale-x-100" : ""}`}>
              {t('nav.home')}
            </NavLink>
          </li>

          {/* Shop Dropdown */}
          <li className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-1 hover:text-indigo-600 transition"
            >
              {t('nav.shop')} <ChevronDown size={18} className={`${showDropdown ? "rotate-180" : ""} transition`} />
            </button>

            <AnimatePresence>
              {showDropdown && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 mt-3 bg-white shadow-lg rounded-xl py-2 w-52 z-50 border"
                >
                  {categories.length > 0 ? (
                    categories.map((cat) => (
                      <li key={cat._id}>
                        <Link
                          to={`/products?category=${cat._id}`}
                          className="block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-600 transition rounded-lg"
                          onClick={() => setShowDropdown(false)}
                        >
                          {i18n.language === "ar" ? cat.name_ar : cat.name_en}
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-2 text-gray-500">{t("common.noCategories")}</li>
                  )}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>

          <li><NavLink to="/products" className={({ isActive }) => `hover:text-indigo-600 ${isActive ? "text-indigo-600 font-semibold" : ""}`}>{t('nav.products')}</NavLink></li>
          <li><NavLink to="/my-orders" className={({ isActive }) => `hover:text-indigo-600 ${isActive ? "text-indigo-600 font-semibold" : ""}`}>{t('nav.orders')}</NavLink></li>
          <li><NavLink to="/about" className={({ isActive }) => `hover:text-indigo-600 ${isActive ? "text-indigo-600 font-semibold" : ""}`}>{t('nav.about')}</NavLink></li>
          <li><NavLink to="/contact" className={({ isActive }) => `hover:text-indigo-600 ${isActive ? "text-indigo-600 font-semibold" : ""}`}>{t('nav.contact')}</NavLink></li>

          {/* Language Switch */}
          <li>
            <select
              className="cursor-pointer bg-white border border-gray-300 text-gray-800 rounded-md px-2 py-1 text-sm focus:outline-none"
              value={i18n.language}
              onChange={(e) => changeLanguage(e.target.value)}
            >
              <option value="en">{t('common.language.en')}</option>
              <option value="ar">{t('common.language.ar')}</option>
            </select>
          </li>

          {/* Cart & User */}
          <li className="flex gap-3 items-center">
            <button
              onClick={() => navigate("/cart")}
              className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-indigo-600 transition"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={handleClick}
              className="p-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white transition"
            >
              <User size={20} />
            </button>
          </li>
        </ul>
      </div>

      {/* Mobile Menu (Animated) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg absolute top-16 left-0 w-full py-6 px-6 z-40"
          >
            <ul className="flex flex-col gap-6 text-gray-700 font-medium">
              <li><NavLink to="/" onClick={() => setMenuOpen(false)}>{t('nav.home')}</NavLink></li>
              <li>
                <details>
                  <summary className="flex items-center justify-between cursor-pointer">
                    {t('nav.shop')} <ChevronDown size={16} />
                  </summary>
                  <ul className="pl-4 mt-2 space-y-2">
                    {categories.map((cat) => (
                      <li key={cat._id}>
                        <Link
                          to={`/products?category=${cat._id}`}
                          onClick={() => setMenuOpen(false)}
                          className="block px-3 py-2 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg"
                        >
                          {i18n.language === "ar" ? cat.name_ar : cat.name_en}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
              <li><NavLink to="/products" onClick={() => setMenuOpen(false)}>{t('nav.products')}</NavLink></li>
              <li><NavLink to="/my-orders" onClick={() => setMenuOpen(false)}>{t('nav.orders')}</NavLink></li>
              <li><NavLink to="/about" onClick={() => setMenuOpen(false)}>{t('nav.about')}</NavLink></li>
              <li><NavLink to="/contact" onClick={() => setMenuOpen(false)}>{t('nav.contact')}</NavLink></li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
