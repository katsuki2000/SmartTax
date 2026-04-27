# SmartTax

SmartTax est une API REST développée avec Express.js (Node.js) pour faciliter la gestion et le calcul des taxes. Ce projet inclut des tests automatisés et une configuration de qualité de code.

## Fonctionnalités principales
- API REST basée sur Express.js
- Calcul automatique des taxes via un endpoint dédié
- Tests unitaires avec couverture
- Linting avec ESLint

## Installation

1. Clonez le dépôt :
   ```bash
   git clone <url-du-repo>
   cd SmartTax
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```


## Utilisation

Pour démarrer l'application en mode développement :
```bash
node app.js
```

L'API sera accessible par défaut sur le port 3000 (ou selon votre configuration).

### Endpoint principal

- `POST /api/tax-calc`
      - Corps attendu (JSON) :
         ```json
         {
            "revenu": 35000,
            "statut": "Freelance",
            "mariee": true,
            "enfants": 3,
            "chiffreAffaires": 50000
         }
         ```
      - Réponse :
         ```json
         {
            "totalTax": 1234.56
         }
         ```

## Tests

Pour exécuter les tests et générer un rapport de couverture :
```bash
npm test
```
Les rapports de couverture se trouvent dans le dossier `coverage/`.

## Linting

Pour vérifier la qualité du code avec ESLint :
```bash
npm run lint
```

## Structure du projet
- `app.js` : Point d'entrée principal de l'API Express.js
- `app.test.js` : Tests unitaires
- `coverage/` : Rapports de couverture de tests
- `eslint.config.js` : Configuration ESLint
- `package.json` : Dépendances et scripts
- `sonar-project.properties` : Configuration SonarQube


