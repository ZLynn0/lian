$(function(){
	$('#tab2').datagrid({
		url:'/project1/set.do',
		title:'权限设置',
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
				var row=$('#tab2').datagrid('getSelected');
				if(row==null){
					$.messager.alert("提示","请选择要修改的行。。。","info")
				}else{
					$('#uloginid').textbox('setValue',row.uloginid);
					var role=document.getElementsByName('uroleid');
					for (var i=0;i<role.length;i++) {
						if(role[i].value==row.uroleid){
							role[i].checked=true;
						}
					}
					var state=document.getElementsByName('ustateid');
					for (var i=0;i<state.length;i++) {
						if(state[i].value==row.ustateid){
							state[i].checked=true;
						}
					}
				
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
										url:'/project1/set.do?type=edit&cid='+row.cid,
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
		}],
		columns:[[{
			field:'chk',checkbox:true
		},{
			field:'uloginid',title:'姓名'
		},{
			field:'ustateid',title:'是否有效'
		},{
			field:'uroleid',title:'是否管理员'
		}]]
	})
})