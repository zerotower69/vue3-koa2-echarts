const path = require('path');
const { defineConfig } = require('@vue/cli-service')
const HotHashWebpackPlugin = require('hot-hash-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const WebpackBar = require('webpackbar');
const resolve = (dir) => path.join(__dirname, '.', dir);
const IS_PROD = process.env.NODE_ENV === "production";
module.exports = defineConfig({
  productionSourceMap: false,
  publicPath: IS_PROD ? "./" : "/",
  outputDir: 'vision',
  devServer: {
    port: 8999,
    open: true,
    host: "0.0.0.0"
  },
  lintOnSave: false,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
    config.module.rule('images').use('url-loader')
    // .tap(options => ({
    //   name: './assets/images/[name].[ext]',
    //   quality: 85,
    //   limit: 0,
    //   esModule: false,
    // }));
    if (IS_PROD) {
      config.output.filename('./js/[name].[chunkhash:8].js');
      config.output.chunkFilename('./js/[name].[chunkhash:8].js');
      config.plugin('extract-css').tap(args => [{
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css'
      }]);
      config.plugin('hotHash').use(HotHashWebpackPlugin, [{ version: '1.0.0' }]);
      //修改网站的标题
      config.plugin('html').tap(args => {
        // console.log("html===>", args[0])
        args[0].title = process.env.VUE_APP_TITLE
        return args
      })
      config.plugin('webpackBar').use(WebpackBar);
      config.plugin('compress').use(CompressionPlugin, [{
        algorithm: 'gzip',
        test: /\.(js|css)$/, // 匹配文件名
        threshold: 10000, // 对超过10k的数据压缩
        deleteOriginalAssets: false
      }])
      config.optimization.minimize(true)
        .minimizer('terser')
        .tap(args => {
          let { terserOptions } = args[0];
          terserOptions.compress.drop_console = true;
          terserOptions.compress.drop_debugger = true;
          return args
        });
      config.optimization.splitChunks({
        cacheGroups: {
          common: {
            name: 'common',
            chunks: 'all',
            minSize: 1,
            minChunks: 2,
            priority: 1
          },
          vendor: {
            name: 'chunk-libs',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]/,
            priority: 10
          }
        }
      });
    }
  }
})
