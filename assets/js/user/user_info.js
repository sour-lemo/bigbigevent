
$(function () {
    const form = layui.form;
    const layer = layui.layer;
    getUserInfo();
    function getUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            success: function (res) {
                // form 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
                // 注意：需要按照name名字来一一对应 ==> 去给表单设置name属性
                form.val('form', res.data);
            }
        })
    }
    // 重置按钮
    $('#reset').click(function (e) {
        e.preventDefault();
        getUserInfo();
    })
    // 表单提交
    $('.layui-form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                // 更新index页面左侧导航的名字
                // window.parent 来获取到父页面（index页面）
                // 注意点：父页面的getUserInfo函数需要是全局的
                window.parent.getUserInfo();
            }
        })
    })

})