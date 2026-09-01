'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  fr: {
    // Nav
    'nav.home': 'Accueil',
    'nav.services': 'Services',
    'nav.portfolio': 'Portfolio',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    'nav.quote': 'Devis gratuit',

    // Hero
    'hero.badge_prefix': '🔥 Votre site web pro dès',
    'hero.badge_suffix': '(Paiement en 2x disponible)',
    'hero.title_pre': "Un site web d'exception pensé pour",
    'hero.title_highlight': "propulser votre business au Sénégal & à l'International",
    'hero.subtitle': "L'agence web humaine basée à Thiès. Nous accompagnons PME, commerçants et la diaspora avec paiement direct Wave, Orange Money & Carte Bancaire et livraison express sous 7 jours.",
    'hero.cta': 'Lancer mon projet dès',
    'hero.whatsapp': 'Discuter sur WhatsApp',
    'hero.counter_delivered': 'Sites Web Livrés',
    'hero.counter_starting': 'Tarif de Démarrage',
    'hero.counter_split': 'Paiement Échelonné',

    // Founder
    'hero.founder_title': 'Fondatrice & Ingénieure Web',
    'hero.founder_quote': '“Je vous accompagne personnellement du début à la livraison de votre site.”',
    'hero.phone_status': 'En ligne',
    'hero.phone_delivery': 'Livraison 7J',
    'hero.phone_payment_ok': 'Paiement 50% Ok',
    'hero.phone_feature1': 'Design Sur-Mesure 100% Smartphone',
    'hero.phone_feature2': 'Wave, Orange Money & Stripe / CB',
    'hero.phone_tagline': '✨ Agence Web Sénégal & International',

    // Pricing
    'pricing.tag': 'Tarifs Transparents & Multi-Devises',
    'pricing.title': 'Des offres claires adaptées à toutes les zones 💳',
    'pricing.subtitle': 'Profitez de la qualité professionnelle sans vous ruiner. Possibilité de payer en 2 fois (50% au lancement, 50% à la livraison).',
    'pricing.starter_tag': 'Idéal Démarrage',
    'pricing.starter_title': 'Pack Vitrine',
    'pricing.starter_deposit': 'Soit',
    'pricing.starter_deposit_suffix': 'à la commande',
    'pricing.starter_f1': '✓ Site vitrine 1 à 4 pages',
    'pricing.starter_f2': '✓ Design responsive 100% Smartphone',
    'pricing.starter_f3': '✓ Bouton WhatsApp direct & Contact',
    'pricing.starter_f4': '✓ Nom de domaine & Hébergement offerts',
    'pricing.starter_btn': "Commander l'Offre Vitrine",
    'pricing.pro_badge': '🔥 Le Plus Vendu (National & Diaspora)',
    'pricing.pro_title': 'Pack E-commerce Pro',
    'pricing.pro_f1': '✓ Catalogue de produits illimités',
    'pricing.pro_f2': '✓ Wave, Orange Money & Stripe / CB',
    'pricing.pro_f3': '✓ Gestion facile des stocks & commandes',
    'pricing.pro_f4': '✓ Formation vidéo pour ajouter vos articles',
    'pricing.pro_btn': "Commander l'Offre E-commerce",
    'pricing.custom_tag': 'Sur-Mesure & Apps',
    'pricing.custom_title': 'Pack Application',
    'pricing.custom_price': 'Devis Adapté',
    'pricing.custom_from': 'À partir de',
    'pricing.custom_f1': '✓ Prise de rendez-vous (Cliniques, salons)',
    'pricing.custom_f2': '✓ Fonctionnalités métier spécifiques',
    'pricing.custom_f3': '✓ Architecture haute performance',
    'pricing.custom_f4': '✓ Support & Maintenance VIP',
    'pricing.custom_btn': 'Demander un Devis Sur-Mesure',

    // ROI & Devis
    'roi.tag': 'Simulateur de Rentabilité',
    'roi.title': 'Voyez à quel point votre site se rembourse vite 💡',
    'roi.subtitle': 'Indiquez le prix moyen de vos articles pour voir en combien de ventes votre site à',
    'roi.subtitle_end': 'est 100% amorti.',
    'roi.label': 'Prix moyen de vos produits / prestations :',
    'roi.result_tag': 'Rentabilité Totale :',
    'roi.result_suffix': 'ventes seulement !',
    'roi.result_desc': 'Pour rembourser 100% de la création de votre site web',
    'roi.btn': 'Lancer mon projet rentable 🚀',
    'devis.tag': 'Devis Express',
    'devis.title': 'Calculez votre devis sur-mesure 🎯',
    'devis.step1': '1. Formule sélectionnée :',
    'devis.estimated': 'Montant total estimé :',
    'devis.split': 'Possibilité de paiement 50% à la commande',
    'devis.btn': 'Commander sur WhatsApp 🚀',

    // Payment Info Card
    'payment.tag': '🌍 Couverture Nationale & Internationale',
    'payment.title': 'Moyens de Paiement Adaptés à Votre Zone 💳',
    'payment.desc': 'Que vous soyez au Sénégal (zone UEMOA / BCEAO) ou dans la diaspora (Europe, USA, Canada, International), nous acceptons vos règlements en toute sécurité.',
    'payment.btn_all': '🌐 Tous les Moyens',
    'payment.btn_uemoa': '🇸🇳 Sénégal & Zone BCEAO / UEMOA',
    'payment.btn_inter': '🇪🇺 🇺🇸 Europe, Diaspora & Monde',
    'payment.split_title': 'Option 2x Échelonné pour Tous',
    'payment.split_desc': 'Acompte de 50% à la commande et le solde de 50% à la livraison finale (valable en FCFA, EUR et USD).',

    // Demos
    'demo.tag': 'Exemples Réels',
    'demo.title': 'Testez nos prototypes en direct 📱',
    'demo.boutique_title': 'Boutique Dakar Style',
    'demo.boutique_desc': 'E-commerce avec panier, Wave & Carte',
    'demo.boutique_p': 'Vendez vos vêtements et accessoires au Sénégal et à la Diaspora avec Wave & Carte Bancaire.',
    'demo.boutique_btn': 'Tester la Démo Boutique ➔',
    'demo.restau_title': 'Le Teranga Restaurant',
    'demo.restau_desc': 'Menu interactif & Réservation',
    'demo.restau_p': 'Présentez votre menu, recevez les commandes et réservations de tables.',
    'demo.restau_btn': 'Tester la Démo Restaurant ➔',
    'demo.sante_title': 'Cabinet Médical Thiès',
    'demo.sante_desc': 'Prise de RDV en ligne 24h/24',
    'demo.sante_p': 'Système de réservation automatique pour médecins et prestataires de services.',
    'demo.sante_btn': 'Tester la Démo Santé ➔',

    // FAQ & CTA
    'faq.tag': 'Questions Fréquentes',
    'faq.title': 'Réponses à vos questions ❓',
    'faq.guarantee_title': 'Garantie & Sérénité 100%',
    'faq.guarantee_desc': "Modifications illimitées jusqu'à votre entière satisfaction avant la mise en ligne finale.",
    'cta.title': 'Prêt à lancer votre site web dès',
    'cta.subtitle': 'Profitez du paiement en 2 fois (50% au lancement, 50% à la livraison) en FCFA, Euro ou Dollar.',
    'cta.btn_order': 'Commander dès',
    'cta.btn_whatsapp': 'Discuter sur WhatsApp 📲',

    // Footer
    'footer.tagline': 'Agence web basée à Thiès, Sénégal. Création de sites internet professionnels pour PME, commerçants et la diaspora (Sénégal, Zone UEMOA, Europe & International).',
    'footer.payments': 'Moyens de paiement acceptés :',
    'footer.quick_links': 'Liens rapides',
    'footer.contact': 'Contact',
    'footer.rights': 'Tous droits réservés.',
  },
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.portfolio': 'Portfolio',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.quote': 'Free Quote',

    // Hero
    'hero.badge_prefix': '🔥 Your pro website starting from',
    'hero.badge_suffix': '(2-Step Payment Available)',
    'hero.title_pre': 'An exceptional website designed to',
    'hero.title_highlight': 'boost your business in Senegal & Internationally',
    'hero.subtitle': 'The human web agency based in Thiès. Supporting SMEs, shop owners, and the diaspora with direct Wave, Orange Money & Credit Card payments and 7-day express delivery.',
    'hero.cta': 'Start my project from',
    'hero.whatsapp': 'Chat on WhatsApp',
    'hero.counter_delivered': 'Websites Delivered',
    'hero.counter_starting': 'Starting Price',
    'hero.counter_split': 'Split Payment',

    // Founder
    'hero.founder_title': 'Founder & Lead Web Engineer',
    'hero.founder_quote': '“I personally guide you from project launch to live delivery.”',
    'hero.phone_status': 'Online',
    'hero.phone_delivery': '7-Day Delivery',
    'hero.phone_payment_ok': '50% Deposit Paid',
    'hero.phone_feature1': '100% Mobile Custom Design',
    'hero.phone_feature2': 'Wave, Orange Money & Stripe / Card',
    'hero.phone_tagline': '✨ Senegal & International Web Agency',

    // Pricing
    'pricing.tag': 'Transparent & Multi-Currency Rates',
    'pricing.title': 'Clear packages tailored for all regions 💳',
    'pricing.subtitle': 'Enjoy professional quality without breaking the bank. Pay in 2 installments (50% deposit, 50% on final delivery).',
    'pricing.starter_tag': 'Ideal for Starters',
    'pricing.starter_title': 'Showcase Package',
    'pricing.starter_deposit': 'Or',
    'pricing.starter_deposit_suffix': 'deposit required',
    'pricing.starter_f1': '✓ 1 to 4 page showcase website',
    'pricing.starter_f2': '✓ 100% Mobile Responsive Design',
    'pricing.starter_f3': '✓ Direct WhatsApp & Contact Button',
    'pricing.starter_f4': '✓ Free Domain & Hosting included',
    'pricing.starter_btn': 'Order Showcase Package',
    'pricing.pro_badge': '🔥 Best Seller (Senegal & Diaspora)',
    'pricing.pro_title': 'E-commerce Pro Package',
    'pricing.pro_f1': '✓ Unlimited Product Catalog',
    'pricing.pro_f2': '✓ Wave, Orange Money & Stripe / Credit Card',
    'pricing.pro_f3': '✓ Easy Inventory & Order Management',
    'pricing.pro_f4': '✓ Video training to manage your products',
    'pricing.pro_btn': 'Order E-commerce Package',
    'pricing.custom_tag': 'Custom Apps & Portals',
    'pricing.custom_title': 'Custom App Package',
    'pricing.custom_price': 'Custom Quote',
    'pricing.custom_from': 'Starting from',
    'pricing.custom_f1': '✓ Online Booking (Clinics, Salons)',
    'pricing.custom_f2': '✓ Tailored business workflow',
    'pricing.custom_f3': '✓ High-performance architecture',
    'pricing.custom_f4': '✓ VIP Support & Maintenance',
    'pricing.custom_btn': 'Request Custom Quote',

    // ROI & Devis
    'roi.tag': 'ROI Simulator',
    'roi.title': 'See how fast your website pays for itself 💡',
    'roi.subtitle': 'Enter your average item price to see in how many sales your site at',
    'roi.subtitle_end': 'is 100% paid off.',
    'roi.label': 'Average price of your products / services:',
    'roi.result_tag': 'Total ROI:',
    'roi.result_suffix': 'sales only!',
    'roi.result_desc': 'To 100% recover your website creation cost',
    'roi.btn': 'Start my profitable project 🚀',
    'devis.tag': 'Express Quote',
    'devis.title': 'Calculate your custom estimate 🎯',
    'devis.step1': '1. Selected package:',
    'devis.estimated': 'Total estimated cost:',
    'devis.split': '50% initial deposit option available',
    'devis.btn': 'Order on WhatsApp 🚀',

    // Payment Info Card
    'payment.tag': '🌍 Senegal & International Coverage',
    'payment.title': 'Payment Methods Tailored to Your Region 💳',
    'payment.desc': 'Whether you are in Senegal (UEMOA / BCEAO zone) or in the diaspora (Europe, USA, Canada, Worldwide), we securely accept your payments.',
    'payment.btn_all': '🌐 All Methods',
    'payment.btn_uemoa': '🇸🇳 Senegal & BCEAO / UEMOA Zone',
    'payment.btn_inter': '🇪🇺 🇺🇸 Europe, Diaspora & Worldwide',
    'payment.split_title': '2-Step Payment Option for Everyone',
    'payment.split_desc': '50% deposit at order and 50% balance upon live delivery (valid in FCFA, EUR and USD).',

    // Demos
    'demo.tag': 'Live Demos',
    'demo.title': 'Test our live interactive prototypes 📱',
    'demo.boutique_title': 'Dakar Fashion Store',
    'demo.boutique_desc': 'E-commerce with cart, Wave & Credit Card',
    'demo.boutique_p': 'Sell clothing and accessories in Senegal and to the Diaspora with Wave & Card payments.',
    'demo.boutique_btn': 'Test Store Demo ➔',
    'demo.restau_title': 'Teranga Restaurant',
    'demo.restau_desc': 'Interactive menu & Table booking',
    'demo.restau_p': 'Display your menu, receive online orders and table reservations.',
    'demo.restau_btn': 'Test Restaurant Demo ➔',
    'demo.sante_title': 'Thiès Medical Center',
    'demo.sante_desc': '24/7 Online Appointment Booking',
    'demo.sante_p': 'Automated booking system for doctors, clinics, and service providers.',
    'demo.sante_btn': 'Test Healthcare Demo ➔',

    // FAQ & CTA
    'faq.tag': 'Frequently Asked Questions',
    'faq.title': 'Answers to your questions ❓',
    'faq.guarantee_title': '100% Satisfaction Guarantee',
    'faq.guarantee_desc': 'Unlimited revisions until you are completely satisfied prior to final launch.',
    'cta.title': 'Ready to launch your website starting from',
    'cta.subtitle': 'Take advantage of 2-step payment (50% deposit, 50% on delivery) in FCFA, Euro or Dollar.',
    'cta.btn_order': 'Order from',
    'cta.btn_whatsapp': 'Chat on WhatsApp 📲',

    // Footer
    'footer.tagline': 'Web agency based in Thiès, Senegal. Professional website development for SMEs, business owners, and diaspora (Senegal, UEMOA zone, Europe & Worldwide).',
    'footer.payments': 'Accepted payment methods:',
    'footer.quick_links': 'Quick Links',
    'footer.contact': 'Contact',
    'footer.rights': 'All rights reserved.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('fr');

  useEffect(() => {
    const saved = localStorage.getItem('yakaar_lang') as Language;
    if (saved && (saved === 'fr' || saved === 'en')) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('yakaar_lang', lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['fr']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
