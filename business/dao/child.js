'use strict'

const child_prefix = `
        child_id childId,
        uuid ,
        name ,
        sex ,
        DATE_FORMAT(birth_time,'%Y-%m-%d %T') as birthTime,
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

    static async insertClild(connection, params) {
        let sql = `INSERT INTO child_main SET ?`,
            obj = {
                uuid: params.uuid,
                name: params.name,
                sex: params.sex,
                birth_time: params.birthTime,
            }

        let result = await dao.exec(connection, sql, obj);
        return result.affectedRows > 0 ? result.insertId : Promise.reject('新增失败');
    }

    static async updateChild(connection, params) {
        let sql = `UPDATE child_main SET ? WHERE uuid = ?`,
            obj = {},
            sqlParam = []
        if (params.status != undefined)
            obj.status = params.status
        if (params.isDelete != undefined)
            obj.is_delete = params.isDelete
        if (!!params.name)
            obj.name = params.name
        if (!!params.sex)
            obj.sex = params.sex
        if (!!params.birthTime)
            obj.birth_time = params.birthTime
        sqlParam.push(obj)
        sqlParam.push(params.uuid)
        let result = await dao.exec(connection, sql, sqlParam);
        return result.affectedRows > 0 ? Promise.resolve('更新成功') : Promise.reject('更新失败');
    }

    static async getChild(connection, params) {
        let sql = () => `SELECT ${user_prefix} FROM user_main ${where.join(' ')} LIMIT 1`,
            where = [`where 1=1 AND open_id = '${param.FromUserName}'`]
        if (param.status)
            where.push(`AND \`status\` = '${param.status}'`)
        return (await dao.exec(connection, sql(), []))[0]
    }
}

module.exports = dao;