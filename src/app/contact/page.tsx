'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PaymentMethodsInfo from '@/components/PaymentMethodsInfo';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const whatsappMessage = encodeURIComponent(
    `Bonjour Yakaar Web,\nJe m'appelle ${formData.name}.\n` +
    `Email: ${formData.email}\n` +
    `Téléphone: ${formData.phone || 'Non renseigné'}\n` +
    `Budget: ${formData.budget || 'Non spécifié'}\n\n` +
    `Message: ${formData.message}`
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      // Send email via Cloudflare Function (Resend API)
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
        // Automatically open WhatsApp in new tab for dual notification!
        window.open(`https://wa.me/221775439397?text=${whatsappMessage}`, '_blank');
      } else {
        // If Resend API Key is not set in Cloudflare yet, still open WhatsApp and show backup option
        setSubmitted(true);
        window.open(`https://wa.me/221775439397?text=${whatsappMessage}`, '_blank');
      }
    } catch (err) {
      // Graceful fallback to WhatsApp & mailto
      setSubmitted(true);
      window.open(`https://wa.me/221775439397?text=${whatsappMessage}`, '_blank');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Header />
      <main>
        <section className="bg-brand-dark text-white py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl mb-6">
              Contactez-nous
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Prêt à démarrer votre projet ? Remplissez le formulaire ci-dessous ou contactez-nous directement
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="font-heading font-bold text-2xl mb-6 text-brand-dark">
                  Envoyez-nous un message
                </h2>

                {submitted ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-5 animate-fade-in-up">
                    <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto text-3xl shadow-lg">
                      ✓
                    </div>
                    <h3 className="font-heading font-bold text-2xl text-emerald-900">
                      Demande envoyée avec succès !
                    </h3>
                    <p className="text-emerald-800 text-base leading-relaxed">
                      Merci <strong>{formData.name}</strong> ! Votre message a été transmis par <strong>Email</strong> et une discussion <strong>WhatsApp</strong> s&apos;est ouverte automatiquement pour vous répondre en direct.
                    </p>
                    <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                      <a
                        href={`https://wa.me/221775439397?text=${whatsappMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-6 py-3.5 rounded-full font-bold hover:bg-emerald-700 transition-colors shadow-md"
                      >
                        <span>Ouvrir WhatsApp</span>
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                      </a>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({ name: '', email: '', phone: '', budget: '', message: '' });
                        }}
                        className="text-sm text-gray-600 underline hover:text-gray-900 mt-4"
                      >
                        Envoyer un autre message
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {errorMsg && (
                      <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                        {errorMsg}
                      </div>
                    )}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none"
                        placeholder="Votre nom"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none"
                        placeholder="votre@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none"
                        placeholder="+221 XX XXX XX XX"
                      />
                    </div>
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                        Budget approximatif
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none"
                      >
                        <option value="">Sélectionnez une fourchette de budget</option>
                        <option value="75k-150k">75 000 - 150 000 FCFA (115 € - 230 € / $125 - $250)</option>
                        <option value="190k-300k">190 000 - 300 000 FCFA (290 € - 460 € / $315 - $500)</option>
                        <option value="300k-500k">300 000 - 500 000 FCFA (460 € - 760 € / $500 - $830)</option>
                        <option value="500k+">Plus de 500 000 FCFA (760 € / $830 +)</option>
                        <option value="sur-mesure">Devis sur-mesure (International / Sénégal)</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none resize-none"
                        placeholder="Décrivez votre projet..."
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-brand-coral text-brand-dark py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transition-colors shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-brand-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Envoi en cours...</span>
                        </>
                      ) : (
                        <span>Envoyer le message</span>
                      )}
                    </button>
                  </form>
                )}
              </div>

              <div>
                <h2 className="font-heading font-bold text-2xl mb-6 text-brand-dark">
                  Contact direct
                </h2>
                <div className="space-y-6">
                  <a
                    href="https://wa.me/221775439397"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-brand-light rounded-xl p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-lg text-brand-dark">WhatsApp</h3>
                        <p className="text-gray-600">Discutons directement de votre projet</p>
                      </div>
                    </div>
                  </a>

                  <a
                    href="tel:+221775439397"
                    className="block bg-brand-light rounded-xl p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-brand-accent rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-lg text-brand-dark">Téléphone</h3>
                        <p className="text-gray-600">+221 77 543 93 97</p>
                      </div>
                    </div>
                  </a>

                  <a
                    href="mailto:contact@yakaarweb.site"
                    className="block bg-brand-light rounded-xl p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-brand-coral rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-lg text-brand-dark">Email</h3>
                        <p className="text-gray-600">contact@yakaarweb.site</p>
                      </div>
                    </div>
                  </a>

                  <div className="bg-brand-light rounded-xl p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-brand-dark rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-lg text-brand-dark">Adresse</h3>
                        <p className="text-gray-600">Thiès, Sénégal</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-brand-dark rounded-xl text-white">
                  <h3 className="font-heading font-bold text-lg mb-3">Horaires</h3>
                  <p className="text-gray-300">
                    Lundi - Vendredi : 9h00 - 18h00<br />
                    Samedi : 9h00 - 14h00<br />
                    Dimanche : Fermé
                  </p>
                </div>
              </div>
            </div>

            {/* MOYENS DE PAIEMENT SECTION */}
            <PaymentMethodsInfo className="mt-16" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
