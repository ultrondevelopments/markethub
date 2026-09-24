"use client";

import { useLanguage } from "../contexts/LanguageContext";

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex items-center bg-gray-200/50 backdrop-blur-sm rounded-full p-1 border border-gray-300 shadow-inner relative z-50">
            <button
                onClick={() => setLanguage('en')}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 min-w-[60px] cursor-pointer ${language === 'en'
                        ? 'bg-white text-blue-600 shadow-md transform scale-105'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
            >
                EN
            </button>
            <button
                onClick={() => setLanguage('ne')}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 min-w-[80px] cursor-pointer ${language === 'ne'
                        ? 'bg-white text-blue-600 shadow-md transform scale-105'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
            >
                नेपाली
            </button>
        </div>
    );
}
