// 引入控制器模块
const pageController = require('../controllers/pageController.js')
// 引入express框架
const express = require('express')
// Router()构造函数创建的变量可以当做中间件来使用
const router = express.Router()


// 添加路由配置
// 前台页面
router.get('/',pageController.getIndexPage)
    .get('/detail',pageController.getDetailPage)
    .get('/list',pageController.getListPage)

    // 后台页面,给后台应用添加一个前缀admin
    .get('/adminIndex',pageController.getAdminIndexPage)

    .get('/adminCategories',pageController.getAdminCategoriesPage)

    .get('/adminComments',pageController.getAdminCommentsPage)

    .get('/adminLogin',pageController.getAdminLoginPage)

    .get('/adminNav-menus',pageController.getAdminNavMenusPage)

    .get('/adminPassword-reset',pageController.getAdminPasswordResetPage)

    .get('/adminPost-add',pageController.getAdminPostAddPage)
    
    .get('/adminPosts',pageController.getAdminPostsPage)

    .get('/adminProfile',pageController.getAdminProfilePage)

    .get('/adminSettings',pageController.getAdminSettingsPage)

    .get('/adminSlides',pageController.getAdminSlidesPage)
    
    .get('/adminUsers',pageController.getAdminUsersPage)

module.exports = router
