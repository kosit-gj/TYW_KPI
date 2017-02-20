/*#########################  Main Function Data #######################*/
var tokenID= eval("("+localStorage.getItem("tokenID")+")");
//Global variable
var globalData=[];
var empldoyees_code = [];



var validationAssignmentFn = function(data){

	var errorData="";
	var count=0;
	$.each(data['data'],function(index,indexEntry){
		
		if(index==0){
		
			errorData+="<b>"+indexEntry['appraisal_item_id']+" ";
			errorData+=indexEntry['appraisal_item_name']+"</b> ";
			
			$.each(indexEntry['data'],function(index2,indexEntry2){
				//errorData+=" "+index2;
				errorData+=" "+indexEntry2;
			});

		}else{
			errorData+="<br><b>"+indexEntry['appraisal_item_id']+"-";
			errorData+=indexEntry['appraisal_item_name']+"</b> ";
			
			$.each(indexEntry['data'],function(index2,indexEntry2){
				//errorData+=" "+index2;
				errorData+=" "+indexEntry2;
			});
		}


		
	
	});
	
	return errorData;
	
}


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
		$("body").append("<input type='hidden' class='embed_appraisal_id-"+structure_id+" embed_appraisal_id' id='embed_appraisal_id-"+appraisal_id+"-"+structure_id+"' name='embed_appraisal_id-"+appraisal_id+"-"+structure_id+"' value='"+appraisal_id+"'>");
	}else{
		
		$("body").append("<input type='hidden' class='embed_appraisal_id-"+structure_id+" embed_appraisal_id' id='embed_appraisal_id-"+appraisal_id+"-"+structure_id+"' name='embed_appraisal_id-"+appraisal_id+"-"+structure_id+"' value='"+appraisal_id+"'>");
	}
}
var setDataToTemplateFn = function(data){
	var head = data['head'][0]
	var data = data['data'];
	/*
	 
	employee_code
	section
	appraisal_type
	employee_name
	department
	period
	start_working_date
	chief_employee_code
	position
	chief_employee_name
	
	
	
	appraisal_period_desc
	appraisal_type_name
	chief_emp_code
	chief_emp_name
	department_name
	emp_code
	emp_name
	position_name
	section_name
	stage_id
	status
	working_start_date
	 */
	/*information start*/
	$("#employee_code").html(head['emp_code']);
	$("#section").html(head['section_name']);
	$("#appraisal_type").html(head['appraisal_type_name']);
	$("#employee_name").html(head['emp_name']);
	$("#department").html(head['department_name']);
	$("#period").html(head['period_id']);
	$("#start_working_date").html(head['working_start_date']);
	$("#chief_employee_code").html(head['chief_emp_code']);
	$("#position").html(head['position_name']);
	$("#chief_employee_name").html(head['chief_emp_name']);
	/*information end*/
	
	
	
	//get data assignTo and action for edit start

	dropDrowAsignToEditFn(head['stage_id']);
	$("#assignTo").change(function(){
		//alert($(this).val());
		dropDrowActionEditFn($(this).val());
		
	});
	$("#assignTo").change();
	//dropDrowActionEditFn(head['stage_id']);
			
	
	
	
	
	
//	dropDrowAsignToFn();
//	$("#assignTo").off("change");
//	$("#assignTo").change(function(){
//		//alert($(this).val());
//		dropDrowActionFn($(this).val());
//		
//	});
//	$("#assignTo").change();
	
	
/*
actual_value
appraisal_item_id
appraisal_item_name
appraisal_item_result_id
created_by
created_dttm
deduct_score_unit
emp_code
emp_result_id
max_value
over_value
period_id
score
score0_target_end
score0_target_start
score1_target_end
score1_target_start
score2_target_end
score2_target_start
score3_target_end
score3_target_start
score4_target_end
score4_target_start
score5_target_end
score5_target_start
target_value
updated_by
updated_dttm
weigh_score
weight_percent
*/
	$(".cus_information_area").show();
	$(".embed_appraisal_id").remove();
	$.each(data,function(index,indexEntry){
		
		//console.log(indexEntry['appraisal_item_id']);
		//mapping data start
		//form1
		$("#id-"+indexEntry['appraisal_item_id']+"-"+indexEntry['structure_id']+"-checkbox").prop("checked",true);
		$("#id-"+indexEntry['appraisal_item_id']+"-"+indexEntry['structure_id']+"-target").val(indexEntry['target_value']);
		$("#id-"+indexEntry['appraisal_item_id']+"-"+indexEntry['structure_id']+"-appraisal_item_result_id").val(indexEntry['appraisal_item_result_id']);
		$("#id-"+indexEntry['appraisal_item_id']+"-"+indexEntry['structure_id']+"-score_start-1").val(indexEntry['score1_target_start']);
		$("#id-"+indexEntry['appraisal_item_id']+"-"+indexEntry['structure_id']+"-score_end-1").val(indexEntry['score1_target_end']);
		
		$("#id-"+indexEntry['appraisal_item_id']+"-"+indexEntry['structure_id']+"-score_start-2").val(indexEntry['score2_target_start']);
		$("#id-"+indexEntry['appraisal_item_id']+"-"+indexEntry['structure_id']+"-score_end-2").val(indexEntry['score2_target_end']);
		
		$("#id-"+indexEntry['appraisal_item_id']+"-"+indexEntry['structure_id']+"-score_start-3").val(indexEntry['score3_target_start']);
		$("#id-"+indexEntry['appraisal_item_id']+"-"+indexEntry['structure_id']+"-score_end-3").val(indexEntry['score3_target_end']);
		
		$("#id-"+indexEntry['appraisal_item_id']+"-"+indexEntry['structure_id']+"-score_start-4").val(indexEntry['score4_target_start']);
		$("#id-"+indexEntry['appraisal_item_id']+"-"+indexEntry['structure_id']+"-score_end-4").val(indexEntry['score4_target_end']);
		
		$("#id-"+indexEntry['appraisal_item_id']+"-"+indexEntry['structure_id']+"-score_start-5").val(indexEntry['score5_target_start']);
		$("#id-"+indexEntry['appraisal_item_id']+"-"+indexEntry['structure_id']+"-score_end-5").val(indexEntry['score5_target_end']);
		
		$("#id-"+indexEntry['appraisal_item_id']+"-"+indexEntry['structure_id']+"-weight").val(indexEntry['weight_percent']);
		//form2
		
		//form3
		$("#id-"+indexEntry['appraisal_item_id']+"-"+indexEntry['structure_id']+"-maxValue").val(indexEntry['max_value']);
		$("#id-"+indexEntry['appraisal_item_id']+"-"+indexEntry['structure_id']+"-deductScoreUnit").val(indexEntry['deduct_score_unit']);
		
		
		//embedParamAppraisal for get updated.
		
		embedParamCheckboxAppraisalItem("id-"+indexEntry['appraisal_item_id']+"-"+indexEntry['structure_id']+"-checkbox");
		//mapping data end
		
		calculationGrandTotalDefaultFn();
		
	});
	
	//console.log($(".appraisalItem-checkbox").get());
	
//	$.each($(".appraisalItem-checkbox").get(),function(index,indexEntry2){
//		var appraisal_item_id="";
//		var structure_id="";
//		var data_id="";
//		data_id=$(indexEntry2).attr("id").split("-");
//		appraisal_item_id=data_id[1];
//		structure_id=data_id[2];
//		
//		
//		if(indexEntry['appraisal_item_id']==appraisal_item_id){
//			
//		}
//		console.log(appraisal_item_id);
//		console.log(structure_id);
//
//		
//	});
	
}

