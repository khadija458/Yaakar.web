import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Notre Portfolio & Réalisations',
  description: 'Explorez nos démonstrations de sites e-commerce, vitrines de restaurants et cabinets médicaux créés par Yakaar Web.',
  openGraph: {
    title: 'Portfolio & Projets - Yakaar Web',
    description: 'Découvrez nos créations web et démonstrations interactives.',
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
