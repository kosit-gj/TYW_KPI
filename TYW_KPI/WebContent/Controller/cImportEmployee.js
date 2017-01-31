//Global variable
var galbalDataImportEmp=[];
var restfulPathImportEmployee="/tyw_api/public/import_employee";
var restfulPathRole="/tyw_api/public/import_employee/role_list";

var restfulPathDropDownDepartment="/tyw_api/public/import_employee/dep_list";
var restfulPathDropDownSection="/tyw_api/public/import_employee/sec_list";

var restfulPathPositionAutocomplete="/tyw_api/public/import_employee/auto_position_name";
var restfulPathEmployeeAutocomplete="/tyw_api/public/import_employee/auto_employee_name";

//Check Validation Start
var validationFn = function(data){
	var validate="";
	if(data['data']['salary']!=undefined){
		validate+="<font color='red'>*</font> "+data['data']['salary']+"<br>";
	}
	
	//callFlashSlideInModal(validate);
};
//Check Validation Edd

//--------  Clear Start 
var clearFn = function() {
	$("#from_emp_code").val("");
	$("#from_emp_name").val("");
	$("#from_emp_wsd").val("");
	$("#from_emp_ped").val("");
	$("#from_emp_aed").val("");
	$("#from_department_code").val("");
	$("#from_department_name").val("");
	$("#from_section_code").val("");
	$("#from_section_name").val("");
	$("#from_position_code").val("");
	$("#from_position_name").val("");
	$("#from_position_group").val("");
	$("#from_sup_emp_code").val("");
	$("#from_emp_email").val("");
	$("#from_emp_salary").val("");
	$("#from_emp_erp_user").val("");
	
	$("#from_checkboxIs_corporate_kpi").prop("checked",false);
	$("#from_checkboxIs_active").prop("checked",false);
	
	 $(".from_data_role").prop('checked', false); 

//	$("#txtSampleData").removeAttr("disabled");
	
	$("#action").val("add");
	$("#btnSubmit").val("Add");

}
//--------  Clear End

//--------  GetData Start
var getDataFn = function(page,rpp){
	var department= $("#param_Department").val();
	var section= $("#param_Section").val();
	var position= $("#param_Position").val();
	var empName= $("#param_EmpName").val();
	$.ajax({
		url : restfulURL+restfulPathImportEmployee,
		type : "get",
		dataType : "json",
		data:{"page":page,"rpp":rpp,
			"department_code":department,
			"section_code":section,
			"position_code":position,
			"emp_code":empName
		},
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,// w8 data 
		success : function(data) {
			
			listImportEmployeeFn(data['data']);
			//total
			galbalDataImportEmp=data;
			paginationSetUpFn(galbalDataImportEmp['current_page'],galbalDataImportEmp['last_page'],galbalDataImportEmp['last_page']);
		}
	});
	
	
};
//--------  GetData End


//-------- findOne
var findOneFn = function(id,txtFrom) {
	$.ajax({
		url:restfulURL+restfulPathImportEmployee+id,
		type : "get",
		dataType : "json",
		//headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {		
			//alert(txtFrom + " Name : "+data['emp_name']);
			if(txtFrom == "Role"){
				document.getElementById('from_role_emp_name').innerHTML = data['emp_name'];
			}else{
				
				$("#from_emp_code").val(data['emp_code']);
				$("#from_emp_name").val(data['emp_name']);
				$("#from_emp_wsd").val(data['working_start_date']);
				$("#from_emp_ped").val(data['probation_end_date']);
				$("#from_emp_aed").val(data['acting_end_date']);
				$("#from_department_code").val(data['department_code']);
				$("#from_department_name").val(data['department_ame']);
				$("#from_section_code").val(data['section_code']);
				$("#from_section_name").val(data['section_name']);
				$("#from_position_code").val(data['position_code']);
				$("#from_position_name").val(data['position_name']);
				$("#from_position_group").val(data['position_group']);
				$("#from_sup_emp_code").val(data['supervisor_emp_code']);
				$("#from_emp_email").val(data['email']);
				$("#from_emp_salary").val(data['salary']);
				$("#from_emp_erp_user").val(data['erp_user']);
				
				
				//isCorporateKPI
				if(data['isCorporateKPI']==1){
					$('#from_checkboxIs_corporate_kpi').prop('checked', true);
				}else{
					$('#from_checkboxIs_corporate_kpi').prop('checked', false);
				}
				//IsAction
				if(data['IsActive']==1){
					$('#from_checkboxIs_active').prop('checked', true);
				}else{
					$('#from_checkboxIs_active').prop('checked', false);
				}	
				
			}
			
								
		}
	});
};
//--------- findOne


