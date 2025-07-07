import React from 'react'
import { useTranslation } from 'react-i18next';

function Contact() {

    const { t } = useTranslation();

    return (
        <section className="bg-gray-800 text-white py-12 md:py-18">
            <div className="container mx-auto px-6 md:px-12">
                <h2 className="text-3xl md:text-4xl font-bold text-center">
                    <i className="fa-solid fa-envelope me-3 text-emerald-400"></i>
                    {t('contact.title')} 
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-10 md:py-14">
                    <div className="space-y-6 text-center md:text-start">
                        <a
                            href="tel:+05367933334"
                            className="flex justify-center md:justify-start items-center group"
                        >
                            <i className="fa-solid fa-phone text-emerald-400 text-xl me-3 group-hover:text-emerald-400 transition-colors duration-200"></i>
                            <span dir="ltr" className="text-gray-300 group-hover:text-emerald-400 transition-colors duration-200">
                                {t('contact.phone')}
                            </span>
                        </a>

                        <a
                            href="mailto:info@c3.com.sa"
                            className="flex justify-center md:justify-start items-center group"
                        >
                            <i className="fa-solid fa-envelope text-emerald-400 text-xl me-3 group-hover:text-emerald-400 transition-colors duration-200"></i>
                            <span className="text-gray-300 group-hover:text-emerald-400 transition-colors duration-200">
                                {t('contact.email')}
                            </span>
                        </a>

                        <a
                            href="https://maps.app.goo.gl/4pm9TkqqjPXvdeu27"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex justify-center md:justify-start items-center group"
                        >
                            <i className="fa-solid fa-location-dot text-emerald-400 text-xl me-3 group-hover:text-emerald-400 transition-colors duration-200"></i>
                            <span className="text-gray-300 group-hover:text-emerald-400 transition-colors duration-200">
                                {t('contact.address')}
                            </span>
                        </a>
                    </div>

                    <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                        <iframe
                            title={t('contact.map_title')}
                            src="https://www.google.com/maps?q=24.832855,46.775541&hl=ar&z=14&amp;output=embed"
                            width="100%"
                            height="300"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full h-[400px]"
                        ></iframe>

                        <div className="absolute top-0 left-0 w-full h-full bg-gray-900 opacity-50 pointer-events-none rounded-lg"></div>

                        <p className="text-center text-gray-200 mt-2">
                             {t('contact.map_note')} <a target="_blank" href="https://maps.app.goo.gl/4pm9TkqqjPXvdeu27" className="text-emerald-400 hover:underline">{t('contact.map_link')}</a>
                        </p>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Contact
