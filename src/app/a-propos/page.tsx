import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: "À propos - Yakaar Web",
  description: "Découvrez Yakaar Web, agence web basée à Thiès, Sénégal. Notre mission : démocratiser la présence en ligne pour les entreprises locales.",
};

export default function About() {
  return (
    <>
      <Header />
      <main className="bg-brand-light overflow-hidden">
        {/* HERO SECTION */}
        <section className="bg-gradient-to-br from-brand-dark via-[#164740] to-brand-dark text-white py-16 md:py-24 relative">
          <div className="container mx-auto px-4 text-center relative z-10">
            <span className="bg-white/10 backdrop-blur-md text-brand-coral px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-4 inline-block">
              Notre Histoire & Vision
            </span>
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl mb-6">
              À propos de Yakaar Web
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
              Une agence web humaine, ancrée à Thiès et au service du rayonnement des entreprises du Sénégal et de la diaspora.
            </p>
          </div>
        </section>

        {/* MISSION & VALEURS */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="bg-brand-accent/10 text-brand-accent px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Pourquoi Yakaar ?
                </span>
                <h2 className="font-heading font-bold text-3xl sm:text-4xl text-brand-dark">
                  L&apos;espoir d&apos;une présence web d&apos;excellence pour tous
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  <strong className="text-brand-accent font-semibold">Yakaar</strong> signifie « espoir » en wolof. 
                  Ce nom reflète notre engagement d&apos;offrir à chaque entrepreneur, PME, commerçant et médecin au Sénégal la possibilité de posséder un site web de niveau international.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Nous croyons fermement que le digital ne doit pas être réservé aux géants multinationaux. Notre mission est de 
                  <strong> démocratiser la création web d&apos;élite</strong> en proposant des tarifs transparents et adaptés à la réalité du marché sénégalais.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Basés à Thiès, nous intervenons à Dakar, partout au Sénégal et auprès de la diaspora (France, USA, Italie, Canada). Nous connaissons vos défis et parlons votre langage.
                </p>
              </div>

              <div className="bg-gradient-to-br from-brand-dark to-[#164740] rounded-3xl p-8 sm:p-10 text-white shadow-xl space-y-6">
                <h3 className="font-heading font-bold text-2xl mb-2 text-brand-coral">Nos 4 Engagements</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0 text-brand-accent font-bold text-xl">
                      01
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Transparence Totale</h4>
                      <p className="text-gray-300 text-sm">Tarifs fixes, aucun coût caché, hébergement et nom de domaine inclus dès le départ.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0 text-brand-accent font-bold text-xl">
                      02
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Rapidité de Livraison</h4>
                      <p className="text-gray-300 text-sm">Votre site vitrine livré et prêt à l&apos;emploi en 7 à 14 jours ouvrés.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0 text-brand-accent font-bold text-xl">
                      03
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Intégration Locale (Wave & OM)</h4>
                      <p className="text-gray-300 text-sm">Des solutions adaptées aux moyens de paiement et habitudes de vos clients sénégalais.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0 text-brand-accent font-bold text-xl">
                      04
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Accompagnement & Formation</h4>
                      <p className="text-gray-300 text-sm">Nous vous formons pour mettre à jour vos produits et contenus en toute autonomie.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FONDATEUR */}
        <section className="py-16 md:py-24 bg-brand-light">
          <div className="container mx-auto px-4">
            <h2 className="font-heading font-extrabold text-3xl mb-12 text-brand-dark text-center">
              À la tête de Yakaar Web
            </h2>
            <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
              <div className="md:flex">
                <div className="md:w-1/3 bg-gradient-to-br from-brand-dark to-brand-accent flex items-center justify-center p-8">
                  <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg bg-cover bg-center" style={{ backgroundImage: "url('/hero-image.png')" }}></div>
                </div>
                <div className="md:w-2/3 p-8 sm:p-10 space-y-4">
                  <div>
                    <h3 className="font-heading font-bold text-2xl text-brand-dark">Soxna Khadija Rassoul Dia</h3>
                    <p className="text-brand-accent font-bold text-sm">Fondatrice & Ingénieure Web</p>
                  </div>
                  <p className="text-gray-700 text-base leading-relaxed">
                    Passionnée par les nouvelles technologies et l&apos;écosystème entrepreneurial sénégalais, j&apos;ai créé Yakaar Web avec une ambition claire : fournir des outils digitaux haut de gamme pour accélérer le business de nos entreprises locales.
                  </p>
                  <p className="text-gray-700 text-base leading-relaxed">
                    Chaque projet que nous concevons allie design moderne, vitesse de chargement et stratégie de conversion pour apporter un retour sur investissement rapide à nos clients.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-16 md:py-24 bg-brand-dark text-white text-center">
          <div className="container mx-auto px-4 space-y-6 max-w-2xl">
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl">
              Faisons grandir votre entreprise ensemble
            </h2>
            <p className="text-xl text-gray-300 font-light">
              Discutons de votre projet autour d&apos;un appel ou directement sur WhatsApp.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="bg-brand-coral text-brand-dark px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-400 transition-colors shadow-lg"
              >
                Demander mon devis gratuit
              </a>
              <a 
                href="https://wa.me/221775439397" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-500 transition-colors shadow-lg"
              >
                Discuter sur WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
