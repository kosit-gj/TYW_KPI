
//Cleaning
var clearQuantityFormFn = function(){
	
	$("#informationQuantity").hide();
	$("#appraisalItemNameQuantity").val("");
	//$("#appraisalLevelQuantity").val("");
	$("#appraisalLevelQuantity option:first").attr('selected','selected');
	
	$("#perspectiveQuantity").val("");
	$("#baselineValueQuantity").val("");
	$("#uomQuantity").val("");
	$("#isActiveQuantity").prop("checked",false);
	$("#formulaDescriptionQuantity").val("");
	$("#structure_id_quantity").val("");
	
}
//List Data
var listDataQuantityFn = function(data) {
	var rows="";
	$.each(data,function(index,indexEntry){
		rows+="<tr>";
			rows+="<td>"+indexEntry[0]+"</td>";
			rows+="<td>"+indexEntry[1]+"</td>";
			rows+="<td>"+indexEntry[2]+"</td>";
			rows+="<td>"+indexEntry[3]+"</td>";
			rows+="<td>";
			rows+="	"+indexEntry[4]+"";
			rows+="</td>";
			rows+="<td><input type=\"checkbox\"></td>";
			rows+="<td style=\"text-align:center\">";
			rows+="<i title=\"\" data-original-title=\"\" class=\"fa fa-cog font-gear popover-edit-del\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\"&lt;button class='btn btn-warning btn-xs btn-gear edit' id=1 data-target=#addModalRule data-toggle='modal'&gt;Edit&lt;/button&gt;&nbsp;&lt;button id=1 class='btn btn-danger btn-xs btn-gear del'&gt;Delete&lt;/button&gt;\"></i>";
			rows+="</td>";
		rows+="	</tr>";
	});
	//alert(rows);
	$("#listQuantity").html(rows);
};
//Update
var updateQuantityFn  = function(){
	

	 var appraisal_item_name=$("#appraisalItemNameQuantity").val();
	 
	 var appraisal_item_id=$("#appraisalItemIdQuantity").val();
	 
	 var appraisal_level_id=$("#appraisalLevelQuantity").val();
	 var perspective_id=$("#perspectiveQuantity").val();
	 var structure_id=$("#structure_id_quantity").val();
	 var uom_id=$("#uomQuantity").val();
	 var baseline_value=$("#baselineValueQuantity").val();
	 var formula_desc=$("#formulaDescriptionQuantity").val();
	 var formula_cds_id="1";
	 var formula_cds_name="1";
	 var is_active="";
	 if($('#isActiveQuantity').prop('checked')==true){
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
		"perspective_id":perspective_id,
		"structure_id":structure_id,
		"uom_id":uom_id,
		"baseline_value":baseline_value,
		"formula_desc":formula_desc,
		"formula_cds_id":formula_cds_id,
		"formula_cds_name":formula_cds_name,
		"is_active":is_active,
		"form_id":"1"
		},
	    success:function(data,status){
		     if(data['status']=="200"){
				 $('#modal-quantity').modal('hide');
			     callFlashSlide("Update Successfully.");
				 getDataFn($("#pageNumber").val(),$("#rpp").val());
		      	//clearFn();
		     }else if(data['status']==400) {
				callFlashSlideInModal(validationFn(data),"#informationQuantity","error");
			 }
		   }
	   });
	
};
//Insert
var insertQuantityFn = function(param) {
	
	
	 var appraisal_item_name=$("#appraisalItemNameQuantity").val();
	 var appraisal_level_id=$("#appraisalLevelQuantity").val();
	 var perspective_id=$("#perspectiveQuantity").val();
	 var structure_id=$("#structure_id_quantity").val();
	 var uom_id=$("#uomQuantity").val();
	 var baseline_value=$("#baselineValueQuantity").val();
	 var formula_desc=$("#formulaDescriptionQuantity").val();
	 var formula_cds_id="1";
	 var formula_cds_name="1";
	 var is_active="";
	 if($('#isActiveQuantity').prop('checked')==true){
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
			 "perspective_id":perspective_id,
			 "structure_id":structure_id,
			 "uom_id":uom_id,
			 "baseline_value":baseline_value,
			 "formula_desc":formula_desc,
			 "formula_cds_id":formula_cds_id,
			 "formula_cds_name":formula_cds_name,
			 "is_active":is_active,
			 "form_id":"1"
		},
		success:function(data){
			//console.log(data);
			
			if(data['status']==200){
				if(param !="saveAndAnother"){
					   callFlashSlide("Insert Successfully.");
				       getDataFn();
				       clearQuantityFormFn();
				 	   $('#managementModal').modal('hide');
					}else{
						getDataFn();
						clearQuantityFormFn();
						callFlashSlideInModal("Insert Data is Successfully.","#informationQuantity");
					}
			}else if(data['status']==400){
			//	console.log(validationFn(data));
				callFlashSlideInModal(validationFn(data),"#informationQuantity","error");
			}
		}
	});
	
}


