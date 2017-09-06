$(function(){
	$('#tab3').datagrid({
		url:'/project1/orderui.do?type=list',
		title:'商品数据',
		iconCls:'icon-ok',
		collapsible:true,
		pagination:true,
		singleSelect:true,
		rownumbers:true,
		pageSize:10,
		pageIndex:1,
		toolbar:[{
			text: '编辑',
			iconCls: 'icon-edit',
			handler: function() {
				var row=$('#tab3').datagrid('getSelected');
				if(row==null){
					$.messager.alert("提示","请选择要修改的行。。。","info")
				}else{
					$('#orderid').textbox('setValue',row.orderid);
					$('#orderid').textbox({readonly:true});
					$('#userid').textbox('setValue',row.userid);
					$('#userid').textbox({readonly:true});
					$('#totalprice').textbox('setValue',row.totalprice);
					$('#orderdate').textbox('setValue',row.orderdate);
					$('#orderdate').textbox({readonly:true});
					$('#name').textbox('setValue',row.name);
					$('#address').textbox('setValue',row.address);
					$('#tel').textbox('setValue',row.tel);
					
					$('#dialog1').dialog({
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
										url:'/project1/orderui.do?type=edit&orderid='+row.orderid,
										success:function(data){
											if(data=="1"){
												$.messager.alert("提示","修改成功!","info")
												$('#f1').form('clear');
												$('#dialog1').dialog('close');
												$('#tab3').datagrid('reload');
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
			text: '删除',
			iconCls: 'icon-remove',
			handler: function() {
				var row=$('#tab3').datagrid('getSelected');
				if(row==null){
					$.messager.alert("提示","请选择要删除的行。。。","info")
				}else{
					$.messager.confirm("删除确认","确定删除订单"+row.orderid+"?",function(r){
						if(r){
							$.ajax({
								type:'post',
								url:'/project1/orderui.do',
								data:{type:'remove',orderid:row.orderid},
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
			field:'orderid',title:'订单编号'
		},{
			field:'userid',title:'用户id'
		},{
			field:'totalprice',title:'总价'
		},{
			field:'orderdate',title:'下单日期'
		},{
			field:'name',title:'收货人'
		},{
			field:'address',title:'收货地址',width:260
		},{
			field:'tel',title:'电话'
		}]],
		view: detailview, 
		detailFormatter:function(index,row){    
	        return '<table id="tab3-' + index + '" style="height:auto;"></table>';    
	    },    
	    onExpandRow: function(index,row){    
	        $('#tab3-'+index).datagrid({    
	            url:'/project1/orderui.do?type=detail',
	    		queryParams:{orderid:row.orderid},
	    		title:'商品详情',
	    		iconCls:'icon-ok',
	    		collapsible:true,
	    		singleSelect:true,
	    		rownumbers:true,
	    		columns:[[{
	    			field:'orderid',title:'订单编号'
	    		},{
	    			field:'orderdetailid',title:'商品详情编号'
	    		},{
	    			field:'gid',title:'商品id'
	    		},{
	    			field:'gittle',title:'商品名称'
	    		},{
	    			field:'gnumber',title:'商品数量'
	    		},{
	    			field:'gsaleprice',title:'商品价格'
	    		}]],
	            onLoad:function(){    
	                $('#tab3').datagrid('fixDetailRowHeight',index);    
	            }    
	        });    
	        
	    } 
	});
})



