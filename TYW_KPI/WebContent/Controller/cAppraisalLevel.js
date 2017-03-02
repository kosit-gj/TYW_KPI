var restfulPathAppraisalLevel="/tyw_api/public/appraisal_level";


//Check Validation
var validationFn = function(data,id){
	var validate = "";
	var count = 0;
	$.each(data['data'], function(index, indexEntry) {

		if (index != undefined) {
			if (count == 0) {
				validate += "<font color='red'>* </font>" + indexEntry + "";
			} else {
				validate += "<br><font color='red'>* </font> " + indexEntry + " ";
			}
		}

		count++;
	});
	
	callFlashSlideInModal(validate,id,"error");
};	
//--------  GetData Start
var getDataFn = function(page,rpp){
	//alert("Page : "+page+" - Rpp : "+rpp);

	$.ajax({
		url : restfulURL+restfulPathAppraisalLevel,
		type : "get",
		dataType : "json",
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,// w8 data 
		success : function(data) {
			listAppraisalLevel(data);
		}
	});
	
	
};
//--------  GetData End

//--------  Clear Start 
var clearFn = function() {
	
	
	$("#modalDescription").html("Add Appraisal Level");
	$("#appraisal_level_name").val("");
	
	
	$("#checkbox_is_employee").prop("checked",false);
	$("#checkbox_is_active").prop("checked",false);
	
	
	$(".btnModalClose").click();
	$("#action").val("add");
	$("#btnSubmit").val("Add");

}
//--------  Clear End

//-------- findOne
var findOneFn = function(id) {
	$.ajax({
		url:restfulURL+restfulPathAppraisalLevel+"/"+id,
		type : "get",
		dataType : "json",
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {		
	
			$("#appraisal_level_name").val(data['appraisal_level_name']);

			//IsSQL
			if(data['is_all_employee']==1){
				$('#checkbox_is_employee').prop('checked', true);
			}else{
				$('#checkbox_is_employee').prop('checked', false);
			}
			
			//IsAction
			if(data['is_active']==1){
				$('#checkbox_is_active').prop('checked', true);
			}else{
				$('#checkbox_is_active').prop('checked', false);
			}


		}
	});
};
//--------- findOne


//--------  ListData  Start

