'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppChatTestimonials from '@/components/WhatsAppChatTestimonials';
import PaymentMethodsInfo from '@/components/PaymentMethodsInfo';
import { useCurrency } from '@/context/CurrencyContext';
import { useLanguage } from '@/context/LanguageContext';

export default function Home() {
  const { formatPrice, currency } = useCurrency();
  const { t } = useLanguage();

  // Simulateur de Devis State
  const [calcPages, setCalcPages] = useState<'vitrine' | 'ecommerce' | 'surmesure'>('vitrine');
  const [calcOptions, setCalcOptions] = useState<{ wave: boolean; domain: boolean; seo: boolean }>({
    wave: true,
    domain: true,
    seo: false,
  });

  // ROI Calculator State
  const [itemPrice, setItemPrice] = useState<number>(10000);

  // Audio Testimonial Real MP3 Player State
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);
  const [audioProgress, setAudioProgress] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const calculateEstimate = () => {
    let base = calcPages === 'vitrine' ? 75000 : calcPages === 'ecommerce' ? 190000 : 350000;
    if (calcOptions.wave && calcPages === 'vitrine') base += 20000;
    if (calcOptions.seo) base += 35000;
    return formatPrice(base);
  };

  const calculateSalesToPayOff = () => {
    const siteCost = calcPages === 'vitrine' ? 75000 : calcPages === 'ecommerce' ? 190000 : 350000;
    const salesNeeded = Math.ceil(siteCost / (itemPrice || 1000));
    return salesNeeded;
  };

  const playVoiceNote = (id: number, src: string) => {
    if (playingAudio === id) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setPlayingAudio(null);
      setAudioProgress(0);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(src);
    audioRef.current = audio;
    setPlayingAudio(id);
    setAudioProgress(0);

    audio.play().catch(() => setPlayingAudio(null));

    audio.ontimeupdate = () => {
      if (audio.duration) {
        setAudioProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.onended = () => {
      setPlayingAudio(null);
      setAudioProgress(0);
    };

    audio.onerror = () => {
      setPlayingAudio(null);
      setAudioProgress(0);
    };
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const whatsappCalcMessage = encodeURIComponent(
    `Bonjour Yakaar Web,\nJ'ai estimé mon devis sur votre site !\n` +
    `Formule : ${calcPages === 'vitrine' ? 'Site Vitrine (75 000 FCFA)' : calcPages === 'ecommerce' ? 'Boutique E-commerce (190 000 FCFA)' : 'Sur-mesure'}\n` +
    `Montant estimé : ${calculateEstimate()}\n` +
    `Je souhaite bénéficier du paiement en 2 fois !`
  );

  const faqs = [
    {
      q: "Quels sont les tarifs et facilités de paiement ?",
      a: "Nos offres démarrent à partir de 75 000 FCFA seulement. Vous pouvez payer en 2 fois : 50% au lancement de la création et 50% uniquement à la livraison finale de votre site."
    },
    {
      q: "En combien de temps mon site internet sera-t-il prêt ?",
      a: "Un site vitrine ou e-commerce standard est livré en 7 à 10 jours ouvrés. Une première démonstration vous est présentée sous 4 jours."
    },
    {
      q: "Est-ce que je pourrai modifier mes produits et prix moi-même ?",
      a: "Oui, à 100% ! Nous vous accompagnons avec une vidéo de formation très simple pour ajouter vos articles, modifier vos tarifs ou publier vos actualités."
    },
    {
      q: "Comment fonctionnent les paiements Wave et Orange Money ?",
      a: "Vos clients paient directement depuis leur téléphone par Wave ou Orange Money. L'argent arrive directement sur votre propre compte mobile sans intermédiaire."
    }
  ];

  return (
    <>
      <Header />
      <main className="bg-brand-light overflow-hidden">
        {/* HERO SECTION SPECTACULAIRE AVEC PHOTO FONDATRICE & YAKAAR WEB MOBILE PREVIEW */}
        <section className="bg-gradient-to-br from-brand-dark via-[#14423b] to-brand-dark text-white py-20 lg:py-32 relative overflow-hidden">
          {/* Neon Glow Blobs */}
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-brand-accent/25 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute top-1/2 -right-20 w-96 h-96 bg-brand-coral/25 rounded-full blur-3xl pointer-events-none"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 text-center lg:text-left space-y-6">
                {/* Badge Disponibilité VIP */}
                <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-xs sm:text-sm font-semibold text-brand-coral">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>{t('hero.badge_prefix')} <strong>{formatPrice(75000)}</strong> {t('hero.badge_suffix')}</span>
                </div>

                {/* Main Headline */}
                <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight">
                  {t('hero.title_pre')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-emerald-300 to-brand-coral">{t('hero.title_highlight')}</span>
                </h1>

                {/* Subtitle */}
                <p className="text-lg sm:text-xl text-gray-200 font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  {t('hero.subtitle')}
                </p>

                {/* Action Buttons */}
                <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center justify-center gap-3 bg-brand-coral text-brand-dark px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-400 hover:scale-105 transition-all shadow-xl shadow-brand-coral/25"
                  >
                    <span>{t('hero.cta')} {formatPrice(75000)}</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                  <a 
                    href="https://wa.me/221775439397?text=Bonjour%20Yakaar%20Web%2C%20je%20souhaite%20commander%20mon%20site%20web" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 bg-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-500 hover:scale-105 transition-all backdrop-blur-sm shadow-xl"
                  >
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <span>{t('hero.whatsapp')}</span>
                  </a>
                </div>

                {/* Animated Proof Counter */}
                <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-4 text-center lg:text-left">
                  <div>
                    <p className="font-heading font-extrabold text-3xl lg:text-4xl text-brand-accent">+50</p>
                    <p className="text-xs sm:text-sm text-gray-300 font-medium">{t('hero.counter_delivered')}</p>
                  </div>
                  <div>
                    <p className="font-heading font-extrabold text-3xl lg:text-3xl text-brand-coral">{formatPrice(75000)}</p>
                    <p className="text-xs sm:text-sm text-gray-300 font-medium">{t('hero.counter_starting')}</p>
                  </div>
                  <div>
                    <p className="font-heading font-extrabold text-3xl lg:text-4xl text-emerald-400">2x</p>
                    <p className="text-xs sm:text-sm text-gray-300 font-medium">{t('hero.counter_split')}</p>
                  </div>
                </div>
              </div>

              {/* HERO CARD INCARNATION FONDATRICE + YAKAAR WEB AGENCY SMARTPHONE MOCKUP */}
              <div className="lg:col-span-5 relative space-y-6">
                {/* Carte d'Incarnation Fondatrice */}
                <div className="bg-white/15 backdrop-blur-xl border border-white/20 p-5 rounded-3xl shadow-2xl flex items-center gap-4 transform hover:scale-105 transition-all">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-brand-accent flex-shrink-0 shadow-lg bg-cover bg-center" style={{ backgroundImage: "url('/hero-image.png')" }}></div>
                  <div className="text-left">
                    <p className="font-heading font-bold text-lg text-white">Soxna Khadija Dia</p>
                    <p className="text-xs font-bold text-brand-coral uppercase tracking-wider mb-1">{t('hero.founder_title')}</p>
                    <p className="text-xs text-gray-200 italic leading-snug">
                      {t('hero.founder_quote')}
                    </p>
                  </div>
                </div>

                {/* Yakaar.web Agency Smartphone Mockup */}
                <div className="relative mx-auto max-w-sm bg-gradient-to-b from-gray-900 to-black p-4 rounded-[40px] shadow-2xl border-4 border-gray-700/60 transform hover:rotate-1 transition-all duration-500">
                  <div className="w-32 h-4 bg-black rounded-b-xl mx-auto mb-3"></div>

                  <div className="bg-brand-dark rounded-[28px] overflow-hidden space-y-3 text-left border border-white/10 p-4">
                    {/* Header App Agence */}
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span className="font-heading font-bold text-xs text-white">Yaakar.web Agency 🇸🇳🌐</span>
                      </div>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full">{t('hero.phone_status')}</span>
                    </div>

                    {/* Carte Statut Projet Client */}
                    <div className="bg-gradient-to-r from-emerald-900/60 to-brand-dark p-3.5 rounded-2xl border border-emerald-500/30 space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-300 font-medium">Création Site Web :</span>
                        <span className="text-emerald-400 font-bold">{t('hero.phone_delivery')}</span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-brand-accent to-emerald-400 w-[85%] rounded-full"></div>
                      </div>
                      <div className="flex justify-between text-[10px] text-gray-300">
                        <span>Paiement Wave, OM & CB</span>
                        <span className="text-brand-coral font-bold">{t('hero.phone_payment_ok')}</span>
                      </div>
                    </div>

                    {/* Features list inside phone */}
                    <div className="space-y-1.5 text-[11px] text-gray-200">
                      <div className="flex items-center gap-2 bg-white/5 p-2 rounded-xl">
                        <span>⚡</span>
                        <span>{t('hero.phone_feature1')}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/5 p-2 rounded-xl">
                        <span>💳</span>
                        <span>{t('hero.phone_feature2')}</span>
                      </div>
                    </div>

                    <div className="text-center pt-1">
                      <span className="text-[10px] text-brand-accent font-semibold">{t('hero.phone_tagline')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURE: ACCESSIBLE PRICING CARDS */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <span className="bg-brand-coral/10 text-brand-coral px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                {t('pricing.tag')}
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-dark">
                {t('pricing.title')}
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                {t('pricing.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Pack Starter */}
              <div className="bg-brand-light rounded-3xl p-8 border border-gray-200 shadow-lg hover:shadow-2xl transition-all relative flex flex-col justify-between">
                <div>
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {t('pricing.starter_tag')}
                  </span>
                  <h3 className="font-heading font-bold text-2xl mt-4 mb-2 text-brand-dark">{t('pricing.starter_title')}</h3>
                  <div className="my-4">
                    <span className="font-heading font-extrabold text-4xl text-brand-accent">{formatPrice(75000)}</span>
                    <p className="text-xs text-emerald-600 font-semibold mt-1">{t('pricing.starter_deposit')} {formatPrice(37500)} {t('pricing.starter_deposit_suffix')}</p>
                  </div>
                  <ul className="space-y-3 my-6 text-sm text-gray-700">
                    <li className="flex items-center gap-2">{t('pricing.starter_f1')}</li>
                    <li className="flex items-center gap-2">{t('pricing.starter_f2')}</li>
                    <li className="flex items-center gap-2">{t('pricing.starter_f3')}</li>
                    <li className="flex items-center gap-2">{t('pricing.starter_f4')}</li>
                  </ul>
                </div>
                <Link
                  href="/contact"
                  className="block text-center bg-brand-dark text-white py-3.5 rounded-full font-bold hover:bg-brand-accent transition-colors"
                >
                  {t('pricing.starter_btn')}
                </Link>
              </div>

              {/* Pack Pro E-commerce (Populaire) */}
              <div className="bg-white rounded-3xl p-8 border-2 border-brand-accent shadow-2xl transition-all relative flex flex-col justify-between transform md:-translate-y-4">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-accent text-white text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider shadow whitespace-nowrap">
                  {t('pricing.pro_badge')}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-2xl mt-4 mb-2 text-brand-dark">{t('pricing.pro_title')}</h3>
                  <div className="my-4">
                    <span className="font-heading font-extrabold text-4xl text-brand-coral">{formatPrice(190000)}</span>
                    <p className="text-xs text-emerald-600 font-semibold mt-1">{t('pricing.starter_deposit')} {formatPrice(95000)} {t('pricing.starter_deposit_suffix')}</p>
                  </div>
                  <ul className="space-y-3 my-6 text-sm text-gray-700">
                    <li className="flex items-center gap-2 font-semibold text-brand-dark">{t('pricing.pro_f1')}</li>
                    <li className="flex items-center gap-2 text-emerald-700 font-bold">{t('pricing.pro_f2')}</li>
                    <li className="flex items-center gap-2">{t('pricing.pro_f3')}</li>
                    <li className="flex items-center gap-2">{t('pricing.pro_f4')}</li>
                  </ul>
                </div>
                <Link
                  href="/contact"
                  className="block text-center bg-brand-coral text-brand-dark py-3.5 rounded-full font-bold hover:bg-amber-400 transition-colors shadow-lg"
                >
                  {t('pricing.pro_btn')}
                </Link>
              </div>

              {/* Pack Sur-mesure */}
              <div className="bg-brand-light rounded-3xl p-8 border border-gray-200 shadow-lg hover:shadow-2xl transition-all relative flex flex-col justify-between">
                <div>
                  <span className="bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {t('pricing.custom_tag')}
                  </span>
                  <h3 className="font-heading font-bold text-2xl mt-4 mb-2 text-brand-dark">{t('pricing.custom_title')}</h3>
                  <div className="my-4">
                    <span className="font-heading font-extrabold text-3xl text-brand-dark">{t('pricing.custom_price')}</span>
                    <p className="text-xs text-gray-500 mt-1">{t('pricing.custom_from')} {formatPrice(350000)}</p>
                  </div>
                  <ul className="space-y-3 my-6 text-sm text-gray-700">
                    <li className="flex items-center gap-2">{t('pricing.custom_f1')}</li>
                    <li className="flex items-center gap-2">{t('pricing.custom_f2')}</li>
                    <li className="flex items-center gap-2">{t('pricing.custom_f3')}</li>
                    <li className="flex items-center gap-2">{t('pricing.custom_f4')}</li>
                  </ul>
                </div>
                <Link
                  href="/contact"
                  className="block text-center bg-brand-dark text-white py-3.5 rounded-full font-bold hover:bg-brand-accent transition-colors"
                >
                  {t('pricing.custom_btn')}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CALCULATEUR DE RENTABILITÉ (ROI) */}
        <section className="py-16 lg:py-24 bg-brand-light">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center space-y-3 mb-12">
              <span className="bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                {t('roi.tag')}
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-dark">
                {t('roi.title')}
              </h2>
              <p className="text-gray-600 text-base sm:text-lg">
                {t('roi.subtitle')} {formatPrice(75000)} {t('roi.subtitle_end')}
              </p>
            </div>

            <div className="bg-white p-6 sm:p-10 rounded-3xl border border-gray-200 shadow-xl space-y-8">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="font-heading font-bold text-gray-800 text-base sm:text-lg">
                    {t('roi.label')}
                  </label>
                  <span className="font-heading font-extrabold text-xl sm:text-2xl text-brand-accent">
                    {formatPrice(itemPrice)}
                  </span>
                </div>

                <input
                  type="range"
                  min="2000"
                  max="50000"
                  step="1000"
                  value={itemPrice}
                  onChange={(e) => setItemPrice(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-accent"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-2 font-mono">
                  <span>{formatPrice(2000)}</span>
                  <span>{formatPrice(25000)}</span>
                  <span>{formatPrice(50000)}</span>
                </div>
              </div>

              <div className="bg-brand-dark text-white p-6 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-6 items-center shadow-lg">
                <div className="space-y-1">
                  <p className="text-xs text-gray-300 uppercase tracking-wider font-semibold">{t('roi.result_tag')}</p>
                  <p className="font-heading font-extrabold text-3xl text-brand-coral">
                    {calculateSalesToPayOff()} {t('roi.result_suffix')}
                  </p>
                  <p className="text-xs text-gray-300">
                    {t('roi.result_desc')} ({formatPrice(75000)}).
                  </p>
                </div>

                <div className="text-left md:text-right">
                  <a
                    href="https://wa.me/221775439397?text=Bonjour%20Yakaar%20Web%2C%20je%20souhaite%20lancer%20mon%20projet%20rentable"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-brand-coral text-brand-dark px-6 py-3.5 rounded-full font-bold text-sm hover:bg-amber-400 transition-colors shadow-md"
                  >
                    {t('roi.btn')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SIMULATEUR DE DEVIS EXPRESS */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center space-y-4 mb-12">
              <span className="bg-brand-accent/10 text-brand-accent px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                {t('devis.tag')}
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-dark">
                {t('devis.title')}
              </h2>
            </div>

            <div className="bg-brand-light rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-200 space-y-8">
              <div>
                <label className="block font-heading font-bold text-gray-800 mb-4 text-lg">
                  {t('devis.step1')}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => setCalcPages('vitrine')}
                    className={`p-5 rounded-2xl border-2 text-left transition-all ${
                      calcPages === 'vitrine'
                        ? 'border-brand-accent bg-emerald-50/80 shadow-md'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <p className="font-bold text-brand-dark text-lg">{t('pricing.starter_title')}</p>
                    <p className="text-xs font-bold text-brand-accent mt-1">{formatPrice(75000)}</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCalcPages('ecommerce')}
                    className={`p-5 rounded-2xl border-2 text-left transition-all ${
                      calcPages === 'ecommerce'
                        ? 'border-brand-accent bg-emerald-50/80 shadow-md'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <p className="font-bold text-brand-dark text-lg">{t('pricing.pro_title')}</p>
                    <p className="text-xs font-bold text-brand-coral mt-1">{formatPrice(190000)}</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCalcPages('surmesure')}
                    className={`p-5 rounded-2xl border-2 text-left transition-all ${
                      calcPages === 'surmesure'
                        ? 'border-brand-accent bg-emerald-50/80 shadow-md'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <p className="font-bold text-brand-dark text-lg">{t('pricing.custom_title')}</p>
                    <p className="text-xs font-bold text-purple-700 mt-1">{formatPrice(350000)}</p>
                  </button>
                </div>
              </div>

              <div className="bg-brand-dark text-white p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
                <div>
                  <p className="text-xs text-gray-300 uppercase tracking-wider">{t('devis.estimated')}</p>
                  <p className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-coral">
                    {calculateEstimate()}
                  </p>
                  <p className="text-xs text-emerald-400 mt-1">{t('devis.split')}</p>
                </div>

                <a
                  href={`https://wa.me/221775439397?text=${whatsappCalcMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-emerald-500 text-white px-8 py-4 rounded-full font-bold text-center hover:bg-emerald-400 transition-colors shadow-lg"
                >
                  {t('devis.btn')}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION MOYENS DE PAIEMENT NATIONAUX ET INTERNATIONAUX */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <PaymentMethodsInfo />
          </div>
        </section>

        {/* DEMOS INTERACTIVES */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <span className="bg-brand-coral/10 text-brand-coral px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                {t('demo.tag')}
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-dark">
                {t('demo.title')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-brand-light rounded-3xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 group">
                <div className="h-52 bg-cover bg-center relative" style={{ backgroundImage: "url('/boutique-1.jpg')" }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent"></div>
                  <span className="absolute top-4 left-4 bg-brand-accent text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    Boutique & Mode
                  </span>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-heading font-bold text-xl">{t('demo.boutique_title')}</p>
                    <p className="text-xs text-gray-200">{t('demo.boutique_desc')}</p>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <p className="text-sm text-gray-600">
                    {t('demo.boutique_p')}
                  </p>
                  <Link
                    href="/demo/boutique"
                    className="block text-center bg-brand-dark text-white py-3 rounded-xl font-bold hover:bg-brand-accent transition-colors"
                  >
                    {t('demo.boutique_btn')}
                  </Link>
                </div>
              </div>

              <div className="bg-brand-light rounded-3xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 group">
                <div className="h-52 bg-cover bg-center relative" style={{ backgroundImage: "url('/restaurant-1.jpg')" }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent"></div>
                  <span className="absolute top-4 left-4 bg-brand-coral text-brand-dark text-xs font-bold px-3 py-1 rounded-full shadow">
                    Restaurants & Fast-Food
                  </span>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-heading font-bold text-xl">{t('demo.restau_title')}</p>
                    <p className="text-xs text-gray-200">{t('demo.restau_desc')}</p>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <p className="text-sm text-gray-600">
                    {t('demo.restau_p')}
                  </p>
                  <Link
                    href="/demo/restaurant"
                    className="block text-center bg-brand-dark text-white py-3 rounded-xl font-bold hover:bg-brand-accent transition-colors"
                  >
                    {t('demo.restau_btn')}
                  </Link>
                </div>
              </div>

              <div className="bg-brand-light rounded-3xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 group">
                <div className="h-52 bg-cover bg-center relative" style={{ backgroundImage: "url('/clinique-1.jpg')" }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent"></div>
                  <span className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    Santé & Cabinets
                  </span>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-heading font-bold text-xl">{t('demo.sante_title')}</p>
                    <p className="text-xs text-gray-200">{t('demo.sante_desc')}</p>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <p className="text-sm text-gray-600">
                    {t('demo.sante_p')}
                  </p>
                  <Link
                    href="/demo/services"
                    className="block text-center bg-brand-dark text-white py-3 rounded-xl font-bold hover:bg-brand-accent transition-colors"
                  >
                    {t('demo.sante_btn')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE WHATSAPP CHAT TESTIMONIALS */}
        <WhatsAppChatTestimonials />

        {/* FAQ ACCORDÉON */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center space-y-3 mb-12">
              <span className="bg-brand-coral/10 text-brand-coral px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                {t('faq.tag')}
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-dark">
                {t('faq.title')}
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border border-gray-200 rounded-2xl overflow-hidden bg-brand-light">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-5 text-left font-heading font-bold text-lg text-brand-dark flex justify-between items-center gap-4 hover:bg-gray-100/50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="text-brand-accent text-xl">{openFaq === idx ? '−' : '+'}</span>
                  </button>
                  {openFaq === idx && (
                    <div className="p-5 pt-0 text-gray-600 text-sm leading-relaxed border-t border-gray-200/60 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-2xl">
                🛡️
              </div>
              <div>
                <h4 className="font-heading font-bold text-emerald-950 text-base">{t('faq.guarantee_title')}</h4>
                <p className="text-xs text-emerald-800">
                  {t('faq.guarantee_desc')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA FINAL DE CONVERSION */}
        <section className="py-20 bg-gradient-to-br from-brand-dark via-[#0d2e29] to-brand-dark text-white relative overflow-hidden">
          <div className="container mx-auto px-4 text-center relative z-10 space-y-8 max-w-3xl">
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl leading-tight">
              {t('cta.title')} {formatPrice(75000)} ?
            </h2>
            <p className="text-xl text-gray-300 font-light">
              {t('cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="bg-brand-coral text-brand-dark px-10 py-4 rounded-full font-bold text-lg hover:bg-amber-400 hover:scale-105 transition-all shadow-xl"
              >
                {t('cta.btn_order')} {formatPrice(75000)}
              </Link>
              <a 
                href="https://wa.me/221775439397?text=Bonjour%20Yakaar%20Web%2C%20je%20souhaite%20commander%20mon%20site%20web" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-emerald-500 hover:scale-105 transition-all shadow-xl"
              >
                {t('cta.btn_whatsapp')}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
