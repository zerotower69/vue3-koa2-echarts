const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const TerserPlugin = require('terser-webpack-plugin')

// 通过webpack-merge合并基础配置，添加生产时配置
/**
 * @type {import('webpack').Configuration}
 */
const webpackConfig = {
    mode: 'production', // 生产模式
    stats: {
        children: false, // webpack打包时子模块信息设置不显示
        warnings: false // 警告不显示
    },
    optimization: {
        minimizer: [
            // terser-webpack-plugin插件可以压缩代码
            // 在webpack版本中需要安装terser-webpack-plugin
            // 里面是官方推荐的具体的参数，详情可查看文档
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        warnings: false,
                        drop_console: false, // 取消注释console 方便有时候进行调试
                        dead_code: true,
                        drop_debugger: true
                    },
                    output: {
                        comments: false, // 不要注释
                        beautify: false // 不要格式，一行显示所有代码
                    },
                    mangle: true
                },
                parallel: true, // 使用多进程并行运行可提高构建速度，默认的并发运行数量 os.cpus().length - 1
            })
        ],
        // splitChunks 用来避免模块之间重复的依赖关系
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 3,
                    enforce: true
                }
            }
        }
    }
};

module.exports = merge(baseConfig, webpackConfig)