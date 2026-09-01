'use client';

import React from 'react';
import Link from 'next/link';
import { useCurrency } from '@/context/CurrencyContext';

export default function ServicesPricing() {
  const { formatPrice, currency } = useCurrency();

  const vitrinePrice = formatPrice(75000);
  const vitrineDeposit = formatPrice(37500);

  const ecommercePrice = formatPrice(190000);
  const ecommerceDeposit = formatPrice(95000);

  const maintenancePrice = formatPrice(15000, { isMonthly: true });
  const seoPrice = formatPrice(35000);
  const domainPrice = formatPrice(30000, { isAnnual: true });

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto">
        {/* Pack Starter */}
        <div className="bg-brand-light rounded-3xl p-8 border border-gray-200 shadow-lg hover:shadow-2xl transition-all relative flex flex-col justify-between">
          <div>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Idéal Démarrage
            </span>
            <h2 className="font-heading font-bold text-2xl mt-4 mb-2 text-brand-dark">Pack Vitrine</h2>
            <div className="my-4">
              <span className="font-heading font-extrabold text-4xl text-brand-accent">{vitrinePrice}</span>
              <p className="text-xs text-emerald-600 font-semibold mt-1">Soit {vitrineDeposit} à la commande</p>
            </div>
            <ul className="space-y-4 mb-8 text-gray-700 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Site vitrine moderne de 1 à 4 pages</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Design 100% optimisé mobile (Smartphone & Tablette)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Bouton d&apos;appel & WhatsApp direct</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Intégration Google Maps & Formulaire email</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Nom de domaine (.site ou .com) & Hébergement inclus</span>
              </li>
            </ul>
          </div>
          <Link 
            href="/contact" 
            className="block text-center bg-brand-dark text-white py-3.5 rounded-full font-bold hover:bg-brand-accent transition-colors"
          >
            Commander l&apos;Offre Vitrine ({vitrinePrice})
          </Link>
        </div>

        {/* Pack Pro E-commerce */}
        <div className="bg-white rounded-3xl p-8 border-2 border-brand-accent shadow-2xl transition-all relative flex flex-col justify-between transform md:-translate-y-4">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-brand-accent text-white text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider shadow">
            🔥 Le Plus Vendu (National & International)
          </div>
          <div>
            <h2 className="font-heading font-bold text-2xl mt-4 mb-2 text-brand-dark">Pack E-commerce Pro</h2>
            <div className="my-4">
              <span className="font-heading font-extrabold text-4xl text-brand-coral">{ecommercePrice}</span>
              <p className="text-xs text-emerald-600 font-semibold mt-1">Soit {ecommerceDeposit} à la commande</p>
            </div>
            <ul className="space-y-4 mb-8 text-gray-700 text-sm">
              <li className="flex items-start gap-3 font-semibold text-brand-dark">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Catalogue de produits & articles illimités</span>
              </li>
              <li className="flex items-start gap-3 text-emerald-700 font-bold">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Encaissement Wave, OM & Carte Bancaire / Stripe</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Panier d&apos;achat dynamique et gestion des stocks</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Notifications de commande instantanées sur WhatsApp</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Formation vidéo offerte pour ajouter vos produits vous-même</span>
              </li>
            </ul>
          </div>
          <Link 
            href="/contact" 
            className="block text-center bg-brand-coral text-brand-dark py-3.5 rounded-full font-bold hover:bg-amber-400 transition-colors shadow-lg"
          >
            Commander l&apos;Offre E-commerce ({ecommercePrice})
          </Link>
        </div>

        {/* Pack Sur-mesure */}
        <div className="bg-brand-light rounded-3xl p-8 border border-gray-200 shadow-lg hover:shadow-2xl transition-all relative flex flex-col justify-between">
          <div>
            <span className="bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Sur-Mesure & Apps
            </span>
            <h2 className="font-heading font-bold text-2xl mt-4 mb-2 text-brand-dark">Pack Sur-Mesure</h2>
            <div className="my-4">
              <span className="font-heading font-extrabold text-3xl text-brand-dark">Devis Adapté</span>
              <p className="text-xs text-gray-500 mt-1">À partir de {formatPrice(350000)}</p>
            </div>
            <ul className="space-y-4 mb-8 text-gray-700 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-purple-600 font-bold">✓</span>
                <span>Prise de rendez-vous en ligne (Cabinets, Salons)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 font-bold">✓</span>
                <span>Application Web complexe ou Plateforme de réservation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 font-bold">✓</span>
                <span>Intégration d&apos;API tierces et logiciels internes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 font-bold">✓</span>
                <span>Support technique & Maintenance VIP prioritaire</span>
              </li>
            </ul>
          </div>
          <Link 
            href="/contact" 
            className="block text-center bg-brand-dark text-white py-3.5 rounded-full font-bold hover:bg-brand-accent transition-colors"
          >
            Demander un Devis Sur-Mesure
          </Link>
        </div>
      </div>

      {/* OPTIONS COMPLÉMENTAIRES */}
      <div className="bg-brand-light rounded-3xl p-8 md:p-12 border border-gray-200 mb-12">
        <h2 className="font-heading font-bold text-2xl md:text-3xl mb-6 text-brand-dark text-center">
          Services & Options Complémentaires
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-heading font-bold text-lg mb-2 text-brand-dark">Maintenance & Sécurité</h3>
            <p className="text-gray-600 text-sm">Mises à jour régulières, sauvegardes automatiques et assistance WhatsApp.</p>
            <p className="text-brand-accent font-bold mt-3 text-sm">À partir de {maintenancePrice}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-heading font-bold text-lg mb-2 text-brand-dark">Référencement Google (SEO)</h3>
            <p className="text-gray-600 text-sm">Optimisation pour apparaître dans les 1ers résultats de recherche à Dakar & à l&apos;International.</p>
            <p className="text-brand-accent font-bold mt-3 text-sm">Inclus / Dès {seoPrice}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-heading font-bold text-lg mb-2 text-brand-dark">Nom de Domaine & Emails Pro</h3>
            <p className="text-gray-600 text-sm">Création de vos adresses pro type contact@votreentreprise.com / .sn.</p>
            <p className="text-brand-accent font-bold mt-3 text-sm">1ère année 100% offerte (Puis {domainPrice})</p>
          </div>
        </div>
      </div>
    </>
  );
}
