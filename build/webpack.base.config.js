/**
 * webpack基础配置
 */
var path = require('path')
var utils = require('./utils')
var config = require('../config')

/**
 * 以当前所处的文件夹的上层文件夹为基础，拼装返回指定文件夹的绝对路径
 * @param {Object} dir 文件夹名称
 * @return 文件夹的绝对路径
 */
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
//生成src目录下各个子文件夹的绝对路径配置
var alias = ['api','components','constant','core','routes','utils'].reduce(function (prev, folder) {
    prev[folder] = resolve('src/' + folder)
    return prev
  }, { static: resolve('static') })

module.exports = {//webpack配置
  entry: {//页面入口文件配置
    app: [//首页
      './src/index.js'
    ],
  },
  output: {//编译文件输出配置
    path: config.build.assetsRoot,//输出文件路径配置
    filename: '[name].js',//文件名配置
    publicPath: process.env.NODE_ENV === 'production'//资源访问路径前缀配置
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath,
  },
  resolve: {//import引入文件时匹配规则
    extensions: ['.js', '.jsx', '.json'],//匹配的文件名后缀
    alias: alias//匹配的文件夹路径
  },
  module: {
    rules: [//文件处理规则
      {//js代码语法检查
        test: /\.jsx?$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          formatter: require('eslint-friendly-formatter'),
        },
      },
      {//js代码编译
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {//图片文件加载
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('image/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.svg$/,
        include: [
          resolve('src/core/components/icon/svg'),
        ],
        loader: 'svg-sprite-loader',
      },
      {//字体文件加载
        test: /\.(woff2?|eot|ttf|otf)$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
        },
      },
    ],
  },
  performance: {//执行配置
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false,//错误提示
  },
}
