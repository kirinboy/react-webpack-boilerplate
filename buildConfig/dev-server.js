'use strict';
import WebpackDevServer from 'webpack-dev-server';
import Webpack from 'webpack';
import webpackConfigBase from './webpack.config.base';
import WebpackBrowserPlugin from 'webpack-browser-plugin';
import config from './config';

const compiler = Webpack({
    ...webpackConfigBase,
    entry: {
        ...webpackConfigBase.entry,
        app: [
            `webpack-dev-server/client?http://localhost:${config.port}/`,
            'webpack/hot/dev-server',
            ...webpackConfigBase.entry.app
        ]
    },
    module: {
        loaders: [
            {test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader']},
            ...webpackConfigBase.module.loaders
        ]
    },
    plugins: [
        new Webpack.HotModuleReplacementPlugin(),
        new Webpack.SourceMapDevToolPlugin({test: /\.(js|jsx)$/, exclude: /node_modules/}),
        new WebpackBrowserPlugin({browser: 'Chrome', port: config.port}),
        ...webpackConfigBase.plugins
    ]
});
const server = new WebpackDevServer(compiler, {hot: true, stats: 'minimal'});
server.listen(config.port);