var listAppraisalLevel = function(data) {
	//alert("listCommonDataSetFn");
	var htmlTable = "";
	var ViewAllEmployee ="";
	var IsActive ="";
	$.each(data,function(index,indexEntry) {
		
		if (indexEntry["is_all_employee"]== "1"){
			ViewAllEmployee ="<input disabled type=\"checkbox\"  value=\"1\" checked>";
		}else if (indexEntry["is_all_employee"]== "0"){
			ViewAllEmployee ="<input disabled type=\"checkbox\"  value=\"0\">";
		}
		if (indexEntry["is_active"]=="1"){
			IsActive ="<input disabled type=\"checkbox\"  value=\"1\" checked>";
		}else if (indexEntry["is_active"]=="0"){
			IsActive ="<input disabled type=\"checkbox\"  value=\"0\" >";
		}
		htmlTable += "<tr class='rowSearch'>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\">"+ indexEntry["appraisal_level_name"]+ "</td>";
		htmlTable += "<td id=\"objectCenter\" >"+ViewAllEmployee+"</td>";
		htmlTable += "<td id=\"objectCenter\" >"+IsActive+"</td>";
		
		htmlTable += "<td id=\"objectCenter\" style=\"vertical-align: middle;\"><i class=\"fa fa-cog font-gear popover-edit-del\" data-trigger=\"focus\" tabindex=\""+index+"\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\" " +
		"<button class='btn  btn-success btn-xs btn-gear criteria' id="+ indexEntry["appraisal_level_id"]+ " data-target=#ModalCriteria data-toggle='modal'>Criteria</button>&nbsp;" +
		"<button class='btn btn-warning btn-xs btn-gear edit' id="+ indexEntry["appraisal_level_id"]+ " data-target=#ModalLevel data-toggle='modal'>Edit</button>&nbsp;" +
        "<button id="+indexEntry["appraisal_level_id"]+" class='btn btn-danger btn-xs btn-gear del'>Delete</button>\"></i></td>";
htmlTable += "</tr>";
	});
	//alert("ผ่าน");
	$("#listAppraisalLevel").html(htmlTable);
//	$("#tableCommonDataSet_wrapper").click(function(){
//		$(".popover-edit-del").popover();
//	});
	
	//function popover
	$(".popover-edit-del").popover();
	
	$("#tableAppraisalLevel").off("click",".popover-edit-del");
	$("#tableAppraisalLevel").on("click",".popover-edit-del",function(){
		
			$(".edit").on("click",function() {
			clearFn();
			$("#modalTitleAppraisalLevel").html("Appraisal Level");
			$("#modalDescription").html("Edit Appraisal Level");
			
			$(this).parent().parent().parent().children().click();
			//alert($(this).parent().parent().parent().children().click());
			$("#btnAddAnother").hide();
			//$("#txt_sample_data").attr("disabled","disabled"); 
			
			findOneFn(this.id);
			//alert($("#checkbox_is_sql:checked").is(":checked"));
			
			$("#id").val(this.id);
			$("#action").val("edit");
			$("#btnSubmit").val("Edit");		
			
			
		});
			
			$(".criteria").on("click",function() {
				
				
				$(this).parent().parent().parent().children().click();
				//alert($(this).parent().parent().parent().children().click());
				$("#ac_appraisal_level_name").html($(this).parent().parent().parent().prev().prev().prev().text());
				$("#btnAddAnother").hide();
				//$("#txt_sample_data").attr("disabled","disabled"); 
				clearFn();
				listAppraisalCriteria(this.id);
				
				$("#id").val(this.id);
				$("#action").val("edit");
				$("#btnSubmit").val("Edit");		
				
				
			});
		
		
		$(".del").on("click",function(){
			var id = this.id;
			$(this).parent().parent().parent().children().click();
			 
			$("#confrimModal").modal();
			$(document).off("click","#btnConfirmOK");
			$(document).on("click","#btnConfirmOK",function(){
			
				$.ajax({
					 url:restfulURL+restfulPathAppraisalLevel+"/"+id,
					 type : "delete",
					 dataType:"json",
					 headers:{Authorization:"Bearer "+tokenID.token},
					success:function(data){    
				    	 
					     if(data['status']==200){
					    	 
					       callFlashSlide("Delete Successfully.");  
					       getDataFn();
					       clearFn();
					       $("#confrimModal").modal('hide');
					       
					     }else if (data['status'] == "400"){
					    	 $("#confrimModal").modal('hide');
					    	 callFlashSlide(data['data']);
					    	}
					 }
				});
				
			});
			
		});	
		
	});
	
	
}

// --------  ListData  End

//--------  ListData  Start

var listAppraisalCriteria = function(id) {
	htmlTable="";
	weight_percent="";
	
	$.ajax({ 
		url:restfulURL+restfulPathAppraisalLevel+"/"+id+"/criteria",
		type : "get",
		dataType : "json",
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
			$.each(data,function(index,indexEntry) { 
				//console.log(data[index]["weight_percent"]);
				if(data[index]["weight_percent"] == null){
					weight_percent="0.00";
				}else{
					weight_percent=data[index]["weight_percent"];
				};
				htmlTable+="<tr>";
//				htmlTable+="	<td>";
//				htmlTable+="		<input  id=\"form_structure_item-"+data[index]["structure_id"]+"\" class=\"from_data_structure\"";
//				htmlTable+="		type='checkbox' value=\""+data[index]["structure_id"]+"\">";
//				htmlTable+="	</td>";
				htmlTable+="	<td style=\"vertical-align:middle\">";
				htmlTable+=			data[index]["structure_name"];
				htmlTable+="	</td>";
				htmlTable+="	<td style=\"vertical-align:middle\" >";
				htmlTable+="		<input onkeydown='return ( event.ctrlKey || event.altKey || (47<event.keyCode && event.keyCode<58 && event.shiftKey==false) || (95<event.keyCode && event.keyCode<106) || (event.keyCode==8) || (event.keyCode==9) || (event.keyCode>34 && event.keyCode<40) || (event.keyCode==46)|| (event.keyCode==110)|| (event.keyCode==190))' style='margin-bottom: 0px;' class=\"span1 from_data_weight numberOnly\" type='text'  id=\""+data[index]["structure_id"]+"\" value=\""+weight_percent+"\" />";
				htmlTable+="	</td>";
				htmlTable+="</tr>";
					
				 
			});
			$("#formListAppraisalCriteria").html(htmlTable);
								
		}
	});
}
//--------  ListData  End
//--------  Insert  Start
var insertFn = function (param) {
	 var checkboxEmployee = "";
	 var checkboxIsActive = "";
	 
	if($("#checkbox_is_employee:checked").is(":checked")){
		checkboxEmployee="1";
	}else{
		checkboxEmployee="0";
	}
	if($("#checkbox_is_active:checked").is(":checked")){
		checkboxIsActive="1";
	}else{
		checkboxIsActive="0";
	}
	
	$.ajax({
		url:restfulURL+restfulPathAppraisalLevel,
		type : "POST",
		dataType : "json",
		data : {
			"appraisal_level_name":$("#appraisal_level_name").val(),
			"is_all_employee":checkboxEmployee,
			"is_active":checkboxIsActive
		},	
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
			if (data['status'] == "200") {
				 
				   if(param !="saveAndAnother"){
					   //alert("!saveAndAnother" );
					   callFlashSlide("Insert Successfully.");
				       getDataFn();
				       clearFn();
				 	   $('#ModalLevel').modal('hide');
					}else{
						//alert("saveAndAnother" );
						getDataFn();
						clearFn();
						$("#checkbox_is_active").prop("checked",true);
						callFlashSlideInModal("Insert Data is Successfully.");
					}
			}else if (data['status'] == "400") {
				//alert("Error ?");
				validationFn(data,"#information");
			}  
				   
				   
			
		}
	});
	
	

	
}

