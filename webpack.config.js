/* Load required modules: path and html-webpack-plugin */
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

let ROOT_PATH     = path.resolve(__dirname);
let ENTRY_PATH    = path.resolve(ROOT_PATH, 'app/js/index.js');
// let SRC_PATH      = path.resolve(ROOT_PATH, 'app');
let JS_PATH       = path.resolve(ROOT_PATH, 'app/js');
let TEMPLATE_PATH = path.resolve(ROOT_PATH, 'app/index.html');
// let SHADER_PATH   = path.resolve(ROOT_PATH, 'src/shaders');
let BUILD_PATH    = path.resolve(ROOT_PATH, 'dist');

// set debug to true if we are not in production environment
let debug = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: ENTRY_PATH,

  output: {
    path: BUILD_PATH,
    filename: 'bundle.js'
  },
  plugins: [
    /*
    HTML webpack plugin generates <script> and <link> tags
    and merges them into our starter template HTML
    */
    new HtmlWebpackPlugin({
      title: 'WebGL Three.js Starter', // Goes under <title> of the generated HTML
      template: TEMPLATE_PATH,           // Template HTML to use
      inject: 'body'                     // Inject the <script> tags in <body>
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        // include: JS_PATH,
        exclude: /(node_module|bower_components)/,
        use: 'babel-loader',
        // query: {
        //   cacheDirectory: true
        // }
      },
      // {
      //   test: /\.glsl$/,
      //   include: SHADER_PATH,
      //   loader: 'webpack-glsl-loader'
      // }
    ]
  },
  //devtool: 'source-map'
};
