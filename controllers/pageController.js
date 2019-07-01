// 引入fs模块
const fs = require('fs')
// 引入path模块
const path = require('path')

// module.exports.getIndexPage = (req,res)=>{
//     fs.readFile(path.join(__dirname,'../views/index.html'),(err,data)=>{
//         if(err) return res.end("404")
//         res.end(data)
//     })
// }
// module.exports.getDetailPage = (req,res)=>{
//     fs.readFile(path.join(__dirname,'../views/detail.html'),(err,data)=>{
//         if(err) return res.end("404")
//         res.end(data)
//     })
// }
// module.exports.getListPage = (req,res)=>{
//     fs.readFile(path.join(__dirname,'../views/list.html'),(err,data)=>{
//         if(err) return res.end("404")
//         res.end(data)
//     })
// }
// module.exports.getAdminPage = (req,res)=>{
//     fs.readFile(path.join(__dirname,'../views/admin/index.html'),(err,data)=>{
//         if(err) return res.end("404")
//         res.end(data)
//     })
// }
// 前台页面
module.exports.getIndexPage = (req,res)=>{
    res.render('index.ejs')
}
module.exports.getDetailPage = (req,res)=>{
   res.render('detail.ejs')
}
module.exports.getListPage = (req,res)=>{
    res.render('list.ejs')
}

// 后台页面
module.exports.getAdminIndexPage = (req,res)=>{
    res.render('admin/index.ejs')
}
module.exports.getAdminCategoriesPage = (req,res)=>{
    res.render('admin/categories.ejs')
}
module.exports.getAdminCommentsPage = (req,res)=>{
    res.render('admin/comments.ejs')
}
module.exports.getAdminLoginPage = (req,res)=>{
    res.render('admin/login.ejs')
}
module.exports.getAdminNavMenusPage = (req,res)=>{
    res.render('admin/nav-menus.ejs')
}
module.exports.getAdminPasswordResetPage = (req,res)=>{
    res.render('admin/password-reset.ejs')
}
module.exports.getAdminPostAddPage = (req,res)=>{
    res.render('admin/post-add.ejs')
}
module.exports.getAdminPostsPage = (req,res)=>{
    res.render('admin/posts.ejs')
}
module.exports.getAdminProfilePage = (req,res)=>{
    res.render('admin/profile.ejs')
}
module.exports.getAdminSettingsPage = (req,res)=>{
    res.render('admin/settings.ejs')
}
module.exports.getAdminSlidesPage = (req,res)=>{
    res.render('admin/sliders.ejs')
}
module.exports.getAdminUsersPage = (req,res)=>{
    res.render('admin/users.ejs')
}
