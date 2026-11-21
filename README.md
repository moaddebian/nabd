# NABD · نبض

Plateforme francophone de mobilisation pour le don du sang. Site **sans backend** : Next.js (App Router, TypeScript), Tailwind CSS 4, Motion, Lucide. Les inscriptions passent par **Google Forms**, les chiffres publics sont lus dans **Google Sheets** (onglets publiés en CSV). Hébergement : **Vercel**.

👉 **Déploiement pas à pas : [GUIDE-DEPLOIEMENT.md](GUIDE-DEPLOIEMENT.md)**

## Pages

| Page | Contenu |
|---|---|
| `/` | Accueil, chiffres clés, aperçu du classement |
| `/donner` | Formulaire Google Forms intégré |
| `/impact` | Inscriptions, dons confirmés, équipes, villes |
| `/challenge` | Classement des équipes et objectif collectif |
| `/comprendre` | Mythes et conseils avant le don |
| `/confidentialite` | Données collectées et droits |

## Démarrage rapide (WSL NABD)

```sh
wsl -d NABD
cd ~/nabd
npm ci
cp .env.example .env.local   # facultatif : sans liens CSV, données de démonstration
npx next dev --hostname 0.0.0.0
```

Ouvrir http://localhost:3000.

## Variables d'environnement

| Variable | Rôle |
|---|---|
| `NEXT_PUBLIC_GOOGLE_FORM_URL` | Lien `viewform` du Google Form (par défaut le formulaire NABD) |
| `GOOGLE_SHEET_IMPACT_CSV_URL` | Onglet **Impact** publié en CSV (`Indicateur, Valeur`) |
| `GOOGLE_SHEET_TEAMS_CSV_URL` | Onglet **Equipes** publié en CSV (`Equipe, Etablissement, Description, Membres, Dons`) |
| `NEXT_PUBLIC_SITE_URL` | URL publique (sitemap, robots, Open Graph) |

Sans les deux liens CSV, le site affiche des chiffres explicitement marqués **Données de démonstration**. Les données sont mises en cache 5 minutes (`revalidate = 300`).

## Structure

- `src/app` : pages (rendu serveur + revalidation toutes les 5 minutes).
- `src/components` : interface, classement, cartes d'impact.
- `src/lib/sheets.ts` : lecture des CSV Google Sheets (fonctions pures).
- `src/lib/data.ts` : récupération des chiffres, données de démonstration, lien du formulaire.
- `tests/sheets.test.ts` : tests de lecture CSV.

## Vérification

```sh
npm run typecheck
npm test
npm run build
```

## Données personnelles

Les réponses au formulaire restent dans la Google Sheet privée. Seuls les onglets **Impact** et **Equipes** (des totaux, sans nom ni coordonnée) sont publiés. Le formulaire collecte le groupe sanguin : vérifier les obligations auprès de la [CNDP](https://www.cndp.ma/) (loi 09-08) avant le lancement.

Les informations médicales générales sont référencées dans l'interface. Elles ne remplacent pas les consignes et la décision du centre au Maroc.
