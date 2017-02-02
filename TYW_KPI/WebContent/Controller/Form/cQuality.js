
//Cleaning
var clearQualityFormFn = function(){
	
	$("#informationQuality").hide();
	$("#appraisalItemNameQuality").val("");
	//$("#appraisalLevelQuality").val("");
	$("#appraisalLevelQuality option:first").attr('selected','selected');
	$("#isActiveQuality").prop("checked",false);
	//$("#structure_id_quality").val("");
	
}

//Update
var updateQualityFn  = function(){
	

	 var appraisal_item_name=$("#appraisalItemNameQuality").val();
	 var appraisal_item_id=$("#appraisalItemIdQuality").val();
	 var appraisal_level_id=$("#appraisalLevelQuality").val();
	 var structure_id=$("#structure_id_quality").val();
	 
	 var is_active="";
	 if($('#isActiveQuality').prop('checked')==true){
		 is_active=1;
	 }else{
		 is_active=0;
	 }
	 
	 $.ajax({
	    url:restfulURL+"/tyw_api/public/appraisal_item/"+appraisal_item_id,
	    type:"PATCH",
	    dataType:"json",
	    headers:{Authorization:"Bearer "+tokenID.token},
	    data:{
		"appraisal_item_name":appraisal_item_name,
		 "appraisal_level_id":appraisal_level_id,
		 "structure_id":structure_id,
		 "is_active":is_active,
		 "form_id":"2"
		},
	    success:function(data,status){
		     if(data['status']=="200"){
				 $('#modal-quality').modal('hide');
			     callFlashSlide("Update Successfully.");
				 getDataFn($("#pageNumber").val(),$("#rpp").val());
		      	//clearFn();
		     }else if(data['status']==400) {
				callFlashSlideInModal(validationFn(data),"#informationQuality","error");
			 }
		   }
	   });
	
};
//Insert
var insertQualityFn = function(param) {
	
	
	 var appraisal_item_name=$("#appraisalItemNameQuality").val();
	 var appraisal_level_id=$("#appraisalLevelQuality").val();
	 var structure_id=$("#structure_id_quality").val();
	 var is_active="";
	 if($('#isActiveQuality').prop('checked')==true){
		 is_active=1;
	 }else{
		 is_active=0;
	 }

	$.ajax({
		url:restfulURL+"/tyw_api/public/appraisal_item",
		type:"post",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{
			 "appraisal_item_name":appraisal_item_name,
			 "appraisal_level_id":appraisal_level_id,
			 "structure_id":structure_id,
			 "is_active":is_active,
			 "form_id":"2"
		},
		success:function(data){
			//console.log(data);
			
			if(data['status']==200){
				if(param !="saveAndAnother"){
					   callFlashSlide("Insert Successfully.");
				       getDataFn();
				       clearQualityFormFn();
				 	   $('#modal-quality').modal('hide');
					}else{
						getDataFn();
						clearQualityFormFn();
						callFlashSlideInModal("Insert Data is Successfully.","#informationQuality");
					}
			}else if(data['status']==400){
			//	console.log(validationFn(data));
				callFlashSlideInModal(validationFn(data),"#informationQuality","error");
			}
		}
	});
	
}


var initailQualityFormFn = function(action,structureId,structureName,data){

/*
appraisal_item_name,
appraisal_level_id,
structure_id,
is_active
*/
	if(action=='edit'){
		clearQualityFormFn();
		appraisalLevelListFn("Quality",data['appraisal_level_id']);			
		$("#appraisalItemNameQuality").val(data['appraisal_item_name']);
		$("#appraisalItemIdQuality").val(data['appraisal_item_id']);
		

		if(data['is_active']==1){
			$("#isActiveQuality").prop("checked",true);
		}else{
			$("#isActiveQuality").prop("checked",false);
		}
		$("#actionQuality").val("edit");
		$("#btnAddAnotherQuality").hide();

		//set header
		$("#structure_id_quality").val(structureId);
		$("#modalQualityDescription").html("Edit "+structureName);

		
		
		
		
		
	
	
		
	}else if(action=='add'){
		/*
		appraisal_item_name,
		appraisal_level_id,
		structure_id,
		is_active
		*/	
		clearQualityFormFn();
		appraisalLevelListFn("Quality");	
		$("#btnAddAnotherQuality").show();

		//set header
		$("#structure_id_quality").val(structureId);
		$("#modalQualityDescription").html("Add "+structureName);
		
	}
}
$(document).ready(function(){
//click modal quality start.
	
	$("button[data-target='#modal-quality']").click(function(){
		
		var structureId=$(this).prev().prev().get();
		var structureName=$(this).prev().prev().prev().get();
		initailQualityFormFn('add',$(structureId).val(),$(structureName).val());
		
	});
	
	
	//Search Quality Start
	$("#SearchQuality").click(function(){
		var embedParam="" +
				"<input type='hidden' class='param_quality_form' id='embed_appraisal_level_quality' name='embed_appraisal_level_quality' value='"+$("#appraisalLevelSearchQuality").val()+"'>" +
				"<input type='hidden' class='param_quality_form' id='embed_cds_name_quality' name='embed_cds_name_quality' value='"+$("#cdsNameSearchQuality").val()+"'>";
		$(".param_quality_form").remove();
		$("#embedParamSearchQuality").html(embedParam);
		cdsGetFn();
	});
	$("#SearchQuality").click();
	
	//Search Quality End
	
	//Submit Quality Start
	$("#btnSubmitQuality").click(function(){
		
		if($("#actionQuality").val()=="add"){
			insertQualityFn("saveOnly");
		}else{
			updateQualityFn();
		}
		
	});
	$("#btnAddAnotherQuality").click(function(){
		
		insertQualityFn("saveAndAnother");
		
	});
	//Submit Quality end
	//click modal quality end.
});