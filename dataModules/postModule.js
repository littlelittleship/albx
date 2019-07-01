
var connection = require('./connModule')

module.exports = {
    // 获取所有文章数据
    // query是一个对象，里面可以包含：{pageNum,pageSize,category_id,status}
    // 1.当前页码：必需
    // 2.每页所显示的记录数：必需
    // 3.筛选时的分类参数
    // 4.筛选时的状态参数
    getAllPostList(query,callback){
        var sql = `select posts.id,posts.title,posts.created,posts.status,users.nickname,categories.name
                    from posts
                    inner join users on posts.user_id = users.id
                    inner join categories on posts.category_id = categories.id
                    where 1 = 1 `
        // where应该在固定的位置，在这个场景中，它在join和order by 之间
        // 拼接 where
        if(query.category_id){
            sql += " and posts.category_id = " + query.category_id
        }
        if(query.status){
            sql += ` and posts.status ='${query.status}'  `
        }

        sql +=` ORDER BY created DESC
                limit ${(query.pageNum-1)*query.pageSize},${query.pageSize}`

                    console.log(sql)
                    // query在进行查询的时候一次只能查询一个结果集，如果在Sql中添加多条查询语句，那么results也只能接收到一个
        connection.query(sql,(err,results) => {
            if(err){
                callback(err)
            }else{
                // 查询完数据结果集之后，再进行总数量的查询
                sql = 'select count(*) cnt from posts'
                connection.query(sql,(err1,results1) => {
                    if(err){
                        callback(err)
                    }else{
                        // 将数据和总数一起返回
                        // [{cnt:4}] > {cnt,4}
                        callback(null,{data:results,total:results1[0].cnt})
                    }
                })
            }
        })
    },

    // 新增文章
    addPost(obj,callback){
        var sql = 'insert into posts values(null,?,?,?,?,?,?,?,?,?,?)'
        connection.query(sql,[obj.slug,obj.title,obj.feature,obj.created,obj.content,obj.views,obj.likes,obj.status,obj.user_id,obj.category_id],(err,results) => {
            if(err){
                callback(err)
            }else{
                callback(null,results)
            }
        })
    },
    // 根据id获取文章数据
    getPostById(id,callback){
        var sql = `select * from posts where id = ${id}`
        connection.query(sql,(err,results) => {
            if(err){
                callback(err)
            }else{
                // 将数据和总数一起返回
                // [{cnt:4}] > {cnt,4}
                callback(null,results[0])
            }
        })
    },
    // 编辑文章
    editPostById(obj,callback){
        // 在编辑的时候,使用占位符有一个优点:没有传入的值不会进行修改
        var sql = 'update posts set ? where id = ?'
        connection.query(sql,[obj,obj.id],(err,results) => {
            if(err){
                callback(err)
            }else{
                callback(null,results)
            }
        })
    },
}
