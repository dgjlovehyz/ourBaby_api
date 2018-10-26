'use strict'

const

    _ = require('underscore'),

    path = require('path'),

    fs = require('fs'),

    cwd = process.cwd(),

    apiDir = path.join(cwd, 'routers'),

    files = fs.readdirSync(apiDir),

    sysconf = require('./config/system-config'),

    routes = []

_.each(files, file => {
    if (/.*router-.*\.js$/ig.test(file))
        routes.push(require(path.join(apiDir, file)))
})

require('./framework/httpServer')({
    port: sysconf.http.port,
    routes: routes
})

//开启job
require('./job/wx_job')()
//启动菜单创建
require('./util/menu')()