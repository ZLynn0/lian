$(function(){
	$('#btnsave').on('click',function(){
		var isValid=$('f1').form('validate');
		if(isValid){
			$.ajax({
				type:'post',
				data:$('#f1').serialize(),
				url:'/project1/user.do?type=add',
				success:function(data){
					if(data=="1"){
						//清空input 关闭dialog 刷新datagrid
						$('#f1').form('clear');
						$('#dialog').dialog('close');
						$('#tab').datagrid('reload');
						
					}
				}
				
			});
		
		}else{
			$.messager.alert('出错了','表单验证未通过');
		}
	})
	$('#tab').datagrid({
		url:'/project1/user.do',
		title:'用户列表',
		iconCls:'icon-ok',
		collapsible:true,
		rownumber:true,
		singleSelect:true,
		queryParams:{type:'list'},
		loadMsg:'正在加载，请稍候。。。',
		toolbar:[{
			text: '编辑',
			iconCls: 'icon-edit',
			handler: function() {
				var row=$('#tab').datagrid('getSelected');
				if(row==null){
					$.messager.alert("提示","请选择要修改的行。。。","info")
				}else{
					$('#email').textbox('setValue',row.uemail);
					$('#username').textbox('setValue',row.uloginid);
					$('#username').textbox({readonly:true});
					$('#password').textbox('setValue',row.upassword);
					$('#address').textbox('setValue',row.uaddress);
					$('#tel').textbox('setValue',row.utel);
					$('#sex').textbox('setValue',row.usex);
					$('#dialog').dialog({
						closed:false,
						title:'修改用户',
						iconCls:'icon-edit',
						buttons:[{
							text:'保存修改',
							iconCls:'icon-save',
							handler:function(){
								var isValid=$('#f1').form('validate');
								if(isValid){
									$.ajax({
										type:'post',
										data:$('#f1').serialize(),
										url:'/project1/user.do?type=edit&userid='+row.userid,
										success:function(data){
											if(data=="1"){
												$('#f1').form('clear');
												$('#dialog').dialog('close');
												$('#tab').datagrid('reload');
											}
										}
									});
								}
							}
						}]
					})
				}
			}
		},'-',{
			text: '添加',
			iconCls: 'icon-add',
			handler: function() {
				$('#dialog').dialog({
					closed:false,
					title:'添加用户',
					iconCls:'icon-add',
					buttons:[{
						text:'保存',
						iconCls:'icon-save',
						handler:function(){
							var isValid=$('#f1').form('validate');
							if(isValid){
								$.ajax({
									type:'post',
									data:$('#f1').serialize(),
									url:'/project1/user.do?type=add',
									success:function(data){
										if(data=="1"){
											$('#f1').form('clear');
											$('#dialog').dialog('close');
											$('#tab').datagrid('reload');
										}
									}
								});
							}
						}
					},{
						text:'取消',
						iconCls:'icon-cancel',
						handler:function(){
							$('#f1').form('clear');
							$('#dialog').dialog('close');
							$('#tab').datagrid('reload');
						}
					}]
				})
			}
		},'-',{
			text: '删除',
			iconCls: 'icon-remove',
			handler: function() {
				var row=$('#tab').datagrid('getSelected');
				if(row==null){
					$.messager.alert("提示","请选择要删除的行。。。","info")
				}else{
					$.messager.confirm("删除确认","确定删除"+row.uloginid+"?",function(r){
						if(r){
							$.ajax({
								type:'post',
								url:'/project1/user.do',
								data:{type:'remove',userid:row.userid},
								success:function(data){
									if(data=="1"){
										$.messager.alert("提示","删除成功!","info")
										$('#tab').datagrid('reload');
									}
								}
								
							});
						}
						
					});
				}
				
			}
		}],
		columns:[[{
			field:'chk',checkbox:true
		},{
			field:'userid',title:'编号'
		},{
			field:'uemail',title:'邮箱'
		},{
			field:'uloginid',title:'姓名'
		},{
			field:'upassword',title:'密码'
		},{
			field:'usex',title:'性别'
		},{
			field:'uaddress',title:'地址'
		},{
			field:'utel',title:'电话'
		}]]
	})
})