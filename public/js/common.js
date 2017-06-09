define(['jquery', 'cookie'], function($){
	// 左侧菜单功能
	$('.navs ul').prev('a').on('click', function () {
		$(this).next().slideToggle();
	});



	// 获取登录信息cookie


	// pathname 属性是一个可读可写的字符串，可设置或返回当前 URL 的路径部分。
	// 域名后面的就是路径www.baidu.com/a/b/c-----/a/b/c就是路径

	// 获取请求路径
	var pathname = location.pathname;
	console.log(pathname); //  /index/index

	// 因为在登录的时候设置了cookie，而且设置了{path: './'}根路径，所以在这里可以获取登录的cookie信息
	// & 保证如果没有loginInfo的话后面的就不会执行 短路 
	var loginInfo = $.cookie('loginInfo') && JSON.parse($.cookie('loginInfo'));
	// console.log(typeof loginInfo);//string 这是没转对象之前
	console.log(loginInfo);

	
	if(loginInfo) {
		// 渲染页面
		$('.aside .profile').find('img').attr('src',loginInfo.tc_avatar);
		$('.aside .profile').find('h4').text(loginInfo.tc_name);
	}
	// 加上这个判断是为了保证如果地址就在login.html，即loginInfo不存在时，执行跳转到login登录页，
	// 当再点击提交的时候，loginInfo依然不存在，会进入一个死循环
	else if(pathname != '/login' ) {
		// 没有登录的情况下要重新跳转到登录页面
		location.href = '/login';
	}

	// 实现退出功能
	$("#logout").click(function(){
		console.log('退出');
		$.ajax({
			type: 'post',
			url: '/api/logout',
			dataType: 'json',
			success: function(data) {
				// 清空cookie
				$.removeCookie('loginInfo', {path:'/'});
				// 退出成功后跳转到登录页面
				location.href = '/login';
			}
		});
	});
});