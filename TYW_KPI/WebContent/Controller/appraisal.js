var globalData="";

// funciton global start
//form2
var assignTemplateQualityFn = function(structureName,data){
	var appraisal_item_id_array=[];
	var htmlTemplateQuality="";
	
	
	var hintCount = 0;
	var hintHtml="";
	$.each(data['hint'],function(index,indexEntry){
		if(hintCount==0){
			hintHtml+=index+" "+indexEntry;
		}else{
			hintHtml+="<br>"+index+" "+indexEntry;
		}
		hintCount++;
	});
	
	
	htmlTemplateQuality+="";
	htmlTemplateQuality+="<div class=\"row\">";
	htmlTemplateQuality+="<div class=\"col-lg-12\">";
	htmlTemplateQuality+="<div class=\"ibox-title2\">";

	//Appraisal Item Name,Target,Actual,Score,%Weight,Weight Score
	htmlTemplateQuality+="<div class='titlePanel'>"+structureName+"</div>";
		htmlTemplateQuality+="<div class='totalWeight'>Total Weight "+data['total_weight']+"%</div>";
	htmlTemplateQuality+="</div>";
	htmlTemplateQuality+="<div class=\"ibox-content\">";
	htmlTemplateQuality+="<div class=\"table-responsive scrollbar-inner\">";
	htmlTemplateQuality+="<table id=\"tablethreshould\" class=\"table table-striped\">";
	htmlTemplateQuality+="<thead>";
		htmlTemplateQuality+="<tr>";
			htmlTemplateQuality+="<th style=\"width:25%\">Appraisal Item Name</th>";
			htmlTemplateQuality+="<th style=\"width:15%\">Target</th>";
			htmlTemplateQuality+="<th style=\"width:15%\">Actual </th>";
			htmlTemplateQuality+="<th style=\"width:15%\">Score</th>  ";      
			htmlTemplateQuality+="<th style=\"width:15%\">%Weight</th>  ";   
			htmlTemplateQuality+="<th style=\"width:15%\">Weight Score</th>  ";   
			htmlTemplateQuality+="</tr>";
				htmlTemplateQuality+="</thead>";
					htmlTemplateQuality+="<tbody id=\"\" class='appraisal_result'>";
					
					$.each(data['items'],function(index,indexEntry){
						
					appraisal_item_id_array.push(indexEntry['appraisal_item_id']);
						
						
					htmlTemplateQuality+="<tr>";
					
						htmlTemplateQuality+="<td class=''>"+indexEntry['appraisal_item_name']+"</td>";
						htmlTemplateQuality+="<td class='' ><div data-toggle=\"tooltip\" data-placement=\"left\" title=\""+hintHtml+"\">"+notNullFn(indexEntry['target_value'])+"</div></td>";
						htmlTemplateQuality+="<td class=''><input id='id-"+indexEntry['appraisal_item_id']+"-"+indexEntry['structure_id']+"-actual_value' class='id-"+indexEntry['structure_id']+"-target input form-control input-sm-small numberOnly' type='text' value="+notNullFn(indexEntry['actual_value'])+"></td>";
						htmlTemplateQuality+="<td class=''>"+notNullFn(indexEntry['score'])+"</td>";
						htmlTemplateQuality+="<td class=''>"+notNullFn(indexEntry['weight_percent'])+"</td>";
						htmlTemplateQuality+="<td class=''>"+notNullFn(indexEntry['weigh_score'])+"</td>";
						
					htmlTemplateQuality+="</tr>";
					});
					htmlTemplateQuality+="</tbody>";
					htmlTemplateQuality+="</table>";
					
					//htmlTemplateQuality+="<div class='formName hidden'>form2</div>";
					htmlTemplateQuality+="<input type='hidden' id='structure_id-"+data['structure_id']+"' class='structure_id' value="+data['structure_id']+">";
					htmlTemplateQuality+="<input type='hidden' id='form-"+data['structure_id']+"' class='' value=\"form2\">";
					htmlTemplateQuality+="<input type='hidden' id='appraisal_item_id_array-"+data['structure_id']+"' class='appraisal_item_id_array' value=\""+appraisal_item_id_array+"\">";
					
					htmlTemplateQuality+="</div>";
					htmlTemplateQuality+="<br style=\"clear:both\">";				
		htmlTemplateQuality+="</div>";
	htmlTemplateQuality+="</div>";
htmlTemplateQuality+="</div>";
return htmlTemplateQuality;
//$("#appraisal_template_area").append(htmlTemplateQuality);

};

