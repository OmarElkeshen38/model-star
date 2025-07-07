import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import ScrollToTop from '../../../Services/ScrollToTop/ScrollToTop'
import { useTranslation } from 'react-i18next'

function HomePage() {

    const { i18n } = useTranslation();
    
      const fontClass = i18n.language === "ar" ? "font-cairo" : "font-inter";

    return (
        <div className={`${fontClass}`}>
            <ScrollToTop />
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default HomePage
