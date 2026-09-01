'use client';

import Link from 'next/link';
import Logo from './Logo';
import { WaveLogo, OrangeMoneyLogo, VisaMastercardLogo, PayPalLogo, WiseLogo } from './PaymentLogos';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-brand-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4 inline-block">
              <Logo size={56} />
              <span className="font-heading font-bold text-2xl">Yakaar Web</span>
            </Link>
            <p className="text-gray-300 mb-4 max-w-md text-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
            
            {/* Accepted Payment Badges */}
            <div className="pt-1 pb-4">
              <p className="text-xs text-brand-coral font-bold uppercase tracking-wider mb-2">{t('footer.payments')}</p>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-md text-gray-200 border border-white/10 font-semibold">
                  <WaveLogo className="w-5 h-5" />
                  <span>Wave</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-md text-gray-200 border border-white/10 font-semibold">
                  <OrangeMoneyLogo className="w-5 h-5" />
                  <span>Orange Money</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-md text-gray-200 border border-white/10 font-semibold">
                  <VisaMastercardLogo className="w-5 h-5" />
                  <span>Carte Bancaire</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-md text-gray-200 border border-white/10 font-semibold">
                  <PayPalLogo className="w-5 h-5" />
                  <span>PayPal</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-md text-gray-200 border border-white/10 font-semibold">
                  <WiseLogo className="w-5 h-5" />
                  <span>Wise / SEPA</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <a 
                href="https://wa.me/221775439397" 
                className="text-gray-300 hover:text-brand-accent transition-colors"
                aria-label="WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-bold text-lg mb-4">{t('footer.quick_links')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-brand-accent transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-brand-accent transition-colors">
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-gray-300 hover:text-brand-accent transition-colors">
                  {t('nav.portfolio')}
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="text-gray-300 hover:text-brand-accent transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-brand-accent transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold text-lg mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Thiès, Sénégal</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 flex-shrink-0 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+221775439397" className="hover:text-brand-accent transition-colors">
                  +221 77 543 93 97
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 flex-shrink-0 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:contact@yakaarweb.site" className="hover:text-brand-accent transition-colors">
                  contact@yakaarweb.site
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>© {currentYear} Yakaar Web. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