var assignTemplateDeductFn = function(structureName,data){
	
	var htmlTemplateDeduct="";
	htmlTemplateDeduct+="<div class=\"row\">";
	htmlTemplateDeduct+="<div class=\"col-lg-12\">";
	htmlTemplateDeduct+="<div class=\"ibox-title2\">";
	htmlTemplateDeduct+="<div class='titlePanel'>"+structureName+"</div>";
	htmlTemplateDeduct+="<div class='totalWeight'>Total Weight "+data['total_weight']+"%</div>";
	htmlTemplateDeduct+="</div>";
		
		htmlTemplateDeduct+="<div class=\"ibox-content\">";
		htmlTemplateDeduct+="<div class=\"table-responsive scrollbar-inner\">";
		htmlTemplateDeduct+="<table id=\"tablethreshould\" class=\"table table-striped\">";
              		
		htmlTemplateDeduct+="<thead>";
			htmlTemplateDeduct+="<tr>";
				htmlTemplateDeduct+="<th style=\"width:25%\">Appraisal Item Name</th>";
				htmlTemplateDeduct+="<th style=\"width:15%\">Max Value</th>";
				htmlTemplateDeduct+="<th style=\"width:15%\">Actual Value</th>";
				htmlTemplateDeduct+="<th style=\"width:15%\">Over Value</th>";
				htmlTemplateDeduct+="<th style=\"width:15%\">Deduct Score/Unit </th>";
				htmlTemplateDeduct+="<th style=\"width:15%\">Weight Score </th>";
			htmlTemplateDeduct+="</tr>";
			htmlTemplateDeduct+="</thead>";
					htmlTemplateDeduct+="<tbody id=\"\" class='appraisal_result'>";
					
					$.each(data['items'],function(index,indexEntry){
					htmlTemplateDeduct+="<tr>";
							htmlTemplateDeduct+="<td class=''>"+indexEntry['appraisal_item_name']+"</td>";
							htmlTemplateDeduct+="<td class=''>"+notNullFn(indexEntry['max_value'])+"</td>";
							htmlTemplateDeduct+="<td class=''>"+notNullFn(indexEntry['actual_value'])+"</td>";
							htmlTemplateDeduct+="<td class=''>"+notNullFn(indexEntry['over_value'])+"</td>";
							htmlTemplateDeduct+="<td class=''>"+notNullFn(indexEntry['deduct_score_unit'])+"</td>";
							htmlTemplateDeduct+="<td class=''>"+notNullFn(indexEntry['weigh_score'])+"</td>";
							
					htmlTemplateDeduct+="</tr>";
					});
						
						
					htmlTemplateDeduct+="</tbody>";
					htmlTemplateDeduct+="</table>";
					htmlTemplateDeduct+="<input type='hidden' id='structure_id-"+data['structure_id']+"' class='structure_id' value="+data['structure_id']+">";
					htmlTemplateDeduct+="<input type='hidden' id='form-"+data['structure_id']+"' class='' value=\"form3\">";
					
				htmlTemplateDeduct+="</div>";
			htmlTemplateDeduct+="<br style=\"clear:both\">"			
		htmlTemplateDeduct+="</div>";
		htmlTemplateDeduct+="</div>";
	htmlTemplateDeduct+="</div>";
	return htmlTemplateDeduct;
	//$("#appraisal_template_area").append(htmlTemplateDeduct);
};

