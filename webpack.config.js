/* eslint-disable */
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (env) => {
  const devConfig = {
    target: 'web',
    mode: 'development',
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    devtool: 'inline-source-map',
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'build/dist'),
      filename: 'bundle.[contenthash].js',
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          use: {
            loader: 'html-loader',
          },
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
            },
            {
              loader: 'source-map-loader',
            },
          ],
          enforce: 'pre',
        },
        {
          test: /\.(svg|png|jpg|gif)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images',
            },
          },
        },
        {
          test: /\.(woff|woff2|otf|eot|ttf)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/fonts',
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [require('tailwindcss'), require('autoprefixer')],
                },
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      alias: {
        Actions: path.resolve(__dirname, 'src/redux/actions'),
        Animations: path.resolve(__dirname, 'src/assets/animations'),
        Components: path.resolve(__dirname, 'src/components'),
        Data: path.resolve(__dirname, 'src/assets/data'),
        Images: path.resolve(__dirname, 'src/assets/images'),
        Pages: path.resolve(__dirname, 'src/pages'),
        Redux: path.resolve(__dirname, 'src/redux'),
        Services: path.resolve(__dirname, 'src/services'),
        Utils: path.resolve(__dirname, 'src/utils'),
      },
      fallback: {
        crypto: false,
      },
    },
    devServer: {
      contentBase: './public/',
      index: 'index.html',
      port: 3000,
      historyApiFallback: true,
      open: true,
      hot: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'public/index.html',
      }),
      new Dotenv({
        path: `src/config/${env.platform}.env`,
        safe: true,
        systemvars: true,
        silent: true,
        defaults: false,
      }),
    ],
  };

  const stagingConfig = {
    target: 'web',
    mode: 'production',
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
      minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()],
    },
    performance: {
      hints: 'warning',
    },
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'build/dist'),
      filename: 'static/js/bundle.[contenthash].js',
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          use: {
            loader: 'html-loader',
          },
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules/lodash-es')],
          loader: 'babel-loader',
        },
        {
          test: /\.(svg|png|jpg|gif)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[contenthash].[ext]',
              outputPath: 'static/assets/images',
            },
          },
        },
        {
          test: /\.(woff|woff2|otf|eot|ttf)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[contenthash].[ext]',
              outputPath: 'static/assets/fonts',
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    require('tailwindcss'),
                    require('autoprefixer'),
                    require('@fullhuman/postcss-purgecss')({
                      content: ['./src/**/*.tsx', './public/index.html'],
                      defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
                    }),
                  ],
                },
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      alias: {
        Actions: path.resolve(__dirname, 'src/redux/actions'),
        Animations: path.resolve(__dirname, 'src/assets/animations'),
        Components: path.resolve(__dirname, 'src/components'),
        Data: path.resolve(__dirname, 'src/assets/data'),
        Images: path.resolve(__dirname, 'src/assets/images'),
        Pages: path.resolve(__dirname, 'src/pages'),
        Redux: path.resolve(__dirname, 'src/redux'),
        Services: path.resolve(__dirname, 'src/services'),
        Utils: path.resolve(__dirname, 'src/utils'),
      },
      fallback: {
        crypto: false,
      },
    },
    devServer: {
      contentBase: './public/',
      index: 'index.html',
      port: 3000,
      historyApiFallback: true,
      compress: true,
      open: true,
      hot: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'public/index.html',
        favicon: 'public/favicon.ico',
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true,
        },
      }),
      new CleanWebpackPlugin(),
      new CopyPlugin({
        patterns: [{ from: 'public/robots.txt', to: 'robots.txt', toType: 'file' }],
        options: {
          concurrency: 100,
        },
      }),
      new MiniCssExtractPlugin({
        filename: 'index.css',
        chunkFilename: 'static/css/[name].[contenthash].css',
      }),
      new Dotenv({
        path: `src/config/${env.platform}.env`,
        safe: true,
        systemvars: true,
        silent: true,
        defaults: false,
      }),
    ],
  };

  return env.NODE_ENV === 'development' ? devConfig : stagingConfig;
};
