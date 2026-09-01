import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#123A34",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://yakaarweb.pages.dev"),
  title: {
    default: "Yakaar Web - Agence de Création de Sites Web à Thiès, Sénégal",
    template: "%s | Yakaar Web",
  },
  description: "Agence web basée à Thiès, Sénégal. Création de sites vitrines, e-commerce et applications web sur-mesure pour PME, commerçants, cliniques et la diaspora sénégalaise.",
  keywords: [
    "agence web Sénégal",
    "création site internet Thiès",
    "développeur web Dakar",
    "site vitrine e-commerce Sénégal",
    "Yakaar Web",
    "application web Sénégal"
  ],
  authors: [{ name: "Yakaar Web" }],
  creator: "Yakaar Web",
  openGraph: {
    title: "Yakaar Web - Agence Web à Thiès, Sénégal",
    description: "Création de sites vitrines, e-commerce et applications web pour PME et commerçants au Sénégal.",
    url: "https://yakaarweb.pages.dev",
    siteName: "Yakaar Web",
    images: [
      {
        url: "/hero-image.png",
        width: 1200,
        height: 630,
        alt: "Yakaar Web - Agence Web",
      },
    ],
    locale: "fr_SN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yakaar Web - Agence Web au Sénégal",
    description: "Création de sites internet professionnels et sur-mesure à Thiès et Dakar.",
    images: ["/hero-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

import ClientProviders from "@/components/ClientProviders";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="font-sans antialiased bg-brand-light text-gray-800">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