var assignTemplateQuantityFn = function(structureName,data){
	var appraisal_item_id_array=[];
	var htmlTemplateQuantity = "";
	var hintCount = 0;
	var hintHtml="";
	$.each(data['hint'],function(index,indexEntry){
		if(hintCount==0){
			hintHtml+=index+" "+indexEntry;
		}else{
			hintHtml+="<br>"+index+" "+indexEntry;
		}
		hintCount++;
	});
	
	htmlTemplateQuantity+="<div class=\"row\">";
	htmlTemplateQuantity+="	<div class=\"col-lg-12\">";
	htmlTemplateQuantity+="  <div class=\"ibox-title2\">";
	
	htmlTemplateQuantity+="      <div class='titlePanel'>"+structureName+"</div>";
	htmlTemplateQuantity+="      <div class='totalWeight'>Total Weight "+data['total_weight']+"%</div>";
	htmlTemplateQuantity+="  </div>";
	htmlTemplateQuantity+="	<div class=\"ibox-content\">";
	htmlTemplateQuantity+=" <div class=\"table-responsive scrollbar-inner\">";
	htmlTemplateQuantity+="<table id=\"tableAppraisalAssignment\" class=\"table table-striped\">";
	htmlTemplateQuantity+="<thead>";
		htmlTemplateQuantity+="<tr>";
			htmlTemplateQuantity+="<th style=\"width:10%\" class=''>Perspective </th>";
			htmlTemplateQuantity+="<th style=\"width:25%\" class=''>Appraisal Item Name</th>";
			htmlTemplateQuantity+="<th style=\"width:5%\" class=''>Target </th>";
			htmlTemplateQuantity+="<th style=\"width:5%\" class=''>Actual </th>";
			htmlTemplateQuantity+="<th style=\"width:5%\" class=''>Score </th>";
			htmlTemplateQuantity+="<th style=\"width:5%\" class=''>%Weight </th>";
			htmlTemplateQuantity+="<th style=\"width:5%\" class=''>Weight Score </th>";
			
		htmlTemplateQuantity+="</tr>";
		htmlTemplateQuantity+="</thead>";
			htmlTemplateQuantity+="<tbody id=\"\" class='appraisal_result'>";
			$.each(data['items'],function(index,indexEntry){
			
				
				appraisal_item_id_array.push(indexEntry['appraisal_item_id']);
				/*
				appraisal_item_id
				appraisal_item_name
				structure_id
				structure_name
				nof_target_score
				form_id
				form_name
				app_url
				weight_percent
				*/
				
				htmlTemplateQuantity+="<tr >";
					htmlTemplateQuantity+="<td>Empty</td>";
					htmlTemplateQuantity+="<td>"+indexEntry['appraisal_item_name']+"</td>";
					htmlTemplateQuantity+="<td ><div data-toggle=\"tooltip\" data-placement=\"left\" title=\""+hintHtml+"\">"+notNullFn(indexEntry['target_value'])+"</div></td>";
					htmlTemplateQuantity+="<td>"+notNullFn(indexEntry['actual_value'])+"</td>";
					htmlTemplateQuantity+="<td>"+notNullFn(indexEntry['score'])+"</td>";
					htmlTemplateQuantity+="<td>"+notNullFn(indexEntry['weight_percent'])+"</td>";
					htmlTemplateQuantity+="<td>"+notNullFn(indexEntry['weigh_score'])+"</td>";
			
				htmlTemplateQuantity+="</tr>";
				
			});
			htmlTemplateQuantity+="</tbody>";
			htmlTemplateQuantity+="</table>";
			htmlTemplateQuantity+="<input type='hidden' id='structure_id-"+data['structure_id']+"' class='structure_id' value="+data['structure_id']+">";
			htmlTemplateQuantity+="<input type='hidden' id='form-"+data['structure_id']+"' class='' value=\"form1\">";
			htmlTemplateQuantity+="<input type='hidden' id='appraisal_item_id_array-"+data['structure_id']+"' class='appraisal_item_id_array' value=\""+appraisal_item_id_array+"\">";
			
			
			htmlTemplateQuantity+="</div>";
			htmlTemplateQuantity+="<br style=\"clear:both\">";	
		htmlTemplateQuantity+="</div>";
	htmlTemplateQuantity+="</div>";
	htmlTemplateQuantity+="</div>";
	
	return htmlTemplateQuantity;
	//$("#appraisal_template_area").append(htmlTemplateQuantity);
	//console.log(data['count']);
	//console.log(data['structure_id']);
	
}


//function global start

