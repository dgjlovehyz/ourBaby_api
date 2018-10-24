const db = require('../../config/system-config-evn').db;


function manageTransactionConnection(asyncAction) {

    return new Promise((resolve, reject) => {
        db.getConnection((err, connection) => {
            if (err) return reject(err)
            //开启自动提交、接口名称表达的是修改回原来的设置
            var closeAutoCommit = (err, result) => {
                connection.query('SET autocommit = 1', (autocommitErr, ret) => {
                    if (!!autocommitErr) {
                        console.log(autocommitErr)
                        return reject(autocommitErr)
                    }
                    connection.release()
                    if (!!err) return reject(err)

                    resolve(result)
                })
            }

            connection.query('SET autocommit = 0', (err, ret) => {
                if (!!err)
                    return closeAutoCommit(err)
                connection.beginTransaction(async (err) => {
                    if (!!err)
                        return closeAutoCommit(err)
                    if (!!asyncAction && typeof asyncAction == 'function') {
                        try {
                            let result = await asyncAction(connection);
                            connection.commit((err) => {
                                if (!!err)
                                    return connection.rollback(() => {
                                        return closeAutoCommit(err)
                                    })
                                return closeAutoCommit(null, result)
                            })
                        } catch (error) {
                            connection.rollback(() => {
                                return closeAutoCommit(error)
                            })
                        }
                    } else {
                        resolve(connection)
                    }

                });
            });
        });
    });
}


function manageConnection(asyncAction) {
    return new Promise((resolve, reject) => {
        db.getConnection(async (err, connection) => {
            if (err) return reject(err);
            if (!!asyncAction) {
                try {
                    resolve(await asyncAction(connection));
                } catch (error) {
                    reject(error);
                }
                finally {
                    connection.release();
                }
            } else {
                resolve(connection);
            }
        });
    })
}



class dao {
    /**
     * 
     * 创建一个支持事务的dbConnection。如果传递了 asyncAction ，则自动处理事务和释放链接池，否是需要使用者自己控制事务commit 或者 rollback 。
     * 如：new dao().manageTransactionConnection(async (connection)=>{
     * })
     * .then(result)
     * .catch(err);
     * @param {async Function} asyncAction 具体业务操作的异步函数。此函数唯一的一个参数是dbConnection。此函数必须返回一个Promise 对象，即：必须异步函数。
     */
    manageTransactionConnection(asyncAction) {
        return dao.manageTransactionConnection(asyncAction);
    }
    /**
     * 
     * 创建一个dbConnection。如果传递了 asyncAction ，则自动释放链接池，否是需要使用者自己控制连接的释放。
     * 如：new dao().manageConnection(async (connection)=>{
     * })
     * .then(result)
     * .catch(err);
     * @param {async Function} asyncAction 具体业务操作的异步函数。此函数唯一的一个参数是dbConnection。此函数必须返回一个Promise 对象，即：必须异步函数。 
     */
    manageConnection(asyncAction) {
        return dao.manageConnection(asyncAction);
    }
    /**
     * 
     * 创建一个支持事务的dbConnection。如果传递了 asyncAction ，则自动处理事务和释放链接池，否是需要使用者自己控制事务commit 或者 rollback 。
     * 如：dao.manageTransactionConnection(async (connection)=>{
     * })
     * .then(result)
     * .catch(err);
     * @param {async Function} asyncAction 具体业务操作的异步函数。此函数唯一的一个参数是dbConnection。此函数必须返回一个Promise 对象，即：必须异步函数。
     */
    static manageTransactionConnection(asyncAction) {
        return manageTransactionConnection(asyncAction);
    }

    /**
     * 
     * 创建一个dbConnection。如果传递了 asyncAction ，则自动释放链接池，否是需要使用者自己控制连接的释放。
     * 如：dao.manageConnection(async (connection)=>{
     * })
     * .then(result)
     * .catch(err);
     * @param {async Function} asyncAction 具体业务操作的异步函数。此函数唯一的一个参数是dbConnection。此函数必须返回一个Promise 对象，即：必须异步函数。 
     */
    static manageConnection(asyncAction) {
        return manageConnection(asyncAction);
    }

}

module.exports = dao;