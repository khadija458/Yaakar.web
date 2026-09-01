'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useCurrency, Currency } from '@/context/CurrencyContext';

interface CurrencySelectorProps {
  variant?: 'header' | 'compact' | 'pills';
  className?: string;
}

export default function CurrencySelector({ variant = 'header', className = '' }: CurrencySelectorProps) {
  const { currency, setCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currencies: { code: Currency; flag: string; label: string; symbol: string }[] = [
    { code: 'XOF', flag: '🇸🇳', label: 'FCFA (XOF)', symbol: 'FCFA' },
    { code: 'EUR', flag: '🇪🇺', label: 'Euro (€)', symbol: '€' },
    { code: 'USD', flag: '🇺🇸', label: 'US Dollar ($)', symbol: '$' },
  ];

  const currentConfig = currencies.find(c => c.code === currency) || currencies[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (variant === 'pills') {
    return (
      <div className={`inline-flex items-center bg-white/10 p-1 rounded-full border border-white/20 backdrop-blur-md ${className}`}>
        {currencies.map((item) => (
          <button
            key={item.code}
            type="button"
            onClick={() => setCurrency(item.code)}
            className={`px-3 py-1 text-xs font-bold rounded-full transition-all flex items-center gap-1.5 ${
              currency === item.code
                ? 'bg-brand-coral text-brand-dark shadow-md'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <span>{item.flag}</span>
            <span>{item.code === 'XOF' ? 'FCFA' : item.code}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-full text-xs font-bold border border-white/20 backdrop-blur-md transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-accent"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="text-base">{currentConfig.flag}</span>
        <span className="tracking-wide">{currentConfig.symbol}</span>
        <svg 
          className={`w-3.5 h-3.5 text-gray-300 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-brand-dark border border-white/20 shadow-2xl py-2 z-50 animate-fade-in-up backdrop-blur-xl">
          <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider font-extrabold text-brand-accent border-b border-white/10">
            Devise / Currency
          </div>
          {currencies.map((item) => (
            <button
              key={item.code}
              type="button"
              onClick={() => {
                setCurrency(item.code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3.5 py-2.5 text-xs font-semibold flex items-center justify-between transition-colors ${
                currency === item.code
                  ? 'bg-brand-accent/20 text-brand-coral font-bold'
                  : 'text-gray-200 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-base">{item.flag}</span>
                <span>{item.label}</span>
              </div>
              {currency === item.code && <span className="text-brand-coral font-bold">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
