var menuModule = require('../dataModules/menuModule')

module.exports = {
    addMenu(req,res){
        menuModule.addMenu(req.body,(err) => {
            if(err){
                res.json({
                    code:201,
                    msg:'添加菜单项失败'
                })
            }else{
                res.json({
                    code:200,
                    msg:'添加菜单项成功'
                })
            }
        })
    }
}