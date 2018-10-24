'use strict'

class Exception extends Error {
    constructor(message, code, statusCode, data) {
        super(message);
        this.statusCode = statusCode || 500;
        this.status = this.statusCode
        this.code = code || this.statusCode;
        this.data = data;
    }
}

class BusinessException extends Exception {
    constructor(message, code) {
        if (!code) code = -1
        super(message, code, 400)
    }
}

class NotFoundException extends Exception {
    constructor(message) {
        super(message, 404, 404)
    }
}


/**
 * 通用异常类
 * @class exception
 */
class exception extends Exception {
    /**
     * 资源未找到的异常
     * @param {string} 异常消息
     * @returns {NotFoundException} 返回异常消息对象。statusCode 是返回给客户端的状态码；code 是业务错误码，默认与状态码相同；message 是返回给客户端的消息。
     */
    static NotFoundException(msg, code) {
        return new NotFoundException(msg, code);
    }

    /**
         * 常规业务异常
         * @param {string} 异常消息
         * @returns {BusinessException} 返回异常消息对象。statusCode 是返回给客户端的状态码；code 是业务错误码，默认与状态码相同；message 是返回给客户端的消息。
         */
    static BusinessException(msg, code) {
        return new BusinessException(msg, code);
    }
    /**
            * 网络异常
            * @param {string} 异常消息
            * @returns {Exception} 返回异常消息对象。statusCode 是返回给客户端的状态码；code 是业务错误码，默认与状态码相同；message 是返回给客户端的消息。
            */
    static NetWorkException(msg, code, statusCode) {
        return new Exception(msg, code, statusCode);
    }

}
module.exports = exception;