var dropDrowYearListFn = function(nameArea,id){
	if(nameArea==undefined){
		nameArea="";
	}
	$.ajax({
		url:restfulURL+"/tyw_api/public/appraisal/year_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			//var data=['ทดลองงาน','ประจำปี','รักษาการ'];
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['appraisal_year']){
					htmlOption+="<option selected='selected' value="+indexEntry['appraisal_year']+">"+indexEntry['appraisal_year']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['appraisal_year']+">"+indexEntry['appraisal_year']+"</option>";
				}
			});
			$("#AppraisalYear"+nameArea).html(htmlOption);
		}
	});
}

var dropDrowPeriodListFn = function(year,id){

	$.ajax({
		url:restfulURL+"/tyw_api/public/appraisal/period_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"appraisal_year":year},
		success:function(data){
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['period_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['period_id']+">"+indexEntry['period_no']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['period_id']+">"+indexEntry['period_no']+"</option>";
				}
			});
			$("#AppraisalPeriod").html(htmlOption);
		}
	});
}

var dropDrowAppraisalLevelFn = function(id){

	$.ajax({
		url:restfulURL+"/tyw_api/public/appraisal/al_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['appraisal_level_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['appraisal_level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['appraisal_level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
				}
			});
			$("#AppraisalLevel").html(htmlOption);
		}
	});
}
var dropDrowDepartmentFn = function(id){

	$.ajax({
		url:restfulURL+"/tyw_api/public/appraisal/dep_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['department_code']){
					htmlOption+="<option selected='selected' value="+indexEntry['department_code']+">"+indexEntry['department_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['department_code']+">"+indexEntry['department_name']+"</option>";
				}
			});
			$("#Department").html(htmlOption);
		}
	});
}

var dropDrowSectionFn = function(department_code,id){

	$.ajax({
		url:restfulURL+"/tyw_api/public/appraisal/sec_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"department_code":department_code},
		success:function(data){
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['section_code']){
					htmlOption+="<option selected='selected' value="+indexEntry['section_code']+">"+indexEntry['section_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['section_code']+">"+indexEntry['section_name']+"</option>";
				}
			});
			$("#Section").html(htmlOption);
		}
	});
}

var splitData = function(data){
	if(data.trim()!=""){
		data = data.split("-");
		data=data[0];
	}else{
		data="";
	}
	return data;
}

var listAppraisalDetailFn = function(data){
	//console.log(data);
	console.log('-----------');
	$.each(data['group'],function(index,groupEntry){
		
//		console.log(index);
//		console.log(groupEntry['form_url']);
		
		if(groupEntry['form_url']=='quantity'){			
			$("#appraisal_template_area").append(assignTemplateQuantityFn(index,groupEntry));
			//$("#appraisal_template_area").append(assignTemplateQualityFn(index,groupEntry));
		}else if(groupEntry['form_url']=='quality'){
			$("#appraisal_template_area").append(assignTemplateQualityFn(index,groupEntry));
		}else if(groupEntry['form_url']=='deduct'){
			$("#appraisal_template_area").append(assignTemplateDeductFn(index,groupEntry));
		}

		//binding tooltip start
		 $('[data-toggle="tooltip"]').tooltip({
			 "html":true
		 });
		//binding tooltip end
		
		//set header start
		 $("#txtEmpCode").html(data['head'][0]['emp_code']);
		 $("#txtEmpName").html(data['head'][0]['emp_name']);
		 $("#txtPosition").html(data['head'][0]['position_name']);
		 $("#txtDepartment").html(data['head'][0]['department_name']);
		 $("#txtSection").html(data['head'][0]['section_name']);
		 
		 $("#txtChiefEmpCode").html(data['head'][0]['chief_emp_code']);
		 $("#txtChiefEmpName").html(data['head'][0]['chief_emp_name']);
		 $("#txtAppraisalType").html(data['head'][0]['appraisal_type_name']);
		 $("#txtPeriod").html("empty");
		 $("#txtGrandTotalWeigh").html(data['head'][0]['result_score']);
		 
		 
		//set header end
		
		dropDrowAsignToEditFn(data['head'][0]['stage_id']);
		$("#assignTo").change(function(){
			//alert($(this).val());
			dropDrowActionEditFn($(this).val());
			
		});
		$("#assignTo").change();
		$("#ModalAppraisal").modal();
	})
};
var findOneFn = function(id){

	$.ajax({
		url:restfulURL+"/tyw_api/public/appraisal/"+id,
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			
			listAppraisalDetailFn(data);
			
			
		}
	});
	
	
}

