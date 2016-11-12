'use strict';

const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV || 'dev'
    , DEV_BUILD = NODE_ENV === 'dev'
    ;

module.exports = {
    entry: './src/scripts/main.js',
    output: {
        filename: './build/scripts/bundle.js'
    },

    watch: DEV_BUILD,

    devtool: DEV_BUILD ? 'cheap-inline-module-source-map' : null,

    module: {
        loaders: [{
            test:  /\.js$/,
            include: [
                __dirname + '/src/scripts'
            ],
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }]
    },

    plugins: DEV_BUILD ? [] :
        [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    drop_console: true
                }
            }),
            new webpack.NoErrorsPlugin()
        ]
};