"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import nepalify from 'nepalify';

// Icons
const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 19-7-7 7-7" /> <path d="M19 12H5" />
    </svg>
);

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
);

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6 6 18" /> <path d="m6 6 12 12" />
    </svg>
);

export default function PostRoom() {
    const { t, language } = useLanguage();
    const router = useRouter();
    const [images, setImages] = useState<string[]>([]);
    const [currency, setCurrency] = useState("Rs.");

    // Form States
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");
    const [roomType, setRoomType] = useState("Private Room");
    const [description, setDescription] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleNepaliInput = (value: string, setter: (val: string) => void) => {
        if (language === 'ne') {
            setter(nepalify.format(value));
        } else {
            setter(value);
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const files = Array.from(e.target.files);

            files.forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = reader.result as string;
                    setImages(prev => [...prev, base64String]);
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        if (!title || !location || !price || !phoneNumber) {
            alert("Please fill in all required fields (including phone number)");
            return;
        }

        const newRoom = {
            id: Date.now(),
            title,
            location,
            price: `${currency} ${price}/mo`,
            image: images.length > 0 ? images[0] : "https://images.unsplash.com/photo-1522771753062-2aadfcf4b836?q=80&w=800&auto=format&fit=crop",
            type: roomType,
            description,
            phoneNumber,
            amenities: ["WiFi", "Kitchen", "Essentials"]
        };

        // Save to localStorage
        const existingRooms = JSON.parse(localStorage.getItem('kotha_rooms') || '[]');
        localStorage.setItem('kotha_rooms', JSON.stringify([newRoom, ...existingRooms]));

        // Redirect
        router.push('/roomfinder');
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
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

            <main className="container mx-auto px-4 py-8 max-w-2xl">
                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <div className="space-y-6">

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('title')}</label>
                            <input
                                type="text"
                                placeholder="e.g., Sunny Bedroom in Baneswor"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                value={title}
                                onChange={(e) => handleNepaliInput(e.target.value, setTitle)}
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('location')}</label>
                            <input
                                type="text"
                                placeholder="Enter city or area"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                value={location}
                                onChange={(e) => handleNepaliInput(e.target.value, setLocation)}
                            />
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('monthlyRent')}</label>
                            <div className="flex gap-3">
                                <select
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                    className="px-3 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none w-20 text-center font-medium text-gray-700"
                                >
                                    <option value="Rs.">Rs.</option>
                                    <option value="$">$</option>
                                </select>
                                <div className="relative flex-1">
                                    <input
                                        type="number"
                                        placeholder="0.00"
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Room Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('roomType')}</label>
                            <select
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                value={roomType}
                                onChange={(e) => setRoomType(e.target.value)}
                            >
                                <option value="Private Room">{t('privateRoom')}</option>
                                <option value="Shared Room">{t('sharedRoom')}</option>
                                <option value="Full Apartment">{t('fullApartment')}</option>
                                <option value="Studio">{t('studio')}</option>
                            </select>
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('phoneNumber')}</label>
                            <input
                                type="tel"
                                placeholder="e.g., 98XXXXXXXX"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('description')}</label>
                            <textarea
                                rows={4}
                                placeholder={t('descriptionPlaceholder')}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                value={description}
                                onChange={(e) => handleNepaliInput(e.target.value, setDescription)}
                            ></textarea>
                        </div>

                        {/* Photos */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">{t('photos')}</label>

                            <div className="grid grid-cols-3 gap-4 mb-4">
                                {images.map((img, i) => (
                                    <div key={i} className="relative aspect-square rounded-lg overflow-hidden border">
                                        <img src={img} alt="Preview" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(i)}
                                            className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full hover:bg-black/70"
                                        >
                                            <XIcon />
                                        </button>
                                    </div>
                                ))}

                                <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                                    <div className="text-gray-400 mb-2">
                                        <UploadIcon />
                                    </div>
                                    <span className="text-sm text-gray-500">{t('addPhoto')}</span>
                                    <input type="file" multiple className="hidden" onChange={handleImageUpload} accept="image/*" />
                                </label>
                            </div>
                            <p className="text-xs text-gray-500">Upload up to 5 photos. First photo will be the cover.</p>
                        </div>

                        {/* Submit */}
                        <div className="pt-4">
                            <button
                                onClick={handleSubmit}
                                type="button"
                                className="btn btn-primary w-full"
                                style={{ backgroundColor: 'var(--rf-color)' }}
                            >
                                {t('postListing')}
                            </button>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}
