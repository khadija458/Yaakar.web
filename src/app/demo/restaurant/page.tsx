import Link from 'next/link';
import ScrollAnimations from '@/components/ScrollAnimations';

export default function RestaurantDemo() {
  return (
    <div className="min-h-screen bg-white">
      <ScrollAnimations />
      {/* Navigation */}
      <nav className="bg-brand-dark/95 backdrop-blur-sm text-white py-4 px-6 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="font-heading font-bold text-xl tracking-wide">🍽️ Le Terroir Sénégalais</h1>
          <div className="hidden md:flex gap-8">
            <a href="#menu" className="hover:text-brand-accent transition-colors duration-300 font-medium">Menu</a>
            <a href="#reservation" className="hover:text-brand-accent transition-colors duration-300 font-medium">Réservation</a>
            <a href="#contact" className="hover:text-brand-accent transition-colors duration-300 font-medium">Contact</a>
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
            src="/restaurant-1.jpg" 
            alt="Restaurant Le Terroir Sénégalais" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/90 via-brand-dark/70 to-brand-accent/80"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in-up">
            <span className="inline-block bg-brand-coral text-brand-dark px-4 py-1 rounded-full text-sm font-bold mb-6">
              ✨ Cuisine Authentique
            </span>
            <h2 className="font-heading font-extrabold text-5xl md:text-7xl mb-6 leading-tight">
              Le Terroir<br />Sénégalais
            </h2>
            <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-gray-100">
              Découvrez les saveurs du Sénégal dans une ambiance moderne et chaleureuse
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#menu" className="inline-block bg-brand-coral hover:bg-brand-coral/90 text-brand-dark px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl">
                🍴 Voir le menu
              </a>
              <a href="#reservation" className="inline-block bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 border-2 border-white/30">
                📅 Réserver une table
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gradient-to-b from-white to-brand-light/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 scroll-animate">
            <span className="inline-block bg-brand-accent/20 text-brand-accent px-4 py-1 rounded-full text-sm font-bold mb-4">
              NOTRE ÉQUIPE
            </span>
            <h3 className="font-heading font-extrabold text-4xl md:text-5xl text-brand-dark mb-4">
              Notre Équipe
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Des chefs passionnés à votre service
            </p>
          </div>
          
          <div className="rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 scroll-animate delay-200">
            <img 
              src="/restaurant-services.jpeg" 
              alt="Notre équipe - Le Terroir Sénégalais" 
              className="w-full h-auto object-cover img-zoom"
            />
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 scroll-animate">
            <span className="inline-block bg-brand-accent/20 text-brand-accent px-4 py-1 rounded-full text-sm font-bold mb-4">
              NOS SERVICES
            </span>
            <h3 className="font-heading font-extrabold text-4xl md:text-5xl text-brand-dark mb-4">
              Nos Services
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez notre gamme complète de services pour tous vos événements
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 scroll-animate delay-100">
              <img 
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop" 
                alt="Restaurant - Le Terroir Sénégalais" 
                className="w-full h-64 object-cover img-zoom"
              />
              <div className="p-6 bg-white">
                <h4 className="font-heading font-bold text-xl mb-3 text-brand-dark">Restaurant</h4>
                <p className="text-gray-600">Cuisine sénégalaise traditionnelle et internationale</p>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 scroll-animate delay-200">
              <img 
                src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&h=600&fit=crop" 
                alt="Événements - Le Terroir Sénégalais" 
                className="w-full h-64 object-cover img-zoom"
              />
              <div className="p-6 bg-white">
                <h4 className="font-heading font-bold text-xl mb-3 text-brand-dark">Événements</h4>
                <p className="text-gray-600">Organisation d&apos;événements privés et professionnels</p>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 scroll-animate delay-300">
              <img 
                src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&h=600&fit=crop" 
                alt="Livraison - Le Terroir Sénégalais" 
                className="w-full h-64 object-cover img-zoom"
              />
              <div className="p-6 bg-white">
                <h4 className="font-heading font-bold text-xl mb-3 text-brand-dark">Livraison</h4>
                <p className="text-gray-600">Livraison à domicile pour vos commandes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plats */}
      <section className="py-20 bg-gradient-to-b from-white to-brand-light/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 scroll-animate">
            <span className="inline-block bg-brand-coral/20 text-brand-coral px-4 py-1 rounded-full text-sm font-bold mb-4">
              SPÉCIALITÉS
            </span>
            <h3 className="font-heading font-extrabold text-4xl md:text-5xl text-brand-dark mb-4">
              Nos Plats
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez nos spécialités sénégalaises préparées avec amour
            </p>
          </div>
          
          <div className="rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 scroll-animate delay-200">
            <img 
              src="/restaurant-2.png" 
              alt="Nos spécialités - Le Terroir Sénégalais" 
              className="w-full h-auto object-cover img-zoom"
            />
          </div>
        </div>
      </section>

      {/* Réservation */}
      <section id="reservation" className="py-20 bg-gradient-to-br from-brand-light to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-brand-coral/20 text-brand-coral px-4 py-1 rounded-full text-sm font-bold mb-4">
              RÉSERVATION
            </span>
            <h3 className="font-heading font-extrabold text-4xl md:text-5xl text-brand-dark mb-4">
              Réservez Votre Table
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Réservez facilement en ligne et recevez une confirmation instantanée
            </p>
          </div>
          <div className="max-w-xl mx-auto bg-white rounded-3xl p-10 shadow-2xl">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-bold mb-2 text-brand-dark">Nom complet</label>
                <input type="text" className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/20 transition-all duration-300" placeholder="Votre nom" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 text-brand-dark">Téléphone</label>
                <input type="tel" className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/20 transition-all duration-300" placeholder="+221 XX XXX XX XX" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2 text-brand-dark">Date</label>
                  <input type="date" className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/20 transition-all duration-300" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-brand-dark">Personnes</label>
                  <select className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/20 transition-all duration-300">
                    <option>1 personne</option>
                    <option>2 personnes</option>
                    <option>3 personnes</option>
                    <option>4 personnes</option>
                    <option>5+ personnes</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full bg-brand-accent hover:bg-brand-accent/90 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl">
                🎉 Réserver maintenant
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-brand-dark text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="font-heading font-extrabold text-4xl md:text-5xl mb-4">
              Nous Trouver
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Venez nous rendre visite pour une expérience inoubliable
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
                <span className="text-3xl">⏰</span>
              </div>
              <h4 className="font-heading font-bold text-xl mb-2">Horaires</h4>
              <p className="text-gray-300">Lun - Dim : 11h - 23h</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-dark/95 text-white py-12 text-center border-t border-white/10">
        <div className="container mx-auto px-4">
          <p className="text-gray-400 mb-4">© 2026 Le Terroir Sénégalais</p>
          <p className="text-sm text-gray-500">Site de démonstration par <span className="text-brand-accent font-bold">Yakaar Web</span></p>
        </div>
      </footer>
    </div>
  );
}
