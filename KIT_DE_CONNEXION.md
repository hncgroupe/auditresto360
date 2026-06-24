# Kit de connexion — auditresto360

Tout ce qu'il faut pour brancher le site en production. Les secrets vont dans `.env.local` (local) et dans les variables d'environnement Vercel (prod). Rien de tout ça n'est commité.

---

## 1. Brevo (emails) + DNS Cloudflare

Le domaine `auditresto360.fr` est ajouté dans Brevo. Pour que les emails partent et arrivent (délivrabilité), il faut authentifier le domaine via des enregistrements DNS dans Cloudflare.

### Dans Brevo
- Aller dans **Expéditeurs, domaines & IP dédiées → Domaines**.
- Ouvrir `auditresto360.fr` : Brevo affiche les enregistrements à créer (DKIM, code de vérification, DMARC).
- Récupérer la **clé API** : `SMTP & API → Clés API` → coller dans `BREVO_API_KEY`.
- Créer/valider l'expéditeur `contact@auditresto360.fr`.

### Dans Cloudflare (DNS) — ajouter les enregistrements donnés par Brevo
Valeurs EXACTES à copier depuis l'écran Brevo (elles sont propres à ton compte). Typiquement :

| Type | Nom | Valeur | Proxy |
|---|---|---|---|
| TXT | `@` (ou `brevo-code...`) | code de vérification Brevo | DNS only |
| TXT | `@` | `v=spf1 include:spf.brevo.com mx ~all` (fusionner avec un SPF existant) | DNS only |
| CNAME | `brevo1._domainkey` | valeur DKIM Brevo | DNS only |
| CNAME | `brevo2._domainkey` | valeur DKIM Brevo | DNS only |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:contact@auditresto360.fr` | DNS only |

> Important : pour les enregistrements d'email (TXT/CNAME d'auth), laisser **DNS only** (nuage gris), jamais proxifié (orange). Un seul enregistrement SPF par domaine : fusionner les `include:` si besoin.

Puis revenir dans Brevo et cliquer **Vérifier / Authentifier**.

---

## 2. Base de données (Supabase Postgres)
- Créer un projet Supabase dédié auditresto360.
- Copier la connection string (Settings → Database) dans `DATABASE_URL`.
- Lancer les migrations : `npm run prisma:migrate` (ou `npx prisma db push`).

## 3. Telegram (notifications de leads)
- Créer un bot via **@BotFather** → `TELEGRAM_BOT_TOKEN`.
- Récupérer le chat id (groupe ou DM) → `TELEGRAM_CHAT_ID`.

## 4. Recherche
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` : code Search Console.
- `NEXT_PUBLIC_BING_SITE_VERIFICATION` : code Bing Webmaster.

---

## 5. Déploiement Vercel + domaine Cloudflare

1. Importer le repo dans Vercel (projet séparé d'audithygiène).
2. Coller toutes les variables ci-dessus dans **Vercel → Settings → Environment Variables**.
3. Ajouter le domaine `auditresto360.fr` dans **Vercel → Domains**. Vercel donne la cible (A `76.76.21.21` ou CNAME `cname.vercel-dns.com`).
4. Dans Cloudflare DNS :
   - `@` → A `76.76.21.21` (ou CNAME vers la cible Vercel selon ce que Vercel indique).
   - `www` → CNAME `cname.vercel-dns.com`.
   - Proxy : commencer en **DNS only** le temps de la validation Vercel, puis proxy possible.
5. Mettre `NEXT_PUBLIC_SITE_URL=https://auditresto360.fr`.

> La mise en ligne sur le domaine public est un point de validation humaine (`⏸️`). Les déploiements **preview** Vercel ne le sont pas.

---

## Ce que je peux faire une fois les clés fournies
- Coller les valeurs dans `.env.local`, lancer les migrations Prisma, tester l'envoi Brevo et la notif Telegram en local.
- Préparer la config Vercel et la liste DNS finale.
- Je ne déclenche pas le go-live public sans ton « go ».
