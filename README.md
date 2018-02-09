1.初始化
npm init -y
2.安装本地webpack
npm install --save-dev webpack
3.安装lodash依赖
npm install --save lodash
4.安装 style-loader 和 css-loader
npm install --save-dev style-loader css-loader
5.安装 file-loader
npm install --save-dev file-loader
6.安装 csv-loader 和 xml-loader
npm install --save-dev csv-loader xml-loader

四、管理输出
1. 通过给入口给文件定义名称，可以在输出时自动生成响应文件名称。如下方output.filename中的[name]对应entry中的app及print。\n
    entry:{
            app:'./src/index.js',
            print:'./src/print.js'
    },
    output:{
        filename:'[name].bundle.js',
        path:path.resolve(__dirname, 'dist')
    }

2. 当我们改变entry的中入口的名称，重新构建的数据将被重新命名。但是我们的index.html文件引用的仍然时旧的名称。此时我们可以通过HtmlWebpackPlugin插件来解决这个问题。

    2.1. 首先需要安装插件：
    npm install --save-dev html-webpack-plugin

    2.2. 其次在webpack.config.js中增加插件配置：
    增加配置文件首先需要引入HtmlWebpackPlugin:\n
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    其次，增加配置：
    plugins:[
        new HtmlWebpackPlugin({
            title: 'Output Management'
        })
    ]

    注意：即使在dist目录中已经有了index.html，通过HtmlWebpackPlugin还是会自动生成一个index.html文件.

3. 清理/dist文件夹。因为webpack无法追踪到哪些文件是实际项目中用到的，所以在每次构建前清理/dist文件夹是比较推荐的作法。通过clean-webpack-plugin插件，可以自动来完成清理工作。
    3.1 首先需要安装插件：
    npm install clean-webpack-plugin --save-dev

    3.2 修改webpack.config.js插件配置：
    引入：
    const cleanWebpackPlugin = require('clean-webpack-plugin');
    增加配置：
    plugins:[
        new cleanWebpackPlugin(['dist'])
    ]
4. 扩展学习Manifest...

五、 开发
1. source map使用。当我们将多个文件（如：a.js，b.js,c.js）打包到一个bundle.js中时，如果一个源文件包含一个错误，那么堆栈会简单的把错误指向bundle.js，这对我们来说时没有意义的。JavaScript提供了source map功能，将编译后的代码映射回原始代码中。
    1.1. 我们通过在webpack.config.js中新增inline-source-map选项来帮助我们精确定位错误：
    devtool: 'inline-source-map',

2. 当我们每次编码时，手动运行npm run build会很麻烦，因此我们需要一个自动会的工具帮我们完成这项任务。webpack提供了如下几个选项帮助我们在代码发生变化后自动编译代码：
    1. webpack's Watch Mode
    2. webpack-dev-server
    3. webpack-dev-middleware

    2.1 webpack's Watch Mode（观察模式）
    要启动webpack观察模式，需要对package.json做如下修改，新增了"watch"选项：
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "watch": "webpack --watch",  //此处为新增脚本
        "build": "webpack"
    },
    然后通过运行：npm run watch
    来启动观察模式，此时控制台编译完成后将不会退出，当我们再次修改文件保存后在控制台可有看到webpack会自动进行编译。观察模式有个缺点，每次自动完成编译后需要刷新页面才能看到最新效果。

    2.2 webpack-dev-server 提供了一个简单的web服务器，并且能够事实重新加载（live reloading）.
        2.2.1 首先安装webpack-dev-server:
        npm install --save-dev webpack-dev-server

        2.2.2 其次，修改webpack.config.js：
        devServer: {
            contentBase: './dist'
        }
        以上配置告知webpack-dev-server，在localhost:8080下建立服务，将dist目录下文件作为可访问文件。

        2.2.3 修改package.json文件，配置启动开发服务命令。
        "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1",
            "watch": "webpack --watch",
            "start": "webpack-dev-server --open", //此处为新增脚本
            "build": "webpack"
        }

        现在可以运行:npm run start启动服务啦。

    2.3 webpack-dev-middleware 时一个中间件容器（wrapper）,具体作用有待理解，暂做webpack-dev-middleware 配合 express server简单使用实例的记录，后续深入阅读...
        2.3.1 首先安装 express 和 webpack-dev-middleware：
        npm install --save-dev express webpack-dev-middleware

        2.3.2 调整webpack.config.js配置：
        output:{
            filename:'[name].bundle.js',
            path:path.resolve(__dirname, 'dist'),
            publicPath: '/'  //此处为新增脚本
        }

        2.3.3 自定义express服务脚本server.js,详情见/server.js

        2.3.4 添加npm script，以方便运行服务：
        "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1",
            "watch": "webpack --watch",
            "start": "webpack-dev-server --open",
            "server": "node server.js",  //此处为新增脚本
            "build": "webpack"
        }

