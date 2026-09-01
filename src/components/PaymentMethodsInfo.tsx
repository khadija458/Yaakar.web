'use client';

import React, { useState } from 'react';
import { useCurrency } from '@/context/CurrencyContext';
import { useLanguage } from '@/context/LanguageContext';
import { WaveLogo, OrangeMoneyLogo, FreeMoneyLogo, VisaMastercardLogo, PayPalLogo, WiseLogo } from '@/components/PaymentLogos';

export default function PaymentMethodsInfo({ className = '' }: { className?: string }) {
  const { currency } = useCurrency();
  const { t } = useLanguage();
  const [activeZone, setActiveZone] = useState<'all' | 'uemoa' | 'international'>('all');

  return (
    <div className={`bg-gradient-to-br from-brand-dark via-[#10342e] to-brand-dark rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-white/15 relative overflow-hidden ${className}`}>
      {/* Background Decorative Glow */}
      <div className="absolute -top-10 -right-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-brand-coral/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 space-y-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-xs font-bold text-brand-coral uppercase tracking-wider">
            <span>{t('payment.tag')}</span>
          </div>
          <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
            {t('payment.title')}
          </h3>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            {t('payment.desc')}
          </p>

          {/* Zone Selector Buttons */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => setActiveZone('all')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeZone === 'all'
                  ? 'bg-brand-coral text-brand-dark shadow-md'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {t('payment.btn_all')}
            </button>
            <button
              type="button"
              onClick={() => setActiveZone('uemoa')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeZone === 'uemoa'
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {t('payment.btn_uemoa')}
            </button>
            <button
              type="button"
              onClick={() => setActiveZone('international')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeZone === 'international'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {t('payment.btn_inter')}
            </button>
          </div>
        </div>

        {/* Payment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* UEMOA Zone */}
          {(activeZone === 'all' || activeZone === 'uemoa') && (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-emerald-500/30 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🇸🇳</span>
                  <h4 className="font-heading font-bold text-lg text-emerald-300">Zone Sénégal & BCEAO</h4>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full font-bold uppercase">
                  FCFA / XOF
                </span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Paiement instantané sur mobile ou virement bancaire local sans aucun frais caché.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-emerald-950/60 p-3 rounded-xl border border-emerald-400/20 flex items-center gap-3">
                  <WaveLogo className="w-8 h-8" />
                  <div>
                    <p className="font-bold text-xs text-white">Wave Sénégal</p>
                    <p className="text-[10px] text-gray-400">Paiement Mobile 0%</p>
                  </div>
                </div>

                <div className="bg-orange-950/60 p-3 rounded-xl border border-orange-400/20 flex items-center gap-3">
                  <OrangeMoneyLogo className="w-8 h-8" />
                  <div>
                    <p className="font-bold text-xs text-white">Orange Money</p>
                    <p className="text-[10px] text-gray-400">Code USSD & QR</p>
                  </div>
                </div>

                <div className="bg-red-950/60 p-3 rounded-xl border border-red-400/20 flex items-center gap-3">
                  <FreeMoneyLogo className="w-8 h-8" />
                  <div>
                    <p className="font-bold text-xs text-white">Free Money</p>
                    <p className="text-[10px] text-gray-400">Mobile Wallet</p>
                  </div>
                </div>

                <div className="bg-blue-950/60 p-3 rounded-xl border border-blue-400/20 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center shadow">
                    🏦
                  </div>
                  <div>
                    <p className="font-bold text-xs text-white">Virement UEMOA</p>
                    <p className="text-[10px] text-gray-400">CBAO, SGBS, Ecobank</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* International Zone */}
          {(activeZone === 'all' || activeZone === 'international') && (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-blue-500/30 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🌍</span>
                  <h4 className="font-heading font-bold text-lg text-blue-300">Zone Europe, Diaspora & Monde</h4>
                </div>
                <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2.5 py-1 rounded-full font-bold uppercase">
                  EUR (€) / USD ($)
                </span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Réglez en Euro (€) ou Dollar ($) par carte bancaire sécurisée, PayPal ou virement européen.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-indigo-950/60 p-3 rounded-xl border border-indigo-400/20 flex items-center gap-3">
                  <VisaMastercardLogo className="w-8 h-8" />
                  <div>
                    <p className="font-bold text-xs text-white">Carte Bancaire</p>
                    <p className="text-[10px] text-gray-400">Visa, Mastercard, Amex</p>
                  </div>
                </div>

                <div className="bg-sky-950/60 p-3 rounded-xl border border-sky-400/20 flex items-center gap-3">
                  <PayPalLogo className="w-8 h-8" />
                  <div>
                    <p className="font-bold text-xs text-white">PayPal</p>
                    <p className="text-[10px] text-gray-400">Paiement sécurisé 1-Click</p>
                  </div>
                </div>

                <div className="bg-emerald-950/60 p-3 rounded-xl border border-emerald-400/20 flex items-center gap-3">
                  <WiseLogo className="w-8 h-8" />
                  <div>
                    <p className="font-bold text-xs text-white">Wise / Revolut</p>
                    <p className="text-[10px] text-gray-400">Virement sans frais</p>
                  </div>
                </div>

                <div className="bg-purple-950/60 p-3 rounded-xl border border-purple-400/20 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-black text-xs flex items-center justify-center shadow">
                    🏛️
                  </div>
                  <div>
                    <p className="font-bold text-xs text-white">Virement SEPA / SWIFT</p>
                    <p className="text-[10px] text-gray-400">RIB Français & Européen</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 50% Facilité de paiement banner */}
        <div className="bg-emerald-500/15 border border-emerald-400/30 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="text-2xl">✨</span>
            <div>
              <p className="font-bold text-sm text-emerald-300">Option 2x Échelonné pour Tous</p>
              <p className="text-xs text-gray-300">
                Acompte de <strong>50% à la commande</strong> et le solde de <strong>50% à la livraison finale</strong> (valable en FCFA, EUR et USD).
              </p>
            </div>
          </div>
          <span className="text-xs bg-emerald-500 text-brand-dark px-4 py-2 rounded-full font-extrabold shadow flex-shrink-0">
            50% + 50%
          </span>
        </div>
      </div>
    </div>
  );
}
