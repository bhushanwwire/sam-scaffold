const fs = require('fs');
const path = require('path');
const ZipPlugin = require('zip-webpack-plugin');

module.exports = {

    //entry: path.join(lambdaFunctionDir, fxn, 'index.js'),
    entry: {
        helloworld: ['babel-polyfill', './src/lambdas/helloWorld/index.js'],
        robots: ['babel-polyfill', './src/lambdas/robots/index.js']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]/index.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015'],
                            plugins: ["transform-async-to-generator"],
                            compact: false,
                            babelrc: true
                        }
                    }
                ]
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    optimization: {
        minimize: false,
        namedModules: true
    },
    /*plugins: [
        new ZipPlugin({
            path: path.join(__dirname, 'dist'),
            //    pathPrefix: '[name]',
            filename: `helloworld.zip`
        })
    ],*/
    target: 'node',
    externals: {
        // These modules are already installed on the Lambda instance.
        'aws-sdk': 'aws-sdk',
        'awslambda': 'awslambda',
        'dynamodb-doc': 'dynamodb-doc',
        'imagemagick': 'imagemagick'
    },
    stats: 'errors-only',
    bail: true
};