//-------- SearchFn Start
var searchAdvanceFn = function (Department,Section,Position,EmployeeName) {
	//embed parameter start
	var htmlParam="";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_Department' name='param_Department' value='"+Department+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_Section' name='param_Section' value='"+Section+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_Position' name='param_Position' value='"+Position+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_EmpName' name='param_EmpName' value='"+EmployeeName+"'>";
	$(".paramEmbed").remove();
	$("body").append(htmlParam);
	//embed parameter end
	getDataFn($("#pageNumber").val(),$("#rpp").val());
	
	
}
// -------- SearchFn End


//--------  ListData  Start

var listImportEmployeeFn = function(data) {
	//alert("listCommonDataSetFn");
	//clear ฟังก์ชัน  data ข้อมูลเก่าทิ้ง 
	$("#listEmployee").empty();
	
	var htmlTable = "";
//	var IsSQL ="";
//	var IsActive ="";
	$.each(data,function(index,indexEntry) {
		//console.log();
//		if (indexEntry["IsActive"]=="1"){
//			IsActive = "<input disabled type='checkbox' name='is_active' id='is_active' checked value='1'>";
//		}else if (indexEntry["IsActive"]=="0"){
//			IsActive = "<input disabled type='checkbox' name='is_active' id='is_active'  value='0'>";
//		}
		htmlTable += "<tr class='rowSearch'>";
		htmlTable += "<td class='objectCenter '>"+"<div class='checkbox m-n '><input  style=\"margin-top:1px;\" type=\"checkbox\" class='selectEmpCheckbox' id=kpiCheckbox-"+indexEntry["emp_code"]+" ><label> </label></div>"+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["emp_code"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["emp_name"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+indexEntry["department_name"]+"</td>";
		htmlTable += "<td class='columnSearch'>"+indexEntry["section_name"]+"</td>";
		htmlTable += "<td class='columnSearch'>"+indexEntry["position_name"]+"</td>";
		htmlTable += "<td class='columnSearch'>"+indexEntry["position_group"]+"</td>";
		htmlTable += "<td class='columnSearch'>"+indexEntry["chief_emp_code"]+"</td>";
		//htmlTable += "<td class='objectCenter'>"+IsActive+"</td>";
		//<button class='btn btn-primary btn-xs btn-gear role' id="+ indexEntry["_id"]+ " data-target=#ModalRole data-toggle='modal'>Ruld</button>&nbsp;
		//&lt;button class='btn btn-primary btn-xs btn-gear add' id=1 data-target=#ModalRole data-toggle='modal'&gt;Role&lt;/button&gt;
		htmlTable += "<td class='objectCenter'><i class=\"fa fa-cog font-gear popover-edit-del\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\" " +
				"<button class='btn btn-primary btn-xs btn-gear role' id="+ indexEntry["emp_code"]+ " data-target=#ModalRole data-toggle='modal'>Ruld</button>&nbsp;" +
				"<button class='btn btn-warning btn-xs btn-gear edit' id="+ indexEntry["emp_code"]+ " data-target=#ModalEditEmp data-toggle='modal'>Edit</button>&nbsp;" +
		        "<button id="+indexEntry["_id"]+" class='btn btn-danger btn-xs btn-gear del'>Delete</button>\"></i></td>";
		htmlTable += "</tr>";
	});
	//alert("ผ่าน");
	$("#listEmployee").html(htmlTable);
	
	//click ที่ checkox Close แล้ว แยกไอดี ส่งไปฝัง(embed) 
	$('#tableEmployee').on("click",".selectEmpCheckbox",function(){	
		var id = this.id.split("-"); 
		embedParamCheckboxSelect(id[1]);	
	});
	
	//function popover
	$(".popover-edit-del").popover();
	
	$("#tableEmployee").off("click",".popover-edit-del");
	$("#tableEmployee").on("click",".popover-edit-del",function(){
			$(".role").on("click",function(){
				$("#txtAssignEmpName").show();
				$(this).parent().parent().parent().children().click();
				
				findOneFn(this.id,"Role");
				listAppraisalLevel();
				
				$("#form_role_item_all").change(function(){  //"select all" change 
				    $(".from_data_role").prop('checked', $(this).prop("checked")); //change all ".from_data_role" checked status
				});
				
				//".from_data_role" change 
				$('.from_data_role').change(function(){ 
				    //uncheck "select all", if one of the listed from_data_role item is unchecked
				    if(false == $(this).prop("checked")){ //if this item is unchecked
				        $("#form_role_item_all").prop('checked', false); //change "select all" checked status to false
				    }
				    //check "select all" if all from_data_role items are checked
				    if ($('.from_data_role:checked').length == $('.from_data_role').length ){
				        $("#form_role_item_all").prop('checked', true);
				    }
				});
				
				
				
				
				$("#id").val(this.id);
				$("#action").val("edit");
				
			});
			$(".edit").on("click",function() {
			
//			$("#modalTitleRole").html("Common Data Set");
//			$("#modalDescription").html("Edit Common Data Set");
			
			$(this).parent().parent().parent().children().click();
			//alert($(this).parent().parent().parent().children().click());
			//$("#btnAddAnother").hide();
			//$("#txtSampleData").attr("disabled","disabled"); 
			
			findOneFn(this.id);
			//alert($("#checkboxIsSQL:checked").is(":checked"));
			
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
					 url:restfulURL+restfulPathImportEmployee+id,
					 type : "delete",
					 dataType:"json",
					 //headers:{Authorization:"Bearer "+tokenID.token},
				     success:function(data){    
				    	 
					     //if(data['status']==200){
					    	 
					       //callFlashSlide("Delete Successfully.");  
					       getDataFn($("#pageNumber").val(),$("#rpp").val());
					       clearFn();
					       $("#confrimModal").modal('hide');
					       
					     //}
					 }
				});
				
			});
			
		});	
		
	});
	
	
}

