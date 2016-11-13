'use strict';

const webpack = require('webpack')
    , ExtractTextPlugin = require('extract-text-webpack-plugin')
    , autoprefixer = require('autoprefixer')
    ;

const NODE_ENV = process.env.NODE_ENV || 'dev'
    , DEV_BUILD = NODE_ENV === 'dev'
    ;

module.exports = {
    watch: DEV_BUILD,
    devtool: DEV_BUILD ? 'cheap-inline-module-source-map' : null,

    context: __dirname + '/src',
    entry: {
        main: './scripts/main.js'
    },
    output: {
        path: __dirname + '/build',
        publicPath: '../',
        filename: 'scripts/[name].js'
    },
    resolve: {
        root: __dirname + '/bower_components'
    },
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
        },{
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('css-loader!postcss-loader!less-loader')
        },{
            test: /\.(png|jpg|jpeg|gif|svg)$/,
            loader:'file-loader?name=[path][name].[ext]'
        },{
            test: /\.(ttf|eot|woff|woff2)$/,
            loader:'file-loader?name=[path][name].[ext]'
        }]
    },
    plugins: [
        new ExtractTextPlugin('styles/[name].css', { allChunks: true })
    ],
    postcss: [ 
        autoprefixer({ browsers: ['last 2 versions'] }) 
    ]
};

if (!DEV_BUILD) {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true
            }
        })
    );

    module.exports.plugins.push(
        new webpack.NoErrorsPlugin()
    );
}