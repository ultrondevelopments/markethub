"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ne';

interface Translations {
    [key: string]: {
        en: string;
        ne: string;
    };
}

const translations: Translations = {
    welcome: {
        en: "Welcome to MarketHub",
        ne: "मार्केटहबमा स्वागत छ"
    },
    subtitle: {
        en: "Find a Room / Kotha",
        ne: "कोठा / रूम खोज्नुहोस्"
    },
    findPerfect: {
        en: "Find Your Perfect Space",
        ne: "आफ्नो लागि उत्तम ठाउँ खोज्नुहोस्"
    },
    searchPlaceholder: {
        en: "Search by city, location, or room type...",
        ne: "शहर, स्थान, वा कोठाको प्रकार खोज्नुहोस्..."
    },
    search: {
        en: "Search",
        ne: "खोज्नुहोस्"
    },
    postRoom: {
        en: "Post Room",
        ne: "कोठा पोस्ट"
    },
    shop: {
        en: "Shop",
        ne: "पसल"
    },
    shopDesc: {
        en: "Buy Items",
        ne: "सामान किन्नुहोस्"
    },
    searchItems: {
        en: "Search items...",
        ne: "सामान खोज्नुहोस्..."
    },
    shopPageTitle: {
        en: "Shop",
        ne: "पसल"
    },
    selectItems: {
        en: "Select Items",
        ne: "सामान छान्नुहोस्"
    },
    addItem: {
        en: "Add Item",
        ne: "सामान थप्नुहोस्"
    },
    selectCategory: {
        en: "Select Category",
        ne: "श्रेणी छान्नुहोस्"
    },
    clothes: {
        en: "Clothes",
        ne: "कपडा"
    },
    shoes: {
        en: "Shoes",
        ne: "जुत्ता"
    },
    vehicle: {
        en: "Vehicle",
        ne: "सवारी"
    },
    jewelleries: {
        en: "Jewelleries",
        ne: "गहना"
    },
    groceries: {
        en: "Groceries",
        ne: "किराना"
    },
    medicine: {
        en: "Medicine",
        ne: "औषधि"
    },
    alcohol: {
        en: "Alcohol",
        ne: "मदिरा"
    },
    recentListings: {
        en: "Recent Listings",
        ne: "भर्खरका सूचीहरू"
    },
    viewAll: {
        en: "View All",
        ne: "सबै हेर्नुहोस्"
    },
    availableNow: {
        en: "Available Now",
        ne: "अहिले उपलब्ध छ"
    },
    title: {
        en: "Title",
        ne: "शीर्षक"
    },
    location: {
        en: "Location",
        ne: "स्थान"
    },
    monthlyRent: {
        en: "Monthly Rent",
        ne: "मासिक भाडा"
    },
    roomType: {
        en: "Room Type",
        ne: "कोठाको प्रकार"
    },
    description: {
        en: "Description",
        ne: "विवरण"
    },
    photos: {
        en: "Photos",
        ne: "फोटोहरू"
    },
    addPhoto: {
        en: "Add Photo",
        ne: "फोटो थप्नुहोस्"
    },
    postListing: {
        en: "Post Room Listing",
        ne: "कोठा सूची पोस्ट गर्नुहोस्"
    },
    contactLandlord: {
        en: "Contact Landlord",
        ne: "घरबेटीलाई सम्पर्क गर्नुहोस्"
    },
    privateRoom: {
        en: "Private Room",
        ne: "निजी कोठा"
    },
    sharedRoom: {
        en: "Shared Room",
        ne: "साझा कोठा"
    },
    fullApartment: {
        en: "Full Apartment",
        ne: "पूरा अपार्टमेन्ट"
    },
    studio: {
        en: "Studio",
        ne: "स्टुडियो"
    },
    descriptionPlaceholder: {
        en: "Describe the room, amenities, and house rules...",
        ne: "कोठा, सुविधाहरू, र घरका नियमहरू विवरण गर्नुहोस्..."
    },
    resultsFor: {
        en: "Results for",
        ne: "को लागि नतिजाहरू"
    },
    roomFinder: {
        en: "Room Finder",
        ne: "कोठा खोजकर्ता"
    },
    roomFinderDesc: {
        en: "Find your perfect room or roommate. Browse listings with photos and details.",
        ne: "आफ्नो लागि उत्तम कोठा वा साथी खोज्नुहोस्। फोटो र विवरण सहितको सूचीहरू हेर्नुहोस्।"
    },
    phoneNumber: {
        en: "Phone Number",
        ne: "फोन नम्बर"
    },
    call: {
        en: "Call",
        ne: "कल गर्नुहोस्"
    },
    whatsapp: {
        en: "WhatsApp",
        ne: "व्हाट्सएप"
    },
    contactOptions: {
        en: "Contact Options",
        ne: "सम्पर्क विकल्पहरू"
    },
    close: {
        en: "Close",
        ne: "बन्द गर्नुहोस्"
    }
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>('en');

    useEffect(() => {
        const savedLang = localStorage.getItem('app_lang') as Language;
        if (savedLang) setLanguageState(savedLang);
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('app_lang', lang);
    };

    const t = (key: string) => {
        return translations[key]?.[language] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
