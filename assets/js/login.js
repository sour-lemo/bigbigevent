// login页面的js
$(function () {
    // 切换
    $('#gotoRegister').click(function () {
        $('.login').hide();
        $('.register').show();
    })
    // 切换
    $('#gotoLogin').click(function () {
        $('.login').show();
        $('.register').hide();
    })

    // 验证表单
    const form = layui.form;
    const layer = layui.layer;
    form.verify({
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }

            //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
            if (value === 'xxx') {
                alert('用户名不能为敏感词');
                return true;
            }
        }

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        , pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repass: function (value, item) {
            if (value !== $('.regPwd').val()) {
                return '密码不一致！';
            }
        }
    });

    // 注册表单提交
    $('#registerForm').submit(function (e) {
        e.preventDefault();
        const data = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                $('#registerForm')[0].reset();
                $('#gotoLogin').click();
            }
        })
    })

    // 登录表单提交
    $('#loginForm').submit(function (e) {
        e.preventDefault();
        const data = $(this).serialize();
        // console.log(data);
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                // 本地存储token
                localStorage.setItem('token', res.token);
                layer.msg('登录成功，即将跳转页面...', {
                    time: 2000,
                }, function () {
                    location.href = '/bigevent/home/index.html';
                });
            }
        })
    })
})