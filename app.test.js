const request = require('supertest'); // Installe supertest via npm install --save-dev supertest
const app = require('./app'); // Assure-toi d'exporter 'app' avec module.exports = app;

describe('Tests SmartTax - Sujet 16', () => {
    test('Calcul de base (tranche 15%)', async () => {
        const res = await request(app).post('/api/tax-calc').send({ revenu: 20000 });
        expect(res.body.totalTax).toBe(1500); // (20k-10k) * 0.15
    });

    test('Cas Marié (revenu divisé par 2)', async () => {
        const res = await request(app).post('/api/tax-calc').send({ revenu: 40000, mariee: true });
        expect(res.body.totalTax).toBe(1500); // 40k/2 = 20k -> (20k-10k) * 0.15
    });

    test('Réduction pour plus de 2 enfants (10%)', async () => {
        const res = await request(app).post('/api/tax-calc').send({ revenu: 20000, enfants: 3 });
        expect(res.body.totalTax).toBe(1350); // 1500 * 0.90
    });

    test('Taxe sociale Freelance (5%)', async () => {
        const res = await request(app).post('/api/tax-calc').send({ 
            revenu: 5000, 
            statut: "Freelance", 
            chiffreAffaires: 10000 
        });
        expect(res.body.totalTax).toBe(500); // 0 (tranche <10k) + 500 (5% de 10k CA)
    });
});