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
            "complexity": ["error", 5],
        }
    }
];
