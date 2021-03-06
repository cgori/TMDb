module.exports = {
    env: {
        node: true,
        es6: true,
    },

    extends: [
        'airbnb-base',
        'prettier',
        'plugin:prettier/recommended',
    ],

    plugins: [
        'prettier',
    ],

    rules: {
        'prettier/prettier': 'error',
        'no-param-reassign': 'off',
        'consistent-return': 'off',
        'no-underscore-dangle': 'off',
        'no-console': 'off',
        'max-classes-per-file': 'off',
    },
};
