"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';
import nepalify from 'nepalify';

// Icons
const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /> <path d="m21 21-4.3-4.3" />
    </svg>
);

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14" /> <path d="M12 5v14" />
    </svg>
);

const MapPinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /> <circle cx="12" cy="10" r="3" />
    </svg>
);

const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 19-7-7 7-7" /> <path d="M19 12H5" />
    </svg>
);

export default function RoomFinder() {
    const { t, language } = useLanguage();
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (value: string) => {
        if (language === 'ne') {
            setSearchTerm(nepalify.format(value));
        } else {
            setSearchTerm(value);
        }
    };

    // Initial static rooms
    const initialRooms = [
        {
            id: 1,
            title: "Sunny Bedroom in Shared Apartment",
            location: "Kathmandu, Nepal",
            price: "Rs. 15,000/mo",
            image: "https://images.unsplash.com/photo-1522771753062-2aadfcf4b836?q=80&w=800&auto=format&fit=crop",
            type: "Private Room"
        },
        {
            id: 2,
            title: "Modern Studio Near University",
            location: "Lalitpur, Nepal",
            price: "Rs. 22,000/mo",
            image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop",
            type: "Studio"
        },
        {
            id: 3,
            title: "Cozy Room for Student",
            location: "Bhaktapur, Nepal",
            price: "Rs. 8,000/mo",
            image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=800&auto=format&fit=crop",
            type: "Shared Room"
        }
    ];

    const [displayedRooms, setDisplayedRooms] = useState(initialRooms);

    useEffect(() => {
        // Load rooms from localStorage
        const savedRooms = JSON.parse(localStorage.getItem('kotha_rooms') || '[]');
        if (savedRooms.length > 0) {
            setDisplayedRooms([...savedRooms, ...initialRooms]);
        }
    }, []);

    const handleSearch = () => {
        const allRooms = [...JSON.parse(localStorage.getItem('kotha_rooms') || '[]'), ...initialRooms];

        if (!searchTerm.trim()) {
            setDisplayedRooms(allRooms);
            return;
        }

        const lowerTerm = searchTerm.toLowerCase();

        // Filter existing
        const filtered = allRooms.filter((room: any) =>
            room.location.toLowerCase().includes(lowerTerm) ||
            room.title.toLowerCase().includes(lowerTerm) ||
            room.type.toLowerCase().includes(lowerTerm)
        );

        // Usage of "Mock" generator to simulate "Any place in the world"
        if (filtered.length === 0) {
            const mockRooms = [
                {
                    id: Date.now() + 1,
                    title: `Modern Apartment in ${searchTerm}`,
                    location: `${searchTerm}`,
                    price: "$1,200/mo", // Using generic currency for international feel or keep Rs. if preferred, but user said "any place of world"
                    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop",
                    type: "Apartment"
                },
                {
                    id: Date.now() + 2,
                    title: `Cozy Studio in ${searchTerm}`,
                    location: `${searchTerm} City Center`,
                    price: "$950/mo",
                    image: "https://images.unsplash.com/photo-1522771753062-2aadfcf4b836?q=80&w=800&auto=format&fit=crop",
                    type: "Studio"
                },
                {
                    id: Date.now() + 3,
                    title: `Spacious Room near ${searchTerm} Park`,
                    location: `${searchTerm}`,
                    price: "$600/mo",
                    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=800&auto=format&fit=crop",
                    type: "Private Room"
                }
            ];
            setDisplayedRooms(mockRooms);
        } else {
            setDisplayedRooms(filtered);
        }
    };

    return (
        <div className="min-h-screen pb-20">
            {/* Header */}
            <header className="border-b bg-white sticky top-0 z-10 shadow-sm">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <ArrowLeftIcon />
                        </Link>
                        <div className="flex flex-col">
                            <h1 className="text-lg font-bold text-gray-900 leading-tight">{t('welcome')}</h1>
                            <p className="text-xs text-gray-500">{t('subtitle')}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
                        >
                            {t('shop')}
                        </Link>
                        <LanguageSwitcher />
                        <Link href="/roomfinder/post-room" className="btn btn-primary" style={{ backgroundColor: 'var(--rf-color)', gap: '0.5rem' }}>
                            <PlusIcon /> <span className="hidden sm:inline">{t('postRoom')}</span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Search */}
            <section className="bg-blue-50 py-12 px-4">
                <div className="container mx-auto max-w-4xl text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">{t('findPerfect')}</h2>
                    <div className="bg-white rounded-full shadow-xl p-3 flex items-center border border-gray-100 w-full max-w-3xl mx-auto hover:shadow-2xl transition-all duration-300 focus-within:ring-4 focus-within:ring-blue-50/50 relative z-10">
                        <div className="pl-4 text-gray-400">
                            <SearchIcon />
                        </div>
                        <input
                            type="text"
                            placeholder={t('searchPlaceholder')}
                            className="flex-1 h-14 px-4 bg-transparent outline-none text-gray-700 placeholder:text-gray-400 w-full text-lg"
                            value={searchTerm}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <button
                            onClick={handleSearch}
                            className="text-white rounded-full px-8 py-3.5 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                            style={{ background: 'linear-gradient(135deg, var(--rf-color), #4f46e5)' }}
                        >
                            {t('search')}
                        </button>
                    </div>
                </div>
            </section>

            {/* Listings */}
            <section className="container mx-auto px-4 py-12">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-bold">
                        {searchTerm && (displayedRooms.length > 0 || searchTerm !== "")
                            ? `${t('resultsFor')} "${searchTerm}"`
                            : t('recentListings')}
                    </h3>
                    <button onClick={() => {
                        setSearchTerm("");
                        const savedRooms = JSON.parse(localStorage.getItem('kotha_rooms') || '[]');
                        setDisplayedRooms([...savedRooms, ...initialRooms]);
                    }} className="text-blue-600 font-medium hover:underline">
                        {t('viewAll')}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayedRooms.map((room) => (
                        <Link href={`/roomfinder/rooms/${room.id}`} key={room.id} className="group block bg-white rounded-xl overflow-hidden border hover:shadow-lg transition-all">
                            <div className="aspect-video relative overflow-hidden bg-gray-200">
                                <img
                                    src={room.image}
                                    alt={room.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-semibold uppercase tracking-wider">
                                    {room.type}
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                    <h4 className="font-bold text-lg line-clamp-1 group-hover:text-blue-600 transition-colors">{room.title}</h4>
                                </div>
                                <div className="flex items-center text-gray-500 text-sm mb-4">
                                    <MapPinIcon />
                                    <span className="ml-1">{room.location}</span>
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t">
                                    <span className="font-bold text-lg text-blue-600">{room.price}</span>
                                    <span className="text-xs text-gray-500 font-medium px-2 py-1 bg-gray-100 rounded-full">{t('availableNow')}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
