const { join } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Initial configurations
const pageTitle = 'PEAK EIGHT FASHION';
// PATH configurations
const PATH = {
  app: join(__dirname, 'app'),
  src: join(__dirname, 'src'),
  styles: join(__dirname, 'src/styles'),
  root: join(__dirname, ''),
  template: join(__dirname, 'src/template.ejs'),
  nodeModules: join(__dirname, 'node_modules'),
};
const developmentPort = 8080;

module.exports = (env = {}) => {
  console.log(env, process.env.NODE_ENV); // eslint-disable-line
  const devtool = 'source-map';
  const stats = {
    colors: true,
    reasons: true,
    assets: true,
    errorDetails: true,
  };
  const extensions = ['.js', '.jsx', '.css', '.scss', '.json'];
  // Compiling configurations
  const bundleConfig = {
    context: PATH.root,
    entry: {
      main: ['./src/index', './src/styles/index'],
    },
    devtool,
    mode: 'development',
    stats,
    output: {
      path: PATH.app,
      filename: 'assets/js/[name].bundle.js',
      publicPath: '/',
      pathinfo: true,
    },
    devServer: {
      hot: true,
      open: true,
      inline: true,
      port: developmentPort,
      publicPath: '/',
      compress: true,
      historyApiFallback: { disableDotRule: true },
      contentBase: PATH.app,
      // https: true,
    },
    resolve: { extensions },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: PATH.src,
          use: [
            {
              loader: 'babel-loader',
            },
          ],
        },
        {
          test: /\.s?css$/,
          include: PATH.styles,
          use: [
            env.production ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: Boolean(env.development),
                importLoaders: 1,
                minimize: Boolean(env.production),
              },
            },
            'sass-loader',
          ],
        },
      ],
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        title: `${pageTitle} - Development`,
        filename: 'index.html',
        template: PATH.template,
      }),
    ],
  };
  // Webpack configurations
  if (!env.production) {
    bundleConfig.entry.main.unshift(
      `webpack-dev-server/client?http://localhost:${developmentPort}/`,
      'react-hot-loader/patch'
    );
  }
  if (env.production) {
    delete bundleConfig.devServer;
    delete bundleConfig.output.pathinfo;
    delete bundleConfig.devtool;
    bundleConfig.mode = 'production';
    bundleConfig.watch = false;
    bundleConfig.output = {
      path: PATH.app,
      filename: 'assets/js/[name].bundle.js',
      publicPath: '/',
    };
    bundleConfig.stats = 'normal';
    // bundleConfig.resolve.alias = {
    //   react: 'preact-compat',
    //   'react-dom': 'preact-compat',
    // };
    bundleConfig.optimization = {
      splitChunks: {
        cacheGroups: {
          manifest: {
            test: /[\\/]node_modules[\\/]/,
            name: 'manifest',
            chunks: 'all',
          },
        },
      },
    };
    bundleConfig.plugins = [
      new BundleAnalyzerPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: 'assets/styles/[name].css',
        chunkFilename: 'assets/styles/[name].[id].css',
      }),
      new HtmlWebpackPlugin({
        title: `${pageTitle}`,
        filename: 'index.html',
        template: PATH.template,
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          html5: true,
          minifyCSS: true,
          removeComments: true,
          removeEmptyAttributes: true,
        },
      }),
    ];
  }
  const config = [bundleConfig];
  return config;
};
