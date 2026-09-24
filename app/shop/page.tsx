"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';
import nepalify from 'nepalify';

// Icons
const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
    </svg>
);

const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 19-7-7 7-7" /><path d="M19 12H5" />
    </svg>
);

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
);

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14" /><path d="M12 5v14" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6 6 18" /><path d="m6 6 12 12" />
    </svg>
);

const categories = [
    { key: 'clothes', icon: '👕' },
    { key: 'shoes', icon: '👟' },
    { key: 'vehicle', icon: '🚗' },
    { key: 'jewelleries', icon: '💎' },
    { key: 'groceries', icon: '🛒' },
    { key: 'medicine', icon: '💊' },
    { key: 'alcohol', icon: '🍺' },
];

export default function ShopPage() {
    const { t, language } = useLanguage();
    const [searchTerm, setSearchTerm] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const handleSearchChange = (value: string) => {
        if (language === 'ne') {
            setSearchTerm(nepalify.format(value));
        } else {
            setSearchTerm(value);
        }
    };

    const handleCategorySelect = (catKey: string) => {
        setSelectedCategory(catKey);
        setAddModalOpen(false);
        // TODO: navigate to add-item form with category pre-selected
    };

    return (
        <main className="container relative" style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
            <div style={{ position: 'absolute', top: '2rem', right: '2rem', zIndex: 100 }}>
                <LanguageSwitcher />
            </div>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', background: 'var(--rf-bg)', color: 'var(--rf-color)', textDecoration: 'none' }}>
                    <ArrowLeftIcon />
                </Link>
                <h1 className="text-2xl" style={{ fontSize: '2rem', background: 'linear-gradient(to right, #0070f3, #7928ca)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {t('shopPageTitle')}
                </h1>
            </div>

            {/* Search + Menu + Add Item Row */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>

                {/* Menu Button */}
                <div style={{ position: 'relative' }} onMouseEnter={() => setMenuOpen(true)} onMouseLeave={() => setMenuOpen(false)}>
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            width: '50px', height: '50px', borderRadius: '12px',
                            border: '2px solid var(--border)', background: 'var(--card-bg)',
                            color: 'var(--text)', cursor: 'pointer', transition: 'all 0.2s ease',
                        }}
                    >
                        <MenuIcon />
                    </button>

                    {menuOpen && (
                        <div style={{
                            position: 'absolute', top: '100%', left: '0', marginTop: '0.25rem',
                            minWidth: '220px', background: 'var(--card-bg)', border: '2px solid var(--border)',
                            borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                            zIndex: 200, overflow: 'hidden',
                        }}>
                            <div style={{ padding: '0.75rem 1rem', fontWeight: 700, fontSize: '0.8rem', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)' }}>
                                {t('selectItems')}
                            </div>
                            {categories.map((cat) => (
                                <div
                                    key={cat.key}
                                    onClick={() => { setSearchTerm(t(cat.key)); setMenuOpen(false); }}
                                    style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', transition: 'background 0.15s ease', fontSize: '1rem', color: 'var(--text)' }}
                                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--rf-bg)'; e.currentTarget.style.color = 'var(--rf-color)'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text)'; }}
                                >
                                    <span style={{ fontSize: '1.25rem' }}>{cat.icon}</span>
                                    <span>{t(cat.key)}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Search Input */}
                <div style={{ flex: 1, maxWidth: '400px', position: 'relative' }}>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        placeholder={t('searchItems')}
                        style={{
                            width: '100%', padding: '0.875rem 1rem 0.875rem 3rem',
                            borderRadius: '12px', border: '2px solid var(--border)',
                            background: 'var(--card-bg)', color: 'var(--text)',
                            fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s ease',
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--rf-color)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                    />
                    <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-gray)', pointerEvents: 'none' }}>
                        <SearchIcon />
                    </div>
                </div>

                {/* Search Button */}
                <button
                    className="btn btn-primary"
                    style={{ backgroundColor: 'var(--rf-color)', padding: '0.875rem 1.25rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap', height: '50px' }}
                >
                    <SearchIcon />
                    {t('search')}
                </button>

                {/* Add Item Button */}
                <button
                    onClick={() => setAddModalOpen(true)}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        padding: '0.875rem 1.25rem', borderRadius: '12px', height: '50px',
                        border: '2px solid #10b981', background: '#10b981',
                        color: '#fff', cursor: 'pointer', fontWeight: 600,
                        fontSize: '0.95rem', whiteSpace: 'nowrap', transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#059669'; e.currentTarget.style.borderColor = '#059669'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = '#10b981'; e.currentTarget.style.borderColor = '#10b981'; }}
                >
                    <PlusIcon />
                    {t('addItem')}
                </button>
            </div>

            {/* Selected category badge */}
            {selectedCategory && (
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', borderRadius: '999px', background: 'var(--rf-bg)', color: 'var(--rf-color)', fontWeight: 600, fontSize: '0.9rem' }}>
                        {categories.find(c => c.key === selectedCategory)?.icon} {t(selectedCategory)}
                        <button onClick={() => setSelectedCategory(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', display: 'flex', padding: 0 }}>
                            <CloseIcon />
                        </button>
                    </span>
                </div>
            )}

            {/* Empty state */}
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-gray)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 1.5rem', opacity: 0.4 }}>
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                    <line x1="3" x2="21" y1="6" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <p style={{ fontSize: '1.1rem' }}>No items yet. Check back soon!</p>
            </div>

            {/* Add Item Modal - Category Picker */}
            {addModalOpen && (
                <div
                    onClick={() => setAddModalOpen(false)}
                    style={{
                        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
                        zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        backdropFilter: 'blur(4px)',
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: 'var(--card-bg)', borderRadius: '20px',
                            padding: '2rem', width: '90%', maxWidth: '420px',
                            boxShadow: '0 24px 64px rgba(0,0,0,0.2)',
                            border: '1px solid var(--border)',
                        }}
                    >
                        {/* Modal Header */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text)' }}>
                                {t('selectCategory')}
                            </h2>
                            <button
                                onClick={() => setAddModalOpen(false)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-gray)', display: 'flex', padding: '4px', borderRadius: '8px' }}
                            >
                                <CloseIcon />
                            </button>
                        </div>

                        {/* Category Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                            {categories.map((cat) => (
                                <button
                                    key={cat.key}
                                    onClick={() => handleCategorySelect(cat.key)}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: '0.75rem',
                                        padding: '0.875rem 1rem', borderRadius: '12px',
                                        border: '2px solid var(--border)', background: 'var(--card-bg)',
                                        color: 'var(--text)', cursor: 'pointer', fontWeight: 500,
                                        fontSize: '0.95rem', textAlign: 'left', transition: 'all 0.15s ease',
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--rf-bg)'; e.currentTarget.style.borderColor = 'var(--rf-color)'; e.currentTarget.style.color = 'var(--rf-color)'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--card-bg)'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)'; }}
                                >
                                    <span style={{ fontSize: '1.5rem' }}>{cat.icon}</span>
                                    <span>{t(cat.key)}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
