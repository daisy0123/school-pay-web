module.exports = process.env.NODE_ENV === 'development' ? require('./build/webpack.dev.config') : require('./build/webpack.prod.config')
