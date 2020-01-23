const path = require('path');
const webpack= require('webpack');

module.exports = {
    entry: './client/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: 'bundle.js',
    },
    mode: process.env.NODE_ENV,
    module: {
        rules: [
            { test: /\.jsx?$/,
              exclude: /node_modules/,
              use: {
                  loader: 'babel-loader',
                  options: {
                      presets:['@babel/preset-env', '@babel/preset-react']
                    }
                 }
              },
              { test: /\.css?$/i,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    devServer: {
      host: 'localhost',
      port: 8080,
        // match the output path
      contentBase: path.resolve(__dirname, 'build'),
    // enable HMR on the devServer
      hot: true,
    // match the output 'publicPath'
     publicPath: '/',
    // fallback to root for other urls
      historyApiFallback: true,
      inline: true,
        port: 8080,
        publicPath: '/',
        headers: { 'Access-Control-Allow-Origin': '*' },
        proxy: {
            '**' : {
                target: 'http://[::1]:3000',
                secure:false,
                changeOrigin: true,
            },
          '/user/**': {
              target: 'http://localhost:3000',
            //   sercure: false,
          },
          '/news/**': {
              target: 'http://localhost:3000',
            //   sercure: false,
          },
          '/interests/**': {
              target: 'http://localhost:3000',
            //   sercure: false,
            },
        }
        }
    }