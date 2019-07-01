<<<<<<< HEAD
//引入express模块
const express = require('express')

// 引入路由模块
const router = require('./router/index.js')

// 引入fs模块
const fs = require('fs')
// 引入path模块
const path = require('path')

// 创建express实例变量
const app = express()

// 设置浏览引擎为ejs
//这只了ejs引擎后能直接用res.render渲染页面
app.set('view engine','ejs')
app.set('views','./views')

// 监听指定端口
app.listen(3000,()=>{
    console.log('the server is running at http://127.0.0.1:3000'); 
})

//托管静态资源,并设置虚拟目录，这样就不用修改原html文件中的路径
app.use('/assets',express.static('assets'))
app.use('/uploads',express.static('uploads'))

=======
var express = require('express')
// 路由模块
var router = require('./router')
// 引入ejs
var ejs = require('ejs')
var bodyParser = require('body-parser')
var session = require('express-session')

var app = express()
app.listen('3004', () => {
    console.log('http://127.0.0.1:3004')
})

// 托管静态资源
app.use('/assets', express.static('assets'))
app.use('/uploads', express.static('uploads'))

// 配置模块引擎为ejs
app.set('view engine', 'ejs')
// 下面这个配置的作用是配置ejs的模板文件夹，以后ejs会自动的去指定的目录下寻找页面文件
// views它会默认找这个views下面的模板文件，然后我们现在将这个views设置为我们所指定的目录
app.set('views', __dirname + '/views')

// 配置使用session
app.use(session({
    secret: 'mywords', // 加盐，你可以指定只有你一个人知道字符串
    //重新保存：强制会话保存即使是未修改的。默认为true但是得写上
    resave: false,
    //强制“未初始化”的会话保存到存储。 
    saveUninitialized: false,
}))

// 添加body-parser中间件来处理参数
app.use(bodyParser.urlencoded({ extended: false }))


// 服务器实现跨域的配置
// all代表所有请求  *代表所有路由名称
app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    // 下面这句话就是配置我允许谁向我发起跨域请求,意思就是告诉浏览器你得将数据给请求者
    // *代表所有源
    // res.header("Access-Control-Allow-Origin","http://127.0.0.1:5500");
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    // 下面这个是为了解决在vue中发送跨域请求会请求两次
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
})

// 添加所有请求的路由中间件函数
// 导航守卫+拦截器
// 这个中间件只关注路由跳转
app.use((req, res, next) => {
    // 判断是否登陆
    // 前台页面不用登陆:req.url.indexOf('/admin') == -1
    if (req.session.isLogin && req.session.isLogin == 'true' || req.url.indexOf('/admin') == -1 || req.url == '/admin/login') {
        // 进行下一步操作
        next()
    } else {
        res.redirect('/admin/login')
    }
})

// 使用use中间件在当前应用上挂载路由配置
// 路由可以认为是一个中间件
>>>>>>> b71cca75fcd00d146ad53e17f335d5044f220903
app.use(router)