var findOneFn = function(id){
	//alert(id);
	
	
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
			//console.log(data['head'].length);
			if(data['head'].length>0){
				setDataToTemplateFn(data);
				$("#ModalAssignment").modal();
				$("#action").val("edit");
				$("#id").val(id);
				$("#btnAddAnother").hide();
			}else{
				callFlashSlide("Data is empty.");
				return false;
			}
			
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
						
			"appraisal_level_id":appraisal_level_id,
			"appraisal_type_id":appraisal_type_id,
			"period_id":period_id,
			"position_code":position_code,
			"emp_code":emp_code	
			
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
		htmlHTML+="  <td id='status-"+indexEntry['emp_code']+"'>"+indexEntry['status']+"</td>";
		htmlHTML+="  <td>"+indexEntry['emp_code']+"</td>";
		htmlHTML+="  <td>"+indexEntry['emp_name']+"</td>";
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
			$(".information").hide();
			
			if($("#status-"+id).text().trim()=="Unassigned"){
				callFlashSlide("Can't edit. because unassigned status.","error");
				$(this).parent().parent().parent().children().click();
			}else{
				findOneFn(id);
				$(this).parent().parent().parent().children().click();

			}
		});
	});	
	
};
//Update Assignment start
var actionUpdateAssignmentFn = function(){

	var countAppraisalItem=0;
	var appraisal_items=[];
	var appraisal_item1=[];
	var appraisal_item2=[];
	var appraisal_item3=[];
	


	//loop structure
	
	$.each($(".structure_id").get(),function(index,structureEntry){
		

		if($("#form-"+$(structureEntry).val()).val()=="form1"){

			$.each($(".embed_appraisal_id-"+$(structureEntry).val()).get(),function(index2,appraisalItemEntry){
				
				if(countAppraisalItem==0){
					appraisal_items+="{";	
				}else{
					appraisal_items+=",{";	
				}
				//nof_target_score
				
				appraisal_items+="\"appraisal_item_result_id\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-appraisal_item_result_id").val()+"\",";
				appraisal_items+="\"nof_target_score\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-nof_target_score").val()+"\",";
				appraisal_items+="\"form_id\":\"1\",";
				appraisal_items+="\"appraisal_item_id\":\""+$(appraisalItemEntry).val()+"\",";
				appraisal_items+="\"appraisal_item_name\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-appraisal_item_name").text()+"\",";
				appraisal_items+="\"target_value\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-target").val()+"\",";
				appraisal_items+="\"score1_target_start\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score_start-1").val()+"\",";
				appraisal_items+="\"score1_target_end\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score_end-1").val()+"\",";
				appraisal_items+="\"score2_target_start\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score_start-2").val()+"\",";
				appraisal_items+="\"score2_target_end\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score_end-2").val()+"\",";
				appraisal_items+="\"score3_target_start\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score_start-3").val()+"\",";
				appraisal_items+="\"score3_target_end\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score_end-3").val()+"\",";
				appraisal_items+="\"score4_target_start\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score_start-4").val()+"\",";
				appraisal_items+="\"score4_target_end\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score_end-4").val()+"\",";
				appraisal_items+="\"score5_target_start\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score_start-5").val()+"\",";
				appraisal_items+="\"score5_target_end\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score_end-5").val()+"\",";
				appraisal_items+="\"weight_percent\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-weight").val()+"\"";
				appraisal_items+="}";
				countAppraisalItem++;
			
			});

			
			
		}else if($("#form-"+$(structureEntry).val()).val()=="form2"){

			$.each($(".embed_appraisal_id-"+$(structureEntry).val()).get(),function(index2,appraisalItemEntry){
				if(countAppraisalItem==0){
					appraisal_items+="{";	
				}else{
					appraisal_items+=",{";	
				}
				//appraisal_items+="\"appraisal_item_result_id\":\"11\",";
				appraisal_items+="\"appraisal_item_result_id\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-appraisal_item_result_id").val()+"\",";
				appraisal_items+="\"appraisal_item_id\":\""+$(appraisalItemEntry).val()+"\",";
				appraisal_items+="\"appraisal_item_name\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-appraisal_item_name").text()+"\",";
				appraisal_items+="\"form_id\":\"2\",";
				appraisal_items+="\"target_value\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-target").val()+"\",";
				appraisal_items+="\"weight_percent\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-weight").val()+"\"";
			
				appraisal_items+="}";
				countAppraisalItem++;
			});
			
		}else if($("#form-"+$(structureEntry).val()).val()=="form3"){
			
			$.each($(".embed_appraisal_id-"+$(structureEntry).val()).get(),function(index2,appraisalItemEntry){
				
			
				if(countAppraisalItem==0){
					appraisal_items+="{";	
				}else{
					appraisal_items+=",{";	
				}
				//appraisal_items+="\"appraisal_item_result_id\":\"11\",";
				appraisal_items+="\"appraisal_item_result_id\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-appraisal_item_result_id").val()+"\",";
				appraisal_items+="\"appraisal_item_id\":\""+$(appraisalItemEntry).val()+"\",";
				appraisal_items+="\"appraisal_item_name\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-appraisal_item_name").text()+"\",";
				appraisal_items+="\"form_id\":\"3\",";
				appraisal_items+="\"max_value\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-maxValue").val()+"\",";
				appraisal_items+="\"deduct_score_unit\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-deductScoreUnit").val()+"\"";
			    appraisal_items+="}";
				
			    countAppraisalItem++;
				});
		}
	});
	




	var appraisal_itemsObj=eval("(["+appraisal_items+"])");
	//console.log(appraisal_itemsObj);
	
	$.ajax({
		url:restfulURL+"/tyw_api/public/appraisal_assignment/"+$("#id").val(),
		type:"PATCH",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		
		data:{"head_params":
			{
			"appraisal_type_id":$("#embed_appraisal_type_id").val(),
			"period_id":$("#assignTo").val(),
			"action_to":$("#actionAssign").val()
			},
			"appraisal_items":appraisal_itemsObj
		},
		success:function(data){
			
			console.log(data);
			if(data['status']==200){
				
				   //callFlashSlide("Updated."); 
				   callFlashSlideInModal("Updated","#information","error");      
			       getDataFn($("#pageNumber").val(),$("#rpp").val());
				   //$("#ModalAssignment").modal('hide');
				   $("#action").val("add");
				   
				   
			}else if(data['status']=="400"){
				
				callFlashSlideInModal(validationAssignmentFn(data),"#information","error");
				
				  
				
			}
			
		}
		
	});
	
};
//Update Assignment end

