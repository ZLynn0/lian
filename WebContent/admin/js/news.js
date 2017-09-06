$(function(){
	$('#btnsave').on('click',function(){
		var isValid=$('f1').form('validate');
		if(isValid){
			$.ajax({
				type:'post',
				data:$('#f1').serialize(),
				url:'/project1/newsui.do?type=add',
				success:function(data){
					if(data=="1"){
						//清空input 关闭dialog 刷新datagrid
						$.messager.alert("提示","添加成功!","info")
						$('#f1').form('clear');
						$('#dialog').dialog('close');
						$('#tab').datagrid('reload');
						
					}
				}
				
			});
		
		}else{
			$.messager.alert('出错了','表单验证未通过','info');
		}
	})
	$('#tab2').datagrid({
		url:'/project1/newsui.do',
		title:'新闻列表',
		iconCls:'icon-ok',
		collapsible:true,
		pagination:true,
		singleSelect:true,
		rownumbers:true,
		pageSize:10,
		pageIndex:1,
		queryParams:{type:'list'},
		loadMsg:'正在加载，请稍候。。。',
		toolbar:[{
			text: '编辑',
			iconCls: 'icon-edit',
			handler: function() {
				var row=$('#tab2').datagrid('getSelected');
				if(row==null){
					$.messager.alert("提示","请选择要修改的行。。。","info")
				}else{
					$('#title').textbox('setValue',row.title);
					$('#tcontent').textbox('setValue',row.tcontent);
					
					$('#dialog').dialog({
						closed:false,
						title:'修改',
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
										url:'/project1/newsui.do?type=edit&tid='+row.tid,
										success:function(data){
											if(data=="1"){
												$.messager.alert("提示","修改成功!","info")
												$('#f1').form('clear');
												$('#dialog').dialog('close');
												$('#tab2').datagrid('reload');
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
				$('#cid').textbox({readonly:false});
				$('#dialog').dialog({
					closed:false,
					title:'添加',
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
									url:'/project1/newsui.do?type=add',
									success:function(data){
										if(data=="1"){
											$.messager.alert("提示","添加成功!","info")
											$('#f1').form('clear');
											$('#dialog').dialog('close');
											$('#tab2').datagrid('reload');
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
							$('#tab2').datagrid('reload');
						}
					}]
				})
			}
		},'-',{
			text: '删除',
			iconCls: 'icon-remove',
			handler: function() {
				var row=$('#tab2').datagrid('getSelected');
				if(row==null){
					$.messager.alert("提示","请选择要删除的行。。。","info")
				}else{
					$.messager.confirm("删除确认","确定删除"+row.title+"?",function(r){
						if(r){
							$.ajax({
								type:'post',
								url:'/project1/newsui.do',
								data:{type:'remove',tid:row.tid},
								success:function(data){
									if(data=="1"){
										$.messager.alert("提示","删除成功!","info")
										$('#tab2').datagrid('reload');
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
			field:'tid',title:'编号'
		},{
			field:'title',title:'标题'
		},{
			field:'tcontent',title:'内容'
		},{
			field:'tpubdate',title:'日期'
		}]]
	})
})