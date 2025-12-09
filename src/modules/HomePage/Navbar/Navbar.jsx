import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { ChevronDown, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { getCategories } from '../../Admin/AdminCategories/categorySlice';
import { useReducedMotion } from 'framer-motion';

function Navbar() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [cartCount] = useState(3);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const navRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth || {});
  const { items: categories = [] } = useSelector((state) => state.categories || {});
  const dispatch = useDispatch();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  // Apply document direction + lang (keeps RTL support)
  useEffect(() => {
    const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  // Navbar scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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

  // Keyboard: Esc closes menus, Enter/Space toggles dropdown when focused
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setShowDropdown(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const toggleDropdown = () => setShowDropdown((p) => !p);
  const changeLanguage = (lang) => i18n.changeLanguage(lang);

  const handleClick = () => {
    if (!user) {
      navigate('/auth/login');
    } else if (user.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/user-profile');
    }
  };

  // Chic Teal inline palette (no tailwind.config)
  const COLORS = {
    primary: '#0B132B',
    accent: '#06B6D4',
    accentDark: '#0585A3',
    muted: '#6B7280',
    softBg: '#F8FAFC',
    white: '#FFFFFF',
  };

  return (
    <nav
      ref={navRef}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-gray-100 shadow-md' : 'bg-gray-50'
        }`}
      role="navigation"
      aria-label={t('nav.siteNavigation', 'Main navigation')}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link to="/" className="text-2xl md:text-3xl font-extrabold" style={{ color: COLORS.primary }}>
          OmarMarket
        </Link>

        {/* Mobile Menu Button */}
        <button
          aria-label={menuOpen ? t('nav.closeMenu', 'Close menu') : t('nav.openMenu', 'Open menu')}
          onClick={() => setMenuOpen((p) => !p)}
          className="md:hidden p-2 rounded-md focus:outline-none focus-visible:ring-3"
          style={{ color: COLORS.primary }}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 text-base font-medium" style={{ color: COLORS.muted }}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative after:block after:h-0.5 after:bg-[${COLORS.accent}] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left ${isActive ? 'text-[${COLORS.primary}] font-semibold' : ''
                }`
              }
            >
              {t('nav.home')}
            </NavLink>
          </li>

          {/* Shop Dropdown */}
          <li className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleDropdown();
                }
              }}
              aria-haspopup="true"
              aria-expanded={showDropdown}
              className="flex items-center gap-1 px-2 py-1 rounded-md hover:text-[#06B6D4] focus:outline-none focus-visible:ring-3"
              style={{ color: COLORS.primary }}
            >
              {t('nav.shop')}
              <ChevronDown size={16} className={`${showDropdown ? 'rotate-180' : ''} transition-transform`} />
            </button>

            <AnimatePresence>
              {showDropdown && (
                <motion.ul
                  initial={{ opacity: 0, y: isRTL ? 10 : -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: isRTL ? 10 : -10 }}
                  transition={{ duration: reduceMotion ? 0.01 : 0.18 }}
                  className="absolute z-50 mt-2 bg-white rounded-xl py-2 w-56 border shadow-lg"
                  style={{ [isRTL ? 'right' : 'left']: 0 }}
                  role="menu"
                  aria-label={t('nav.shopCategories', 'Shop categories')}
                >
                  {categories.length > 0 ? (
                    categories.map((cat) => (
                      <li key={cat._id} role="none">
                        <Link
                          to={`/products?category=${cat._id}`}
                          role="menuitem"
                          onClick={() => setShowDropdown(false)}
                          className="block px-4 py-2 hover:bg-[#F1FAFC] hover:text-[#06B6D4] transition-colors rounded-lg text-sm"
                        >
                          {i18n.language === 'ar' ? cat.name_ar : cat.name_en}
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-2 text-gray-500" role="none">
                      {t('common.noCategories')}
                    </li>
                  )}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>

          <li>
            <NavLink to="/products" className={({ isActive }) => (isActive ? 'text-[#06B6D4] font-semibold' : '')}>
              {t('nav.products')}
            </NavLink>
          </li>

          <li>
            <NavLink to="/my-orders" className={({ isActive }) => (isActive ? 'text-[#06B6D4] font-semibold' : '')}>
              {t('nav.orders')}
            </NavLink>
          </li>

          <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? 'text-[#06B6D4] font-semibold' : '')}>
              {t('nav.about')}
            </NavLink>
          </li>

          <li>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? 'text-[#06B6D4] font-semibold' : '')}>
              {t('nav.contact')}
            </NavLink>
          </li>

          {/* Language Switch */}
          <li>
            <select
              aria-label={t('common.language.select', 'Select language')}
              value={i18n.language}
              onChange={(e) => changeLanguage(e.target.value)}
              className="bg-white border rounded-md px-2 py-1 text-sm focus:outline-none focus-visible:ring-3"
              style={{ color: COLORS.primary }}
            >
              <option value="en">{t('common.language.en')}</option>
              <option value="ar">{t('common.language.ar')}</option>
            </select>
          </li>

          {/* Cart & User */}
          <li className="flex items-center gap-3">
            <button
              onClick={() => navigate('/cart')}
              aria-label={t('nav.cart')}
              className="relative p-2 rounded-full bg-[#F1F5F9] hover:bg-[#E6EEF2] focus:outline-none focus-visible:ring-3"
            >
              <ShoppingCart size={18} color={COLORS.primary} />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 text-[10px] font-bold flex items-center justify-center rounded-full"
                  style={{
                    background: '#FF6B6B',
                    color: '#fff',
                    width: 18,
                    height: 18,
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={handleClick}
              aria-label={t('nav.account')}
              className="p-2 rounded-full focus:outline-none focus-visible:ring-3"
              style={{
                background: COLORS.accent,
                color: COLORS.white,
              }}
            >
              <User size={18} />
            </button>
          </li>
        </ul>
      </div>

      {/* Mobile Menu (Animated slide from left or right based on dir) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: isRTL ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: isRTL ? '-100%' : '100%' }}
            transition={{ duration: reduceMotion ? 0.01 : 0.28 }}
            className="md:hidden bg-white shadow-lg absolute top-16 left-0 w-full py-6 px-6 z-40"
            style={{ [isRTL ? 'right' : 'left']: 0 }}
          >
            <ul className="flex flex-col gap-6 text-gray-800 font-medium">
              <li>
                <NavLink to="/" onClick={() => setMenuOpen(false)} className="block">
                  {t('nav.home')}
                </NavLink>
              </li>

              <li>
                <details>
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <span>{t('nav.shop')}</span>
                    <ChevronDown size={16} />
                  </summary>
                  <ul className="pl-4 mt-2 space-y-2">
                    {categories.map((cat) => (
                      <li key={cat._id}>
                        <Link
                          to={`/products?category=${cat._id}`}
                          onClick={() => setMenuOpen(false)}
                          className="block px-3 py-2 hover:bg-[#F1FAFC] hover:text-[#06B6D4] rounded-lg"
                        >
                          {i18n.language === 'ar' ? cat.name_ar : cat.name_en}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>

              <li>
                <NavLink to="/products" onClick={() => setMenuOpen(false)}>
                  {t('nav.products')}
                </NavLink>
              </li>

              <li>
                <NavLink to="/my-orders" onClick={() => setMenuOpen(false)}>
                  {t('nav.orders')}
                </NavLink>
              </li>

              <li>
                <NavLink to="/about" onClick={() => setMenuOpen(false)}>
                  {t('nav.about')}
                </NavLink>
              </li>

              <li>
                <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
                  {t('nav.contact')}
                </NavLink>
              </li>

              <li>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      navigate('/cart');
                    }}
                    className="p-2 rounded-md bg-[#F1F5F9]"
                    aria-label={t('nav.cart')}
                  >
                    <ShoppingCart size={18} color={COLORS.primary} />
                  </button>

                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      handleClick();
                    }}
                    className="px-4 py-2 rounded-md"
                    style={{ background: COLORS.accent, color: COLORS.white }}
                  >
                    {user ? t('nav.account') : t('nav.login')}
                  </button>
                </div>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