//Assignment Start
var actionAssignmentFn = function(param){
	
	var countAppraisalItem=0;
	var appraisal_items=[];

	var employees=[];
	
	var appraisal_item1=[];
	var appraisal_item2=[];
	var appraisal_item3=[];
	
	//get employees
	employees+="[";
	$.each(empldoyees_code,function(index,indexEntry){
		if(index==0){
			employees+="{";
		}else{
			employees+=",{";
		}
			employees+="\"emp_code\":\""+indexEntry+"\"";
		employees+="}";
		//employee.push({'emp_code':indexEntry});
	});
	employees+="]";
	
	        
	//loop structure
	$.each($(".structure_id").get(),function(index,structureEntry){
		//console.log($(indexEntry).val());
		//console.log($("#form-"+$(indexEntry).val()).val());
		
		
		if($("#form-"+$(structureEntry).val()).val()=="form1"){

			$.each($(".embed_appraisal_id-"+$(structureEntry).val()).get(),function(index2,appraisalItemEntry){
				
				if(countAppraisalItem==0){
					appraisal_items+="{";	
				}else{
					appraisal_items+=",{";	
				}
				//nof_target_score
				appraisal_items+="\"nof_target_score\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-nof_target_score").val()+"\",";
				appraisal_items+="\"form_id\":\"1\",";
				appraisal_items+="\"appraisal_item_id\":\""+$(appraisalItemEntry).val()+"\",";
				appraisal_items+="\"appraisal_item_name\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-appraisal_item_name").text()+"\",";
				appraisal_items+="\"target_value\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-target").val()+"\",";
				appraisal_items+="\"score1_target_start\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score_start-1").val()+"\",";
				appraisal_items+="\"score1_target_end\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score_end-1").val()+"\",";
				appraisal_items+="\"score2_target_start\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score_start-2").val()+"\",";
				appraisal_items+="\"score2_target_end\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score_end-2").val()+"\",";
				appraisal_items+="\"score3_target_start\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score_start-3").val()+"\",";
				appraisal_items+="\"score3_target_end\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score_end-3").val()+"\",";
				appraisal_items+="\"score4_target_start\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score_start-4").val()+"\",";
				appraisal_items+="\"score4_target_end\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score_end-4").val()+"\",";
				appraisal_items+="\"score5_target_start\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score_start-5").val()+"\",";
				appraisal_items+="\"score5_target_end\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score_end-5").val()+"\",";
				appraisal_items+="\"weight_percent\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-weight").val()+"\"";
				appraisal_items+="}";
				countAppraisalItem++;
			
			});

			
			
		}else if($("#form-"+$(structureEntry).val()).val()=="form2"){

			$.each($(".embed_appraisal_id-"+$(structureEntry).val()).get(),function(index2,appraisalItemEntry){
				if(countAppraisalItem==0){
					appraisal_items+="{";	
				}else{
					appraisal_items+=",{";	
				}
				//appraisal_items+="\"appraisal_item_result_id\":\"11\",";
				appraisal_items+="\"appraisal_item_id\":\""+$(appraisalItemEntry).val()+"\",";
				appraisal_items+="\"appraisal_item_name\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-appraisal_item_name").text()+"\",";
				appraisal_items+="\"form_id\":\"2\",";
				appraisal_items+="\"target_value\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-target").val()+"\",";
				appraisal_items+="\"weight_percent\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-weight").val()+"\"";
			
				appraisal_items+="}";
				countAppraisalItem++;
			});
			
		}else if($("#form-"+$(structureEntry).val()).val()=="form3"){
			
			$.each($(".embed_appraisal_id-"+$(structureEntry).val()).get(),function(index2,appraisalItemEntry){
				
			
				if(countAppraisalItem==0){
					appraisal_items+="{";	
				}else{
					appraisal_items+=",{";	
				}
				//appraisal_items+="\"appraisal_item_result_id\":\"11\",";
				appraisal_items+="\"appraisal_item_id\":\""+$(appraisalItemEntry).val()+"\",";
				appraisal_items+="\"appraisal_item_name\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-appraisal_item_name").text()+"\",";
				appraisal_items+="\"form_id\":\"3\",";
				appraisal_items+="\"max_value\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-maxValue").val()+"\",";
				appraisal_items+="\"deduct_score_unit\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-deductScoreUnit").val()+"\"";
			    appraisal_items+="}";
				
			    countAppraisalItem++;
				});
		}
	});
	




	var employeesObj=eval("("+employees+")");
	var appraisal_itemsObj=eval("(["+appraisal_items+"])");
	$.ajax({
		url:restfulURL+"/tyw_api/public/appraisal_assignment",
		type:"post",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		
		data:{"head_params":
			{
			"appraisal_type_id":$("#embed_appraisal_type_id").val(),
			"period_id":$("#assignTo").val(),
			"action_to":$("#actionAssign").val()
			},
			"employees": employeesObj,
			"appraisal_items":appraisal_itemsObj
		},
		success:function(data){
			
			//console.log(data);
			if(data['status']==200){
				
				   
				   
				   if(param !="saveAndAnother"){
					   callFlashSlide("Insert Successfully.");
				       getDataFn($("#pageNumber").val(),$("#rpp").val());
					   $("#ModalAssignment").modal('hide');
					   $("#action").val("add");		 	    
					}else{
						
						getDataFn($("#pageNumber").val(),$("#rpp").val());
						callFlashSlideInModal("Insert Data is Successfully.","#information");
						$("#action").val("add");
						
					}
				   
				   
			}else if(data['status']=="400"){
				//callFlashSlideInModal(validationFn(data),"#information","error");  
				callFlashSlideInModal(validationAssignmentFn(data),"#information","error");  
				
				
			}
			
		}
		
	});
	
	
	
}

