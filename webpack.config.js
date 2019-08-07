const path = require('path')

// Plugins being used in the webpack build process.
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin')
const ExtractCssPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

const mode = process.env.NODE_ENV || 'development'
const isProd = mode === 'production'

const cspHtmlWebpackPlugin = {
  'default-src': "'none'",
  'font-src': `'self' data: https://fonts.gstatic.com/`,
  'img-src': "'self' data: *.githubusercontent.com/",
  'object-src': "'none'",
  'script-src': "'self' 'unsafe-inline'",
  'style-src': "'self' 'unsafe-inline' https://fonts.googleapis.com/",
  'connect-src': "'self' https://api.github.com/repos/angular/angular/issues"
}

if (process.env.BABEL_ENV === 'cypress') {
  cspHtmlWebpackPlugin['script-src'] += " 'unsafe-eval'"
}

const config = {
  devtool: isProd ? 'source-map' : 'inline-source-map',
  entry: path.resolve(__dirname, 'index'),
  mode: isProd ? 'production' : 'development',
  output: {
    filename: isProd ? '[name].[contenthash:8].js' : '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          isProd ? ExtractCssPlugin.loader : 'vue-style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.woff2?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
            name: isProd ? '[name].[hash:8].[ext]' : '[name].[ext]'
          }
        }
      },
      {
        test: /\.(ttf|eot|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: isProd ? '[name].[hash:8].[ext]' : '[name].[ext]'
          }
        }
      },
      {
        test: /\.(png|jpe?g)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 4000,
            name: 'images/[name].[hash:8].[ext]'
          }
        }
      },
      {
        test: /\.s(c|a)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              fiber: require('fibers'),
              indentedSyntax: true // optional
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'assets/index.html'
    }),
    new VueLoaderPlugin(),
    new VuetifyLoaderPlugin(),
    new CspHtmlWebpackPlugin(cspHtmlWebpackPlugin, {
      hashingMethod: 'sha256',
      enabled: true
    }),
    new ExtractCssPlugin({
      filename: '[name].[contenthash:8].css'
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }]
      }
    })
  ],
  resolve: {
    extensions: ['.js', '.json', '.vue']
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      })
    ]
  },
  devServer: {
    port: 8080
  }
}

module.exports = config
