/**
 * 开发环境的webpack配置
 */

var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var config = require('../config')
var baseWebpackConfig = require('./webpack.base.config')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

//页面入口文件加上热更新的配置
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = [
    'webpack-dev-server/client',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
  ].concat(baseWebpackConfig.entry[name])
})
//增加dev环境的特殊配置
module.exports = merge(baseWebpackConfig, {
  devtool: 'inline-source-map',//开发工具配置
  module: {//样式加载配置
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap }),
  },
  devServer: {//server配置
    hot: true,//热更新
    port: 3002,//端口
    contentBase: baseWebpackConfig.output.path,//没打包前的文件路径
    publicPath: baseWebpackConfig.output.publicPath,//打包后的文件路径
    disableHostCheck: true,//禁止热更新
    historyApiFallback: true,//设置为true，所有未知链接都将跳转到index.html
    proxy: config.dev.proxyTable,//代理设置
  },
  plugins: [//组件配置
    new webpack.DefinePlugin(Object.assign({//变量定义
      'process.env': config.dev.env,
    }, utils.globalVar(config.dev.env))),
    new webpack.HotModuleReplacementPlugin(),//热更新插件
    new webpack.NamedModulesPlugin(),//热加载时直接返回更新文件名
    new webpack.NoEmitOnErrorsPlugin(),//跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误
    new HtmlWebpackPlugin({//首页
      filename: 'index.html',//输出文件
      template: 'index.html',//模板文件
      inject: true,//是否注入
      chunks: ['app']//注入配置
    }),
    new FriendlyErrorsPlugin(),//错误提示插件
  ],
})
