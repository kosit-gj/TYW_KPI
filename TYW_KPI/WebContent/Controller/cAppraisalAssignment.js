/*#########################  Main Function Data #######################*/
var tokenID= eval("("+localStorage.getItem("tokenID")+")");
//Global variable
var globalData=[];
var empldoyees_code = [];

//Click แล้ว ฝังข้อมูล
var removeEmbedParamCheckboxAppraisalItem = function(id){
	var id = id.split("-"); 
	var appraisal_id=id[1];
	var structure_id=id[2];
	$("#embed_appraisal_id-"+appraisal_id+"-"+structure_id).remove();
}
var embedParamCheckboxAppraisalItem = function(id){
	//id-1-1-checkbox
	var id = id.split("-"); 
	var appraisal_id=id[1];
	var structure_id=id[2];
	var count = 0;
	$.each($(".embed_appraisal_id-"+structure_id).get(),function(index,indexEnry){
	//ถ้า id ที่วน == id ที่มี	
		//console.log($(indexEnry).val());
		if($(indexEnry).val()==appraisal_id){
			count+=1;
		}
	});
	
	if(count>0){
		$("#embed_appraisal_id-"+appraisal_id+"-"+structure_id).remove();
		$("body").append("<input type='hidden' class='embed_appraisal_id-"+structure_id+"' id='embed_appraisal_id-"+appraisal_id+"-"+structure_id+"' name='embed_appraisal_id-"+appraisal_id+"-"+structure_id+"' value='"+appraisal_id+"'>");
	}else{
		$("body").append("<input type='hidden' class='embed_appraisal_id-"+structure_id+"' id='embed_appraisal_id-"+appraisal_id+"-"+structure_id+"' name='embed_appraisal_id-"+appraisal_id+"-"+structure_id+"' value='"+appraisal_id+"'>");
	}
}

var findOneFn = function(id){
	//alert(id);
	$("#ModalAssignment").modal();
	
	//get structure
	getTemplateFn();
	
	//get data for structure
	$.ajax({
		url:restfulURL+"/tyw_api/public/appraisal_assignment/"+id,
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			console.log(data);
		}
	});
}

//Get Data
var getDataFn = function(page,rpp) {
	

	
	var appraisal_level_id = $("#embed_appraisal_level_id").val();
	var appraisal_type_id= $("#embed_appraisal_type_id").val();
	var period_id= $("#embed_period_id").val();
	var position_code= $("#embed_position_code").val();
	var emp_code= $("#embed_emp_code").val();
	$.ajax({
		url:restfulURL+"/tyw_api/public/appraisal_assignment",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{
			"page":page,
			"rpp":rpp,
						
//			"appraisal_level_id":appraisal_level_id,
//			"appraisal_type_id":appraisal_type_id,
//			"period_id":period_id,
//			"position_code":position_code
//			"emp_code":emp_code	
			
		},
		success:function(data){
			
			//console.log(data);
			
			listDataFn(data['data']);
			globalData=data;
			paginationSetUpFn(globalData['current_page'],globalData['last_page'],globalData['last_page']);
		}
	})
};

//Embed Parameter 
var embedParam = function(id){
	
}

