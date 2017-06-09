requirejs.config({
	baseUrl: '/public/assets', //设置模块加载的基准路径
	paths: {//给路径起别名
		jquery: 'jquery/jquery.min',
		bootstrap: 'bootstrap/js/bootstrap.min',
		cookie: 'jquery-cookie/jquery.cookie',
		common: '../js/common',
		login: '../js/login'
	},
	shim: {//兼容非标准模块
	//垫片——让非标准变成标准模块
		bootstrap: {
			deps: ['jquery']
		}
	}
});