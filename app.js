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

app.use(router)