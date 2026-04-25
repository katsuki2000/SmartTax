const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/tax-calc', (req, res) => {
    const { revenu, statut, mariee, enfants, chiffreAffaires } = req.body;
    let impotDu = 0;
    let revenuImposable = revenu;


    if (revenu !== undefined) {
        if (revenu < 0) {
            revenuImposable = 0;
        } else {
            if (mariee === true) {
                revenuImposable = revenu / 2;
                if (revenuImposable < 10000) {
                    impotDu = 0;
                } else if (revenuImposable >= 10000 && revenuImposable <= 20000) {
                    impotDu = (revenuImposable - 10000) * 0.15;
                } else if (revenuImposable > 20000 && revenuImposable <= 30000) {
                    impotDu = (revenuImposable - 10000) * 0.15;
                } else {
                    impotDu = (20000 * 0.15) + (revenuImposable - 30000) * 0.30;
                }
            } else {
                if (revenuImposable < 10000) {
                    impotDu = 0;
                } else {
                    if (revenuImposable <= 20000) {
                        impotDu = (revenuImposable - 10000) * 0.15;
                    } else if (revenuImposable > 20000 && revenuImposable <= 30000) {
                        impotDu = (revenuImposable - 10000) * 0.15;
                    } else {
                        impotDu = (20000 * 0.15) + (revenuImposable - 30000) * 0.30;
                    }
                }
            }
        }
    }

    // Gestion des enfants avec branches multiples
    if (enfants !== undefined && enfants !== null) {
        if (enfants > 2) {
            if (impotDu > 0) {
                impotDu = impotDu * 0.90;
            }
        } else {
            if (enfants === 1 || enfants === 2) {
                impotDu = impotDu * 1;
            }
        }
    }

    // Calcul des taxes sociales
    if (statut === "Freelance") {
        if (chiffreAffaires > 0) {
            impotDu += (chiffreAffaires * 0.05);
        } else {
            impotDu += 0;
        }
    } else {
        if (statut === "Salarié") {
            impotDu += 0;
        }
    }

    res.json({ totalTax: impotDu });
});

app.listen(3000, () => console.log('SmartTax API running on port 3000'));