var AssignRoleFn = function() {
	
	
	
	var roles = [];
	  $.each(golbalDataRole['data'],function(index,indexEntry){
	  
	  
	  var initial_flag_inline = "";
	  var update_flag_inline = "";
	  var last_contact_flag_inline = "";
	  var inform_flag_inline = "";
	  var edit_role_release_flag_inline = "";
	 
	  if($("#embed_initial_flag_inline-"+indexEntry['rule_id']).val()!=undefined 
		|| $("#embed_update_flag_inline-"+indexEntry['rule_id']).val()!=undefined
		|| $("#embed_last_contact_flag_inline-"+indexEntry['rule_id']).val()!=undefined
		|| $("#embed_inform_flag_inline-"+indexEntry['rule_id']).val()!=undefined
		|| $("#embed_edit_rule_release_flag_inline-"+indexEntry['rule_id']).val()!=undefined
		)
	  {
		  
	  	
	 
		   //send value KPI 
		   if($("#initial_flag_inline-"+indexEntry['rule_id']).prop('checked')){ 
			   initial_flag_inline = 1;
	        }else{ 
	        	initial_flag_inline = 0;
	        }
		   
		   //send value LastContact
		   if($("#update_flag_inline-"+indexEntry['rule_id']).prop('checked')){ 
			   update_flag_inline = 1;
	        }else{ 
	        	update_flag_inline = 0;
	        }
		   
		   //send value Delete
		   if($("#last_contact_flag_inline-"+indexEntry['rule_id']).prop('checked')){ 
			   last_contact_flag_inline = 1;
	        }else{ 
	        	last_contact_flag_inline = 0;
	        }
		   
		   //send value Delete
		   if($("#inform_flag_inline-"+indexEntry['rule_id']).prop('checked')){ 
			   inform_flag_inline = 1;
	        }else{ 
	        	inform_flag_inline = 0;
	        }
		   
		   //send value Delete
		   if($("#edit_rule_release_flag_inline-"+indexEntry['rule_id']).prop('checked')){ 
			   edit_rule_release_flag_inline = 1;
	        }else{ 
	        	edit_rule_release_flag_inline = 0;
	        }
		   

			  
		   rules.push({
			   rule_id: ""+indexEntry['rule_id']+"",
			   initial_flag:""+initial_flag_inline+"",
			   update_flag: ""+update_flag_inline+"",
			   last_contact_flag: ""+last_contact_flag_inline+"",
			   inform_flag: ""+inform_flag_inline+"",
			   edit_rule_release_flag: ""+edit_rule_release_flag_inline+"",
			   	
		   });
	  }
	  
	  });
	 // console.log(rules);
	
	  $.ajax({
	      url:restfulURL+"/dqs_api/public/dqs_rule",
	      type:"PATCH",
	      dataType:"json",
	      data:{"rules":rules},
	      headers:{Authorization:"Bearer "+tokenID.token},
	      async:false,
	      success:function(data,status){
	     
	        if(status=="success"){
	        	callFlashSlide("Update Successfully.");
	        	getDataFn($("#pageNumber").val(),$("#rpp").val());
	    		clearFn();
	        }
	     }
	  });
	  
	return false;

};

