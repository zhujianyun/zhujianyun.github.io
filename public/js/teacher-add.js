define(['jquery', 'util', 'template'], function($, util, template) {
	// 
   util.setMenu('/teacher/list');

   // 获取参数中的tc_id
   var tcId = util.qs('tc_id', location.search);

   // 提交表单处理
   function submitForm(url){
	   	$('#addTeacherBtn').click(function() {
	   		console.log(11);
		   	$.ajax({
                type : 'post',
                url : url,
                data : $('#addTeacherForm').serialize(),
                dataType : 'json',
                success : function(data){
                    if(data.code == 200){
                        location.href = '/teacher/list';
                    }
                }
            });
	   });

   }


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
   }
   else {
   		// 如果路径中没有ID，说明是  添加讲师操作
   		$('#navsFlag').html('讲师添加');
   		var html = template('teacherFormTpl',{operateFlag : '添加', tc_gender : 1});
		$('#teacherFormInfo').html(html);
		submitForm('/api/teacher/add');
   }
   






});