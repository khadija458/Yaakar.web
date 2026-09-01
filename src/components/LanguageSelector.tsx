'use client';

import React from 'react';
import { useLanguage, Language } from '@/context/LanguageContext';

export default function LanguageSelector({ variant = 'header' }: { variant?: 'header' | 'mobile' }) {
  const { language, setLanguage } = useLanguage();

  if (variant === 'mobile') {
    return (
      <div className="flex items-center bg-brand-dark/40 border border-white/15 rounded-full p-1 max-w-fit">
        <button
          type="button"
          onClick={() => setLanguage('fr')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
            language === 'fr'
              ? 'bg-brand-coral text-brand-dark shadow'
              : 'text-gray-300 hover:text-white'
          }`}
        >
          <span>🇫🇷</span>
          <span>FR</span>
        </button>
        <button
          type="button"
          onClick={() => setLanguage('en')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
            language === 'en'
              ? 'bg-brand-coral text-brand-dark shadow'
              : 'text-gray-300 hover:text-white'
          }`}
        >
          <span>🇬🇧</span>
          <span>EN</span>
        </button>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-0.5 shadow-sm">
      <button
        type="button"
        onClick={() => setLanguage('fr')}
        className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
          language === 'fr'
            ? 'bg-brand-coral text-brand-dark shadow-sm'
            : 'text-gray-200 hover:text-white'
        }`}
        title="Français"
      >
        <span>🇫🇷</span>
        <span>FR</span>
      </button>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
          language === 'en'
            ? 'bg-brand-coral text-brand-dark shadow-sm'
            : 'text-gray-200 hover:text-white'
        }`}
        title="English"
      >
        <span>🇬🇧</span>
        <span>EN</span>
      </button>
    </div>
  );
}