var listDataFn = function(data){
	htmlHTML="";
	$.each(data,function(index,indexEntry){

		/*
	emp_result_id
	emp_code
	emp_name
	appraisal_level_name
	appraisal_type_name
	position_name
	assign
	to_action
		*/
		
		htmlHTML+="<tr>";
		
		htmlHTML+="	<td class=''><a href=\"#\" class='emp_code' id=\"id-"+indexEntry['emp_code']+"\" >"+indexEntry['emp_code']+"</a></td>";
		htmlHTML+=" <td>"+indexEntry['emp_name']+"</td>";
		htmlHTML+=" <td>"+indexEntry['appraisal_level_name']+"</td>";
		htmlHTML+=" <td>"+indexEntry['appraisal_type_name']+"</td>";
		htmlHTML+="	<td>"+indexEntry['position_name']+"</td>";
		htmlHTML+="	<td>"+indexEntry['assign']+"</td>";
		htmlHTML+="	<td>"+indexEntry['to_action']+"</td>";
		
		htmlHTML+="</tr>";
		
	});
	
	$("#listAppraisal").html(htmlHTML);
}
var getDataFn = function(page,rpp){

	/*
	embed_AppraisalYear
	embed_AppraisalPeriod
	embed_AppraisalLevel
	embed_Department
	embed_Section
	embed_Position
	embed_EmpName
	*/
	
	var AppraisalYear = $("#embed_AppraisalYear").val();
	var AppraisalPeriod= $("#embed_AppraisalPeriod").val();
	var AppraisalLevel= $("#embed_AppraisalLevel").val();
	var Department= $("#embed_Department").val();
	var Section= $("#embed_Section").val();
	var Position= $("#embed_Position").val();
	
	var EmpName= splitData($("#embed_EmpName").val());
	
	
	$.ajax({
		url:restfulURL+"/tyw_api/public/appraisal",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{
			"page":page,
			"rpp":rpp,	
//			"appraisal_year":AppraisalYear,
//			"period_no":AppraisalPeriod,
//			"appraisal_level_id":AppraisalLevel,
//			"department_code":Department,
//			"section_code":Section,
//			"position_code":Position,
//			"emp_code":EmpName,
//		
			
		},
		success:function(data){
			
			console.log(data);
			
			listDataFn(data['data']);
			globalData=data;
			paginationSetUpFn(globalData['current_page'],globalData['last_page'],globalData['last_page']);
			$(".search_result").show();
		}
	});
};

//SearchAdvance
var searchAdvanceFn = function() {
	
	/*
	AppraisalYear
	AppraisalPeriod
	AppraisalLevel
	Department
	Section
	Position
	EmpName
	*/
	
	$(".embed_param_search").remove();
	var embedParam="";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_AppraisalYear' name='embed_AppraisalYear' value='"+$("#AppraisalYear").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_AppraisalPeriod' name='embed_AppraisalPeriod' value='"+$("#AppraisalPeriod").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_AppraisalLevel' name='embed_AppraisalLevel' value='"+$("#AppraisalLevel").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_Department' name='embed_Department' value='"+$("#Department").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_Section' name='embed_Section' value='"+$("#Section").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_Position' name='embed_Position' value='"+$("#Position").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_EmpName' name='embed_EmpName' value='"+$("#EmpName").val()+"'>";
	
	$("#embedParamSearch").append(embedParam);
	
	getDataFn();
};
var dropDrowAsignToEditFn = function(paramStageID){

	$.ajax({
		url:restfulURL+"/tyw_api/public/appraisal_assignment/edit_assign_to",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"stage_id":paramStageID},
		success:function(data){
			//var data=['ทดลองงาน','ประจำปี','รักษาการ'];
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['to_appraisal_level_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['to_appraisal_level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['to_appraisal_level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
				}
			});
			$("#assignTo").html(htmlOption);
		}
	});
}
var dropDrowActionEditFn = function(paramStageID){
	$.ajax({
		url:restfulURL+"/tyw_api/public/appraisal_assignment/edit_action_to",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"stage_id":paramStageID},
		success:function(data){
			//var data=['ทดลองงาน','ประจำปี','รักษาการ'];
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['stage_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['stage_id']+">"+indexEntry['to_action']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['stage_id']+">"+indexEntry['to_action']+"</option>";
				}
			});
			$("#actionToAssign").html(htmlOption);
		}
	});
}

