//Global Variable
var golbalDataCRUD =[];

var searchMultiFn=function(search,searchName){
	var paramSearchName="";
	 if(searchName==undefined){
		 paramSearchName="";
	 }else{
		 paramSearchName =searchName;
	 }
	 
	 var search = search.trim().toLowerCase();
	 $(".rowSearch"+paramSearchName).hide();
     $.each( $(".rowSearch"+paramSearchName),function(index1,indexEntry1){
    	 //console.log(indexEntry1);	
    	 var i=0;
    	 $.each($(".columnSearch"+paramSearchName,this),function(index2,indexEntry2){
    		 //console.log($(indexEntry2).text());
    		 //console.log($(indexEntry2).text().indexOf(search));
    		 if($(indexEntry2).text().trim().toLowerCase().indexOf(search)>=0){
    			 $(this).parent().show();
    			 return false;
    		 }
    	 });
     });
}


var insertFn = function(data,options){
	
	$.ajax({
		
		url:options['serviceName'],
		type : "POST",
		dataType : "json",
		data : data,
		headers:{Authorization:"Bearer "+options['tokenID'].token},
		success : function(data,status) {
			if(data['status']=="200"){
				alert("Insert Success");
				getDataFn(options);
				clearFn(options);
			}
			
		}
	});
}
var deleteFn = function(id,options){
	
	$.ajax({
		
		url:options['serviceName']+"/"+id,
		type : "delete",
		dataType : "json",
		async:false,
		headers:{Authorization:"Bearer "+options['tokenID'].token},
		success : function(status) {
			
			getDataFn(options);
			clearFn(options);
		}
	});
}
var clearFn = function(options){
	$("#id").val("");
	$("#action").val("add");
	
	$.each(options['form'],function(index,indexEntry){
		
		if(indexEntry['inputType']=="text"){
			$("#"+indexEntry['id']).val("");
		}else if(indexEntry['inputType']=="dropdown"){
			$("#"+indexEntry['id']).val("");
		}
	});
	
}
var updateFn = function(data,options){
	
	$.ajax({
			url:options['serviceName']+"/"+$("#id").val(),
			type : "patch",
			dataType : "json",
			data : data,
			headers:{Authorization:"Bearer "+options['tokenID'].token},
			success : function(data,status) {
				if(data['status']=="200"){
					alert("Update Success");
					getDataFn(options);
					clearFn(options);
				}
				
			}
		});
}
var mapObjectToFormFn  =function(data,options){
	
	/*
	"form":[{
	"label":"Connection Name","inputType":"text","default":"DefultText",
	"id":"connectionName","width":"350px","required":true
	},
	 */
	
	$.each(options['form'],function(index,indexEntry){

		if(indexEntry['inputType']=="text"){
			$("#"+indexEntry['id']).val(data[indexEntry['id']]);
		}else if(indexEntry['inputType']=="dropdown"){
			$("#"+indexEntry['id']).val(data[indexEntry['id']]);
		}
		//console.log(data[indexEntry['id']]);
		
	});
		
	
//	$.each(data,function(index,indexEntry){
//		if(options[''])
//		$("#"+index).val(indexEntry);
//	});
	$("#modal-"+options['formDetail']['id']).modal();
}
var fineOneFn = function(id,options){
	$.ajax({
		
		url:options['serviceName']+"/"+id,
		type : "GET",
		dataType : "json",
		async:false,
		headers:{Authorization:"Bearer "+options['tokenID'].token},
		success : function(data) {
			$("#id").val(data[options['formDetail']['pk_id']]);
			$("#action").val('edit');
			mapObjectToFormFn(data,options);
		}
	});
}
var displayTypeFn = function(colunms,options){
	var htmlTbody="";
	if(colunms['colunmsType']=='checkbox'){
	htmlTbody+="<td class=\"columnSearch"+options['formDetail']['id']+"\">"+indexEntry[indexEntry2['id']]+"</td>";
	}else{
	htmlTbody+="<td class=\"columnSearch"+options['formDetail']['id']+"\">"+indexEntry[indexEntry2['id']]+"</td>";	
	}
	return htmlTbody;
};
var listDataFn = function(data,options){
	
	var htmlTbody="";
	$.each(data,function(index,indexEntry) {
		htmlTbody+="    	<tr class=\"rowSearch"+options['formDetail']['id']+"\">";
		$.each(options['colunms'],function(index2,indexEntry2){
			
			if(indexEntry2['colunmsType']=='checkbox'){
				if(indexEntry[indexEntry2['id']]==1){
					htmlTbody+="<td class=\"columnSearch"+options['formDetail']['id']+"\"><input type='checkbox' checked='checked'></td>";
				}else{
					htmlTbody+="<td class=\"columnSearch"+options['formDetail']['id']+"\"><input type='checkbox' ></td>";
				}
				
			}else if(indexEntry2['colunmsType']=='text'){
				
				htmlTbody+="    		<td class=\"columnSearch"+options['formDetail']['id']+"\">"+indexEntry[indexEntry2['id']]+"</td>";
			
			}
		});
		htmlTbody+="    		<td style=\"text-align:center\">";
		htmlTbody+="    		<i data-content=\"&lt;button class='btn btn-warning btn-xs btn-gear edit' id='id-"+indexEntry[options['formDetail']['pk_id']]+"' data-target=#addModalRule data-toggle='modal'&gt;Edit&lt;/button&gt;&nbsp;&lt;button id='id-"+indexEntry[options['formDetail']['pk_id']]+"' class='btn btn-danger btn-xs btn-gear del'&gt;Delete&lt;/button&gt;\" data-placement=\"top\" data-toggle=\"popover\" data-html=\"true\" class=\"fa fa-cog font-gear popover-edit-del\" data-original-title=\"\" title=\"\"></i>";
		htmlTbody+="    		</td>";
		htmlTbody+="    	</tr>";
		
	});
	
	$("#listData").html(htmlTbody);
	$(".popover-edit-del").popover();
	$("#table-"+options['formDetail']['id']).off("click",".popover-edit-del");
	$("#table-"+options['formDetail']['id']).on("click",".popover-edit-del",function(){
		//Delete Start
		$(".del").on("click",function() {
			//alert(this.id);
			var id=this.id.split("-");
			id=id[1];
			deleteFn(id,options);
		});
		//findOne Start
		$(".edit").on("click",function() {
			//alert(this.id);
			var id=this.id.split("-");
			id=id[1];
			fineOneFn(id,options);
		});
	});	
	
	
	
}
var getDataFn = function(options){
	
	$.ajax({
		url : options['serviceName'],
		type : "get",
		dataType : "json",
		async:false,
		//data:{"page":page,"rpp":rpp},
		headers:{Authorization:"Bearer "+options['tokenID'].token},
		success : function(data) {
			listDataFn(data,options);
			golbalDataCRUD=data;
			if(options['pagignation']==true){
				paginationSetUpFn(golbalDataCRUD['current_page'],golbalDataCRUD['last_page'],golbalDataCRUD['last_page']);
			}
			
		}
	});
}
//getDataFn();


