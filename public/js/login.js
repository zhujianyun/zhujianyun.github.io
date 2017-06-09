// 实现登录功能
define(['jquery','cookie'], function($){
	$('#loginId').click(function(){
	    $.ajax({
	        type: 'post',
	        url: '/api/login',
	        data: $('#loginForm').serialize(),
	        dataType: 'json',
	        success : function(data){
	            // console.log(data);
	            if(data.code == 200) {

	                // 跳转到主页面
	                 location.href = '/index/index';


	                 // 把登录的用户信息存储到 cookie中，方便页面之间的数据共享
	                 console.log( typeof data.result);//object

	                 // 设置cookie： loginInfo 是随便取的一个名字
	                 // 将 值为JSON.stringify(data.result) 写入cookie名为 loginInfo 的 cookie中
	                 // 这里设置{path: './'}根路径是因为，在根路径下设置的cookie在所有的子路径中都能访问
	                 // 但在子路径下设置的cookie在父路径上访问不到
	                 // JSON.stringify(data.result)对象转字符串，因为设置cookie的值只能是字符串
	                 
	                 $.cookie('loginInfo', JSON.stringify(data.result), {path: '/'});


	            }
	        }
	    });

	    return false;
	});
});