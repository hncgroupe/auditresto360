# auditresto360

Site d'acquisition pour **auditresto360**, l'audit 360° complet et indépendant du restaurant (hygiène HACCP, RH, conformité, gestion et comptabilité, carte, développement commercial).

C'est un **second site d'acquisition**, distinct et déployé séparément de `audithygiene.fr`. Les deux sites partagent **la même application opérationnelle** (back-office auditeurs, hébergée côté audithygiène) : les leads et la production d'audit sont gérés au même endroit, l'accès étant ouvert par auditeur selon le périmètre. Ce dépôt ne contient **que le site vitrine** ; il ne recrée pas d'application.

## Stack

- Next.js 15 (App Router) + TypeScript + Tailwind CSS
- Prisma + PostgreSQL (base propre à auditresto360, pour les leads)
- Brevo (email transactionnel) + Telegram (notifications) — comptes dédiés auditresto360
- Police Poppins, marque orange (`#FF7A00`) + noir (`#0A0A0A`)
- Déploiement Vercel

## Démarrer

```bash
npm install
cp .env.example .env.local   # renseigner les vraies valeurs
npm run prisma:generate
npm run dev
```

Le site fonctionne sans base ni clés : les leads ne sont alors pas persistés et les notifications sont ignorées (logs uniquement). Renseigner `.env.local` active la persistance et les intégrations.

## Configurateur et tarifs

Le moteur d'estimation vit dans `src/lib/config.ts`. **Les prix y sont des propositions de cadrage marquées `TODO`**, destinées à produire une estimation indicative. Ils doivent être validés par le client avant mise en production. Le site présente toujours le résultat comme une « estimation indicative », le devis final étant personnalisé (voir règles `methodology-guard` et `no-fake-content` du projet audithygiène).

## Cadre juridique

auditresto360 est un audit conseil privé et indépendant : ni certification officielle, ni agrément d'État, ni contrôle des services vétérinaires/DDPP. Cette mention figure en footer, dans les pages légales et les emails.

## À valider (TODO)

- Raison sociale, SIREN, adresse, directeur de publication (pages légales)
- Grille de prix réelle (`src/lib/config.ts`)
- CGV (validation juridique)
- Durées de conservation RGPD
- Présentation de l'équipe et références réelles (page À propos) — aucune donnée inventée
