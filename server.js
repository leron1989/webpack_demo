const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

//告诉express使用 webpack-dev-middleware 和 webpack.config.js
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));

//设置3000端口为服务端口
app.listen(3000, function(){
    console.log('Example app listening on port 3000!\n');
})