define(['jquery'],function($){
	return {
		setMenu: function(pathname) {
   			// 获取请求路径
			var pathname = location.pathname;
     		$('.aside .navs a').removeClass('active');
   			$('.aside .navs a[href="'+pathname+'"]').addClass('active');
		}
	};
  
 });