import React from 'react';
import { useTranslation } from 'react-i18next';
import notFoundImg from '../../../assets/not-found.svg';
import { Link } from 'react-router-dom';

function NotFound() {
  const { t } = useTranslation();
  const isRTL = document.documentElement.dir === 'rtl';

  return (
    <div className={`text-gray-900 ${isRTL ? 'bg-gradient-to-bl' : 'bg-gradient-to-br'} from-indigo-500 via-white to-gray-100`}>
      <section className="min-h-screen flex flex-col items-center justify-center container mx-auto px-6 py-20 gap-10">
        <h1 className="text-4xl mt-6 md:text-5xl font-extrabold leading-tight text-indigo-700">
          {t("notFound.title", "الصفحة غير موجودة")}
        </h1>
        <p className="text-lg md:text-xl text-gray-700">
          {t("notFound.subtitle", "عذرًا، الصفحة التي تبحث عنها غير موجودة.")}
        </p>
        <Link to="/" className="text-indigo-600 hover:underline">
          {t("notFound.backToHome", "العودة إلى الصفحة الرئيسية")}
        </Link>
        <div className="flex-1 animate-float">
                  <img
                    src={notFoundImg}
                    alt="not Found Illustration"
                    className="w-full max-w-md mx-auto drop-shadow-md animate-float animate-fade-in"
                  />
                </div>
      </section>
    </div>
  )
}

export default NotFound
