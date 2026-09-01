'use client';

import Link from 'next/link';
import { useState } from 'react';
import ScrollAnimations from '@/components/ScrollAnimations';

export default function ServicesDemo() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  return (
    <div className="min-h-screen bg-white">
      <ScrollAnimations />
      {/* Navigation */}
      <nav className="bg-brand-dark/95 backdrop-blur-sm text-white py-4 px-6 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="font-heading font-bold text-xl tracking-wide">🏥 Clinique Thiès</h1>
          <div className="hidden md:flex gap-8">
            <a href="#equipe" className="hover:text-brand-accent transition-colors duration-300 font-medium">Équipe</a>
            <a href="#services" className="hover:text-brand-accent transition-colors duration-300 font-medium">Services</a>
            <a href="#rdv" className="hover:text-brand-accent transition-colors duration-300 font-medium">Rendez-vous</a>
          </div>
          <Link href="/portfolio" className="bg-brand-coral hover:bg-brand-coral/90 text-brand-dark px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 hover:scale-105">
            ← Retour
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative text-white py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/clinique-1.jpg" 
            alt="Clinique Thiès - Cabinet médical" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-coral/90 via-brand-coral/70 to-brand-dark/80"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in-up">
            <span className="inline-block bg-brand-accent text-white px-4 py-1 rounded-full text-sm font-bold mb-6">
              ✨ Soins de Qualité
            </span>
            <h2 className="font-heading font-extrabold text-5xl md:text-7xl mb-6 leading-tight">
              Clinique Thiès
            </h2>
            <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-gray-100">
              Votre santé, notre priorité - Des soins professionnels au Sénégal
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#rdv" className="inline-block bg-brand-accent hover:bg-brand-accent/90 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl">
                📅 Prendre rendez-vous
              </a>
              <a href="#services" className="inline-block bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 border-2 border-white/30">
                🩺 Nos services
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
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop" 
                alt="Médecins Experts - Clinique Thiès" 
                className="w-full h-64 object-cover img-zoom"
              />
              <div className="p-6 bg-white">
                <h4 className="font-heading font-bold text-xl mb-3 text-brand-dark">Médecins Experts</h4>
                <p className="text-gray-600">Équipe qualifiée avec des années d&apos;expérience</p>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 scroll-animate delay-200">
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop" 
                alt="Équipement Moderne - Clinique Thiès" 
                className="w-full h-64 object-cover img-zoom"
              />
              <div className="p-6 bg-white">
                <h4 className="font-heading font-bold text-xl mb-3 text-brand-dark">Équipement Moderne</h4>
                <p className="text-gray-600">Technologie de pointe pour des diagnostics précis</p>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 scroll-animate delay-300">
              <img 
                src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=600&fit=crop" 
                alt="Soins Personnalisés - Clinique Thiès" 
                className="w-full h-64 object-cover img-zoom"
              />
              <div className="p-6 bg-white">
                <h4 className="font-heading font-bold text-xl mb-3 text-brand-dark">Soins Personnalisés</h4>
                <p className="text-gray-600">Approche centrée sur le patient pour votre bien-être</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Équipe */}
      <section id="equipe" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 scroll-animate">
            <span className="inline-block bg-brand-accent/20 text-brand-accent px-4 py-1 rounded-full text-sm font-bold mb-4">
              ÉQUIPE
            </span>
            <h3 className="font-heading font-extrabold text-4xl md:text-5xl text-brand-dark mb-4">
              Notre Équipe
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Des professionnels qualifiés à votre service
            </p>
          </div>
          
          <div className="rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 scroll-animate delay-200">
            <img 
              src="/clinique-3.png" 
              alt="Notre équipe médicale - Clinique Thiès" 
              className="w-full h-auto object-cover img-zoom"
            />
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-gradient-to-br from-brand-light to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 scroll-animate">
            <span className="inline-block bg-brand-coral/20 text-brand-coral px-4 py-1 rounded-full text-sm font-bold mb-4">
              SERVICES
            </span>
            <h3 className="font-heading font-extrabold text-4xl md:text-5xl text-brand-dark mb-4">
              Nos Services
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Une gamme complète de soins pour répondre à vos besoins
            </p>
          </div>
          
          <div className="rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 scroll-animate delay-200">
            <img 
              src="/clinique-team.jpeg" 
              alt="Nos services - Clinique Thiès" 
              className="w-full h-auto object-cover img-zoom"
            />
          </div>
        </div>
      </section>

      {/* Équipements */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 scroll-animate">
            <span className="inline-block bg-brand-accent/20 text-brand-accent px-4 py-1 rounded-full text-sm font-bold mb-4">
              ÉQUIPEMENTS
            </span>
            <h3 className="font-heading font-extrabold text-4xl md:text-5xl text-brand-dark mb-4">
              Nos Équipements
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Technologie de pointe pour des soins de qualité
            </p>
          </div>
          
          <div className="rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 scroll-animate delay-200">
            <img 
              src="/clinique-2.png" 
              alt="Nos équipements - Clinique Thiès" 
              className="w-full h-auto object-cover img-zoom"
            />
          </div>
        </div>
      </section>

      {/* Prise de rendez-vous */}
      <section id="rdv" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-brand-accent/20 text-brand-accent px-4 py-1 rounded-full text-sm font-bold mb-4">
              RENDEZ-VOUS
            </span>
            <h3 className="font-heading font-extrabold text-4xl md:text-5xl text-brand-dark mb-4">
              Prendre Rendez-vous
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Réservez facilement en ligne avec nos médecins
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto bg-gradient-to-br from-brand-light to-white rounded-3xl p-10 shadow-2xl">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-bold mb-2 text-brand-dark">Nom complet</label>
                <input type="text" className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/20 transition-all duration-300" placeholder="Votre nom" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 text-brand-dark">Téléphone</label>
                <input type="tel" className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/20 transition-all duration-300" placeholder="+221 XX XXX XX XX" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 text-brand-dark">Médecin souhaité</label>
                <select className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/20 transition-all duration-300">
                  <option>Médecin Généraliste</option>
                  <option>Dr. Amadou Diop</option>
                  <option>Dr. Fatou Sow (Pédiatre)</option>
                  <option>Dr. Ibrahima Fall (Cardiologue)</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2 text-brand-dark">Date</label>
                  <input 
                    type="date" 
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/20 transition-all duration-300"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-brand-dark">Heure</label>
                  <select 
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/20 transition-all duration-300"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                  >
                    <option value="">Sélectionner</option>
                    <option value="09:00">09:00</option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                    <option value="14:00">14:00</option>
                    <option value="15:00">15:00</option>
                    <option value="16:00">16:00</option>
                    <option value="17:00">17:00</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 text-brand-dark">Motif de consultation</label>
                <textarea className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/20 transition-all duration-300" rows={3} placeholder="Décrivez le motif de votre consultation" />
              </div>
              <button type="submit" className="w-full bg-brand-accent hover:bg-brand-accent/90 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl">
                🎉 Confirmer le rendez-vous
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Informations pratiques */}
      <section className="py-20 bg-brand-dark text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="font-heading font-extrabold text-4xl md:text-5xl mb-4">
              Informations Pratiques
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Venez nous rendre visite pour des soins de qualité
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-brand-coral rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📍</span>
              </div>
              <h4 className="font-heading font-bold text-xl mb-2">Adresse</h4>
              <p className="text-gray-300">Thiès, Sénégal</p>
              <p className="text-gray-300">Quartier Médina</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-brand-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⏰</span>
              </div>
              <h4 className="font-heading font-bold text-xl mb-2">Horaires</h4>
              <p className="text-gray-300">Lun - Ven : 8h - 18h</p>
              <p className="text-gray-300">Samedi : 8h - 14h</p>
              <p className="text-gray-300">Urgences : 24h/24</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-brand-dark rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 border-brand-accent">
                <span className="text-3xl">📞</span>
              </div>
              <h4 className="font-heading font-bold text-xl mb-2">Contact</h4>
              <p className="text-gray-300">+221 77 123 45 67</p>
              <p className="text-gray-300">+221 33 123 45 67</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-dark/95 text-white py-12 text-center border-t border-white/10">
        <div className="container mx-auto px-4">
          <p className="text-gray-400 mb-4">© 2026 Clinique Thiès</p>
          <p className="text-sm text-gray-500">Site de démonstration par <span className="text-brand-accent font-bold">Yakaar Web</span></p>
        </div>
      </footer>
    </div>
  );
}
