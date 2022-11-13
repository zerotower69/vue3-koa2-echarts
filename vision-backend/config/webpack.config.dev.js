const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

// 通过webpack-merge合并基础配置，添加开发时配置
/**
 * @type {import('webpack').Configuration}
 */
const webpackConfig = {
    mode: 'development', // 开发模式
    devtool: 'eval-source-map', // 开发时出错能知道在源代码中哪一行
    stats: {
        children: false, // webpack打包时子模块信息设置不显示
        modules: false // 不显示模块信息
    }
}

module.exports = merge(baseConfig, webpackConfig)