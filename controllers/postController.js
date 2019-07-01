var postsModule = require('../dataModules/postModule')
var moment = require('moment')
module.exports = {
    // 获取所有文章数据
    getAllPostList(req,res){
        // 只要配置了body-parse就可以这样取值
        console.log(req.query)
        // 以后如果是get方式传递的参数，都可以使用req.query来获取，它得到的是一个对象
        // 调用数据模块获取所有文章数据
        postsModule.getAllPostList(req.query,(err,data) => {
            if(err){
                res.json({
                    code:404,
                    msg:'err'
                })
            }else{
                // data=={data:results,total:results1[0].cnt}
                var arr = data.data //results
                for(var i=0;i<arr.length;i++){
                    arr[i].created = moment(arr[i].created).format('YYYY-MM-DD HH:mm:ss')
                }
                data.data = arr

                res.json({
                    code:200,
                    data:data
                })
            }
        })
    },

    // 实现文章新增
    addPost(req,res){
        var obj = req.body
        obj['views'] = 0
        obj['likes'] = 0
        obj['user_id'] = req.session.currentUser.id
        obj.created = moment(obj.created).format('YYYY-MM-DD HH:mm:ss')

        // 实现新增
        postsModule.addPost(obj,(err) =>{
            if(err){
                res.json({
                    code:201,
                    msg:'新增失败'
                })
            }else{
                res.json({
                    code:200,
                    msg:'新增成功'
                })
            }
        })
    },

    // 根据id获取指定的文章数据
    getPostById(req,res){
        var id = req.query.id
        postsModule.getPostById(id,(err,data) =>{
            if(err){
                res.json({
                    code:201,
                    msg:'服务器异常'
                })
            }else{
                // 这里转换是因为前台页面 的日期控件需要这种格式
                data.created = moment(data.created).format('YYYY-MM-DDTHH:mm')
                res.json({
                    code:200,
                    msg:'获取成功',
                    data:data
                })
            }
        })
    },

    // 根据id号来实现文章的编辑功能
    editPostById(req,res){
        postsModule.editPostById(req.body,(err) => {
            if(err){
                res.json({
                    code:201,
                    msg:'编辑失败'
                })
            }else{
                res.json({
                    code:200,
                    msg:'编辑成功'
                })
            }
        })
    },
}


// module.exports.getAllPostList = (req,res) => {

// }

// 使用ES6新语法 ，对象中的成员添加有两种新的形式
// 1.添加属性：属性名称和值如果一样，就可以只写一个
// 2.添加方法：在对象内部可以直接添加方法
// var age = 20
// var obj = {
//     age:age,
//     say:function(){

//     }
// }

// var obj = {
//     age,
//     say(){

//     }
// }