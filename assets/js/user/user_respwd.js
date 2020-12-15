
$(function () {
    const form = layui.form;
    const layer = layui.layer;
    // 表单校验
    form.verify({
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        newPwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新密码不能和原密码一致！';
            }
        },
        resPwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次的新密码不一致！';
            }
        }
    });
    // 表单提交
    $('.layui-form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                $('.layui-form')[0].reset();
            }
        })
    })

})