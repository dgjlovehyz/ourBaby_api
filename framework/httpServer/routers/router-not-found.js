'use strict'

const
    Exception = require('../../exception/exception')

/**
 * 
 * 
 * @module 资源404错误处理
 */
module.exports = (req, res, next) => {
    console.log('ip-' + req.ip)
    next(new Exception.NotFoundException('Not Found'));
}