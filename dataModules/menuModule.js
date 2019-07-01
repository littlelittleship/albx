var connection = require('./connModule')

module.exports = {
    addMenu(obj, callback) {
        obj.icon = 'fa fa-glass'
        // - 先取出options表中的nav_menus数据
        var sql = 'select value from options where id = 9'
        connection.query(sql, (err, results) => {
            if (err) {
                callback(err)
            } else {
                // - 将获取到的数据对象转换为数组
                // 获取的数据是:[ RowDataPacket {
                // value:
                // '[{"icon":"fa fa-glass","text":"奇趣事","title":"奇趣事","link":"/category/funny"},{"icon":"fa fa-phone","text":"潮科技","title":"潮科技","link":"/category/tech"},{"icon":"fa fa-fire","text":"会生活","title":"会生活","link":"/category/living"},{"icon":"fa fa-gift","text":"美奇迹","title":"美奇迹","link":"/category/travel"}]' } ]
                var menus = JSON.parse(results[0].value)
                console.log(menus)
                // - 将接收到对象添加到这个数组中
                menus.push(obj)
                // - 再将这个数组转换为字符串
                var dataStr = JSON.stringify(menus)
                // - 修改options表中的nav_menus字段的值
                sql = "update options set value = ? where id = 9"
                connection.query(sql, [dataStr], (err) => {
                    if (err) {
                        callback(err)
                    } else {
                        callback(null)
                    }
                })
            }
        })
    }
}