//List Data
var listDataFn = function(data) {
	//console.log(data);
	htmlHTML="";
	$.each(data,function(index,indexEntry){
		//alert(index);
		/*
		appraisal_type_name
		department_name
		emp_code
		emp_name
		emp_result_id
		position_name
		section_name
		status
		*/
		
		htmlHTML+="<tr>";
		htmlHTML+="	<td class='object-center'><input class='asign_emp' id='id-"+indexEntry['emp_code']+"' type='checkbox' value="+indexEntry['emp_code']+"></td>";
		htmlHTML+="  <td>"+indexEntry['status']+"</td>";
		htmlHTML+="  <td>"+indexEntry['emp_code']+"</td>";
		htmlHTML+="  <td>"+indexEntry['department_name']+"</td>";
		htmlHTML+="	<td>"+indexEntry['section_name']+"</td>";
		htmlHTML+="	<td>"+indexEntry['appraisal_type_name']+"</td>";
		htmlHTML+="	<td>"+indexEntry['position_name']+"</td>";
		htmlHTML+="  <td style=\"text-align:center\">";
		htmlHTML+="  <i title=\"\" data-original-title=\"\" class=\"fa fa-cog font-gear popover-edit-del\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\" &lt;button class='btn btn-warning btn-xs btn-gear edit' id='edit-"+indexEntry['emp_code']+"' data-target=#addModalRule data-toggle='modal'&gt;Edit&lt;/button&gt;&nbsp;&lt;button id='del-"+indexEntry['emp_code']+"' class='btn btn-danger btn-xs btn-gear del'&gt;Delete&lt;/button&gt;\"></i>";
		htmlHTML+="  </td>";
		htmlHTML+="</tr>";
		
	});
	
	$("#listDatas").html(htmlHTML);
	
	$(".popover-edit-del").popover();
	$("#listDatas").off("click",".popover-edit-del");
	$("#listDatas").on("click",".popover-edit-del",function(){
		//Delete Start
		$(".del").on("click",function() {
			
			var id=this.id.split("-");
			id=id[1];
			$("#confrimModal").modal();
			$(this).parent().parent().parent().children().click();
			$(document).off("click","#btnConfirmOK");
			$(document).on("click","#btnConfirmOK",function(){
				//alert(id);
				deleteFn(id);
				
			});
			
		});
		//findOne Start
		$(".edit").on("click",function() {
			var edit=this.id.split("-");
			var id=edit[1];

			findOneFn(id);
			$(this).parent().parent().parent().children().click();
		});
	});	
	
};


