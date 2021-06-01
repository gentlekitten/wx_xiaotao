const path = require('path')
// const CompressionPlugin = require('compression-webpack-plugin')
// const Timestamp = new Date().getTime()

module.exports = {
  css: {
    // 打包时禁用顺序检查
    extract: process.env.NODE_ENV === 'production' ? {
      ignoreOrder: true,
    } : false,
  },
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
  // 使用gzip压缩
  // configureWebpack: config => {
  //   if (process.env.NODE_ENV === 'production') {
  //     return {
  //       plugins: [new CompressionPlugin({
  //         test: /\.js$|\.html$|\.css/, // 匹配文件名
  //         threshold: 10240, // 对超过10k的数据进行压缩
  //         deleteOriginalAssets: false // 是否删除原文件
  //       })]
  //     }
  //   }
  // },
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
    // https: false,
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
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/style/theme.less')]
    }
  },
  chainWebpack: config => {
    // 发布模式
    config.when(process.env.NODE_ENV === 'production', config => {
      config.entry('app').clear().add('./src/main-prod.js')
      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        lodash: '_',
        echarts: 'echarts',
        nprogress: 'NProgress',
        'vue-quill-editor': 'VueQuillEditor',
        vant: 'vant'
      })
      config.plugin('html').tap(args => {
        args[0].isProd = true
        return args
      })
      // 给js和css配置版本号
      // config.output.filename('js/[name].' + Timestamp + '.js').end();
      // config.output.chunkFilename('js/[name].' + Timestamp + '.js').end();
      // config.plugin('extract-css').tap(args => [{
      //   filename: `css/[name].${Timestamp}.css`,
      //   chunkFilename: `css/[name].${Timestamp}.css`
      // }])
    })
    // 开发模式
    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main.js')
      config.plugin('html').tap(args => {
        args[0].isProd = false
        return args
      })
    })
  }
}