// --------  ListData  End
//Click แล้ว ฝังข้อมูล
var embedParamCheckboxSelect = function(id){
	//alert(id);
	var count = 0;
	
	$.each($(".embed_select").get(),function(index,indexEnry){
	//ถ้า id ที่วน == id ที่มี	
		if($(indexEnry).val()==id){
			count+=1;
		}
	});
	//console.log(count);
	if(count>0){
		$("#embed_select-"+id).remove();
		$("body").append("<input type='show' class='embed_select' id='embed_select-"+id+"' name='embed_select-"+id+"' value='"+id+"'>");
	}else{
		$("body").append("<input type='show' class='embed_select' id='embed_select-"+id+"' name='embed_select-"+id+"' value='"+id+"'>");
	}
	
}

//-------- Update Start
var updateFn = function () {

	

	

	var IsCorporateKPI = "";
	var IsAction="";
	//isCorporateKPI
	if($("#from_checkboxIs_corporate_kpi:checked").is(":checked")){
		IsCorporateKPI="1";
	}else{
		IsCorporateKPI="0";
	}
	//IsAction
	if($("#from_checkboxIs_active:checked").is(":checked")){
		checkboxIsActive="1";
	}else{
		checkboxIsActive="0";
	}
	
	$.ajax({
		url:restfulURL+restfulPathImportEmployee+$("#id").val(),
		type : "PUT",
		dataType : "json",
		headers:{Authorization:"Bearer "+tokenID.token},
		data : {
			"emp_code":$("#from_emp_code").val(),
			"emp_name":$("#from_emp_name").val(),
			"working_start_date":$("#from_emp_wsd").val(),
			"probation_end_date":$("#from_emp_ped").val(),
			"acting_end_date":$("#from_emp_aed").val(),
			"department_code":$("#from_department_code").val(),
			"department_ame":$("#from_department_name").val(),
			"section_code":$("#from_section_code").val(),
			"section_name":$("#from_section_name").val(),
			"position_code":$("#from_position_code").val(),
			"position_name":$("#from_position_name").val(),
			"position_group":$("#from_position_group").val(),
			"email":$("#from_emp_email").val(),
			"salary":$("#from_emp_salary").val(),
			"fromEmpErpUser":$("#erp_user").val(),
			"isCorporateKPI":checkboxIsActive ,
			"IsActive":checkboxIsActive
		},	
		success : function(data) {
			
			//if (data['status'] == "200") {
				//alert($("#pageNumber").val());
				//alert($("#rpp").val());
				getDataFn($("#pageNumber").val(),$("#rpp").val());
				clearFn();
				$('#ModalEditEmp').modal('hide');
				//callFlashSlide("Update Successfully.");
				
			//}else if (data['status'] == "400") {
				
			//	validationFn(data);
			//}
		}
	});
	return false;
}
// -------- Update End

