$(function(){
    // 用户一选择文件就立刻进行文件的上传
    $('#feature').on('change',function(){
        var file = document.getElementById('feature').files[0]
        // 我们会使用formdata收集图片数据
        var formdata = new FormData()
        formdata.append('img',file)
        // 使用ajax实现文件数据的上传
        $.ajax({
            type:'post',
            url:'/uploadFile',
            data:formdata,
            processData:false,
            contentType:false,
            dataType:'json',
            success:function(result){
                console.log(result)
                if(result.code == 200){
                    // 实现预览
                    $('.thumbnail').fadeIn(200).attr('src','/uploads/'+result.img)
                    // 将图片路径存储到隐藏域中
                    $('.postimg').val('/uploads/'+result.img)
                }else{
                    $('.alert-danger > span').text(result.msg)
                    $(".alert-danger").fadeIn(200).delay(3000).fadeOut(200)
                }
            }
        })
    })

    // 初始化CKEDITOR:创建一个富文本框组件覆盖指定的Textarea
    // 创建一个ckeditor实例
    CKEDITOR.replace('content');

     // 加载分类下拉列表数据
     (function () {
        $.ajax({
            type: 'get',
            url: '/getCategories',
            dataType: 'json',
            success: function (result) {
                console.log(result)
                // 调用模块引擎生成动态结构
                // 直接拼接字符串
                var html = ''
                for (var i = 0; i < result.length; i++) {
                    html += `<option value="${result[i].id}">${result[i].name}</option>`
                }
                $('.cateSelector').html(html)
            }
        })
    })();

    // 新增文章
    $('.btnsave').on('click',function(){
        console.log($("#created").val())
        // console.log($('form').serialize())
        // 使用它所提供的方式获取数据
        // console.log(CKEDITOR.instances.content.getData())
        // str = str + "&content="+CKEDITOR.instances.content.getData()
        // 让ckeditor和textarea的数据进行同步
        // CKEDITOR.instances.id号.updateElement():将富文本框的数据同步到textarea,那么后期就可以直接使用$(form).serialize()获取数据了
        CKEDITOR.instances.content.updateElement()


        // 编辑和新增最大的区别在于编辑有id这个参数
        if(id){
            // 编辑
            opt('/editPostById')
        }else{
            // 新增
            opt('/addPost')
        }
    })

    // 实现编辑或新增
    function opt(url){
        // 发起ajax
        $.ajax({
            type:'post',
            url:url,
            data:$('form').serialize(),
            dataType:'json',
            success:function(result){
                if (result.code == 200) {
                    $('.alert-danger span').text(result.msg)
                    $('.alert-danger').fadeIn(100).delay(2000).fadeOut(100)
                    setTimeout(function(){
                        // 进行页面跳转，跳转到文章列表页
                        location.href='/admin/posts'
                    },2200)
                } else {
                    $('.alert-danger span').text(result.msg)
                    $('.alert-danger').fadeIn(1000).delay(2000).fadeOut(1000)
                }
            }
        })
    }

    // 接收参数
    // location.search:?及后面的内容
    var id = itcast.getParameter(location.search).id
    // 判断如果是编辑的时候才需要发起ajax请求根据id号获取数据
    // 判断是否有id,有id说明在编辑状态，没有id说明是新增
    if(id){
        $.ajax({
            type:'get',
            url:'/getPostById',
            data:{id},
            dataType:'json',
            success:function(result){
                console.log(result)
                var value = result.data
                // 获取每一个元素赋值
                $('#title').val(value.title)
                $('#content').val(value.content)
                $('#slug').val(value.slug)
                $('.thumbnail').attr('src',value.feature).show()
                // 如果图片没有修改,以后编辑提交的时候还需要将原始的图片路径传递给服务器
                $('.postimg').val(value.feature)
                // 对于下拉列表,如果赋值value,那么就会使value值为这个值的option选项显示
                $('#category').val(value.category_id)
                $('#created').val(value.created)
                $('#status').val(value.status)
                $('#id').val(value.id)

                $('.page-title > h1').text('编辑文章')
                $('.btnsave').val('编辑')
            }
        })
    }
})