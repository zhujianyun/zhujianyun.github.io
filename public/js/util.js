define(['jquery'],function($){
	return {
		setMenu: function(pathname) {
   			// 获取请求路径
			// var pathname = location.pathname;
     		$('.aside .navs a').removeClass('active');
   			$('.aside .navs a[href="'+pathname+'"]').addClass('active');
		},
		qs : function(attr,param) {
			// ?abc=123&flag=456
			var p = param.substring(1);
			var arr = p.split('&');
			var retValue = '';
			arr.forEach(function(element,index){
				var kv = element.split('=');
				if(attr == kv[0]) {
					retValue = kv[1];
					// return作用：结束循环
					return;
				}
			});
			return retValue;
		}
	};
  
 });