'use strict'


const media_prefix = `
        un.id,
        un.media_path mediaPath,
        un.media_id mediaId,
        un.state,
        un.type,
        DATE_FORMAT(un.creat_time,'%Y-%m-%d %T') as creatTime,
        DATE_FORMAT(un.update_time,'%Y-%m-%d %T') as updateTime
    `
/**
 * 素材dao
 */
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

    static async insertOrUpdateImgMedia(connection, params) {
        let sql = `INSERT INTO img_info (media_path,media_id,state,type) values('${params.data.imgPath}','${params.data.mediaId}',${params.state || 0},'${params.type}')
            ON DUPLICATE KEY UPDATE media_path=values(media_path),media_id=values(media_id),state=values(state),update_time=now()`
        let result = await this.exec(connection, sql, [])
        return result.affectedRows > 0 ? result.insertId : Promise.reject('新增或更想失败');
    }

    static async updateImgMedia(connection, params) {
        let sql = `UPDATE img_info set ? where id = ?`,
            obj = {
                media_path: params.mediaPath,
                media_id: params.mediaId,
                state: params.state,
            }
        return await this.exec(connection, sql, [obj, params.imgId])
    }

    static async insertOrUpdateNews(connection, params) {
        let sql = `INSERT INTO child_news (child_id,media_id) values(${params.childId},'${params.mediaId}')
        ON DUPLICATE KEY UPDATE media_id=values(media_id)`
        return await this.exec(connection, sql, [])
    }

    static async getNews(connection, params) {
        let sql = `SELECT id, child_id childId, media_id mediaId FROM child_news where child_id = ?`
        return (await this.exec(connection, sql, [params.childId]))[0]
    }

    

}

module.exports = dao;