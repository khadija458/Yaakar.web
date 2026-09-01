'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import CurrencySelector from './CurrencySelector';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '@/context/LanguageContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/services', label: t('nav.services') },
    { href: '/portfolio', label: t('nav.portfolio') },
    { href: '/a-propos', label: t('nav.about') },
    { href: '/contact', label: t('nav.contact') },
  ];

  return (
    <header className="bg-brand-dark text-white sticky top-0 z-50 shadow-lg">
      <nav className="container mx-auto px-4 py-4" aria-label="Navigation principale">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Logo size={48} />
            <span className="font-heading font-bold text-xl">Yakaar Web</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="hover:text-brand-accent transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Langue & Devise Selector */}
            <LanguageSelector variant="header" />
            <CurrencySelector variant="header" />

            <Link 
              href="/contact" 
              className="bg-brand-coral text-brand-dark px-3.5 sm:px-5 py-2 rounded-full font-bold text-xs sm:text-base hover:bg-opacity-90 transition-colors shadow-sm whitespace-nowrap"
            >
              {t('nav.quote')}
            </Link>

            {/* Hamburger Button (Mobile) */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-accent"
              aria-expanded={isOpen}
              aria-label="Toggle Navigation"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                {isOpen ? (
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
                ) : (
                  <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/10 flex flex-col gap-3 animate-fade-in-up">
            <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-white/5 rounded-xl border border-white/10 mb-1">
              <LanguageSelector variant="mobile" />
              <CurrencySelector variant="pills" />
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="hover:text-brand-accent transition-colors font-medium py-2 px-3 rounded-lg hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
