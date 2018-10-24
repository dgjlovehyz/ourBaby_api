'use strict'

const
    sysconf = require('../../../config/system-config'),
    _ = require('underscore'),
    Exception = require('../../exception/exception')

/**
 * 
 * 
 * 
 * @module 错误处理
 */
module.exports = (err, req, res, next) => {
    if (!!_.isString(err)) {
        err = new Error(err);
    }
    let
        statusCode = err.statusCode || 500,
        message = '未知错误',
        code = err.code

    if (err.code == void 0 || err.code == null)
        code = statusCode;

    if (err instanceof Exception)
        message = err.message || message;

    // 业务输出状态
    res.status(statusCode);

    console.error(err);

    res.json(
        (
            sysconf.system.debug
            && err
            && {
                message: err.message,
                stack: err.stack || (new Error()).stack,
                code: code
            }
        ) || { message: message, code: code, param: err.param }
    );
}