//Assignment Start
var actionAssignmentFn2 = function(){

	var appraisal_items=[];
	var appraisal_item=[];
	var employees=[];
	var employee=[];
	var head_params=[];
	
	
	
	//get head_params 
	head_params.push({
		'appraisal_type_id':$("#embed_appraisal_type_id").val(),
		'period_id':$("#assignTo").val(),
		'action_to':$("#actionAssign").val()
		
		});

	
	//get employees
	$.each(empldoyees_code,function(index,indexEntry){
		employee.push({'emp_code':indexEntry});
	});
	employees.push(employee);
	
	        
	//loop structure
	$.each($(".structure_id").get(),function(index,structureEntry){
		//console.log($(indexEntry).val());
		//console.log($("#form-"+$(indexEntry).val()).val());
		
		
		if($("#form-"+$(structureEntry).val()).val()=="form1"){

			$.each($(".embed_appraisal_id-"+$(structureEntry).val()).get(),function(index2,appraisalItemEntry){
				
				appraisal_item.push({"nof_target_score":"",
									  "form_id":"1",
									  "appraisal_item_id":$(appraisalItemEntry).val(),
									  "target_value":$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-target").val(),
									  "score1_target_start":$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score_start-1").val(),
									  "score1_target_end":$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score_end-1").val(),
									  "score2_target_start":$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score_start-2").val(),
									  "score2_target_end":$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score_end-2").val(),
									  "score3_target_start":$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score_start-3").val(),
									  "score3_target_end":$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score_end-3").val(),
									  "score4_target_start":$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score_start-4").val(),
									  "score4_target_end":$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score_end-4").val(),
									  "score5_target_start":$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score_start-5").val(),
									  "score5_target_end":$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score_end-5").val(),
									  "weight_percent":$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-weight").val(),
				});
			
			});

			
			
		}else if($("#form-"+$(structureEntry).val()).val()=="form2"){

			$.each($(".embed_appraisal_id-"+$(structureEntry).val()).get(),function(index2,appraisalItemEntry){
				appraisal_item.push({
					  "appraisal_item_result_id":"11",
					  "appraisal_item_id":$(appraisalItemEntry).val(),
					  "form_id":"2",
					  "target_value":$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-target").val(),
					  "weight_percent":$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-weight").val(),
					  });
			});
			
		}else if($("#form-"+$(structureEntry).val()).val()=="form3"){
			
			$.each($(".embed_appraisal_id-"+$(structureEntry).val()).get(),function(index2,appraisalItemEntry){
				appraisal_item.push({
					  "appraisal_item_result_id":"11",
					  "appraisal_item_id":$(appraisalItemEntry).val(),
					  "form_id":"3",
					  "max_value":$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-maxValue").val(),
					  "deduct_score_unit":$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-deductScoreUnit").val(),
					  });
				});
			
		}
		
		
	});
	appraisal_items.push(appraisal_item);
//	console.log(appraisal_items);
//	console.log(head_params);
//	console.log(employees);

	console.log(appraisal_items);


	
	$.ajax({
		url:restfulURL+"/tyw_api/public/appraisal_assignment",
		type:"post",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		
//		data:{"head_params":
//							{
//							'appraisal_type_id':$("#embed_appraisal_type_id").val(),
//							'period_id':$("#assignTo").val(),
//							'action_to':$("#actionAssign").val()
//							},
//			"employees": [{"emp_code": "11"},{"emp_code": "22"}],
//			"appraisal_items":[
//			                   {
//			                           "nof_target_score": "",  
//			                           "form_id": "",     
//			                           "appraisal_item_id": "",
//			                           "target_value": "",
//			                           "score1_target_start": "",
//			                           "score1_target_end": "",
//			                           "score2_target_start": "",
//			                           "score2_target_end": "",        
//			                           "score3_target_start": "",
//			                           "score3_target_end": "",      
//			                           "score4_target_start": "",
//			                           "score4_target_end": "",      
//			                           "score5_target_start": "",
//			                           "score5_target_end": "",                                                                
//			                           "weight_percent": "",       
//			                   }
//			                   ]
//			},
		data:{"head_params":
			{
			"appraisal_type_id":$("#embed_appraisal_type_id").val(),
			"period_id":$("#assignTo").val(),
			"action_to":$("#actionAssign").val()
			},
			"employees": [{"emp_code": "11"},{"emp_code": "22"}],
			"appraisal_items":[
               {
                       "nof_target_score": "",  
                       "form_id": "",     
                       "appraisal_item_id": "1",
                       "appraisal_item_name":"ss",
                       "target_value": "",
                       "score1_target_start": "",
                       "score1_target_end": "",
                       "score2_target_start": "",
                       "score2_target_end": "",        
                       "score3_target_start": "",
                       "score3_target_end": "",      
                       "score4_target_start": "",
                       "score4_target_end": "",      
                       "score5_target_start": "",
                       "score5_target_end": "",                                                                
                       "weight_percent": "",       
               }
               ]
		},
		success:function(data){
			
			console.log(data);
			
		}
	});
	
	
	
}
var actionAssignmentFn = function(){
	var params=[];
	params+="{";
	params+="head_params: {";
		params+=" appraisal_type_id: '1',";
		params+=" period_id: '1',";
		params+=" action_to: '1',";
		params+="},";
		params+="employees: [";
		params+="{emp_code: '1'},";
		params+="{emp_code: '2'}";
		params+="],";
		params+="appraisal_items: [";
			params+="{";
					params+="nof_target_score: '',";
					params+="form_id: '1',";      
					params+="appraisal_item_id: '',";
					params+="target_value: '',";
					params+="score1_target_start: '',";
					params+="score1_target_end: '',";
					params+="score2_target_start: '',";
					params+=" score2_target_end: '',";     
					params+="score3_target_start: '',";
					params+=" score3_target_end: '',";     
					params+="score4_target_start: '',";
					params+="score4_target_end: '',";     
					params+="score5_target_start: '',";
					params+=" score5_target_end: '',";                                                             
					params+="weight_percent: '',";  
			params+="},";
		       
			params+="{";
				params+="appraisal_item_id: '',";
				params+="form_id: '2',";
				params+="target_value: '',";
				params+="weight_percent: '',  ";      
			params+="},";
			params+="{";
				params+="appraisal_item_id: '',";
				params+="form_id: '3',";
				params+="max_value: '',";
				params+="deduct_score_unit: '',  ";      
			params+="}";	
 params+="]";
params+="}";

	
//	$.ajax({
//		url:restfulURL+"/tyw_api/public/appraisal_assignment",
//		type:"get",
//		dataType:"json",
//		async:false,
//		headers:{Authorization:"Bearer "+tokenID.token},
//		data:{
//						
////			"appraisal_level_id":appraisal_level_id,
////			"appraisal_type_id":appraisal_type_id,
////			"period_id":period_id,
////			"position_code":position_code
////			"emp_code":emp_code	
//			
//		},
//		success:function(data){
//			
//		}
//	});
}	
//Assignment End
//SearchAdvance
var searchAdvanceFn = function() {
	/*
	appraisal_level_id,
	appraisal_type_id,
	period_id,
	position_code,
	emp_code,


	*/
	
	$(".embed_param_search").remove();
	var embedParam="";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_appraisal_level_id' name='embed_appraisal_level_id' value='"+$("#appraisalLevel").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_appraisal_type_id' name='embed_appraisal_type_id' value='"+$("#appraisalType").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_period_id' name='embed_period_id' value='"+$("#periodFrequency").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_position_code' name='embed_position_code' value='"+$("#Position").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_emp_code' name='embed_emp_code' value='"+$("#empName").val()+"'>";
	$("#embedParamSearch").append(embedParam);
	
	getDataFn();
};
/*#########################  Main Function Data #######################*/
/*#########################  Custom Function Data #######################*/

