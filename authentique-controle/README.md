# 🛡️ Authentique Contrôle

Application web moderne, rapide et sécurisée permettant de vérifier l’authenticité et la validité des tickets à partir de leurs codes uniques, adossée à une base de données persistante SQLite et dotée d’un tableau de bord de contrôle complet.

---

## 🌟 Fonctionnalités Principales

### 1. 🔍 Vérification des tickets
- **Saisie instantanée** : Champ avec nettoyage automatique des espaces superflus (*trim*).
- **Résultat immédiat sans rechargement de page (AJAX)** :
  - ✅ **Code reconnu (Vert)** : « *Ticket authentique : ce ticket existe dans le système.* » avec fiche complète (nom, date, validité, statut, nombre de vérifications).
  - ❌ **Code inconnu / non autorisé (Rouge)** : « *Ticket non reconnu ou non autorisé. Ce code n’existe pas dans le système.* » avec avertissement de sécurité.
  - ⚠️ **Champ vide** : Message d'avertissement élégant demandant de saisir un code.
- **Raccourcis de tests en un clic** : Exemples de codes valides et invalides pré-intégrés pour des démonstrations instantanées.

### 2. 📋 Gestion complète des tickets (CRUD)
- **Ajout de ticket** : Saisie du nom, code unique, description, statut (`Actif`, `Utilisé`, `Expiré`, `Annulé`) et date de fin de validité.
- **Bouton Générateur de code** : Génération aléatoire d'un code sécurisé (ex: `AUTH-XXXX-YYYY`).
- **Contrôle d'unicité strict** : Empêche tout doublon de code et affiche « *Ce ticket existe déjà.* ».
- **Modification de ticket** : Mise à jour des informations avec vérification que le nouveau code n'est pas utilisé par un autre ticket.
- **Suppression sécurisée** : Boîte de dialogue de confirmation avant suppression et actualisation automatique de la liste.
- **Export CSV** : Export de tous les tickets en un clic au format CSV compatible Excel.

### 3. 📊 Tableau de bord interactif
- Total des tickets enregistrés
- Nombre total de vérifications effectuées
- Nombre de codes reconnus
- Nombre de codes inconnus / rejetés
- Liste en temps réel des 5 derniers tickets ajoutés
- Historique récent des derniers contrôles avec badges d'état colorés

### 4. 📜 Journal exhaustif des vérifications (Historique)
- Horodatage précis (date et heure française)
- Code recherché et résultat (Authentique / Rejeté)
- Nom du ticket et statut lors du contrôle
- Adresse IP source
- Filtres rapides (*Tous*, *Reconnus*, *Inconnus*) et barre de recherche
- Bouton d'export CSV du journal et option de réinitialisation sécurisée (Admin)

### 5. 🔐 Sécurité & Authentification Administrateur
- Base de données persistante **SQLite** (Mode WAL haute performance)
- Requêtes préparées SQL prévenant les injections
- Authentification avec hachage sécurisé des mots de passe via **Bcrypt**
- Protection des opérations d'écriture (Ajout, Modification, Suppression)
- Interface de changement de mot de passe administrateur dans l'onglet **Paramètres**
- Messages d'erreur conçus pour ne divulguer aucune information sensible

---

## 🚀 Démarrage Rapide

### Prérequis
- **Node.js** (version 20+ ou 24+)
- **NPM**

### 1. Installation des dépendances
```bash
npm install
```

### 2. Lancement du serveur
```bash
npm start
```

Ou en mode développement avec rechargement automatique :
```bash
npm run dev
```

