module.exports = {
  configureWebpack: {
    resolve: {
      alias: require('./aliases.config').webpack,
    },
  },

  css: {
    // Enable CSS source maps.
    sourceMap: true,
  },

  pluginOptions: {
    quasar: {}
  },

  transpileDependencies: [
    /[\\\/]node_modules[\\\/]quasar[\\\/]/
  ]
}
