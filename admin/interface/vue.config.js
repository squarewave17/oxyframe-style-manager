module.exports = {
  filenameHashing: false,
  publicPath:
    '/wp-content/plugins/oxyframe-style-manager/admin/interface/dist/',
  chainWebpack: (config) => {
    config.plugins.delete('html')
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
  },
  devServer: {
    host: 'style-manager.test',
    hot: false,
    devMiddleware: {
      writeToDisk: true,
    },
  },
  css: {
    extract: true,
  },
}
