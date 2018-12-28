var path = require('path')

module.exports = {
  build: {//编译方面的配置
    env: require('./prod.env'),//环境
    index: path.resolve(__dirname, '../dist/index.html'),//首页
    assetsRoot: path.resolve(__dirname, '../dist'),//编译后输出的目标文件夹
    assetsSubDirectory: 'static',//静态资源存放路径
    assetsPublicPath: '/',//资源文件访问路径
    productionSourceMap: false,//生产环境是否生成sourcemap文件
    productionGzip: true,//生产环境资源文件是否压缩
    productionGzipExtensions: ['js', 'css'],//生产环境要处理压缩文件的后缀名
  },
  dev: {//开发环境的配置
    env: require('./dev.env'),//环境
    port: 3002,//端口
    assetsSubDirectory: 'static',//静态资源存放路径
    assetsPublicPath: '/',//资源文件访问路径
    proxyTable: {//代理链表
      '/school-pay-server/public': 'http://127.0.0.1:8080',
    },
    cssSourceMap: false,//css不生成sourcemap文件
  },
}
