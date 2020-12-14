// index功能
$(function () {
    getUserInfo();
    const layer = layui.layer;
    // 获取用户信息
    function getUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            headers: {
                Authorization: localStorage.getItem('token'),
            },
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('用户信息加载失败!', { time: 1000 });
                }
                const name = res.data.nickname || res.data.username;
                $('.welcome').text('欢迎 ' + name);
                if (res.data.user_pic) {
                    $('.layui-nav-img').attr('src', res.data.user_pic).show();
                    $('.textAvatar').hide();
                }
                else {
                    $('.layui-nav-img').hide();
                    $('.textAvatar').css('display', 'inline-block').text(name[0].toUpperCase());
                }
            }
        })
    }
    // 退出登录
    // 思路： 删除token，跳转到login页面
    $('#logout').click(function () {
        layer.confirm('确认退出吗?', { icon: 3, title: '提示' }, function (index) {
            // 删除token
            localStorage.removeItem('token');
            // 跳转到login页面
            location.href = '/bigevent/home/login.html';
            layer.close(index);
        });
    })

})