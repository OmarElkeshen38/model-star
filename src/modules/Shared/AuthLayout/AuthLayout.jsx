import React, { useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import logo from '../../../assets/logo.png';
// import authImg from '../../../assets/auth.jpg';

function AuthLayout() {

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
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-900 text-white">
            <div className="order-2 md:order-1 w-full md:w-1/2 hidden md:flex flex-col justify-center bg-gradient-to-br from-gray-700 to-gray-900 p-10 relative">
                {/* <img src={authImg} alt="Authentication Background" className="absolute inset-0 w-full h-full object-cover opacity-5 z-0" /> */}
                <img src={logo} alt="CODE 3 LOGISTICS" className="w-28 mb-6" />
                <div className="flex flex-col justify-center flex-grow z-10">
                    <h2 className="text-2xl font-bold mb-4">{t('login.title')}</h2>
                    <p className="text-gray-300 leading-relaxed max-w-md">
                        {t('login.description')}
                    </p>
                </div>

                <div className="text-sm text-gray-400 mt-10 text-center z-10">
                    <div className="flex flex-wrap justify-center gap-4 mb-2">
                        <Link to="/" className="hover:underline">{t('login.home')}</Link>
                        <a className="hover:underline">{t('login.privacy')}</a>
                        <a className="hover:underline">{t('login.terms')}</a>
                        <select
                            className="cursor-pointer text-white bg-gray-700 rounded-md px-2 py-1 text-sm focus:outline-none"
                            value={i18n.language}
                            onChange={(e) => changeLanguage(e.target.value)}
                        >
                            <option className='bg-gray-700 text-gray-200' value="en">English</option>
                            <option className='bg-gray-700 text-gray-200' value="ar">العربية</option>
                        </select>
                    </div>
                    <p className="text-xs mt-2">&copy; 2025 CODE 3 LOGISTICS - {t('login.copyright')}</p>
                </div>
            </div>
            <div className="order-1 md:order-2 w-full md:w-1/2 flex items-center min-h-screen md-h-auto justify-center p-6 bg-gray-900 relative">
                <img src={authImg} alt="Authentication Background" className="absolute inset-0 w-full h-full object-cover opacity-5 z-0 md:hidden" />
                <Outlet />

            </div>
        </div>

    )
}

export default AuthLayout
