define(['jquery', 'util', 'template', 'validate', 'datepicker', 'language', 'form'], function($, util, template) {
	// 设置点击当前当好高亮显示
   util.setMenu('/teacher/list');

   // 获取地址栏参数中的tc_id
   var tcId = util.qs('tc_id', location.search);


   // 提交表单处理
   	function submitForm(url){
   		console.log(9)
   		// 表单验证--插件
   		$('#addTeacherForm').validate({
   			sendForm : false,
   			eachInvalidField : function() {
   				console.log(1);
   			},
   			eachValidField : function() {
   				console.log(2);
   			},
   			valid : function() {
   				 // 提交表单
                $(this).ajaxSubmit({
                    type : 'post',
                    url : url,
                    success : function(data){
                    	if(data.code == 200) {
                        	location.href = '/teacher/list';
                    	}
                    }
                });
                $.ajax({//为什么用这个发送请求不行
	                type : 'post',
	                url : url,
	                dataType : 'json',
	                success : function(data){
	                    if(data.code == 200){
	                        location.href = '/teacher/list';
	                    }
	                }
	            });
   			},
   			description : {
   				tcName : {
   					required : '姓名必须填写'
   					
   				},
   				tcPass : {
   					required : '密码不能为空',
   					valid : '密码可以使用',
   					pattern : '密码必须是六位数字'
   				},
   				tcJoinDate : {
   					required : '入职日期不能为空',
   					valid : '日期可以用'
   				}
   			}
   		});



	   	// $('#addTeacherBtn').click(function() {
	   	// 	console.log(11);
		   // 	$.ajax({
     //            type : 'post',
     //            url : url,
     //            data : $('#addTeacherForm').serialize(),
     //            dataType : 'json',
     //            success : function(data){
     //                if(data.code == 200){
     //                    location.href = '/teacher/list';
     //                }
     //            }
     //        });
	    // });
   }

	/*
		思路：因为点击添加讲师和编辑讲师都是“跳转”到同一个add.html页面，
	    （“编辑” 和 “添加讲师” 都是a标签，点击会自动跳转）
	    唯一不同的是点击编辑的时候返回的内容有tc_id,而点击添加的时候不会返回tc_id,
	    所以根据这个特点，可以做一个if分支判断：

	    if
	    如果tc_id能获取，说明是编辑操作：点击编辑的时候，获取到tc_id就会向后台发送请求，然后后台返回数据并填充到表单中，
	    当我们把编辑操作做完后，点击提交，此时会调用submitForm函数，此时又会向后台发送请求，把编辑后的数据提交上去，
	    如果状态码是200的话，说明已经成功，此时可以跳转到list.html页面

	    else
	    如果tc_id获取不到，说明是添加讲师操作，我们可以在表单中直接编辑数据，
	    然后提交，此时会调用submitForm函数，把编辑的内容发送到后台数据库中
	   
	    无论是哪个分支都会有
	    $('#navsFlag').html('讲师添加');
	    operateFlag : '添加/编辑',
	    这两行代码。第一行代码是控制左上边的 讲师管理/讲师列表
	    第二行控制的是按钮显示的文字
	    tc_gender : 1 是设置默认性别
	*/

   if(tcId) {
   		// 如果路径中有ID，则证明是  编辑操作
   		// 根据ID发送请求，渲染页面
	   	$.ajax({
	   		type : 'get',
	   		url : '/api/teacher/edit',
	   		dataType : 'json',
	   		data : {tc_id : tcId},
	   		success : function(data) {
	   			$('#navFlag').html('讲师编辑');
	   			data.result.operateFlag = '编辑';
	   			var html = template('teacherFormTpl', data.result);
	   			$('#teacherFormInfo').html(html);
	   			submitForm('/api/teacher/update');
	   		}
	   	});
   }else {
   		// 如果路径中没有ID，说明是  添加讲师操作
   		$('#navFlag').html('讲师添加');
   		var html = template('teacherFormTpl',{operateFlag : '添加', tc_gender : 1});
		$('#teacherFormInfo').html(html);
		submitForm('/api/teacher/add');
   }
}); 






