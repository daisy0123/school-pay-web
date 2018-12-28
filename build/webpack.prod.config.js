/**
 * 生产环境的webpack配置
 */

var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var config = require('../config')
var baseWebpackConfig = require('./webpack.base.config')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var webpackConfig = merge(baseWebpackConfig, {
  devtool: config.build.productionSourceMap ? '#source-map' : false,//开发工具配置
  output: {//编译文件输出配置
    path: config.build.assetsRoot,//输出文件路径配置
    filename: utils.assetsPath('js/[name].[chunkhash:8].js'),//入口文件的命名规则
    chunkFilename: utils.assetsPath('js/[id].[chunkhash:8].js'),//非入口文件的命名规则
  },
  module: {
    rules: utils.styleLoaders({//样式加载配置
      sourceMap: config.build.productionSourceMap,//是否生成样式sourcemap
      extract: true,
    }),
  },
  plugins: [//组件配置
    new webpack.DefinePlugin(Object.assign({//变量定义
      'process.env': config.build.env,
    }, utils.globalVar(config.build.env))),
    new webpack.optimize.UglifyJsPlugin({//代码加密压缩
      output: {
        comments: false,
      },
      compress: {
        warnings: false,
      },
      sourceMap: true,
    }),
    new ExtractTextPlugin({//将代码从bundle中抽离的插件
      filename: utils.assetsPath('css/[name].[contenthash:8].css'),
    }),
    new HtmlWebpackPlugin({//首页
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,//输出文件
      template: 'index.html',//模板文件
      inject: true,//是否注入
      minify: {//文件精减处理
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',//注入代码块排序模式
      chunks: ['app']//注入代码配置
    }),
    // copy custom static assets
    new CopyWebpackPlugin([//文件拷贝
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*'],
      },
    ]),
  ],
})

if (config.build.productionGzip) {//文件压缩插件
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8,
    })
  )
}

module.exports = webpackConfig
