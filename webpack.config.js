const path = require('path');
const webpack= require('webpack');

module.exports = {
    entry: './client/index.js',
    output: {
        path: path.resolve(__dirname + '/build'),
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
        compress: true,
        hot: true,
        port: 8080,
        publicPath: '/build/',
        proxy: {
            '/': 'http://localhost:3000'
      },
      },
    
}