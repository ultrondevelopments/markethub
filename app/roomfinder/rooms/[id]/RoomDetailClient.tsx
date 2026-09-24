"use client";

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import LanguageSwitcher from '../../../components/LanguageSwitcher';

const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 19-7-7 7-7" /> <path d="M19 12H5" />
    </svg>
);

const MapPinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /> <circle cx="12" cy="10" r="3" />
    </svg>
);

const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
);

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3z" />
    </svg>
);

export default function RoomDetail() {
    const { t } = useLanguage();
    const params = useParams();
    const id = params.id;
    const [room, setRoom] = useState<any>(null);
    const [showContactModal, setShowContactModal] = useState(false);

    useEffect(() => {
        // Find room in localStorage or initialRooms
        const initialRooms = [
            {
                id: 1,
                title: "Sunny Bedroom in Shared Apartment",
                location: "Kathmandu, Nepal",
                price: "Rs. 15,000/mo",
                image: "https://images.unsplash.com/photo-1522771753062-2aadfcf4b836?q=80&w=800&auto=format&fit=crop",
                type: "Private Room",
                description: "A spacious and sunny room available in a shared apartment. Ideal for students or young professionals. Includes access to kitchen, living room, and high-speed internet.",
                amenities: ["WiFi", "Kitchen", "Washing Machine", "Balcony"],
                phoneNumber: "9800000000"
            },
            {
                id: 2,
                title: "Modern Studio Near University",
                location: "Lalitpur, Nepal",
                price: "Rs. 22,000/mo",
                image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop",
                type: "Studio",
                description: "Modern studio apartment with all facilities. Close to the university and public transport.",
                amenities: ["WiFi", "Kitchen", "AC", "Security"],
                phoneNumber: "9811111111"
            },
            {
                id: 3,
                title: "Cozy Room for Student",
                location: "Bhaktapur, Nepal",
                price: "Rs. 8,000/mo",
                image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=800&auto=format&fit=crop",
                type: "Shared Room",
                description: "Perfect for budget-conscious students. Shared kitchen and bathroom.",
                amenities: ["WiFi", "Kitchen", "Bedding"],
                phoneNumber: "9822222222"
            }
        ];

        const savedRooms = JSON.parse(localStorage.getItem('kotha_rooms') || '[]');
        const allRooms = [...savedRooms, ...initialRooms];
        const foundRoom = allRooms.find(r => r.id.toString() === id?.toString());
        setRoom(foundRoom);
    }, [id]);

    if (!room) return <div className="p-8 text-center text-gray-500">Loading room details...</div>;

    const handleWhatsApp = () => {
        const phone = room.phoneNumber.replace(/\D/g, '');
        window.open(`https://wa.me/${phone}`, '_blank');
    };

    const handleCall = () => {
        window.location.href = `tel:${room.phoneNumber}`;
    };

    return (
        <div className="min-h-screen pb-20 bg-gray-50">
            {/* Header */}
            <header className="border-b bg-white sticky top-0 z-10 shadow-sm">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/roomfinder" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <ArrowLeftIcon />
                        </Link>
                        <div className="flex flex-col">
                            <h1 className="text-lg font-bold text-gray-900 leading-tight">{t('welcome')}</h1>
                            <p className="text-xs text-gray-500">{t('subtitle')}</p>
                        </div>
                    </div>
                    <LanguageSwitcher />
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                    <div className="aspect-video relative bg-gray-200">
                        <img
                            src={room.image}
                            alt={room.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-md text-sm font-semibold uppercase tracking-wider shadow-sm">
                            {room.type}
                        </div>
                    </div>

                    <div className="p-6 md:p-8">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{room.title}</h1>
                                <div className="flex items-center text-gray-500 text-lg">
                                    <MapPinIcon />
                                    <span className="ml-2">{room.location}</span>
                                </div>
                            </div>
                            <div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
                                <span className="font-bold text-2xl text-blue-600">{room.price}</span>
                            </div>
                        </div>

                        <div className="border-t pt-6 mb-8">
                            <h2 className="text-xl font-bold mb-4">{t('description')}</h2>
                            <p className="text-gray-600 leading-relaxed">{room.description}</p>
                        </div>

                        <div className="border-t pt-6 mb-8">
                            <h2 className="text-xl font-bold mb-4">Amenities</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {room.amenities.map((amenity: string, idx: number) => (
                                    <div key={idx} className="bg-gray-50 p-3 rounded-lg text-center text-gray-700 font-medium">
                                        {amenity}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="border-t pt-6">
                            <button
                                onClick={() => setShowContactModal(true)}
                                className="btn btn-primary w-full md:w-auto text-lg py-3 px-8"
                                style={{ backgroundColor: 'var(--rf-color)' }}
                            >
                                {t('contactLandlord')}
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Contact Modal */}
            {showContactModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b text-center">
                            <h3 className="text-xl font-bold text-gray-900">{t('contactOptions')}</h3>
                            <p className="text-gray-500 text-sm mt-1">{room.phoneNumber}</p>
                        </div>
                        <div className="p-6 space-y-4">
                            <button
                                onClick={handleCall}
                                className="flex items-center justify-center gap-3 w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                            >
                                <PhoneIcon /> {t('call')}
                            </button>
                            <button
                                onClick={handleWhatsApp}
                                className="flex items-center justify-center gap-3 w-full py-4 bg-green-500 text-white rounded-xl font-bold text-lg hover:bg-green-600 transition-colors shadow-lg shadow-green-200"
                            >
                                <WhatsAppIcon /> {t('whatsapp')}
                            </button>
                            <button
                                onClick={() => setShowContactModal(false)}
                                className="w-full py-3 text-gray-500 font-medium hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                {t('close')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