L'application est immédiatement accessible :
- 💻 **Sur cet ordinateur :** **[http://localhost:3000](http://localhost:3000)**
- 📱 **Sur smartphone ou tablette (même Wi-Fi) :** **http://192.168.1.191:3000**

---

## 📱 Utilisation sur Téléphone & Tablette (Sans Play Store / App Store)

L'application est conçue comme une **Progressive Web App (PWA)** installable directement sur votre smartphone sans passer par Google Play ni l'App Store d'Apple :

1. Assurez-vous que votre téléphone est connecté au **même réseau Wi-Fi** que votre ordinateur.
2. Ouvrez le navigateur de votre téléphone et saisissez l'adresse : **`http://192.168.1.191:3000`** *(ou flashez le QR Code visible dans l'onglet **Paramètres**)*.
3. Pour l'installer comme une vraie application sur votre écran d'accueil :
   - **Sur Android (Chrome) :** appuyez sur le menu (les 3 points en haut à droite) puis sélectionnez **« Installer l'application »** ou **« Ajouter à l'écran d'accueil »**.
   - **Sur iPhone (Safari) :** appuyez sur l'icône de partage ⬆️ en bas de l'écran, puis choisissez **« Sur l'écran d'accueil »**.
4. L'icône **Authentique Contrôle** apparaît sur votre écran de téléphone et s'ouvre en plein écran sans barre d'adresse, comme une application native !
---

## 🔑 Identifiants Administrateur par Défaut

- **Nom d'utilisateur :** `admin`
- **Mot de passe :** `admin1234`

*(Le mot de passe peut être modifié à tout moment depuis l'onglet **Paramètres**)*

---

## 🧪 Tests Automatisés

Une suite complète de 14 tests automatisés est incluse pour valider l'ensemble des exigences du cahier des charges :

```bash
node test-suite.js
```

### Cas testés avec succès :
1. ✅ **Vérification d'un code existant :** reconnue verte et authentique (`AUTH-2026-VIP`).
2. ✅ **Vérification avec espaces avant/après :** automatiquement nettoyés via `trim`.
3. ✅ **Vérification d'un code inexistant :** déclarée rouge / non reconnue.
4. ✅ **Vérification champ vide :** alerte demandant de renseigner un code.
5. ✅ **Authentification admin :** connexion sécurisée par session httpOnly.
6. ✅ **Ajout d'un doublon :** rejeté avec le message exact « *Ce ticket existe déjà.* ».
7. ✅ **Modification d'un ticket :** enregistrement en base et mise à jour immédiate.
8. ✅ **Suppression d'un ticket :** suppression confirmée et retrait de la liste.
9. ✅ **Vérification post-suppression :** le code supprimé redevient non reconnu.
10. ✅ **Persistance SQLite :** fichier `data/authentique.db` écrit sur disque.
11. ✅ **Survie au redémarrage :** les tickets créés restent intacts après arrêt et relance du serveur.
12. ✅ **Tableau de bord :** calcul exact des statistiques et flux d'activité.

---

## 📁 Architecture du Projet

```
authentique-controle/
├── data/
│   └── authentique.db        # Base de données persistante SQLite
├── public/
│   ├── css/
│   │   └── style.css         # Styles modernes, responsive & animations
│   ├── js/
│   │   └── app.js            # Logique frontend, requêtes AJAX & réactivité
│   ├── favicon.svg           # Logo SVG (Bouclier & Validation)
│   └── index.html            # Interface utilisateur complète (5 vues)
├── src/
│   ├── middleware/
│   │   └── auth.js           # Middleware de session et contrôle d'accès
│   ├── routes/
│   │   ├── auth.js           # API de connexion et gestion des comptes
│   │   ├── stats.js          # API statistiques, exports CSV et historique
│   │   ├── tickets.js        # API CRUD tickets avec contrôle d'unicité
│   │   └── verify.js         # API de vérification instantanée et journalisation
│   └── db.js                 # Initialisation de SQLite et seed des données
├── test-suite.js             # Suite de tests fonctionnels automatisés
├── server.js                 # Serveur Express principal
├── package.json              # Dépendances et scripts
└── README.md                 # Documentation complète
```

---

## 🎨 Charte Graphique & Ergonomie

- **Bleu foncé (#0f172a, #1e3a8a)** : Confiance, professionnalisme et autorité.
- **Blanc & Gris neutre (#ffffff, #f8fafc)** : Clarté et lisibilité maximale.
- **Vert émeraude (#10b981, #059669)** : Tickets authentiques certifiés.
- **Rouge vif (#ef4444, #dc2626)** : Tickets inconnus ou non autorisés.
- **Responsive design** : Optimisé pour ordinateurs portables, tablettes et smartphones.
