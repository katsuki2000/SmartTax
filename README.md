# SmartTax

Une application de calcul d'impôts sur le revenu construite avec Node.js et Express.

## Description

SmartTax est une API qui permet de calculer le montant d'impôt à payer en fonction de plusieurs critères :
- Le revenu annuel
- Le statut matrimonial
- Le nombre d'enfants à charge
- Le chiffre d'affaires (pour les travailleurs indépendants)

L'application utilise un système de barèmes d'imposition progressifs avec des réductions possibles selon la situation familiale.

## Installation

### Prérequis

- Node.js (v14 ou supérieur)
- npm ou yarn

### Étapes d'installation

1. Clonez le repository :
```bash
git clone <url-du-repository>
cd SmartTax
```

2. Installez les dépendances :
```bash
npm install
```

## Utilisation

### Démarrer le serveur

```bash
node app.js
```

Le serveur démarre sur `http://localhost:3000` par défaut.

### Exemple de requête

Envoyez une requête POST à `/api/tax-calc` :

```bash
curl -X POST http://localhost:3000/api/tax-calc \
  -H "Content-Type: application/json" \
  -d '{
    "revenu": 35000,
    "statut": "salarié",
    "mariee": true,
    "enfants": 2,
    "chiffreAffaires": 0
  }'
```

### Paramètres de la requête

| Paramètre | Type | Description |
|-----------|------|-------------|
| `revenu` | number | Revenu annuel en euros |
| `statut` | string | Statut professionnel (salarié, indépendant, etc.) |
| `mariee` | boolean | Situation matrimoniale (marié(e) ou non) |
| `enfants` | number | Nombre d'enfants à charge |
| `chiffreAffaires` | number | Chiffre d'affaires (si applicable) |

### Barèmes d'imposition

- **Revenu < 10 000€** : Pas d'impôt
- **10 000€ à 20 000€** : 15% sur la part supérieure à 10 000€
- **20 000€ à 30 000€** : 15% sur la part entre 10 000€ et 20 000€ + 30% au-delà
- **Revenus plus élevés** : Barème progressif

**Réductions applicables** :
- Personne mariée : Revenu divisé par 2
- 3 enfants ou plus : Réduction de 10% de l'impôt
- 1 ou 2 enfants : Pas de réduction supplémentaire

## Dépendances

- **[Express](https://expressjs.com/)** (v5.2.1) - Framework web minimal et flexible
- **[ESLint](https://eslint.org/)** (v10.2.0) - Outil de linting JavaScript

## Scripts disponibles

```bash
npm test   # Exécuter les tests
```


## Notes

Cette application est actuellement en développement (version 1.0.0). Les règles d'imposition reflètent un système simplifié à titre d'exemple.
