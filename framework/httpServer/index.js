'use strict'
const
    http = require('http'),
    express = require('express'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    middlewares = require('express-middlewares-js');

const
    createExpressApp = option => {
        const app = express()
        app.set('port', option.port)
        app.use(logger('ourBaby'))
        app.use(express.query())
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({ extended: false }))

        //跨域
        app.all('*', require('./routers/router-cross-domain'));

        // 自定义路由
        if (option.routes && option.routes.length > 0)
            option.routes.forEach(router => app.use(router))

        // catch 404 and forward to error handler
        app.use(require('./routers/router-not-found'));

        // error handler
        app.use(require('./routers/router-error'));

        return app
    },


    /**
    * 创建 HTTP Server(RESTful API)
    *
    * @param {Number} port
    * @public
    */

    createServer = option => {
        const
            app = createExpressApp(option),
            server = http.createServer(app)

        // require('./httpEvent')(server, port)
        server.listen(option.port)
        console.log("server start")
    }

/**
 * Expose createServer 方法.
 */

exports = module.exports = createServer