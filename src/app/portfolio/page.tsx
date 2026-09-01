import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: "Portfolio - Yakaar Web",
  description: "Découvrez nos réalisations : sites de restaurants, boutiques en ligne et cabinets de services.",
};

export default function Portfolio() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-brand-dark text-white py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl mb-6">
              Nos réalisations
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Découvrez quelques-uns de nos projets récents
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <div className="h-64 bg-gradient-to-br from-brand-dark to-brand-accent flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-20 h-20 text-white mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span className="text-white font-heading font-bold text-3xl">Le Terroir Sénégalais</span>
                  </div>
                </div>
                <div className="p-8 bg-brand-light">
                  <h2 className="font-heading font-bold text-2xl mb-4 text-brand-dark">Restaurant & Café</h2>
                  <p className="text-gray-700 mb-6">
                    Site vitrine moderne pour un restaurant traditionnel sénégalais. Le site présente le menu complet, 
                    permet la réservation de tables en ligne, et dispose d&apos;une galerie photo des plats et de l&apos;ambiance du lieu.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-brand-accent bg-opacity-20 text-brand-dark px-3 py-1 rounded-full text-sm font-medium">
                      Menu en ligne
                    </span>
                    <span className="bg-brand-accent bg-opacity-20 text-brand-dark px-3 py-1 rounded-full text-sm font-medium">
                      Réservation
                    </span>
                    <span className="bg-brand-accent bg-opacity-20 text-brand-dark px-3 py-1 rounded-full text-sm font-medium">
                      Galerie photo
                    </span>
                  </div>
                  <div className="border-t border-gray-300 pt-6">
                    <h3 className="font-heading font-bold text-lg mb-3 text-brand-dark">Fonctionnalités</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Affichage du menu avec catégories (entrées, plats, desserts)</li>
                      <li>• Système de réservation avec confirmation par email</li>
                      <li>• Intégration Google Maps pour l&apos;itinéraire</li>
                      <li>• Section avis clients</li>
                      <li>• Design responsive optimisé mobile</li>
                    </ul>
                  </div>
                  <div className="mt-6">
                    <a 
                      href="/demo/restaurant" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-brand-accent text-white px-6 py-3 rounded-full font-bold hover:bg-opacity-90 transition-colors"
                    >
                      Voir le site de démonstration →
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-xl">
                <div className="h-64 bg-gradient-to-br from-brand-accent to-brand-coral flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-20 h-20 text-white mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span className="text-white font-heading font-bold text-3xl">Mode Afrik</span>
                  </div>
                </div>
                <div className="p-8 bg-brand-light">
                  <h2 className="font-heading font-bold text-2xl mb-4 text-brand-dark">Boutique en ligne</h2>
                  <p className="text-gray-700 mb-6">
                    E-commerce pour une boutique de mode africaine. Le site permet aux clients de parcourir le catalogue,
                    d&apos;ajouter des articles au panier et de payer en ligne via Wave ou Orange Money.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-brand-accent bg-opacity-20 text-brand-dark px-3 py-1 rounded-full text-sm font-medium">
                      Catalogue produits
                    </span>
                    <span className="bg-brand-accent bg-opacity-20 text-brand-dark px-3 py-1 rounded-full text-sm font-medium">
                      Panier
                    </span>
                    <span className="bg-brand-accent bg-opacity-20 text-brand-dark px-3 py-1 rounded-full text-sm font-medium">
                      Paiement mobile
                    </span>
                  </div>
                  <div className="border-t border-gray-300 pt-6">
                    <h3 className="font-heading font-bold text-lg mb-3 text-brand-dark">Fonctionnalités</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Catalogue avec filtres par catégorie et taille</li>
                      <li>• Recherche de produits</li>
                      <li>• Panier dynamique avec calcul automatique</li>
                      <li>• Intégration Wave et Orange Money</li>
                      <li>• Suivi de commande par email</li>
                    </ul>
                  </div>
                  <div className="mt-6">
                    <a 
                      href="/demo/boutique" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-brand-accent text-white px-6 py-3 rounded-full font-bold hover:bg-opacity-90 transition-colors"
                    >
                      Voir le site de démonstration →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <div className="h-64 bg-gradient-to-br from-brand-coral to-brand-dark flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-20 h-20 text-white mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span className="text-white font-heading font-bold text-3xl">Clinique Thiès</span>
                  </div>
                </div>
                <div className="p-8 bg-brand-light">
                  <h2 className="font-heading font-bold text-2xl mb-4 text-brand-dark">Cabinet médical</h2>
                  <p className="text-gray-700 mb-6">
                    Site web pour un cabinet de santé avec système de prise de rendez-vous en ligne.
                    Les patients peuvent consulter les disponibilités des médecins et réserver leur créneau.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-brand-accent bg-opacity-20 text-brand-dark px-3 py-1 rounded-full text-sm font-medium">
                      Présentation équipe
                    </span>
                    <span className="bg-brand-accent bg-opacity-20 text-brand-dark px-3 py-1 rounded-full text-sm font-medium">
                      Rendez-vous
                    </span>
                    <span className="bg-brand-accent bg-opacity-20 text-brand-dark px-3 py-1 rounded-full text-sm font-medium">
                      Services
                    </span>
                  </div>
                  <div className="border-t border-gray-300 pt-6">
                    <h3 className="font-heading font-bold text-lg mb-3 text-brand-dark">Fonctionnalités</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Présentation de l&apos;équipe médicale</li>
                      <li>• Calendrier de disponibilité en temps réel</li>
                      <li>• Prise de rendez-vous avec confirmation SMS</li>
                      <li>• Informations pratiques (horaires, tarifs)</li>
                      <li>• Espace patient sécurisé (optionnel)</li>
                    </ul>
                  </div>
                  <div className="mt-6">
                    <a 
                      href="/demo/services" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-brand-accent text-white px-6 py-3 rounded-full font-bold hover:bg-opacity-90 transition-colors"
                    >
                      Voir le site de démonstration →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-brand-dark text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-heading font-bold text-3xl mb-6">
              Vous avez un projet similaire ?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Discutons de votre projet et créons ensemble le site web parfait pour votre activité
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-brand-coral text-brand-dark px-8 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transition-colors"
            >
              Démarrer un projet
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
