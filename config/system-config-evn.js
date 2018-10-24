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
}