//--------  Insert  End

//--------  Update  Start
var updateFn = function (param) {
	 var checkboxEmployee = "";
	 var checkboxIsActive = "";
	 
	if($("#checkbox_is_employee:checked").is(":checked")){
		
		checkboxEmployee="1";
	}else{
		
		checkboxEmployee="0";
	}
	if($("#checkbox_is_active:checked").is(":checked")){
		checkboxIsActive="1";
	}else{
		checkboxIsActive="0";
	}
	
	$.ajax({
		url:restfulURL+restfulPathAppraisalLevel+"/"+$("#id").val(),
		type : "PATCH",
		dataType : "json",
		data : {
			"appraisal_level_name":$("#appraisal_level_name").val(),
			"is_all_employee":checkboxEmployee,
			"is_active":checkboxIsActive
		},	
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
			if (data['status'] == "200") {
				callFlashSlide("Insert Successfully.");
				getDataFn();
				clearFn();
				$('#ModalLevel').modal('hide');
					
			}else if (data['status'] == "400") {
				//alert("Error ?");
				validationFn(data);
			}  
				   
				   
			
		}
	});
	
	

	
}

//--------  Update  End

//-------- Insert Role Start
var insertCriteriaFn = function () {
	var structure =[];
	var weight = [];
	var criteria = [];
	$('.from_data_weight').each(function(index, indexEntry) {
		console.log("id: "+this.id+" weigth : "+$(indexEntry).val());
		criteria.push({
			"structure_id": ""+this.id+"",
			"weight_percent": ""+$(indexEntry).val()+"",	   	
		   });
	});
	
		$.ajax({
			url:restfulURL+restfulPathAppraisalLevel+"/"+$("#id").val()+"/criteria",
			type : "PATCH",
			dataType : "json",
			headers:{Authorization:"Bearer "+tokenID.token},
			async:false,
			data:{"criteria":criteria},
			success : function(data) {
				if(data['status']==200){
					callFlashSlide("Add Appraisal Criteria Successfully.");
					getDataFn();
					$('#ModalCriteria').modal('hide');
					
				}else if (data['status'] == "400") {
					
					var validate = "<font color='red'>* </font>" + data['data'] + "";
					//alert(validate);
					callFlashSlideInModal(validate,"#information2","error");
					
				} 
			}
		});
	
	return false;
}
// -------- Update Role End


$(document).ready(function() {
	getDataFn();
	$("#btnAddLevel").click(function(){
		clearFn();
		$("#checkbox_is_active").prop("checked",true);
	});
	$("#btnSubmit").click(function(){
		if ($("#action").val() == "add"|| $("#action").val() == "") {
			insertFn();
		}else{
			updateFn();
		}
		return false;
	});
	$("#btnCriteriaSubmit").click(function(){

			insertCriteriaFn();
		return false;
	});
	
	
});