const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const package = require('./package.json');
const args = require('minimist')(process.argv.slice(2));
const isProduction = process.env.NODE_ENV === 'production';

// 拼接路径
const resolve = (dir) => path.join(__dirname, dir);

// 版本 & 构建时间
const version = package.version;
const nowDate = new Date();
const buildDate = `${nowDate.getFullYear()}-${
  nowDate.getMonth() + 1
}-${nowDate.getDate()} ${nowDate.getHours()}:${nowDate.getMinutes()}`;

// 增加环境变量
process.env.VUE_APP_VERSION = version;
process.env.VUE_APP_BUILD_TIME = buildDate;
process.env.VUE_APP_BUILD_INFO = `版本: ${version}, 构建日期: ${buildDate}`;
process.env.VUE_APP_TITLE = process.env.VUE_APP_TITLE || package.name;
process.title = path.basename(__dirname) + ' serve';

// 基础路径
const publicPath = process.env.VUE_APP_PUBLIC_PATH || '/';
const assetsDir = `./static`;
const assetsPath = (_path) => `${assetsDir}/${_path}`;

// 设置不参与构建的库
const externals = {};

// 多页配置, 默认未开启，如需要请参考 https://cli.vuejs.org/zh/config/#pages
const pages = undefined;
// const pages = {
//   index: './src/pages/app/main.ts',
//   subpage: './src/pages/subpage/main.ts'
// }

module.exports = {
  publicPath,
  assetsDir,
  lintOnSave: true,
  devServer: {
    hot: true,
    publicPath, // 和 publicPath 保持一致
    disableHostCheck: !isProduction, // 关闭 host check，方便使用 ngrok 之类的内网转发工具
    port: 4200,
    proxy: {
      '': {
        // 目标 API 地址  需要代理的服务器
        target: process.env.VUE_APP_PROXY_TARGET,
        // 如果要代理 websocket
        ws: true,
        // 是否允许跨域
        changeOrigin: true,
        pathRewrite: {
          // '^/api': ''
        }
      }
    }
  },
  css: {
    extract: true,
    loaderOptions: {
      // 设置 scss 公用变量
      sass: {
        additionalData: "@import '@styles/variables.scss';"
      }
    }
  },
  // pages,
  configureWebpack: (config) => {
    config.entry.app = ['./src/polyfills.ts', './src/main.ts'];
    const configNew = {
      plugins: [
        // copy custom static assets
        new CopyWebpackPlugin([
          {
            from: resolve(assetsDir),
            to: assetsDir,
            ignore: ['.*']
          }
        ])
      ]
    };
    if (isProduction) {
      configNew.externals = externals;
      configNew.output = {
        filename: assetsPath('js/[name].[contenthash:8].js'),
        chunkFilename: assetsPath('js/[id].[contenthash:8].js')
      };
      // gzip
      console.log('gzip: ', process.env.GZIP);
      if (process.env.GZIP === 'on') {
        configNew.plugins.push(
          new CompressionWebpackPlugin({
            filename: '[path].gz[query]',
            test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
            threshold: 10240,
            minRatio: 0.8,
            deleteOriginalAssets: false
          })
        );
      }
    } else {
      configNew.output = {
        filename: assetsPath('js/[name].[hash:8].js'),
        chunkFilename: assetsPath('js/[name].[hash:8].js')
      };
    }
    return configNew;
  },
  // 默认设置: https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-service/lib/config/base.js
  chainWebpack: (config) => {
    if (isProduction) {
      config.plugin('extract-css').use(MiniCssExtractPlugin, [
        {
          filename: assetsPath('css/[name].[contenthash:8].css'),
          chunkFilename: assetsPath('css/[id].[contenthash:8].css')
        }
      ]);

      // 关闭代码压缩
      !!args.analysis && config.optimization.minimize(false);

      // 多页时优化代码分割
      if (pages) {
        config.optimization.splitChunks({
          chunks: 'all',
          // 大于30KB才单独分离成chunk
          minSize: 30000,
          name: true,
          cacheGroups: {
            default: {
              priority: -20,
              // minChunks: 2,
              reuseExistingChunk: true
            },
            core: {
              name: 'core',
              test: /[\\/]src[\\/](core|shared)[\\/]/,
              chunks: 'initial',
              priority: -10,
              reuseExistingChunk: true
            },
            vendors: {
              name: 'vendors',
              test: /[\\/]node_modules[\\/]/,
              priority: 0,
              chunks: 'initial' // 只打包初始时依赖的第三方
            }
          }
        });
      }
    }

    /**
     * 删除懒加载模块的 prefetch preload, 降低带宽压力
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#preload
     * 而且预渲染时生成的 prefetch 标签是 modern 版本的，低版本浏览器是不需要的
     */
    config.plugins.delete('prefetch').delete('preload');
    // 解决 cli3 热更新失效 https://github.com/vuejs/vue-cli/issues/1559
    config.resolve.symlinks(true);

    config
      // 开发环境 sourcemap 不包含列信息
      .when(!isProduction, (config) => config.devtool('cheap-source-map'));
    // markdown
    config.module.rule('md').test(/\.md$/).use('text-loader').loader('text-loader').end();
    // svg
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule.include
      .add(resolve('src/assets/svg/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'tdp-icon-[name]'
      })
      .end();
    // image exclude
    const imagesRule = config.module.rule('images');
    imagesRule
      .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
      .exclude.add(resolve('src/assets/svg/icons'))
      .end();

    // 重新设置 alias
    const paths = require('./tsconfig.json').compilerOptions.paths;
    if (!isProduction && process.env.LOCAL_ALIAS) {
      const localAlias = JSON.parse(process.env.LOCAL_ALIAS);
      Object.assign(paths, localAlias);
    }
    Object.keys(paths).forEach((key) => {
      config.resolve.alias.set(key.replace('/*', ''), resolve(paths[key][0].replace('/*', '')));
    });
  },
  // 不输出 map 文件
  productionSourceMap: !!args.sourcemap,
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  },
  transpileDependencies: ['quasar']
};