var saveAppraisalFn = function(){
	
	
	$.each($(".appraisal_item_id_array").get(),function(index,indexEntry){
		var structure_id=$(this).atrr("id");
		structure_id=structure_id.split("-");
		structure_id=structure_id[1];
		
		//$(this).val();
		$.each($(this).val(),function(index2,indexEntry2){
				
			$("#"+indexEntry2+"-"+structure_id+"-actual_value").val()
			
			
		});
		
		
		
		
	});
	
	$.ajax({
		url:restfulURL+"/tyw_api/public/appraisal",
		type:"patch",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{},
		success:function(){
		
		}
	});
}
var assignAppraisalFn= function(){
	
	$.ajax({
		url:restfulURL+"/tyw_api/public/appraisal/"+$("#emp_result_id").val(),
		type:"patch",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"stage_id":$("#actionToAssign").val()},
		success:function(data){
			if(data['status']==200){
				callFlashSlideInModal("Saved.","#information");
			}
		}
	});
}


$(document).ready(function() {
	
	//set parameter start
		dropDrowYearListFn();
		$("#AppraisalYear").change(function(){
			dropDrowPeriodListFn($(this).val());	
		});
		$("#AppraisalYear").change();
		
		dropDrowAppraisalLevelFn();
		dropDrowDepartmentFn();
		$("#Department").change(function(){
			dropDrowSectionFn($(this).val());	
		});
		$("#Department").change();
		
		//Auto complete Start
		//http://192.168.1.52/tyw_api/public/appraisal_assignment/auto_position_name
		$("#Position").autocomplete({
	        source: function (request, response) {
	        	$.ajax({
					 url:restfulURL+"/tyw_api/public/appraisal/auto_position_name",
					 type:"get",
					 dataType:"json",
					 headers:{Authorization:"Bearer "+tokenID.token},
					 data:{"position_name":request.term,"section_code":$("#Section").val(),"department_code":$("#Department").val()},
					 //async:false,
	                 error: function (xhr, textStatus, errorThrown) {
	                        console.log('Error: ' + xhr.responseText);
	                    },
					 success:function(data){
							response($.map(data, function (item) {
	                            return {
	                                label: item.position_code+"-"+item.position_name,
	                                value: item.position_code+"-"+item.position_name
	                            };
	                        }));
					},
					beforeSend:function(){
						$("body").mLoading('hide');	
					}
					
					});
	        }
	    });
	
		$("#EmpName").autocomplete({
	        source: function (request, response) {
	        	$.ajax({
					 url:restfulURL+"/tyw_api/public/appraisal/auto_employee_name",
					 type:"get",
					 dataType:"json",
					 headers:{Authorization:"Bearer "+tokenID.token},
					 data:{"emp_name":request.term,"section_code":$("#Section").val(),
						 "position_code":splitData($("#Position").val()),"department_code":$("#Department").val()},
					 //async:false,
	                 error: function (xhr, textStatus, errorThrown) {
	                        console.log('Error: ' + xhr.responseText);
	                    },
					 success:function(data){
							response($.map(data, function (item) {
	                            return {
	                                label: item.emp_code+"-"+item.emp_name,
	                                value: item.emp_code+"-"+item.emp_name
	                            };
	                        }));
					},
					beforeSend:function(){
						$("body").mLoading('hide');	
					}
					
					});
	        }
	    });
	//set parameter end
		
		
		//search
		$("#btnSearchAdvance").click(function(){
			searchAdvanceFn();
		});
		
		//get appraisal detail.
		$(document).on("click",".emp_code",function(){	

		
			var id=this.id.split("-");
			id=id[1];
			findOneFn(id);
			$("#emp_result_id").val(id);
			
			
			
			return false;
		});
		
		//submit
		$("#btnSubmit").click(function(){
			//saveAppraisalFn();
			assignAppraisalFn();
		});
	
});