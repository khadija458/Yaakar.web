import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServicesPricing from '@/components/ServicesPricing';
import PaymentMethodsInfo from '@/components/PaymentMethodsInfo';

export const metadata = {
  title: "Services & Tarifs International & Sénégal - Yakaar Web",
  description: "Découvrez nos offres de création de sites internet dès 75 000 FCFA / 115 € / $125. Paiement en 2x (Wave, Orange Money, Carte Bancaire, Stripe, Virement).",
};

export default function Services() {
  return (
    <>
      <Header />
      <main className="bg-brand-light">
        {/* HEADER SECTION */}
        <section className="bg-gradient-to-br from-brand-dark via-[#14423b] to-brand-dark text-white py-16 md:py-24">
          <div className="container mx-auto px-4 text-center space-y-4">
            <span className="bg-white/10 text-brand-coral px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-white/20">
              Offres & Tarifs Abordables (FCFA • EUR • USD)
            </span>
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl">
              Des services web d&apos;excellence nationaux & internationaux 🌍🇸🇳
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Des tarifs adaptés aux PME au Sénégal et à la diaspora. Possibilité de régler en <strong>2 fois (50% au lancement, 50% à la livraison)</strong>.
            </p>
          </div>
        </section>

        {/* GRILLE D'OFFRES ACCESSIBLES ET MOYENS DE PAIEMENT */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <ServicesPricing />

            {/* MOYENS DE PAIEMENT SECTORISATION */}
            <PaymentMethodsInfo className="mt-12" />
          </div>
        </section>

        <section className="py-16 md:py-24 bg-brand-dark text-white">
          <div className="container mx-auto px-4 text-center space-y-6 max-w-3xl">
            <h2 className="font-heading font-bold text-3xl md:text-4xl">
              Prêt à discuter de votre projet avec notre équipe ?
            </h2>
            <p className="text-xl text-gray-300 font-light">
              Contactez-nous directement sur WhatsApp pour une réponse en moins de 15 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="bg-brand-coral text-brand-dark px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-400 transition-colors shadow-lg"
              >
                Formulaire de Contact
              </Link>
              <a 
                href="https://wa.me/221775439397?text=Bonjour%20Yakaar%20Web%2C%20je%20souhaite%20des%20informations%20sur%20vos%20services" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-500 transition-colors shadow-lg"
              >
                WhatsApp Direct 📲
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
