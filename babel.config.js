module.exports = {
  presets: [
    ['@babel/preset-env', { loose: true }],
    'vue'
  ],
  plugins: ['@babel/plugin-syntax-dynamic-import'],
  env: {
    cypress: {
      plugins: ['istanbul']
    }
  }
}
