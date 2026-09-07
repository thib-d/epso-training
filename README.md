# Cap EPSO

Site bilingue d’entraînement aux tests de raisonnement EPSO : verbal, numérique et abstrait.

- 100 questions avec réponse et explication
- français ou anglais selon la langue du navigateur
- sélection manuelle FR/EN disponible
- vidéos d’introduction intégrées
- sessions par catégorie ou session mixte

## Banque de questions

Les contenus sont séparés par langue et alignés grâce à leur champ `id` :

- `app/data/questions.fr.json`
- `app/data/questions.en.json`

Chaque entrée contient la catégorie, l’énoncé, quatre réponses, l’index de la bonne réponse et l’explication.

## Développement

```bash
npm install
npm run dev
```

La version GitHub Pages est construite avec `npm run build:pages` et publiée automatiquement après chaque push sur `main`.

Ce projet est un outil indépendant et n’est pas affilié à EPSO.
