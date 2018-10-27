'use strict'

const user_prefix = `
        user_id,
        open_id openId,
        \`status\` ,
        DATE_FORMAT(creat_time,'%Y-%m-%d %T') as creatTime,
        is_delete isDelete
        `
class dao {
    static async exec(connection, sql, params) {
        return new Promise((resolve, reject) => {
            connection.query(sql, params, (err, result) => {
                if (err) { console.error('err', err); return reject(err) }
                console.log('sql result', result)
                return resolve(result)
            });
        });
    }

    /**
     * 新增
     * @param {*} connection 
     * @param {*} params 
     */
    static async insertUser(connection, params) {
        let sql = `INSERT INTO user_main SET ?`,
            obj = {
                open_id: params.FromUserName,
            }
        let result = await dao.exec(connection, sql, obj);
        return result.affectedRows > 0 ? result.insertId : Promise.reject('新增失败');
    }

    /**
     * 更新
     * @param {*} connection 
     * @param {*} params 
     */
    static async updateUser(connection, params) {
        let sql = `UPDATE user_main SET ? WHERE open_id = ?`,
            obj = { open_id: params.FromUserName },
            sqlParam = []
        if (params.status != undefined)
            obj.status = params.status
        sqlParam.push(obj)
        sqlParam.push(params.FromUserName)
        let result = await dao.exec(connection, sql, sqlParam);
        return result.affectedRows > 0 ? Promise.resolve('更新成功') : Promise.reject('更新失败');
    }

    /**
     * 查询单个user
     * @param {*} connection 
     * @param {*} param 
     */
    static async getUser(connection, param) {
        let sql = () => `SELECT ${user_prefix} FROM user_main ${where.join(' ')} LIMIT 1`,
            where = [`where 1=1 AND open_id = '${param.FromUserName}'`]
        if (param.status)
            where.push(`AND \`status\` = '${param.status}'`)
        return (await dao.exec(connection, sql(), []))[0]
    }

}

module.exports = dao;