var appraisalLevelListFn = function(nameArea,id){
	
	if(nameArea==undefined){
		nameArea="";
	}
	
	$.ajax({
		url:restfulURL+"/tyw_api/public/appraisal_item/al_list",
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
			$("#appraisalLevel"+nameArea).html(htmlOption);
		}
	});
}


var appraisalTypeFn = function(nameArea){
	
	if(nameArea==undefined){
		nameArea="";
	}
	
	$.ajax({
		//http://192.168.1.52/tyw_api/public/appraisal_assignment/appraisal_type_list
		url:restfulURL+"/tyw_api/public/appraisal_assignment/appraisal_type_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			//var data=['ทดลองงาน','ประจำปี','รักษาการ'];
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['appraisal_type_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['appraisal_type_id']+">"+indexEntry['appraisal_type_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['appraisal_type_id']+">"+indexEntry['appraisal_type_name']+"</option>";
					
				}
			});
			$("#appraisalType"+nameArea).html(htmlOption);
		}
	});
}

var periodFrequencyFn = function(nameArea){
//	var data=['ทุกเดือน','ทุก 3 เดือน','ทุก 6 เดือน','ทุก 12 เดือน'];
//	var htmlOption="";
//	$.each(data,function(index,indexEntry){
//		htmlOption+="<option>"+indexEntry+"</option>";
//	});
//	$("#periodFrequency").html(htmlOption);
	


	if(nameArea==undefined){
		nameArea="";
	}
	
	$.ajax({
		//http://192.168.1.52/tyw_api/public/appraisal_assignment/frequency_list
		url:restfulURL+"/tyw_api/public/appraisal_assignment/frequency_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			//var data=['ทดลองงาน','ประจำปี','รักษาการ'];
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['frequency_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['frequency_id']+">"+indexEntry['frequency_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['frequency_id']+">"+indexEntry['frequency_name']+"</option>";
					
				}
			});
			$("#periodFrequency"+nameArea).html(htmlOption);
		}
	});
	
	
}

var dropDrowAsignToFn = function(nameArea){


	if(nameArea==undefined){
		nameArea="";
	}
	
	$.ajax({
		url:restfulURL+"/tyw_api/public/appraisal_assignment/new_assign_to",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"appraisal_level_id":$("#embed_appraisal_level_id").val()},
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
			$("#assignTo"+nameArea).html(htmlOption);
		}
	});
}

