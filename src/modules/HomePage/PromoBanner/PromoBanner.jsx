import React from 'react';
import { useTranslation } from 'react-i18next';
import { Truck, Percent } from 'lucide-react';

function PromoBanner() {

    const { t } = useTranslation();


    return (
        <div>
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white py-4 px-6">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center gap-4">
                    <div className="flex items-center gap-2 text-sm md:text-base font-medium">
                        <Truck size={20} />
                        {t("promo.freeShipping")}
                    </div>
                    <div className="flex items-center gap-2 text-sm md:text-base font-medium">
                        <Percent size={20} />
                        {t("promo.discount")}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PromoBanner