var createInputTypeFn  = function(object,tokenID){
	var inputType="";
/*
{
"label":"Database Type","inputType":"dropdown","default":"All",
"id":"databaseType","width":"250px","url":"","required":true
},
 */
	
	if(object['inputType']=="dropdown"){
		
		$.ajax({
			url:object['url'],
			dataType:"json",
			type:"get",
			async:false,
			headers:{Authorization:"Bearer "+tokenID.token},
			success:function(data){
				inputType="<select class='form-control input-sm' id="+object['id']+" name=\""+object['id']+"\" style='width:"+object['width']+"'>";			
				$.each(data,function(index,indexEntry){
					inputType+="<option value="+index+">"+indexEntry+"</option>";
				});
				inputType+="<select>";
			}
		})
		
	}else if(object['inputType']=="text"){
	
		inputType+="<input type=\"text\" style='width:"+object['width']+"' class=\"form-control input-sm numberOnly\" placeholder=\"\" id=\""+object['id']+"\" name=\""+object['id']+"\">";
	
	}else if(object['inputType']=="checkbox"){
		
		inputType+="<input type='checkbox' class=\" \" placeholder=\"\" id=\""+object['id']+"\" name=\""+object['id']+"\">";
	
	}else if(object['inputType']=="radio"){
		
		inputType+="<input type='radio' class=\" \" placeholder=\"\" id=\""+object['id']+"\" name=\""+object['id']+"\">";
	
	}
	return inputType;
}
var createExpressSearchFn = function(){
var expressSearch="";
expressSearch+="<div class=\"input-group\"><input type=\"text\" class=\"input-sm form-control\" id=\"searchText\" placeholder=\"Search\"> <span class=\"input-group-btn\">";
expressSearch+="<button id=\"btnSearch\" class=\"btn btn-sm btn-primary\" type=\"button\">&nbsp;<i class=\"fa fa-search\"></i></button> </span>";
expressSearch+="</div>";

return expressSearch;
}
var createFormFn = function(options){
	
var formHTML="";
formHTML+="<form id='"+options['formDetail']['id']+"' name='"+options['formDetail']['id']+"'>";
formHTML+="<div aria-hidden=\"true\" role=\"dialog\" tabindex=\"-1\" id=\"modal-"+options['formDetail']['id']+"\" class=\"modal inmodal\" style=\"display: none;\">";
formHTML+="<div class=\"modal-dialog\">";
formHTML+="<div class=\"modal-content animated bounceInRight\">";
formHTML+="        <div class=\"modal-header\">";
formHTML+="            <button data-dismiss=\"modal\" class=\"close\" type=\"button\"><span aria-hidden=\"true\">×</span><span class=\"sr-only\">Close</span></button>";
formHTML+="            <h4 class=\"modal-title\" id=\""+options['formDetail']['id']+"\">"+options['formDetail']['formName']+"</h4>";
formHTML+="        </div>";
formHTML+="        <div class=\"modal-body\">";
formHTML+="            <h2><i class=\"fa fa fa-pencil-square-o icon-title\"></i> <span id=\"modalDescription\"> Add "+options['formDetail']['formName']+"</span> </h2>";
formHTML+="            <hr>";

$.each(options['form'],function(index,indexEntry){

	formHTML+="            <div class='form-file-mangement'>";
	formHTML+="                <div class=\"form-label-customs\">";
	formHTML+="                	"+indexEntry['label']+"";
								if(indexEntry['required']==true){
									formHTML+="<span class='redFont '>*</span>";
								}
	formHTML+="                </div>";
	formHTML+="                <div class=\"form-input-customs\">";
	formHTML+=					createInputTypeFn(indexEntry,options['tokenID']);
	formHTML+="                </div>";
	formHTML+="                <br style=\"clear:both\">";
	formHTML+="            </div>";

});

formHTML+="        </div>";
formHTML+="        <div class=\"modal-footer\">";
formHTML+="       	 	<input type=\"hidden\" name=\"id\" id=\"id\" value=\"\">";
formHTML+="				<input type=\"hidden\" name=\"action\" id=\"action\" value=\"add\">";
formHTML+="				<button class=\"btn btn-primary\" type=\"button\" id=\"btnSubmit\">Save</button>";
formHTML+="				<button class=\"btn btn-primary\" type=\"button\" id=\"btnAddAnother\">Save & Add Another</button>";
formHTML+="            <button data-dismiss=\"modal\" class=\"btn btn-white btnCancle\" type=\"button\">Cancel</button>";
formHTML+="            <div class=\"alert alert-warning\" id=\"information\" style=\"display: none;\"></div>";
formHTML+="        </div>";
formHTML+="    </div>";
formHTML+="</div>";
formHTML+="</div>";   
formHTML+="</form>"; 
return formHTML;
}

