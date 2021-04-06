const path = require('path')
module.exports = {
  // 公共路径(必须有的)
  publicPath: "./",
  // 输出文件目录
  outputDir: "dist",
  // 静态资源存放的文件夹(相对于ouputDir)
  assetsDir: "assets",
  // eslint-loader 是否在保存的时候检查(果断不用，这玩意儿我都没装)
  lintOnSave: false,
  // 我用的only，打包后小些
  runtimeCompiler: false,
  productionSourceMap: true, // 不需要生产环境的设置false可以减小dist文件大小，加速构建
  // css相关配置(我暂时没用到)
  // css: {
  // 是否使用css分离插件 ExtractTextPlugin
  // extract: true,
  // 开启 CSS source maps?
  // sourceMap: false,
  // css预设器配置项
  // loaderOptions: {},
  // 启用 CSS modules for all css / pre-processor files.
  // modules: false
  // },
  // webpack-dev-server 相关配置
  devServer: {
    open: false,  // npm run serve后自动打开页面
    host: '0.0.0.0',  // 匹配本机IP地址(默认是0.0.0.0)jixi.mynatapp.cc
    port: 8080, // 开发服务器运行端口号
    // product/
    proxy: {
      '/api': {
        target: 'https://jixi.mynatapp.cc/wechat',
        // 允许跨域
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    https: false
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/style/theme.less')]
    }
  }
}
