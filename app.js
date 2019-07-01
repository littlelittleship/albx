//引入express模块
const express = require('express')

// 引入fs模块
const fs = require('fs')
// 引入path模块
const path = require('path')

// 创建express实例变量
const app = express()

// 监听指定端口
app.listen(3000,()=>{
    console.log('the server is running at http://127.0.0.1:3000'); 
})

//托管静态资源,并设置虚拟目录，这样就不用修改原html文件中的路径
app.use('/assets',express.static('assets'))
app.use('/uploads',express.static('uploads'))

// 添加路由配置
app.get('/',(req,res)=>{
    fs.readFile(path.join(__dirname,'./views/index.html'),(err,data)=>{
        if(err) return res.end('404')
        res.end(data)
    })
})