'use client';

import Link from 'next/link';
import { useState } from 'react';
import ScrollAnimations from '@/components/ScrollAnimations';

export default function BoutiqueDemo() {
  const [cart, setCart] = useState(0);

  return (
    <div className="min-h-screen bg-white">
      <ScrollAnimations />
      {/* Navigation */}
      <nav className="bg-brand-dark/95 backdrop-blur-sm text-white py-4 px-6 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="font-heading font-bold text-xl tracking-wide">👗 Mode Afrik</h1>
          <div className="hidden md:flex gap-8">
            <a href="#catalogue" className="hover:text-brand-accent transition-colors duration-300 font-medium">Catalogue</a>
            <a href="#apropos" className="hover:text-brand-accent transition-colors duration-300 font-medium">À propos</a>
            <a href="#contact" className="hover:text-brand-accent transition-colors duration-300 font-medium">Contact</a>
          </div>
          <div className="flex gap-4 items-center">
            <div className="relative">
              <span className="bg-brand-coral hover:bg-brand-coral/90 text-brand-dark px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 hover:scale-105 cursor-pointer">
                🛒 Panier ({cart})
              </span>
            </div>
            <Link href="/portfolio" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 hover:scale-105 border-2 border-white/30">
              ← Retour
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative text-white py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/boutique-1.jpg" 
            alt="Mode Afrik - Boutique de mode africaine" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/90 via-brand-accent/70 to-brand-coral/80"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in-up">
            <span className="inline-block bg-brand-coral text-brand-dark px-4 py-1 rounded-full text-sm font-bold mb-6">
              ✨ Nouvelle Collection 2024
            </span>
            <h2 className="font-heading font-extrabold text-5xl md:text-7xl mb-6 leading-tight">
              Mode Afrik
            </h2>
            <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-gray-100">
              La mode africaine moderne et authentique pour un style unique
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#catalogue" className="inline-block bg-brand-dark hover:bg-brand-dark/90 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl">
                👗 Découvrir la collection
              </a>
              <a href="#contact" className="inline-block bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 border-2 border-white/30">
                💬 Nous contacter
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gradient-to-b from-white to-brand-light/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 scroll-animate delay-100">
              <img 
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=600&fit=crop" 
                alt="100% Africain - Mode Afrik" 
                className="w-full h-64 object-cover img-zoom"
              />
              <div className="p-6 bg-white">
                <h4 className="font-heading font-bold text-xl mb-3 text-brand-dark">100% Africain</h4>
                <p className="text-gray-600">Tissus authentiques et design inspiré de la culture africaine</p>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 scroll-animate delay-200">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop" 
                alt="Qualité Premium - Mode Afrik" 
                className="w-full h-64 object-cover img-zoom"
              />
              <div className="p-6 bg-white">
                <h4 className="font-heading font-bold text-xl mb-3 text-brand-dark">Qualité Premium</h4>
                <p className="text-gray-600">Matériaux de haute qualité pour un confort optimal</p>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 scroll-animate delay-300">
              <img 
                src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&h=600&fit=crop" 
                alt="Livraison Rapide - Mode Afrik" 
                className="w-full h-64 object-cover img-zoom"
              />
              <div className="p-6 bg-white">
                <h4 className="font-heading font-bold text-xl mb-3 text-brand-dark">Livraison Rapide</h4>
                <p className="text-gray-600">Livraison partout au Sénégal en 48h maximum</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue */}
      <section id="catalogue" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 scroll-animate">
            <span className="inline-block bg-brand-accent/20 text-brand-accent px-4 py-1 rounded-full text-sm font-bold mb-4">
              COLLECTION
            </span>
            <h3 className="font-heading font-extrabold text-4xl md:text-5xl text-brand-dark mb-4">
              Notre Collection
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez nos pièces uniques alliant tradition et modernité
            </p>
          </div>
          
          <div className="rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 scroll-animate delay-200">
            <img 
              src="/boutique-2.png" 
              alt="Notre collection - Boutique" 
              className="w-full h-auto object-cover img-zoom"
            />
          </div>
        </div>
      </section>

      {/* Paiement */}
      <section className="py-20 bg-gradient-to-br from-brand-light to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-brand-coral/20 text-brand-coral px-4 py-1 rounded-full text-sm font-bold mb-4">
              PAIEMENT
            </span>
            <h3 className="font-heading font-extrabold text-4xl md:text-5xl text-brand-dark mb-4">
              Modes de Paiement
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Payez facilement avec vos solutions mobiles préférées
            </p>
          </div>
          <div className="flex justify-center gap-8 flex-wrap max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex-1 min-w-[200px]">
              <div className="w-20 h-20 bg-brand-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-3xl">W</span>
              </div>
              <h4 className="font-heading font-bold text-xl mb-2 text-brand-dark text-center">Wave</h4>
              <p className="text-gray-600 text-center text-sm">Instantané et sécurisé</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex-1 min-w-[200px]">
              <div className="w-20 h-20 bg-brand-coral rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-3xl">OM</span>
              </div>
              <h4 className="font-heading font-bold text-xl mb-2 text-brand-dark text-center">Orange Money</h4>
              <p className="text-gray-600 text-center text-sm">Rapide et fiable</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex-1 min-w-[200px]">
              <div className="w-20 h-20 bg-brand-dark rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-3xl">💳</span>
              </div>
              <h4 className="font-heading font-bold text-xl mb-2 text-brand-dark text-center">Carte Bancaire</h4>
              <p className="text-gray-600 text-center text-sm">Visa & Mastercard</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-brand-dark text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="font-heading font-extrabold text-4xl md:text-5xl mb-4">
              Contactez-nous
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Notre équipe est à votre disposition pour toute question
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-brand-coral rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📍</span>
              </div>
              <h4 className="font-heading font-bold text-xl mb-2">Adresse</h4>
              <p className="text-gray-300">Thiès, Sénégal</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-brand-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📞</span>
              </div>
              <h4 className="font-heading font-bold text-xl mb-2">Téléphone</h4>
              <p className="text-gray-300">+221 77 123 45 67</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-brand-dark rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 border-brand-accent">
                <span className="text-3xl">📧</span>
              </div>
              <h4 className="font-heading font-bold text-xl mb-2">Email</h4>
              <p className="text-gray-300">contact@modeafrik.sn</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-dark/95 text-white py-12 text-center border-t border-white/10">
        <div className="container mx-auto px-4">
          <p className="text-gray-400 mb-4">© 2026 Mode Afrik</p>
          <p className="text-sm text-gray-500">Site de démonstration par <span className="text-brand-accent font-bold">Yakaar Web</span></p>
        </div>
      </footer>
    </div>
  );
}
