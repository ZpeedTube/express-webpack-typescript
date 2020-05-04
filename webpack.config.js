const path = require('path');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ejsHtmlLoader = require('ejs-html-loader')
require('text-loader')

const {
  NODE_ENV = 'production',
} = process.env;

const serverConfig = {
  entry: './src/server.ts',
  mode: NODE_ENV,
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'ts-loader',
        ]
      },
      {
        test: /\.ejs$/,
        use: [
            {
                loader:'html-loader', // Use html-loader to process references to image resources
                options: {
                    attrs: ['img:src', 'img:data-src','script:src']
                }
            },
            {
                loader:'ejs-html-loader', //Processing with ejs-html-loader. Includes grammar for EJS files
                options: {
                    production: NODE_ENV === 'production'
                }
            }
        ]
      }
    ]
  },
  externals: [ nodeExternals() ],
  watch: NODE_ENV === 'development',
  plugins: [
    // new CopyWebpackPlugin([
    //   {
    //     from: './src',
    //     to: './'
    //   }
    // ]),
    new WebpackShellPlugin({
      onBuildEnd: ['npm run run:dev']
    })
  ],
  node: {
      __dirname: false
  }
}


const clientConfigJs = {
  entry: './src/web/index.ts',
  mode: NODE_ENV,
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './web/index.js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'ts-loader',
        ]
      },
      {
        test: /\.ejs$/,
        use: [
            {
                loader:'html-loader', // Use html-loader to process references to image resources
                options: {
                    attrs: ['img:src', 'img:data-src','script:src']
                }
            },
            {
                loader:'ejs-html-loader', //Processing with ejs-html-loader. Includes grammar for EJS files
                options: {
                    production: NODE_ENV === 'production'
                }
            }
        ]
      }
    ]
  },
  externals: [ nodeExternals() ],
  watch: NODE_ENV === 'development',
  plugins: [
    new WebpackShellPlugin({
      onBuildEnd: ['npm run run:dev']
    })
  ],
  node: {
      __dirname: false
  }
}
const clientConfigHtml = {
  entry: './src/views/index.ejs',
  mode: NODE_ENV,
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'views/index.ejs'
  },
  resolve: {
    extensions: ['.ejs'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'ts-loader',
        ]
      },
      {
        test: /\.ejs$/,
        use: [
            {
                loader:'ejs-html-loader', //Processing with ejs-html-loader. Includes grammar for EJS files
                options: {
                    attrs: ['img:src', 'img:data-src','script:src']
                }
            }
        ]
      }
    ]
  },
  externals: [ nodeExternals() ],
  watch: NODE_ENV === 'development',
  plugins: [
    new WebpackShellPlugin({
      onBuildEnd: ['npm run run:dev']
    })
  ],
  node: {
      __dirname: false
  }
}


module.exports = [serverConfig, clientConfigJs, clientConfigHtml];