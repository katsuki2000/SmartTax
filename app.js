const express = require('express');
const app = express();
app.use(express.json());

// On réduit la complexité en utilisant des fonctions atomiques
const getTauxTranche = (revenu) => {
    if (revenu <= 10000) return 0;
    if (revenu <= 30000) return (revenu - 10000) * 0.15;
    return 3000 + (revenu - 30000) * 0.30;
};

const getReductionFamille = (impot, enfants) => (enfants > 2 ? impot * 0.90 : impot);

const getTaxeSociale = (statut, ca) => (statut === "Freelance" ? ca * 0.05 : 0);

app.post('/api/tax-calc', (req, res) => {
    const { revenu, statut, mariee, enfants, chiffreAffaires = 0 } = req.body;
    
    // complexité minimale
    const revenuBase = mariee ? revenu / 2 : revenu;
    const impotDeBase = getTauxTranche(revenuBase);
    const impotApresReduc = getReductionFamille(impotDeBase, enfants);
    const totalTax = impotApresReduc + getTaxeSociale(statut, chiffreAffaires);

    res.json({ totalTax });
});

module.exports = app;