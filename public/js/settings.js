define(['jquery', 'template','datepicker','language'], function($, template) {
	console.log(1);
	$.ajax({
		type : 'get',
		url : '/api/teacher/profile',
		dataType : 'json',
		success : function(data) {
			console.log(data);
			var html = template('settingsTpl', data.result);
			$('#settingsInfo').html(html);
		}
	});
});