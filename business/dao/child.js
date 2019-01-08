'use strict'

const child_prefix = `
        cm.child_id childId,
        cm.uuid ,
        cm.name ,
        cm.sex ,
        DATE_FORMAT(cm.birth_time,'%Y-%m-%d %T') as birthTime,
        cm.\`status\` ,
        DATE_FORMAT(cm.creat_time,'%Y-%m-%d %T') as creatTime,
        cm.is_delete isDelete
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
        let sql = () => `SELECT ${child_prefix} FROM child_main cm ${where.join(' ')} LIMIT 1`,
            where = [`where 1=1 `]
        if (!!params.childId)
            where.push(`AND cm.child_id = ${params.childId}`)
        if (!!params.uuid)
            where.push(`AND cm.uuid = '${params.uuid}'`)
        if (!!params.status)
            where.push(`AND cm.\`status\` = '${params.status}'`)
        return (await dao.exec(connection, sql(), []))[0]
    }

    static async insertUnion(connection, params) {
        let sql = `INSERT INTO user_child_relation SET ?`,
            obj = {
                user_id: params.userId,
                child_id: params.childId,
                user_relation: params.userRelation,
                child_relation: params.childRelation,
            }

        let result = await dao.exec(connection, sql, obj);
        return result.affectedRows > 0 ? result.insertId : Promise.reject('新增失败');
    }

    static async selectChildByOpenid(connection, params) {
        let sql = () => `SELECT ${child_prefix},
            ucr.child_relation childRelation
        FROM
            child_main cm
        LEFT JOIN user_child_relation ucr ON ucr.child_id = cm.child_id
        LEFT JOIN user_main um ON um.user_id = ucr.user_id
        ${where.join(' ')}
        ORDER BY cm.birth_time asc `,
            where = [`WHERE 1=1`]
        if (!!params.openId)
            where.push(`AND um.open_id = '${params.openId}'`)

        return await dao.exec(connection, sql(), [])
    }

    static async getChildANDRelation(connection, params) {
        let sql = () => `SELECT ${child_prefix},
            ucr.child_relation childRelation 
        FROM 
            child_main cm 
        LEFT JOIN user_child_relation ucr ON ucr.child_id = cm.child_id 
        LEFT JOIN user_main um ON um.user_id = ucr.user_id and um.open_id = '${params.openId}'
        ${where.join(' ')} LIMIT 1`,
            where = [`where 1=1 `]
        if (!!params.childId)
            where.push(`AND cm.child_id = ${params.childId}`)
        if (!!params.uuid)
            where.push(`AND cm.uuid = '${params.uuid}'`)
        if (!!params.status)
            where.push(`AND cm.\`status\` = '${params.status}'`)
        return (await dao.exec(connection, sql(), []))[0]
    }

    static async insertChildDiary(connection, params) {
        let sql = `INSERT INTO user_diary SET ?`,
            obj = {
                child_id: params.childId,
                img_path: params.imgPath,
                img_desc: params.imgDesc,
            }

        return await dao.exec(connection, sql, obj)
    }
}

module.exports = dao;