var createDataTableFn = function(options){
	
	
	$.ajax({
		url:"../theme/basic.html",
		dataType:"html",
		type:"get",
		async:false,
		success:function(data){
			
			
			$("#mainContent").html(data);
			
			if(options['expressSearch']==true){
				$("#expressSearchArea").html(createExpressSearchFn());
			}
			
			
			$("#titilePage").html(options['formDetail']['formName']);
			$("#titlePanel").html(options['formDetail']['formName']+" List");
			//data-target="#modal-databaseConnection"
			$("#btnAdd").attr("data-target","#modal-"+options['formDetail']['id']);
	
			var tableHTML="";                	
			tableHTML+="<table class=\"table table-striped\" id=\"table-"+options['formDetail']['id']+"\">" ;                               		
			tableHTML+="    <thead>";
			tableHTML+="        <tr>"
			$.each(options['colunms'],function(index,indexEntry){
				tableHTML+="            <th  style='width:"+indexEntry['width']+"'>"+indexEntry['colunmsDisplayName']+"</th>";
			});
			tableHTML+="           	 	<th>Manage</th>";
			
			tableHTML+="        </tr>";
			tableHTML+="    </thead>";
			tableHTML+="    <tbody id=\"listData\">";
			
			
			tableHTML+="    </tbody>";
			tableHTML+="</table>";
			$("#tableArea").html(tableHTML);
			
			$("#modalFormArea").html(createFormFn(options));
			
			
			//Get Data Start
				
			getDataFn(options);
			
			//Get Data End
			
			
			$("#btnSubmit").click(function(){
				//
				//alert("hellojquery");
				
				var data = $("form#"+options['formDetail']['id']).serialize();
				//console.log(data);
				
				if($("#action").val()=="add"){
					
					insertFn(data,options);
				}else{
					
					updateFn(data,options);
				}
				
				
				
			});
			
			
			$("#btnSearch")	.click(function(){
				searchMultiFn($("#searchText").val(),options['formDetail']['id']);
			});
			
			
	
		}
	});
}
