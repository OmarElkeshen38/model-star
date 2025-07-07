import React from 'react';
import logo from '../../../assets/logo.png';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function Footer() {

    const { t } = useTranslation();

  return (
     <footer className="text-gray-300 px-6 md:px-12 pt-12 pb-6">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">

        <div className='flex flex-col justify-center'>
          <img src={logo} alt={t('footer.logoAlt')} className="w-32 mb-4" />
        </div>

        <div>
          <h2 className="text-white font-semibold text-lg md:text-xl mb-4">{t('footer.title')}</h2>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-emerald-400 transition-colors">{t('footer.links.home')}</Link></li>
            <li><Link to="/about" className="hover:text-emerald-400 transition-colors">{t('footer.links.about')}</Link></li>
            <li><Link to="/services" className="hover:text-emerald-400 transition-colors">{t('footer.links.services')}</Link></li>
            <li><Link to="/contact" className="hover:text-emerald-400 transition-colors">{t('footer.links.contact')}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold text-lg md:text-xl mb-4">{t('footer.contactTitle')}</h3>
          <ul className="space-y-2">
            <li>
              <a dir="ltr" href="tel:+05367933334" className="hover:text-emerald-400 transition-colors">
                {t('contact.phone')}
              </a>
            </li>
            <li>
              <a href="mailto:info@c3.com.sa" className="hover:text-emerald-400 transition-colors">
                {t('contact.email')}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold text-lg md:text-xl mb-4">{t('footer.addressTitle')}</h3>
          <p className="leading-relaxed">
            {t('footer.address')}
          </p>
        </div>
      </div>

      {/* خط فاصل */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} CODE 3 LOGISTICS. {t('footer.rights')}
      </div>
    </footer>
  )
}

export default Footer