var dropDrowActionFn = function(paramStageID,nameArea){



	if(nameArea==undefined){
		nameArea="";
	}
	
	$.ajax({
		url:restfulURL+"/tyw_api/public/appraisal_assignment/new_action_to",
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
			$("#actionAssign"+nameArea).html(htmlOption);
		}
	});
}




var periodFn = function(nameArea){
//	var data=['ทุกเดือน','ทุก 3 เดือน','ทุก 6 เดือน','ทุก 12 เดือน'];
//	var htmlOption="";
//	$.each(data,function(index,indexEntry){
//		htmlOption+="<option>"+indexEntry+"</option>";
//	});
//	$("#periodFrequency").html(htmlOption);

	
	if(nameArea==undefined){
		nameArea="";
	}
	
	$.ajax({
		//http://192.168.1.52/tyw_api/public/appraisal_assignment/period_list
		url:restfulURL+"/tyw_api/public/appraisal_assignment/period_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{
			"assignment_frequency":$("#assignFrequency").val(),
			"frequency_id":$("#periodFrequency").val()
		},
		success:function(data){
			//var data=['ทดลองงาน','ประจำปี','รักษาการ'];
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['period_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['period_id']+">"+indexEntry['appraisal_period_desc']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['period_id']+">"+indexEntry['appraisal_period_desc']+"</option>";
					
				}
			});
			$("#period"+nameArea).html(htmlOption);
		}
	});
}
//form2
var assignTemplateQualityFn = function(structureName,data){
	
	var htmlTemplateQuality="";
	htmlTemplateQuality+="";
	htmlTemplateQuality+="<div class=\"row\">";
	htmlTemplateQuality+="<div class=\"col-lg-12\">";
	htmlTemplateQuality+="<div class=\"ibox-title\">";

	
	htmlTemplateQuality+="<div class='titlePanel'>"+structureName+"</div>";
		htmlTemplateQuality+="<div class='totalWeight'>Total Weight "+data['total_weight']+"%</div>";
	htmlTemplateQuality+="</div>";
	htmlTemplateQuality+="<div class=\"ibox-content\">";
	htmlTemplateQuality+="<div class=\"table-responsive\">";
	htmlTemplateQuality+="<table id=\"tablethreshould\" class=\"table table-striped\">";
	htmlTemplateQuality+="<thead>";
		htmlTemplateQuality+="<tr>";
			htmlTemplateQuality+="<th style=\"width:3%\">Select</th>";
			htmlTemplateQuality+="<th style=\"width:67%\">Appraisal Item Name</th>";
			htmlTemplateQuality+="<th style=\"width:15%\">Target </th>";
			htmlTemplateQuality+="<th style=\"width:15%\">%Weight</th>  ";      
			htmlTemplateQuality+="</tr>";
				htmlTemplateQuality+="</thead>";
					htmlTemplateQuality+="<tbody id=\"listthreshould\">";
					
					$.each(data['items'],function(index,indexEntry){
					htmlTemplateQuality+="<tr>";
						htmlTemplateQuality+="<td class='object-center'><input id='id-"+indexEntry['appraisal_item_id']+"-"+indexEntry['structure_id']+"-checkbox' class='appraisalItem-checkbox' type='checkbox'></td>";
						htmlTemplateQuality+="<td style='padding-top:7px;'>"+indexEntry['appraisal_item_name']+"</td>";
						htmlTemplateQuality+="<td><input id='id-"+indexEntry['appraisal_item_id']+"-"+indexEntry['structure_id']+"-target' class='id-"+indexEntry['structure_id']+"-target input form-control input-sm-small' type='text'></td>";
						htmlTemplateQuality+="<td><input id='id-"+indexEntry['appraisal_item_id']+"-"+indexEntry['structure_id']+"-weight' class='id-"+indexEntry['structure_id']+"-weight input form-control input-sm-small' type='text'></td>";
					htmlTemplateQuality+="</tr>";
					});
					htmlTemplateQuality+="</tbody>";
					htmlTemplateQuality+="</table>";
					
					//htmlTemplateQuality+="<div class='formName hidden'>form2</div>";
					htmlTemplateQuality+="<input type='hidden' id='structure_id-"+data['structure_id']+"' class='structure_id' value="+data['structure_id']+">";
					htmlTemplateQuality+="<input type='hidden' id='form-"+data['structure_id']+"' class='' value=\"form2\">";
					
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
	htmlTemplateDeduct+="<div class=\"ibox-title\">";
	htmlTemplateDeduct+="<div class='titlePanel'>"+structureName+"</div>";
	htmlTemplateDeduct+="<div class='totalWeight'>Total Weight "+data['total_weight']+"%</div>";
	htmlTemplateDeduct+="</div>";
		
		htmlTemplateDeduct+="<div class=\"ibox-content\">";
		htmlTemplateDeduct+="<div class=\"table-responsive\">";
		htmlTemplateDeduct+="<table id=\"tablethreshould\" class=\"table table-striped\">";
              		
		htmlTemplateDeduct+="<thead>";
			htmlTemplateDeduct+="<tr>";
				htmlTemplateDeduct+="<th style=\"width:3%\">select</th>";
				htmlTemplateDeduct+="<th style=\"width:67%\">Appraisal Item Name</th>";
				htmlTemplateDeduct+="<th style=\"width:15%\">Max Value </th>";
				htmlTemplateDeduct+="<th style=\"width:15%\">Deduct Score/Unit </th>";
				htmlTemplateDeduct+="</tr>";
					htmlTemplateDeduct+="</thead>";
					htmlTemplateDeduct+="<tbody id=\"\">";
					
					$.each(data['items'],function(index,indexEntry){
					htmlTemplateDeduct+="<tr>";
							htmlTemplateDeduct+="<td class='object-center'><input id='id-"+indexEntry['appraisal_item_id']+"-"+indexEntry['structure_id']+"-checkbox' class='appraisalItem-checkbox' type='checkbox'></td>";
							htmlTemplateDeduct+="<td style='padding-top:7px;'>"+indexEntry['appraisal_item_name']+"</td>";
							htmlTemplateDeduct+="<td><input id='id-"+indexEntry['appraisal_item_id']+"-"+indexEntry['structure_id']+"-maxValue' class='id-"+indexEntry['structure_id']+"-maxValue  input form-control input-sm-small' type='text'></td>";
							htmlTemplateDeduct+="<td><input id='id-"+indexEntry['appraisal_item_id']+"-"+indexEntry['structure_id']+"-deductScoreUnit' class='id-"+indexEntry['structure_id']+"-deductScoreUnit  input form-control input-sm-small' type='text'></td>";
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
	htmlTemplateQuantity+="<div class=\"row\">";
	htmlTemplateQuantity+="	<div class=\"col-lg-12\">";
	htmlTemplateQuantity+="  <div class=\"ibox-title\">";
	
	htmlTemplateQuantity+="      <div class='titlePanel'>"+structureName+"</div>";
	htmlTemplateQuantity+="      <div class='totalWeight'>Total Weight "+data['total_weight']+"%</div>";
	htmlTemplateQuantity+="  </div>";
	htmlTemplateQuantity+="	<div class=\"ibox-content\">";
	htmlTemplateQuantity+=" <div class=\"table-responsive\">";
	htmlTemplateQuantity+="<table id=\"tableAppraisalAssignment\" class=\"table table-striped\">";
	htmlTemplateQuantity+="<thead>";
		htmlTemplateQuantity+="<tr>";
			htmlTemplateQuantity+="<th style=\"width:3%\" class=''>select</th>";
			htmlTemplateQuantity+="<th style=\"width:25%\" class=''>Appraisal Item Name</th>";
			htmlTemplateQuantity+="<th style=\"width:5%\" class=''>Target </th>";
			htmlTemplateQuantity+="<th style=\"width:5%\" class=''>Score1 S </th>";
			htmlTemplateQuantity+="<th style=\"width:5%\" class=''>Score1 E </th>";
			htmlTemplateQuantity+="<th style=\"width:5%\" class=''>Score2 S </th>";
			htmlTemplateQuantity+="<th style=\"width:5%\" class=''>Score2 E </th>";
			htmlTemplateQuantity+="<th style=\"width:5%\" class=''>Score3 S </th>";
			htmlTemplateQuantity+="<th style=\"width:5%\" class=''>Score3 E </th>";
			htmlTemplateQuantity+="<th style=\"width:5%\" class=''>Score4 S </th>";
			htmlTemplateQuantity+="<th style=\"width:5%\" class=''>Score4 E </th>";
			htmlTemplateQuantity+="<th style=\"width:5%\" class=''>Score5 S </th>";
			htmlTemplateQuantity+="<th style=\"width:5%\" class=''>Score5 E </th>";
			htmlTemplateQuantity+="<th style=\"width:5%;\" class=''>%Weight</th>";
			htmlTemplateQuantity+="</tr>";
			htmlTemplateQuantity+="</thead>";
			htmlTemplateQuantity+="<tbody id=\"\">";
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
				htmlTemplateQuantity+="<tr>";
					htmlTemplateQuantity+="<td class='object-center'><input id='id-"+indexEntry['appraisal_item_id']+"-"+indexEntry['structure_id']+"-checkbox' class='appraisalItem-checkbox' type='checkbox'></td>";
					htmlTemplateQuantity+="<td class='id-"+indexEntry['structure_id']+"-appraisal_item_name' id='id-"+indexEntry['appraisal_item_id']+"-"+indexEntry['structure_id']+"-appraisal_item_name' style='padding-top:7px;'>"+indexEntry['appraisal_item_name']+"</td>";
					htmlTemplateQuantity+="<td><input id='id-"+indexEntry['appraisal_item_id']+"-"+indexEntry['structure_id']+"-target' class='id-"+indexEntry['structure_id']+"-target input form-control input-sm-small' type='text'></td>";
					for(var i=1;i<=5;i++){
						if(i<=data['count']){
							htmlTemplateQuantity+="<td><input id='id-"+indexEntry['appraisal_item_id']+"-"+indexEntry['structure_id']+"-score_start-"+i+"' class='id-"+indexEntry['structure_id']+"-score_start-"+i+" input form-control input-sm-small' type='text'></td>";
							htmlTemplateQuantity+="<td><input id='id-"+indexEntry['appraisal_item_id']+"-"+indexEntry['structure_id']+"-score_end-"+i+"'  class='id-"+indexEntry['structure_id']+"-score_end-"+i+" input form-control input-sm-small' type='text'></td>";
						}else{
							htmlTemplateQuantity+="<td><input id='id-"+indexEntry['appraisal_item_id']+"-"+indexEntry['structure_id']+"-score_start-"+i+"'  disabled class='id-"+indexEntry['structure_id']+"-score_start-"+i+" input form-control input-sm-small' type='text'></td>";
							htmlTemplateQuantity+="<td><input id='id-"+indexEntry['appraisal_item_id']+"-"+indexEntry['structure_id']+"-score_end-"+i+"'  disabled class='id-"+indexEntry['structure_id']+"-score_end-"+i+" input form-control input-sm-small' type='text'></td>";
						}
					}
					htmlTemplateQuantity+="<td><input id='id-"+indexEntry['appraisal_item_id']+"-"+indexEntry['structure_id']+"-weight' class='id-"+indexEntry['structure_id']+"-weight input form-control input-sm-small' type='text'></td>";
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
var createTemplateAssignmentFn = function(data){
	$("#appraisal_template_area").empty();
	$.each(data['group'],function(index,indexEntry){
		//console.log(indexEntry['form_url']);
		
		if(indexEntry['form_url']=='quantity'){			
			$("#appraisal_template_area").append(assignTemplateQuantityFn(index,indexEntry));
		}else if(indexEntry['form_url']=='quality'){
			$("#appraisal_template_area").append(assignTemplateQualityFn(index,indexEntry));
		}else if(indexEntry['form_url']=='deduct'){
			$("#appraisal_template_area").append(assignTemplateDeductFn(index,indexEntry));
		}
		//console.log(index);
	});
};
var getTemplateFn = function(){
	$.ajax({
		//http://192.168.1.52/tyw_api/public/appraisal_assignment/period_list
		url:restfulURL+"/tyw_api/public/appraisal_assignment/template",
		type:"get",
		dataType:"json",
		async:false,
		//data:{'appraisal_level_id':$("#appraisalLevel").val()},
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			
			//console.log(data);
			createTemplateAssignmentFn(data);
			
		}
	});
};


/*#########################  Custom Function Data #######################*/


//Ready to call Function.
$(document).ready(function(){
	
	appraisalLevelListFn();
	appraisalTypeFn();
	periodFrequencyFn();
	
	//Auto complete Start
	//http://192.168.1.52/tyw_api/public/appraisal_assignment/auto_position_name
	$("#Position").autocomplete({
        source: function (request, response) {
        	$.ajax({
				 url:restfulURL+"/tyw_api/public/appraisal_assignment/auto_position_name",
				 type:"post",
				 dataType:"json",
				 headers:{Authorization:"Bearer "+tokenID.token},
				 data:{"position_name":request.term},
				 //async:false,
                 error: function (xhr, textStatus, errorThrown) {
                        console.log('Error: ' + xhr.responseText);
                    },
				 success:function(data){
						response($.map(data, function (item) {
                            return {
                                label: item.position_name,
                                value: item.position_name
                            };
                        }));
				},
				beforeSend:function(){
					$("body").mLoading('hide');	
				}
				
				});
        }
    });
	
	$("#empName").autocomplete({
        source: function (request, response) {
        	$.ajax({
				 url:restfulURL+"/tyw_api/public/appraisal_assignment/auto_employee_name",
				 type:"post",
				 dataType:"json",
				 headers:{Authorization:"Bearer "+tokenID.token},
				 data:{"emp_name":request.term},
				 //async:false,
                 error: function (xhr, textStatus, errorThrown) {
                        console.log('Error: ' + xhr.responseText);
                    },
				 success:function(data){
						response($.map(data, function (item) {
                            return {
                                label: item.emp_name,
                                value: item.emp_name
                            };
                        }));
				},
				beforeSend:function(){
					$("body").mLoading('hide');	
				}
				
				});
        }
    });
	
	
	//Auto Complete End
	
	//Search Start
	$("#btnSearchAdvance").click(function(){
		
		searchAdvanceFn();
		$(".search_result").show();
	});
	
	//btn assignment start
	$("#btnAssignment").click(function(){
		
		$(".embed_appraisal_id").remove();
		
			$.each($(".asign_emp").get(),function(index,indexEntry){
				if($(indexEntry).is(":checked")){
					empldoyees_code.push($(indexEntry).val());
				}
				
				
			});
		//console.log(empldoyees_code);
		if(empldoyees_code.length==0){
			callFlashSlide("Please choose Employee for Assignment.");
			return false;
		}else{
			getTemplateFn();
			dropDrowAsignToFn();
			$("#assignTo").off("change");
			$("#assignTo").change(function(){
				//alert($(this).val());
				dropDrowActionFn($(this).val());
				
			});
			$("#assignTo").change();
		}
		
		//check choose appraisal item start
		
		//click ที่ checkox Close แล้ว แยกไอดี ส่งไปฝัง(embed) 
		$(document).on("click",".appraisalItem-checkbox",function(){	
			//alert(this.id);
			if($(this).prop("checked")==true){
				embedParamCheckboxAppraisalItem(this.id);	
			}else{
				removeEmbedParamCheckboxAppraisalItem(this.id);
			}
		});

		
	});
	//btn assignment end
	//btn action assign start
		$("#btnSubmit").click(function(){
			//biding action assignment start
			actionAssignmentFn2();
			//biding action assignment end
		});
	//btn action assign end
		
	//embed emp_code
	
});
