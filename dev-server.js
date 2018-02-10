const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const config = require('./webpack.config.js');
const option = {
    contentBase: './dist',
    hot: true,
    host: 'localhost'
};

webpackDevServer.addDevServerEntrypoint(config, option);
const compier = webpack(config);
const server = new webpackDevServer(compier, option);

server.listen(5000, 'localhost', () => {
    console.log('dev server listening on port 5000');
});