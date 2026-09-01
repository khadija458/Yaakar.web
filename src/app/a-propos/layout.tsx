import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'À Propos de Yakaar Web',
  description: 'Agence web engagée basée à Thiès, Sénégal. Notre mission est de digitaliser les entreprises et commerces sénégalais.',
  openGraph: {
    title: 'À Propos - Yakaar Web',
    description: 'Faites connaissance avec notre équipe et notre mission au Sénégal.',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
