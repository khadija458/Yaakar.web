# Yakaar Web - Site vitrine

Site vitrine professionnel pour Yakaar Web, agence de création de sites internet basée à Thiès, Sénégal.

## 🚀 Stack technique

- **Framework** : Next.js 14+ (App Router) avec TypeScript
- **Styles** : Tailwind CSS
- **Hébergement & Déploiement** : Cloudflare Pages sur le domaine principal **https://yakaarweb.site**
- **CLI Déploiement** : Cloudflare Wrangler (`wrangler.toml`)

## 🤖 Directives pour les Agents IA (AI Development Rules)

> [!IMPORTANT]
> **RÈGLE STRICTE DE DÉPLOIEMENT POUR LES AGENTS IA** :
> 1. Les agents IA peuvent modifier, tester et builder le code localement (`npm run build`).
> 2. **INTERDICTION DE DÉPLOYER EN PRODUCTION AUTOMATIQUEMENT** (`npm run deploy` ou `wrangler pages deploy`).
> 3. L'agent IA doit **TOUJOURS demander l'accord explicite et l'autorisation de l'utilisateur** avant d'exécuter une commande de déploiement en production afin de protéger le site en ligne (`yakaarweb.site`).

## 📦 Installation & Développement

1. **Installer les dépendances** :
```bash
npm install
```

2. **Lancer le serveur de développement** :
```bash
npm run dev
```

3. **Ouvrir le navigateur** :
Accédez à [http://localhost:3000](http://localhost:3000)

## 🏗️ Build & Déploiement Cloudflare Pages

1. **Vérifier le build local statique** :
```bash
npm run build
```
*(Les fichiers statiques seront générés dans le dossier `out`)*

2. **Déployer sur Cloudflare Pages (Nécessite la confirmation de l'utilisateur)** :
```bash
npm run deploy
```

## 🔧 Configuration Cloudflare
- **Fichier de configuration** : `wrangler.toml` (Nom du projet : `yakaarweb`)
- **Domaine officiel** : `https://yakaarweb.site`
- **Serveur MCP Cloudflare** : Initialisé via `@cloudflare/mcp-server-cloudflare`

## 🔧 Remplacement des placeholders

Avant de mettre le site en production, remplacez les placeholders suivants dans le code :

### Numéros de téléphone
- `[Numéro de téléphone]` → Remplacez par votre numéro de téléphone
- `[Numéro WhatsApp]` → Remplacez par votre numéro WhatsApp (format international sans +, ex: 221771234567)

### Email
- `[email]` → Remplacez par votre adresse email professionnelle

### Réseaux sociaux
- `[lien Facebook]` → Remplacez par l'URL de votre page Facebook
- `[lien Instagram]` → Remplacez par l'URL de votre compte Instagram
- `[lien LinkedIn]` → Remplacez par l'URL de votre profil LinkedIn

### À propos du fondateur
- `[Nom du fondateur]` → Remplacez par votre nom complet

### Fichiers à modifier
- `src/components/Footer.tsx` - Téléphone, email, réseaux sociaux
- `src/app/contact/page.tsx` - Formulaire de contact et WhatsApp
- `src/app/a-propos/page.tsx` - Informations sur le fondateur
- `src/app/page.tsx` - Lien WhatsApp dans le hero

## 📁 Structure du projet

```
src/
├── app/
│   ├── a-propos/          # Page À propos
│   ├── contact/           # Page Contact
│   ├── globals.css        # Styles globaux
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Page d'accueil
│   ├── portfolio/        # Page Portfolio
│   └── services/         # Page Services
├── components/
│   ├── Footer.tsx         # Composant Footer
│   ├── Header.tsx         # Composant Header
│   └── Logo.tsx           # Composant Logo
```

## 🎨 Identité visuelle

### Couleurs de la marque
- **Vert encre** (principal) : `#123A34`
- **Turquoise** (accent) : `#1FB199`
- **Corail doux** (CTA) : `#F2965A`
- **Fond clair** : `#FAF9F6`

### Typographie
- **Titres** : Sora (700-800)
- **Corps de texte** : Inter

## 🌐 Déploiement Cloudflare Pages & Protocole IA

1. Exécuter un build de test local (`npm run build`).
2. Demander la validation et l'autorisation explicite de l'utilisateur.
3. Après accord de l'utilisateur, exécuter `npm run deploy` pour publier sur **https://yakaarweb.site**.

Le projet est configuré avec l'export statique Next.js (`output: 'export'` dans `next.config.js`).

## 📝 Pages du site

- **Accueil** (`/`) : Hero, avantages, aperçu des offres, aperçu du portfolio
- **Services** (`/services`) : Détail des 3 forfaits (Starter, Pro, Sur-mesure) et options
- **Portfolio** (`/portfolio`) : 3 projets de démonstration (restaurant, boutique, cabinet)
- **À propos** (`/a-propos`) : Mission, valeurs, présentation du fondateur
- **Contact** (`/contact`) : Formulaire de contact et informations de contact

## 📱 Responsive

Le site est entièrement responsive et optimisé pour :
- Mobile (mobile-first approach)
- Tablette
- Desktop

## ♿ Accessibilité

- Contrastes suffisants
- Focus visible sur les éléments interactifs
- Structure HTML5 sémantique
- Textes alternatifs sur les images

## 📄 Licence

Ce projet est propriété de Yakaar Web.
