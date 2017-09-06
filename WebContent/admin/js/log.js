$(function(){
	$('#tab3').datagrid({
		url:'/project1/log.do?type=list',
		title:'系统日志',
		iconCls:'icon-ok',
		collapsible:true,
		pagination:true,
		singleSelect:true,
		rownumbers:true,
		pageSize:10,
		pageIndex:1,
		toolbar:[{
			text: '删除',
			iconCls: 'icon-remove',
			handler: function() {
				var row=$('#tab3').datagrid('getSelected');
				if(row==null){
					$.messager.alert("提示","请选择要删除的行。。。","info")
				}else{
					$.messager.confirm("删除确认","确定删除日志"+row.logid+"?",function(r){
						if(r){
							$.ajax({
								type:'post',
								url:'/project1/log.do',
								data:{type:'remove',logid:row.logid},
								success:function(data){
									if(data=="1"){
										$.messager.alert("提示","删除成功!","info")
										$('#tab3').datagrid('reload');
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
			field:'logid',title:'日志编号'
		},{
			field:'uloginid',title:'操作者'
		},{
			field:'option',title:'操作细节',width:720
		},{
			field:'date',title:'日期'
		}]]
	});
})



