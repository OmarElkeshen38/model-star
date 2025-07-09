import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { ChevronDown, ShoppingCart, User } from 'lucide-react';

function Navbar() {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [cartCount, setCartCount] = useState(3); // تستبدل لاحقًا بـ context أو state عام
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // إعداد اتجاه اللغة
  useEffect(() => {
    const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  // إغلاق القائمة المنسدلة عند النقر بالخارج
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

  // التصنيفات من ملف الترجمة
  const categories = [
    { name: t('categories.mens-shoes'), slug: 'mens-shoes' },
    { name: t('categories.womens-shoes'), slug: 'womens-shoes' },
    { name: t('categories.kids-shoes'), slug: 'kids-shoes' },
    { name: t('categories.sport'), slug: 'sport' }
  ];

  return (
    <nav className="bg-white text-gray-900 shadow-md px-6 py-4 fixed left-0 right-0 top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold text-indigo-600">
          ModelStar
        </Link>

        <button className="md:hidden text-indigo-600" onClick={() => setMenuOpen(!menuOpen)}>
          <i className="fa-solid fa-bars text-2xl"></i>
        </button>

        <ul className={`flex flex-col md:flex-row md:items-center gap-4 md:gap-6 text-base font-medium absolute md:static top-20 left-0 w-full md:w-auto px-6 md:px-0 py-4 md:py-0 bg-white md:bg-transparent transition-all duration-300 border-t md:border-0 ${menuOpen ? "block" : "hidden md:flex"}`}>

          <li>
            <NavLink to="/" onClick={() => setMenuOpen(false)} className={({ isActive }) =>
              `relative hover:text-indigo-600 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-0.5 after:bg-indigo-400 after:transition-all after:duration-200 ${isActive ? "text-indigo-600 font-semibold" : ""}`}>
              {t('nav.home')}
            </NavLink>
          </li>

          {/* Dropdown للتصنيفات */}
          <li className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="relative flex gap-2 items-center cursor-pointer hover:text-indigo-600 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-0.5 after:bg-indigo-400 after:transition-all after:duration-200"
            >
              {t('nav.shop')} <ChevronDown />
            </button>
            {showDropdown && (
              <ul className="absolute bg-white shadow-md rounded-md mt-2 w-48 text-sm text-gray-800 z-50">
                {categories.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      to={`/shop/${cat.slug}`}
                      className="block px-4 py-2 hover:bg-gray-100 transition"
                      onClick={() => {
                        setMenuOpen(false);
                        setShowDropdown(false);
                      }}
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            <NavLink to="/cart" onClick={() => setMenuOpen(false)} className={({ isActive }) =>
              `relative hover:text-indigo-600 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-0.5 after:bg-indigo-400 after:transition-all after:duration-200 ${isActive ? "text-indigo-600 font-semibold" : ""}`}>
              {t('nav.cart')}
            </NavLink>
          </li>

          <li>
            <NavLink to="/my-orders" onClick={() => setMenuOpen(false)} className={({ isActive }) =>
              `relative hover:text-indigo-600 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-0.5 after:bg-indigo-400 after:transition-all after:duration-200 ${isActive ? "text-indigo-600 font-semibold" : ""}`}>
              {t('nav.orders')}
            </NavLink>
          </li>

          <li>
            <NavLink to="/about" onClick={() => setMenuOpen(false)} className={({ isActive }) =>
              `relative hover:text-indigo-600 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-0.5 after:bg-indigo-400 after:transition-all after:duration-200 ${isActive ? "text-indigo-600 font-semibold" : ""}`}>
              {t('nav.about')}
            </NavLink>
          </li>

          <li>
            <NavLink to="/contact" onClick={() => setMenuOpen(false)} className={({ isActive }) =>
              `relative hover:text-indigo-600 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-0.5 after:bg-indigo-400 after:transition-all after:duration-200 ${isActive ? "text-indigo-600 font-semibold" : ""}`}>
              {t('nav.contact')}
            </NavLink>
          </li>

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

          {/* أيقونات المستخدم والسلة */}
          <li className="flex gap-2 items-center">
            <button
              onClick={() => navigate("/auth/login")}
              className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-indigo-600 transition cursor-pointer"
              title={t("nav.cart")}
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => navigate("/auth/login")}
              className="p-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white transition cursor-pointer"
              title={t("nav.login")}
            >
              <User size={20} />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