var cdsListFn = function(data){
	var cdsListHTML="";
	$.each(data['data'],function(index,indexEntry){
	//cds_id,cds_name
		cdsListHTML+="<tr>";
			cdsListHTML+="<td>"+indexEntry['cds_id']+"</td>";
			cdsListHTML+="<td>"+indexEntry['cds_name']+"</td>";
			cdsListHTML+="<td style=\"text-align:center\">";
			cdsListHTML+="<button class=\"btn btn-warning btn-xs btn-gear edit\" id=\"1\" >Sum</button>&nbsp;";
			cdsListHTML+="<button id=\"1\" class=\"btn btn-danger btn-xs btn-gear del\">Average</button>";
			cdsListHTML+="</td>";
		cdsListHTML+="</tr>";
	});
	$("#listCDS").html(cdsListHTML);
}
var cdsGetFn = function(page,rpp){
	/*
	embed_appraisal_level_quantity
	embed_cds_name_quantity
	*/
	var appraisal_level=$("#embed_appraisal_level_quantity").val();
	var cds_name=$("#embed_cds_name_quantity").val();
	$.ajax({
		url:restfulURL+"/tyw_api/public/appraisal_item/cds_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{
			
			"appraisal_level_id":1,
//			"cds_name":embed_cds_name_quantity,
//			"page":page,
//			"rpp":rpp
			},
		success:function(data){
			//console.log(data);
			cdsListFn(data);
		}
	});
}
var initailQuantityFormFn = function(action,structureId,structureName,data){
	
/*
appraisal_item_id
appraisal_item_name
appraisal_level_id
structure_id
perspective_id
uom_id
formula_desc
formula_cds_id
formula_cds_name
baseline_value
max_value
unit_deduct_score
is_active
created_by
created_dttm
updated_by
updated_dttm
structure_name
*/
	if(action=='edit'){
		clearQuantityFormFn();
		appraisalLevelListFn("Quantity",data['appraisal_level_id']);			
		perspectiveListFn("Quantity",data['perspective_id']);
		uomListFn("Quantity",data['uom_id']);
		$("#baselineValueQuantity").val(data['baseline_value']);
		$("#formulaDescriptionQuantity").val(data['formula_desc']);
		$("#appraisalItemNameQuantity").val(data['appraisal_item_name']);
		$("#formulaDescriptionQuantity").val(data['formula_cds_name']);
		
		if(data['is_active']==1){
			$("#isActiveQuantity").prop("checked",true);
		}else{
			$("#isActiveQuantity").prop("checked",false);
		}
		$("#appraisalItemIdQuantity").val(data['appraisal_item_id']);
		$("#actionQuantity").val("edit");
		$("#btnAddAnotherQuantity").hide();
		
		
		
		
		$("#baselineValueQuantity").keydown(function (e) {
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
		
		//set header
		$("#structure_id_quantity").val(structureId);
		$("#modalQuantityDescription").html("Add "+structureName);

		
		
		//Autocomplete Search Start.
		$("#cdsNameSearch").autocomplete({

	        source: function (request, response) {
	        	$.ajax({
					 url:restfulURL+"/tyw_api/public/cds/auto_cds",
					 type:"post",
					 dataType:"json",
					 headers:{Authorization:"Bearer "+tokenID.token},
					 data:{"cds_name":request.term,"appraisal_level_id":$("#appraisalLevel").val()},
					 //async:false,
	                 error: function (xhr, textStatus, errorThrown) {
	                        console.log('Error: ' + xhr.responseText);
	                    },
					 success:function(data){
							response($.map(data, function (item) {
	                            return {
	                                label: item.cds_name,
	                                value: item.cds_name
	                            };
	                        }));
					},
					beforeSend:function(){
						$("body").mLoading('hide');	
					}
					
					});
	        }
	    });
		//Autocomplete Search End
		appraisalLevelListFn("SearchQuantity");
		
	
	
		
	}else if(action=='add'){
		
		clearQuantityFormFn();
		appraisalLevelListFn("Quantity");			
		perspectiveListFn("Quantity");
		uomListFn("Quantity");
		$("#btnAddAnotherQuantity").show();
		//SEARCH
		//Autocomplete Search Start.
		
		
		//console.log($(objectStructureId).val());
		$("#structure_id_quantity").val(structureId);
		$("#modalQuantityDescription").html("Add "+structureName);
		
		$("#cdsNameSearch").autocomplete({

	        source: function (request, response) {
	        	$.ajax({
					 url:restfulURL+"/tyw_api/public/cds/auto_cds",
					 type:"post",
					 dataType:"json",
					 headers:{Authorization:"Bearer "+tokenID.token},
					 data:{"cds_name":request.term,"appraisal_level_id":$("#appraisalLevel").val()},
					 //async:false,
	                 error: function (xhr, textStatus, errorThrown) {
	                        console.log('Error: ' + xhr.responseText);
	                    },
					 success:function(data){
							response($.map(data, function (item) {
	                            return {
	                                label: item.cds_name,
	                                value: item.cds_name
	                            };
	                        }));
					},
					beforeSend:function(){
						$("body").mLoading('hide');	
					}
					
					});
	        }
	    });
		//Autocomplete Search End
		appraisalLevelListFn("SearchQuantity");
		
		//กำหนดค่า CIF ต้องเปนตัวเลข
		$("#baselineValueQuantity").keydown(function (e) {
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
		
		
		
	}
	
	
	
}
$(document).ready(function(){
//click modal quality start.
	$("button[data-target='#modal-quantity']").click(function(){
		
		var structureId=$(this).prev().prev().get();
		var structureName=$(this).prev().prev().prev().get();
		initailQuantityFormFn('add',$(structureId).val(),$(structureName).val());
		
	});
	
	
	//Search Quantity Start
	$("#SearchQuantity").click(function(){
		var embedParam="" +
				"<input type='hidden' class='param_quantity_form' id='embed_appraisal_level_quantity' name='embed_appraisal_level_quantity' value='"+$("#appraisalLevelSearchQuantity").val()+"'>" +
				"<input type='hidden' class='param_quantity_form' id='embed_cds_name_quantity' name='embed_cds_name_quantity' value='"+$("#cdsNameSearchQuantity").val()+"'>";
		$(".param_quantity_form").remove();
		$("#embedParamSearchQuantity").html(embedParam);
		cdsGetFn();
	});
	$("#SearchQuantity").click();
	
	//Search Quantity End
	
	//Submit Quantity Start
	$("#btnSubmitQuantity").click(function(){
		
		if($("#actionQuantity").val()=="add"){
			insertQuantityFn("saveOnly");
		}else{
			updateQuantityFn();
		}
		
		
	});
	$("#btnAddAnotherQuantity").click(function(){
		
		insertQuantityFn("saveAndAnother");
		
	});
	//Submit Quantity end
	//click modal quality end.
});