module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/strongly-recommended', 'eslint:recommended'],
    rules: {
        'no-console': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-unused-vars': 'off'
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}