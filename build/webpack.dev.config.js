const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const fs = require('fs');
const package = require('../package.json');

fs.open('./build/env.js', 'w', function(err, fd) {
    const buf = 'export default "development";';
    fs.write(fd, buf, 0, buf.length, 0, function(err, written, buffer) {});
});

module.exports = merge(webpackBaseConfig, {
    devtool: '#source-map',
    output: {
        publicPath: '/dist/',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vender-exten', 'vender-base'],
            minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
            title: 'SmartLock',
            filename: '../index.html',
            inject: false
        }),
        new CopyWebpackPlugin([
            {
                from: 'src/views/components/theme-switch/theme'
            }
        ], {
            ignore: [
                
            ]
        })
    ],
	devServer: {
		historyApiFallback: true,
		hot: true,
        inline: true,
        port:9000,
		stats: {
			colors: true
		},
		proxy: {
			//匹配代理的url
			'/lock-api': {
				// 目标服务器地址
                target: 'http://172.16.10.80:8082',
                // target: 'http://172.16.10.145:8082',
                // target: 'http://172.16.10.141:8085',
				//路径重写
				pathRewrite: {
					
				},
				changeOrigin: true
			}
		}
	}
});