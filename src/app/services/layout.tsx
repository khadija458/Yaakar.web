import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nos Services & Tarifs',
  description: 'Découvrez nos offres de création de site web : Starter, Pro et Sur-mesure pour PME, commerçants et cliniques au Sénégal.',
  openGraph: {
    title: 'Services & Tarifs - Yakaar Web',
    description: 'Offres transparentes et adaptées pour la création de sites internet et e-commerce au Sénégal.',
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
