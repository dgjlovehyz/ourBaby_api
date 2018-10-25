const mysql = require('mysql');

module.exports = {
    http: {
        port: 80,
    },
    system: {
        debug: true
    },
    apidoc: {
        port: 3001
    },
    db: mysql.createPool({
        host: '121.196.212.213',
        user: 'root',
        password: 'My*sql123',
        database: 'mybaby',
        multipleStatements: '',
        connectionLimit: 50,
        charset: 'utf8mb4'
    }),
    redis: {
        port: 6379,
        host: '172.16.127.187',
        password: 'dgj123456',  // 密码
        db: 0,
        family: 4, // ip地址族
        keepAlive: 0.1 * (1000 * 60 * 60), //保持连接24h
        connectTimeout: 1000 * 5, //连接超时
        readOnly: false
    },
}