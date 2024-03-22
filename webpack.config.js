const path = require('path'); // Импортируем модуль "path" для работы с путями файлов
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'), // Точка входа для сборки проекта
  output: {
    path: path.resolve(__dirname, 'dist'), // Путь для выходного файла сборки
    filename: 'main.js', // Имя выходного файла сборки
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.scss$/i, // Регулярное выражение для обработки файлов с расширением .css
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'], // Загрузчики, используемые для обработки CSS-файлов
      },
      {
        test: /\.pug$/,
        use: 'pug-loader'
      }
    ],
  },
  optimization: {
    minimizer: [`...`, new CssMinimizerPlugin()],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.pug',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin(),
    new ESLintPlugin({fix: true}),
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // Каталог для статики
    },
    open: true, // Автоматически открывать браузер
    hot: true
  },
  devtool: 'source-map',
};