// ------ List Appraisal Level Start
var listAppraisalLevel = function() {
	var htmlTable="";
	$.ajax ({
		url:restfulURL+restfulPathRole ,
		type:"get" ,
		dataType:"json" ,
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
			$.each(data,function(index,indexEntry){
				htmlTable+="<tr>";
				htmlTable+="<td>";
				htmlTable+="<div class=\"checkbox m-l-sm\">";
				htmlTable+="<input style=\"margin-top:1px;\" id=\"form_role_item-"+indexEntry["appraisal_level_id"]+"\" class=\"from_data_role\"";
				htmlTable+="type='checkbox' value=\""+indexEntry["appraisal_level_id"]+"\"> <label> </label>";
				htmlTable+="</div>";
				htmlTable+="</td>";
				htmlTable+="<td style=\"vertical-align:middle\">"+indexEntry["appraisal_level_name"]+"</td>";
				htmlTable+="</tr>";
					
//				}		
			});	
			htmlTable+="<tr>";
			htmlTable+="<td>";
			htmlTable+="<div class=\"checkbox m-l-sm\">";
			htmlTable+="<input style=\"margin-top:1px;\" id=\"form_role_item_all\" class=\"from_data_role\"";
			htmlTable+="type='checkbox' value=\all\"> <label> </label>";
			htmlTable+="</div>";
			htmlTable+="</td>";
			htmlTable+="<td style=\"vertical-align:middle\">ทุกระดับ</td>";
			htmlTable+="</tr>";

		}
	});	
	$("#formListRuld").html(htmlTable);
}
// ------- List Appraisal Level End

//DropDownList Department
var dropDownListDepartment = function(){
	var html="";
	html+="<select data-toggle=\"tooltip\" title=\"Department\" class=\"input form-control input-sm\" id=\"search_department\" name=\"search_department\" >";
	html+="<option  selected value=''>All</option>";
	$.ajax ({
		url:restfulURL+restfulPathDropDownDepartment ,
		type:"get" ,
		dataType:"json" ,
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
			$.each(data,function(index,indexEntry){
//				if(id==indexEntry["txtConnection_id"]){
//					html+="<option  value="+indexEntry["department_code"]+">"+indexEntry["department_name"]+"</option>";			
//				}else{
					html+="<option  value="+indexEntry["department_code"]+">"+indexEntry["department_name"]+"</option>";	
//				}		
			});	

		}
	});	
	html+="</select>";
	return html;
};

//DropDownList Section
var dropDownListSection = function(id){
	var html="";
	html+="<select data-toggle=\"tooltip\" title=\"Section\" class=\"input form-control input-sm\" id=\"search_section\" name=\"search_section\" >";
	
	html+="<option  selected value=''>All</option>";
	$.ajax ({
		url:restfulURL+restfulPathDropDownSection ,
		type:"get" ,
		dataType:"json" ,
		data : {"department_code":id},
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
				//galbalDqsRoleObj=data;
			$.each(data,function(index,indexEntry){
//				if(id==indexEntry["section_code"]){
//					html+="<option  value="+indexEntry["section_code"]+">"+indexEntry["section_name"]+"</option>";			
//				}else{
					html+="<option  value="+indexEntry["section_code"]+">"+indexEntry["section_name"]+"</option>";	
//				}		
			});	

		}
	});	
	html+="</select>";
	return html;
};



