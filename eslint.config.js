module.exports = [
    {
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "commonjs",
            globals: {
                console: "readonly",
                process: "readonly"
            }
        },
        rules: {
            // C'est cette règle qui va "punir" le code spaghetti !
            "complexity": ["error", 5],
            // On désactive une autre règle pour l'instant 
            "no-unused-vars": "warn"
        }
    }
];
