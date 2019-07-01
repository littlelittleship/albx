var itcast = {
    // 获取url中的路由部分
    // http://127.0.0.1:3004/admin/post-add?id=1
    // getRouterName:function(){},
    // getRouterName:() =>{},
    getRouterName(urlStr){
        var index = urlStr.indexOf('?')
        var routername
        if(index == -1){
            routername = urlStr.substring(urlStr.lastIndexOf('/')+1)
        }else{
            routername = urlStr.substring(urlStr.lastIndexOf('/')+1,index)
        }
        return routername
    },

    // 获取页面中通过url传递的参数，返回一个参数对象
    // ?id=1&name=jack 》》 {id:1,name:"jack"}
    getParameter(str){
        var obj = {}
        str = str.substring(1) // id=1&name=jack
        // 分割第一次
        var arr = str.split('&') // ['id=1','name=jack']
        // 遍历数组再次分割
        for(var i=0;i<arr.length;i++){
            // arr[0]:id=1
            var temp = arr[0].split('=') // ["id":1]
            obj[temp[0]] =  temp[1] // {id:1}
        }
        return obj
    }
}