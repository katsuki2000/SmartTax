const express = require('express');
const app = express();
app.use(express.json());

// 1. Logique isolée pour les tranches d'impôts
function calculerTranche(revenu) {
    if (revenu < 10000) return 0;
    if (revenu <= 30000) return (revenu - 10000) * 0.15;
    return (20000 * 0.15) + (revenu - 30000) * 0.30;
}

// 2. Logique isolée pour les réductions (Enfants)
function appliquerReductions(impot, nbEnfants) {
    if (nbEnfants > 2) return impot * 0.90;
    return impot;
}

// 3. Logique isolée pour les taxes sociales (Freelance)
function calculerTaxeSociale(statut, ca) {
    if (statut === "Freelance" && ca > 0) return ca * 0.05;
    return 0;
}

app.post('/api/tax-calc', (req, res) => {
    const { revenu, statut, mariee, enfants, chiffreAffaires } = req.body;
    
    // Application de la règle "Marié" avant calcul [cite: 11, 64]
    const revenuBase = mariee ? revenu / 2 : revenu;
    
    let impotFinal = calculerTranche(revenuBase);
    impotFinal = appliquerReductions(impotFinal, enfants);
    impotFinal += calculerTaxeSociale(statut, chiffreAffaires);

    res.json({ totalTax: impotFinal });
});

module.exports = app; // Indispensable pour Jest
if (require.main === module) {
    app.listen(3000, () => console.log('SmartTax API running on port 3000'));
}