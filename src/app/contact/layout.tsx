import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact & Devis Gratuit',
  description: 'Demandez un devis gratuit pour la création de votre site internet à Thiès et au Sénégal. Réponse rapide sous 24h par Yakaar Web.',
  openGraph: {
    title: 'Contactez Yakaar Web - Devis Gratuit',
    description: 'Demandez un devis gratuit pour la création de votre site internet ou application web au Sénégal.',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