//SearchAdvance
var searchAdvanceFn = function() {
	/*
	appraisal_level_id,
	appraisal_type_id,
	period_id,
	position_code,
	emp_code,


	*/
	var Position= $("#Position").val().split("-");
	Position=Position[0];
	$(".embed_param_search").remove();
	var embedParam="";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_appraisal_level_id' name='embed_appraisal_level_id' value='"+$("#appraisalLevel").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_appraisal_type_id' name='embed_appraisal_type_id' value='"+$("#appraisalType").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_period_id' name='embed_period_id' value='"+$("#periodFrequency").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_position_code' name='embed_position_code' value='"+Position+"'>";
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


var appraisalTypeFn = function(nameArea,id){
	
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
			$("#actionAssign").html(htmlOption);
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
	htmlTemplateQuality+="<div class=\"ibox-title2\">";

	
	htmlTemplateQuality+="<div class='titlePanel'>"+structureName+"</div>";
		htmlTemplateQuality+="<div class='totalWeight'>Total Weight "+data['total_weight']+"%</div>";
	htmlTemplateQuality+="</div>";
	htmlTemplateQuality+="<div class=\"ibox-content\">";
	htmlTemplateQuality+="<div class=\"table-responsive scrollbar-inner\">";
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
						htmlTemplateQuality+="<td style='padding-top:7px;' id='id-"+indexEntry['appraisal_item_id']+"-"+indexEntry['structure_id']+"-appraisal_item_name' class='id-"+indexEntry['structure_id']+"-appraisal_item_name'>"+indexEntry['appraisal_item_name']+"</td>";
						htmlTemplateQuality+="<td><input id='id-"+indexEntry['appraisal_item_id']+"-"+indexEntry['structure_id']+"-target' class='id-"+indexEntry['structure_id']+"-target input form-control input-sm-small numberOnly' type='text'></td>";
						htmlTemplateQuality+="<td><input id='id-"+indexEntry['appraisal_item_id']+"-"+indexEntry['structure_id']+"-weight' class='id-"+indexEntry['structure_id']+"-weight weight_sum input form-control input-sm-small numberOnly' type='text'></td>";
						htmlTemplateQuality+="<input id='id-"+indexEntry['appraisal_item_id']+"-"+indexEntry['structure_id']+"-appraisal_item_result_id' class='id-"+indexEntry['structure_id']+"-appraisal_item_result_id input form-control input-sm-small numberOnly' type='hidden' value=\"\">";
						
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
	htmlTemplateDeduct+="<div class=\"ibox-title2\">";
	htmlTemplateDeduct+="<div class='titlePanel'>"+structureName+"</div>";
	htmlTemplateDeduct+="<div class='totalWeight'>Total Weight "+data['total_weight']+"%</div>";
	htmlTemplateDeduct+="</div>";
		
		htmlTemplateDeduct+="<div class=\"ibox-content\">";
		htmlTemplateDeduct+="<div class=\"table-responsive scrollbar-inner\">";
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
							htmlTemplateDeduct+="<td style='padding-top:7px;' id='id-"+indexEntry['appraisal_item_id']+"-"+indexEntry['structure_id']+"-appraisal_item_name' class='id-"+indexEntry['structure_id']+"-appraisal_item_name'>"+indexEntry['appraisal_item_name']+"</td>";
							htmlTemplateDeduct+="<td><input id='id-"+indexEntry['appraisal_item_id']+"-"+indexEntry['structure_id']+"-maxValue' class='id-"+indexEntry['structure_id']+"-maxValue  input form-control input-sm-small numberOnly' type='text'></td>";
							htmlTemplateDeduct+="<td><input id='id-"+indexEntry['appraisal_item_id']+"-"+indexEntry['structure_id']+"-deductScoreUnit' class='id-"+indexEntry['structure_id']+"-deductScoreUnit  input form-control input-sm-small numberOnly' type='text'></td>";
							htmlTemplateDeduct+="<input id='id-"+indexEntry['appraisal_item_id']+"-"+indexEntry['structure_id']+"-appraisal_item_result_id' class='id-"+indexEntry['structure_id']+"-appraisal_item_result_id input form-control input-sm-small numberOnly' type='hidden' value=\"\">";
							
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
	htmlTemplateQuantity+="  <div class=\"ibox-title2\">";
	
	htmlTemplateQuantity+="      <div class='titlePanel'>"+structureName+"</div>";
	htmlTemplateQuantity+="      <div class='totalWeight'>Total Weight "+data['total_weight']+"%</div>";
	htmlTemplateQuantity+="  </div>";
	htmlTemplateQuantity+="	<div class=\"ibox-content\">";
	htmlTemplateQuantity+=" <div class=\"table-responsive scrollbar-inner\">";
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
					htmlTemplateQuantity+="<td><input id='id-"+indexEntry['appraisal_item_id']+"-"+indexEntry['structure_id']+"-target' class='id-"+indexEntry['structure_id']+"-target input form-control input-sm-small numberOnly' type='text'>";
					htmlTemplateQuantity+="<input id='id-"+indexEntry['appraisal_item_id']+"-"+indexEntry['structure_id']+"-nof_target_score' class='id-"+indexEntry['structure_id']+"-nof_target_score input form-control input-sm-small numberOnly' type='hidden' value="+indexEntry['nof_target_score']+">";
					htmlTemplateQuantity+="<input id='id-"+indexEntry['appraisal_item_id']+"-"+indexEntry['structure_id']+"-appraisal_item_result_id' class='id-"+indexEntry['structure_id']+"-appraisal_item_result_id input form-control input-sm-small numberOnly' type='hidden' value=\"\">";
					htmlTemplateQuantity+="</td>";
					for(var i=1;i<=5;i++){
						if(i<=data['nof_target_score']){
							htmlTemplateQuantity+="<td><input id='id-"+indexEntry['appraisal_item_id']+"-"+indexEntry['structure_id']+"-score_start-"+i+"' class='id-"+indexEntry['structure_id']+"-score_start-"+i+" input form-control input-sm-small numberOnly' type='text'></td>";
							htmlTemplateQuantity+="<td><input id='id-"+indexEntry['appraisal_item_id']+"-"+indexEntry['structure_id']+"-score_end-"+i+"'  class='id-"+indexEntry['structure_id']+"-score_end-"+i+" input form-control input-sm-small numberOnly' type='text'></td>";
						}else{
							htmlTemplateQuantity+="<td><input id='id-"+indexEntry['appraisal_item_id']+"-"+indexEntry['structure_id']+"-score_start-"+i+"'  disabled class='id-"+indexEntry['structure_id']+"-score_start-"+i+" input form-control input-sm-small numberOnly' type='text'></td>";
							htmlTemplateQuantity+="<td><input id='id-"+indexEntry['appraisal_item_id']+"-"+indexEntry['structure_id']+"-score_end-"+i+"'  disabled class='id-"+indexEntry['structure_id']+"-score_end-"+i+" input form-control input-sm-small numberOnly' type='text'></td>";
						}
					}
					htmlTemplateQuantity+="<td><input id='id-"+indexEntry['appraisal_item_id']+"-"+indexEntry['structure_id']+"-weight' class='id-"+indexEntry['structure_id']+"-weight weight_sum input form-control input-sm-small numberOnly' type='text'></td>";
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
var calculationGrandTotalDefaultFn = function(id){
	
	var grandTotalWieght=0;
	$.each($(".weight_sum").get(),function(index,indexEntry){
		
		
		if($(indexEntry).val().trim()!=""){
			grandTotalWieght+=(parseInt($(indexEntry).val()));
			//alert(grandTotalWieght);
			$("#crandTotalWeight").html(grandTotalWieght);
		}
		
	});
}
var calculationGrandTotalFn = function(id){
	
	var grandTotalWieght=0;
	$.each($(".weight_sum").get(),function(index,indexEntry){
		
		var dataId=id.split("-");;
		var apprailsal_item_id=dataId[1];
		var structure_id=dataId[2];
		if($(indexEntry).val().trim()!="" && $("#id-"+apprailsal_item_id+"-"+structure_id+"-checkbox").prop("checked")==true){
			grandTotalWieght+=(parseInt($(indexEntry).val()));
			//alert(grandTotalWieght);
			$("#crandTotalWeight").html(grandTotalWieght);
		}
		
	});
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
		
		//$('.scrollbar-inner').scrollbar();
	    $('.scrollbar-inner').slimScroll({
	        height: '200px',
	        alwaysVisible: true,
	        railVisible: true
	    });
		//console.log(index);
	});
	//sum grand total start
	
	$(".weight_sum").keyup(function(){
		calculationGrandTotalFn(this.id);
	})
	$(".appraisalItem-checkbox").click(function(){
		calculationGrandTotalFn(this.id);
	})
	
	//sum grand total end
	
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
	
	//Number Only Text Fields.
	$(document).on("keydown",".numberOnly",function(e){	
	//$(".numberOnly").keydown(function (e) {
		        // Allow: backspace, delete, tab, escape, enter and .
			
		        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
		             // Allow: Ctrl+A, Command+A
		            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
		             // Allow: home, end, left, right, down, up
		            (e.keyCode >= 35 && e.keyCode <= 40)) {
		                 // let it happen, don't do anything
		                 return;
		        }
		        // Ensure that it is a number and stop the keypress
		        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
		            e.preventDefault();
		        }
		});
	
	
	
	appraisalLevelListFn();
	appraisalTypeFn('','1');
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
		
		$(".information").hide();
		$("#btnAddAnother").show();
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
			$(".cus_information_area").hide();
			$("#action").val("add");
			getTemplateFn();
			dropDrowAsignToFn();
			
			$("#assignTo").off("change");
			$("#assignTo").change(function(){
				//alert($(this).val());
				dropDrowActionFn($(this).val());
				
			});
			$("#assignTo").change();
		}
		

		
	});
	//btn assignment end
	//btn action assign start
		$("#btnSubmit").click(function(){
			
			if($(".embed_appraisal_id").get().length>0){
				if($("#action").val()=="add"){
					actionAssignmentFn("saveOnly");
				}else{
					actionUpdateAssignmentFn();
				}
			}else{
				callFlashSlideInModal("Please choose Appraisal item ID.","#information","error");
			}
			
		});
		$(document).on("click","#btnAddAnother",function(){
			if($(".embed_appraisal_id").get().length>0){
				actionAssignmentFn("saveAndAnother");	
			}else{
				callFlashSlideInModal("Please choose Appraisal item ID.","#information","error");
			}
		});
	//btn action assign end
		
	//embed emp_code
		

		//check choose appraisal item start
		
		$(document).on("click",".appraisalItem-checkbox",function(){	
			
			if($(this).prop("checked")==true){
				embedParamCheckboxAppraisalItem(this.id);	
			}else{
				removeEmbedParamCheckboxAppraisalItem(this.id);
			}
		});
	
});
