$(function(){
	var cid;
	var input=$('#search').textbox('getText');
	$('#btnsave').on('click',function(){
		var isValid=$('f1').form('validate');
		if(isValid){
			$.ajax({
				type:'post',
				data:$('#f1').serialize(),
				url:'/project1/goods.do?type=add',
				success:function(data){
					if(data=="1"){
						//清空input 关闭dialog 刷新datagrid
						$.messager.alert("提示","添加成功!","info")
						$('#f1').form('clear');
						$('#dialog1').dialog('close');
						$('#tab1').datagrid('reload');
						
					}else if(data=="0"){
						$.messager.alert("提示","添加失败!","info")
						$('#f1').form('clear');
						$('#dialog1').dialog('close');
						$('#tab1').datagrid('reload');
					}
				}
				
			});
		
		}else{
			$.messager.alert('出错了','表单验证未通过');
		}
	})
	$('#cate').combobox({
		url:'/project1/cate.do?type=list',
		valueField:'cid',
		textField:'cname',
		//设置默认项
		onLoadSuccess:function(){
			var data=$(this).combobox('getData');
			if (data.length>0) {
				//$(this).combobox('setValue',data[0].cid);
				cid=$('#cate').combobox('getValue');
				loadGoods(cid,input);
			}
		},
		//根据默认项设置默认列表
		onSelect:function(data){
			loadGoods(data.cid,input);
		}
	
	
	});
	$('#search').textbox({onChange:function(){
		cid=$('#cate').combobox('getValue');
		input=$(this).val();
		loadGoods(cid,input);
	}});
})
function loadGoods(cid,input){
	$('#tab1').datagrid({
		url:'/project1/goods.do?type=list',
		queryParams:{cid:cid,input:input},
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
				var row=$('#tab1').datagrid('getSelected');
				if(row==null){
					$.messager.alert("提示","请选择要修改的行。。。","info")
				}else{
					$('#gtitle').textbox('setValue',row.gtitle);
					$('#gauthor').textbox('setValue',row.gauthor);
					$('#gsaleprice').textbox('setValue',row.gsaleprice);
					$('#ginprice').textbox('setValue',row.ginprice);
					$('#gdesc').textbox('setValue',row.gdesc);
					$('#gimg').textbox('setValue',row.gimg);
					$('#cid').textbox('setValue',row.cid);
					$('#pid').textbox('setValue',row.pid);
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
										url:'/project1/goods.do?type=edit&gid='+row.gid,
										success:function(data){
											if(data=="1"){
												$.messager.alert("提示","修改成功!","info")
												$('#f1').form('clear');
												$('#dialog1').dialog('close');
												$('#tab1').datagrid('reload');
											}
											else if(data=="0"){
												$.messager.alert("提示","修改失败!","info")
												$('#f1').form('clear');
												$('#dialog1').dialog('close');
												$('#tab1').datagrid('reload');
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
				$('#dialog1').dialog({
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
									url:'/project1/goods.do?type=add',
									success:function(data){
										if(data=="1"){
											$.messager.alert("提示","添加成功!","info")
											$('#f1').form('clear');
											$('#dialog1').dialog('close');
											$('#tab1').datagrid('reload');
										}else if(data=="0"){
											$.messager.alert("提示","添加失败!","info")
											$('#f1').form('clear');
											$('#dialog1').dialog('close');
											$('#tab1').datagrid('reload');
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
							$('#dialog1').dialog('close');
							$('#tab1').datagrid('reload');
						}
					}]
				})
			}
		},'-',{
			text: '删除',
			iconCls: 'icon-remove',
			handler: function() {
				var row=$('#tab1').datagrid('getSelected');
				if(row==null){
					$.messager.alert("提示","请选择要删除的行。。。","info")
				}else{
					$.messager.confirm("删除确认","确定删除"+row.gtitle+"?",function(r){
						if(r){
							$.ajax({
								type:'post',
								url:'/project1/goods.do',
								data:{type:'remove',gid:row.gid},
								success:function(data){
									if(data=="1"){
										$.messager.alert("提示","删除成功!","info")
										$('#tab1').datagrid('reload');
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
			field:'gid',title:'商品编号'
		},{
			field:'gtitle',title:'商品标题'
		},{
			field:'gauthor',title:'作者'
		},{
			field:'gsaleprice',title:'商品优惠价'
		},{
			field:'ginprice',title:'商品售价'
		},{
			field:'gdesc',title:'商品描述',width:260
		},{
			field:'gimg',title:'商品图片',
			formatter:imgFormatter
		},{
			field:'gclicks',title:'商品点击量'
		},{
			field:'cid',title:'商品类别编号'
		},{
			field:'pid',title:'出版社编号'
		}]],
		view: detailview, 
		detailFormatter:function(index,row){    
	         return '<table id="tb_' + index + '" style="height:150px;"></table>';    
	    },    
	    onExpandRow: function(index,row){    
	         $('#tb_'+index).datagrid({    
	    		 data:[row],//此时的data是整行对象
	    		 iconCls:'icon-ok',
	    		 collapsible:true,
	    		 rownumbers:true,
	    		 nowrap:false,//分行显示
	    		 columns:[[{
	    			 field:'gimg',title:'商品图片',
	    			 formatter:imgFormatter
	    		 },{
	    			 field:'gdesc',title:'商品描述',
	    		 }
	    		 ]],
	             onLoad:function(){    
	                 $('#tab1').datagrid('fixDetailRowHeight',index);    
	             }    
	         });  
	   }
	})
}
function imgFormatter(value){
	console.log(value)
	if('' != value && null != value){    
	    value = "<img onclick=download(\""+value+"\") style='width:66px; height:60px;margin-left:3px;' src='/project1/images/bookcover/" + value + ".jpg' />";     
	    return  value;
	}
}
function download(img){  
    var simg =  "/project1/images/bookcover/"+ img+".jpg";  
    $("#simg").attr("src",simg);  
    $('#dlg').dialog({  
    	title: '预览',  
    	width: $("#simg").attr("width"),  
    	height:$("#simg").attr("heighht"),  
    	resizable:true,  
    	closed: false,  
    	cache: false,  
    	modal: true  
    });  
      
} 


