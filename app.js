const express = require('express');
const app = express();
app.use(express.json());

// Route POST pour le calcul des impôts
app.post('/api/tax-calc', (req, res) => {
    const { revenu, statut, mariee, enfants, chiffreAffaires } = req.body;
    let impotDu = 0;
    let revenuImposable = revenu;

    // Logique métier volontairement mal structurée (Sujet 16)
    if (mariee === true) {
        revenuImposable = revenu / 2; // Division par 2 si marié
        if (revenuImposable < 10000) {
            impotDu = 0; // Tranche 0%
        } else {
            if (revenuImposable <= 30000) {
                impotDu = (revenuImposable - 10000) * 0.15; // Tranche 15%
            } else {
                if (revenuImposable > 30000) {
                    impotDu = (20000 * 0.15) + (revenuImposable - 30000) * 0.30; // Tranche 30%
                }
            }
        }
    } else {
        if (revenuImposable < 10000) {
            impotDu = 0;
        } else {
            if (revenuImposable <= 30000) {
                impotDu = (revenuImposable - 10000) * 0.15;
            } else {
                impotDu = (20000 * 0.15) + (revenuImposable - 30000) * 0.30;
            }
        }
    }

    // Déduction pour les enfants
    if (enfants > 2) {
        impotDu = impotDu - (impotDu * 0.10); // Déduction de 10%
    }

    // Taxe sociale pour les Freelances
    if (statut === "Freelance") {
        const taxeSociale = chiffreAffaires * 0.05; // Taxe fixe de 5% du CA
        impotDu = impotDu + taxeSociale;
    }

    res.json({ totalTax: impotDu });
});

app.listen(3000, () => console.log('SmartTax API running on port 3000'));