$(document).ready(function() {
	//paginationSetUpFn(1,1,1);
	$("#drop_down_department").html(dropDownListDepartment());
	$("#drop_down_section").html(dropDownListSection($("#search_department").val()));
	$("#drop_down_department").change(function () {
		$("#drop_down_section").html(dropDownListSection($("#search_department").val()));
	});
	$("#search_position").val("");
	$("#search_emp_name").val("");
	$("#btnSearchAdvance").click(function(){
		//alert("2");
		searchAdvanceFn(
				$("#search_department").val(),
				$("#search_section").val(),
				$("#search_position").val().split("-", 1),
				$("#search_emp_name").val().split("-", 1)
				);

		return false;
	});
	$("#btnSearchAdvance").click();
	$("#btn_add_role").click(function() {
		$("#txtAssignEmpName").hide();
		listAppraisalLevel();
		
//		$("#form_role_item_all").change(function(){  //"select all" change 
//		    $(".from_data_role").prop('checked', $(this).prop("checked")); //change all ".from_data_role" checked status
//		});
//		
//		//".from_data_role" change 
//		$('.from_data_role').change(function(){ 
//		    //uncheck "select all", if one of the listed from_data_role item is unchecked
//		    if(false == $(this).prop("checked")){ //if this item is unchecked
//		        $("#form_role_item_all").prop('checked', false); //change "select all" checked status to false
//		    }
//		    //check "select all" if all from_data_role items are checked
//		    if ($('.from_data_role:checked').length == $('.from_data_role').length ){
//		        $("#form_role_item_all").prop('checked', true);
//		    }
//		});
		
	});
	$("#btnRoldSubmit").click(function(){
		if ($("#action").val() == "add"|| $("#action").val() == "") {
			//insertFn();
			insertFn();
		}else{
			updateFn();
		}
		return false;
	});
	$("#btnEmpSubmit").click(function(){
		
		updateFn();

		return false;
	});
	$(".btnCancle").click(function() {
		clearFn();
	});
	//Autocomplete Search Position Start
	$("#search_position").autocomplete({
        source: function (request, response) {
        	$.ajax({
				 url:restfulURL+restfulPathPositionAutocomplete,
				 type:"GET",
				 dataType:"json",
				 data:{
					 "department_code":$("#search_department").val(),
					 "section_code":$("#search_section").val(),
					 "position_name":request.term},
				//async:false,
				 headers:{Authorization:"Bearer "+tokenID.token},
                 error: function (xhr, textStatus, errorThrown) {
                        console.log('Error: ' + xhr.responseText);
                    },
				 success:function(data){
					  
						response($.map(data, function (item) {
                            return {
                                label: item.position_name,
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
   
	//Autocomplete Search Position End
	

  //Auto Complete Employee Name end
	
	$("#search_emp_name").autocomplete({
        source: function (request, response) {
        	$.ajax({
				 url:restfulURL+restfulPathEmployeeAutocomplete,
				 type:"GET",
				 dataType:"json",
				 data:{
					 "department_code":$("#search_department").val(),
					 "section_code":$("#search_section").val(),
					 "position_code":String($("#search_position").val().split("-", 1)),
					 "emp_name":request.term},
				//async:false,
				 headers:{Authorization:"Bearer "+tokenID.token},
                 error: function (xhr, textStatus, errorThrown) {
                        console.log('Error: ' + xhr.responseText);
                    },
				 success:function(data){
					  
						response($.map(data, function (item) {
                            return {
                                label: item.emp_name,
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
    
  //Auto Complete Employee Name end
	
	//#### Call Export User Function Start ####
//	$("#exportToExcel").click(function(){
//		$("form#formExportToExcel").attr("action",restfulURL+"/dqs_api/public/dqs_user/export?token="+tokenID.token);
//		
//
// 		
//		$("#export_employee_Code").val($("#").val());
//		$("#export_cds_id").val($("#").val());
//		$("#export_cds_name").val($("#").val());
//		$("#export_year").val($("#").val());
//		$("#export_Month").val($("#").val());
//		$("#export_cds_Value").val($("#").val());
//		
//		$("form#formExportToExcel").submit();
//	});
    //#### Call Export User Function End ####
	
	
	
	
	

		$("#from_emp_wsd").datepicker();
	    $("#from_emp_wsd").datepicker( "option", "dateFormat", "dd-mm-yy" );
	    $("#from_emp_ped").datepicker();
	    $("#from_emp_ped").datepicker( "option", "dateFormat", "dd-mm-yy" );
	    $("#from_emp_aed").datepicker();
	    $("#from_emp_aed").datepicker( "option", "dateFormat", "dd-mm-yy" );
	    $(".ui-datepicker").hide();


    
	
});