$(function(){
	$('#login').dialog({
		width:400,
		height:200,
		title:'用户登录',
		collapsible:true,
		iconCls:'icon-man',
		buttons:[{
			text: '登录',
			iconCls: 'icon-ok',
			handler: function() {
				var isValid=$('form').form('validate');
				if(isValid){
					$.ajax({
						type:'post',
						data:$('form').serialize(),
						url:'/project1/loginui.do?type=login',
						success:function(data){
							if(data=="1"){
								window.location='index.html';
							}else{
								$.messager.alert('登录失败','请检查账号密码','info');
							}
						}
					});
				}else{
					$.messager.alert('出错了','表单验证未通过');
				}

			}
		},{
			text: '取消',
			iconCls: 'icon-cancel',
			handler: function() {
				$('#login').dialog({
					closed:true
				});
			}
		}]
	})
})
