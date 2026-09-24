"use client";

import Link from 'next/link';
import { useLanguage } from './contexts/LanguageContext';
import LanguageSwitcher from './components/LanguageSwitcher';

// Icon components with inline SVG to avoid dependencies issues
const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
);

const ShoppingBagIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <line x1="3" x2="21" y1="6" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
);

export default function Home() {
    const { t } = useLanguage();

    return (
        <main className="container relative" style={{ minHeight: '100vh', padding: '4rem 1rem' }}>
            <div style={{ position: 'absolute', top: '2rem', right: '2rem', zIndex: 100 }}>
                <LanguageSwitcher />
            </div>

            <div className="text-center animate-fade-in" style={{ marginBottom: '4rem' }}>
                <h1 className="text-2xl" style={{ fontSize: '3.5rem', marginBottom: '1rem', background: 'linear-gradient(to right, #0070f3, #7928ca)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {t('welcome')}
                </h1>
                <p className="text-xl text-gray" style={{ maxWidth: '600px', margin: '0 auto' }}>
                    {t('subtitle')}
                </p>
            </div>

            <div className="flex flex-col space-y-4 justify-center items-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
                {/* Shop */}
                <Link href="/shop" className="card" style={{ textAlign: 'center', alignItems: 'center', borderColor: 'var(--rf-bg)', maxWidth: '300px', width: '100%' }}>
                    <div style={{ padding: '1.5rem', borderRadius: '50%', background: 'var(--rf-bg)', color: 'var(--rf-color)', marginBottom: '1.5rem' }}>
                        <ShoppingBagIcon />
                    </div>
                    <h2 className="text-xl mb-4">{t('shop')}</h2>
                    <p className="text-gray" style={{ marginBottom: '1.5rem', flexGrow: 1 }}>{t('shopDesc')}</p>
                    <span className="btn btn-primary" style={{ backgroundColor: 'var(--rf-color)', width: '100%' }}>{t('shop')}</span>
                </Link>

                {/* Room Finder */}
                <Link href="/roomfinder" className="card" style={{ textAlign: 'center', alignItems: 'center', borderColor: 'var(--rf-bg)', maxWidth: '300px' }}>
                    <div style={{ padding: '1.5rem', borderRadius: '50%', background: 'var(--rf-bg)', color: 'var(--rf-color)', marginBottom: '1.5rem' }}>
                        <HomeIcon />
                    </div>
                    <h2 className="text-xl mb-4">{t('roomFinder')}</h2>
                    <p className="text-gray" style={{ marginBottom: '1.5rem', flexGrow: 1 }}>{t('roomFinderDesc')}</p>
                    <span className="btn btn-primary" style={{ backgroundColor: 'var(--rf-color)', width: '100%' }}>{t('subtitle')}</span>
                </Link>
            </div>
        </main>
    );
}
