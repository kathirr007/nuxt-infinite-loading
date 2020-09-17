module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    "no-console": 0,
    "indent": 0,
    "vue/html-self-closing": 0,
    "vue/attributes-order": 0,
    "no-multiple-empty-lines": 0,
    "comma-dangle": 0,
    "vue/max-attributes-per-line": 0,
    "vue/no-unused-vars": 0,
    "vue/no-multi-spaces": 0,
  }
}
