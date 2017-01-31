//Global variable
var galbalDataImportEmp=[];
//IP Server : 171.96.201.146
var restfulURL="http://171.96.200.20";
var restfulPathImportEmployee=":3001/api/tyw_import_employee/";
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
	$("#fromEmpEmpCode").val("");
	$("#fromEmpEmpName").val("");
	$("#fromEmpWSD").val("");
	$("#fromEmpPED").val("");
	$("#fromEmpAED").val("");
	$("#fromEmpDepartmentCode").val("");
	$("#fromEmpDepartmentName").val("");
	$("#fromEmpSectionCode").val("");
	$("#fromEmpSectionName").val("");
	$("#fromEmpPositionCode").val("");
	$("#fromEmpPositionName").val("");
	$("#fromEmpPositionGroup").val("");
	$("#fromEmpSupEmpCode").val("");
	$("#fromEmpEmail").val("");
	$("#fromEmpSalary").val("");
	$("#fromEmpErpUser").val("");
	
	$("#checkboxIsCorporateKPI").prop("checked",false);
	$("#checkboxIsActive").prop("checked",false);
	
	 $(".from_data_role").prop('checked', false); 

//	$("#txtSampleData").removeAttr("disabled");
	
	$("#action").val("add");
	$("#btnSubmit").val("Add");

}
//--------  Clear End

//--------  GetData Start
var getDataFn = function(page,rpp){
	$.ajax({
		url : restfulURL+restfulPathImportEmployee,
		type : "get",
		dataType : "json",
		//data:{"page":page,"rpp":rpp},
		//headers:{Authorization:"Bearer "+tokenID.token},
		async:false,// w8 data 
		success : function(data) {
			
			listImportEmployeeFn(data);
			//total
			galbalDataImportEmp=data;
			//paginationSetUpFn(galbalDataImportEmp['current_page'],galbalDataImportEmp['last_page'],galbalDataImportEmp['last_page']);
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
				document.getElementById('fromRoleEmpName').innerHTML = data['emp_name'];
			}else{
				
				$("#fromEmpEmpCode").val(data['emp_code']);
				$("#fromEmpEmpName").val(data['emp_name']);
				$("#fromEmpWSD").val(data['working_start_date']);
				$("#fromEmpPED").val(data['probation_end_date']);
				$("#fromEmpAED").val(data['acting_end_date']);
				$("#fromEmpDepartmentCode").val(data['department_code']);
				$("#fromEmpDepartmentName").val(data['department_ame']);
				$("#fromEmpSectionCode").val(data['section_code']);
				$("#fromEmpSectionName").val(data['section_name']);
				$("#fromEmpPositionCode").val(data['position_code']);
				$("#fromEmpPositionName").val(data['position_name']);
				$("#fromEmpPositionGroup").val(data['position_group']);
				$("#fromEmpSupEmpCode").val(data['supervisor_emp_code']);
				$("#fromEmpEmail").val(data['email']);
				$("#fromEmpSalary").val(data['salary']);
				$("#fromEmpErpUser").val(data['erp_user']);
				
				
				//isCorporateKPI
				if(data['isCorporateKPI']==1){
					$('#checkboxIsCorporateKPI').prop('checked', true);
				}else{
					$('#checkboxIsCorporateKPI').prop('checked', false);
				}
				//IsAction
				if(data['IsActive']==1){
					$('#checkboxIsActive').prop('checked', true);
				}else{
					$('#checkboxIsActive').prop('checked', false);
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
	
	$.ajax({
		url : restfulURL+restfulPathImportEmployee,
		type : "get",
		dataType : "json",
//		data:{
/*		
		"department_ame":$("#param_Department").val(),
		"section_name":$("#param_Section").val(),
		"position_name":$("#param_Position").val(),
		"emp_name":$("#param_EmpName").val(),*/

//		},
		//headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {

			listImportEmployeeFn(data);
			galbalDataImportEmp=data;
			//paginationSetUpFn(galbalDataImportEmp['current_page'],galbalDataImportEmp['last_page'],galbalDataImportEmp['last_page']);
			
		}
	});
	
	
}
// -------- SearchFn End


//--------  ListData  Start

var listImportEmployeeFn = function(data) {
	//alert("listCommonDataSetFn");
	//clear ฟังก์ชัน  data ข้อมูลเก่าทิ้ง 
	$("#listEmployee").empty();
	
	var htmlTable = "";
	var IsSQL ="";
	var IsActive ="";
	$.each(data,function(index,indexEntry) {
		//console.log();
		if (indexEntry["IsActive"]=="1"){
			IsActive = "<input disabled type='checkbox' name='is_active' id='is_active' checked value='1'>";
		}else if (indexEntry["IsActive"]=="0"){
			IsActive = "<input disabled type='checkbox' name='is_active' id='is_active'  value='0'>";
		}
		
		htmlTable += "<tr class='rowSearch'>";
		htmlTable += "<td class='objectCenter'>"+"<input type=\"checkbox\" class='selectEmpCheckbox' id=kpiCheckbox-"+indexEntry["_id"]+" >"+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["emp_code"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["emp_name"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+indexEntry["position_group"]+"</td>";
		htmlTable += "<td class='columnSearch'>"+indexEntry["department_ame"]+"</td>";
		htmlTable += "<td class='columnSearch'>"+indexEntry["section_name"]+"</td>";
		htmlTable += "<td class='columnSearch'>"+indexEntry["position_name"]+"</td>";
		htmlTable += "<td class='columnSearch'>"+indexEntry["position_group"]+"</td>";
		htmlTable += "<td class='columnSearch'>"+indexEntry["supervisor_emp_code"]+"</td>";
		htmlTable += "<td class='objectCenter'>"+IsActive+"</td>";
		//<button class='btn btn-primary btn-xs btn-gear role' id="+ indexEntry["_id"]+ " data-target=#ModalRole data-toggle='modal'>Ruld</button>&nbsp;
		//&lt;button class='btn btn-primary btn-xs btn-gear add' id=1 data-target=#ModalRole data-toggle='modal'&gt;Role&lt;/button&gt;
		htmlTable += "<td class='objectCenter'><i class=\"fa fa-cog font-gear popover-edit-del\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\" " +
				"<button class='btn btn-primary btn-xs btn-gear role' id="+ indexEntry["_id"]+ " data-target=#ModalRole data-toggle='modal'>Ruld</button>&nbsp;" +
				"<button class='btn btn-warning btn-xs btn-gear edit' id="+ indexEntry["_id"]+ " data-target=#ModalEditEmp data-toggle='modal'>Edit</button>&nbsp;" +
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
	if($("#checkboxIsCorporateKPI:checked").is(":checked")){
		IsCorporateKPI="1";
	}else{
		IsCorporateKPI="0";
	}
	//IsAction
	if($("#checkboxIsActive:checked").is(":checked")){
		checkboxIsActive="1";
	}else{
		checkboxIsActive="0";
	}
	
	$.ajax({
		url:restfulURL+restfulPathImportEmployee+$("#id").val(),
		type : "PUT",
		dataType : "json",
		//headers:{Authorization:"Bearer "+tokenID.token},
		data : {
			"emp_code":$("#fromEmpEmpCode").val(),
			"emp_name":$("#fromEmpEmpName").val(),
			"working_start_date":$("#fromEmpWSD").val(),
			"probation_end_date":$("#fromEmpPED").val(),
			"acting_end_date":$("#fromEmpAED").val(),
			"department_code":$("#fromEmpDepartmentCode").val(),
			"department_ame":$("#fromEmpDepartmentName").val(),
			"section_code":$("#fromEmpSectionCode").val(),
			"section_name":$("#fromEmpSectionName").val(),
			"position_code":$("#fromEmpPositionCode").val(),
			"position_name":$("#fromEmpPositionName").val(),
			"position_group":$("#fromEmpPositionGroup").val(),
			"email":$("#fromEmpEmail").val(),
			"salary":$("#fromEmpSalary").val(),
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
		url:restfulURL+":3001/api/tyw_appraisal_level" ,
		type:"get" ,
		dataType:"json" ,
		//headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
			$.each(data,function(index,indexEntry){
				htmlTable+="<tr>";
				htmlTable+="<td>";
				htmlTable+="<div class=\"checkbox m-l-sm\">";
				htmlTable+="<input id=\"form_role_item-"+indexEntry["_id"]+"\" class=\"from_data_role\"";
				htmlTable+="type='checkbox' value=\""+indexEntry["_id"]+"\"> <label> </label>";
				htmlTable+="</div>";
				htmlTable+="</td>";
				htmlTable+="<td style=\"vertical-align:middle\">"+indexEntry["appraisal_level_name"]+"</td>";
				htmlTable+="</tr>";
					
//				}		
			});	
			htmlTable+="<tr>";
			htmlTable+="<td>";
			htmlTable+="<div class=\"checkbox m-l-sm\">";
			htmlTable+="<input id=\"form_role_item_all\" class=\"from_data_role\"";
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
	html+="<select data-toggle=\"tooltip\" title=\"Department\" class=\"input form-control input-sm\" id=\"paramDepartment\" name=\"paramDepartment\" >";
	html+="<option  selected value=''>All</option>";
	$.ajax ({
		url:restfulURL+restfulPathImportEmployee ,
		type:"get" ,
		dataType:"json" ,
		//headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
				//galbalDqsRoleObj=data;
			$.each(data,function(index,indexEntry){
//				if(id==indexEntry["txtConnection_id"]){
//					html+="<option  value="+indexEntry["department_ame"]+">"+indexEntry["department_ame"]+"</option>";			
//				}else{
					html+="<option  value="+indexEntry["department_ame"]+">"+indexEntry["department_ame"]+"</option>";	
//				}		
			});	

		}
	});	
	html+="</select>";
	return html;
};

//DropDownList Section
var dropDownListSection = function(){
	var html="";
	html+="<select data-toggle=\"tooltip\" title=\"Section\" class=\"input form-control input-sm\" id=\"paramSection\" name=\"paramSection\" >";
	html+="<option  selected value=''>All</option>";
	$.ajax ({
		url:restfulURL+restfulPathImportEmployee ,
		type:"get" ,
		dataType:"json" ,
		//headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
				//galbalDqsRoleObj=data;
			$.each(data,function(index,indexEntry){
//				if(id==indexEntry["txtConnection_id"]){
//					html+="<option  value="+indexEntry["section_name"]+">"+indexEntry["section_name"]+"</option>";			
//				}else{
					html+="<option  value="+indexEntry["section_name"]+">"+indexEntry["section_name"]+"</option>";	
//				}		
			});	

		}
	});	
	html+="</select>";
	return html;
};


//set paginate start
var paginationSetUpFn = function(pageIndex,pageButton,pageTotal){
	if(pageTotal==0){
		pageTotal=1
	}
	$('.pagination_top,.pagination_bottom').off("page");
	$('.pagination_top,.pagination_bottom').bootpag({
	    total: pageTotal,//page Total
	    page: pageIndex,//page index
	    maxVisible: 5,//จำนวนปุ่ม
	    leaps: true,
	    firstLastUse: true,
	    first: '←',
	    last: '→',
	    wrapClass: 'pagination',
	    activeClass: 'active',
	    disabledClass: 'disabled',
	    nextClass: 'next',
	    prevClass: 'prev',
	    next: 'next',
	    prev: 'prev',
	    lastClass: 'last',
	    firstClass: 'first'
	}).on("page", function(event, num){
		var rpp=10;
		if($("#rpp").val()==undefined){
			rpp=10;
		}else{
			rpp=$("#rpp").val();
		}
		
		getDataFn(num,rpp);
		
	    $(".pagingNumber").remove();
	    var htmlPageNumber= "<input type='hidden' id='pageNumber' name='pageNumber' class='pagingNumber' value='"+num+"'>";
	    $("body").append(htmlPageNumber);
	   
	}); 

	$(".countPagination").off("change");
	$(".countPagination").on("change",function(){

		$("#countPaginationTop").val($(this).val());
		$("#countPaginationBottom").val($(this).val());
		
		getDataFn(1,$(this).val());
		
		$(".rpp").remove();
	    var htmlRrp= "<input type='hidden' id='rpp' name='rpp' class='rpp' value='"+$(this).val()+"'>";
	    $("body").append(htmlRrp);
	});
}
//set paginate end

$(document).ready(function() {
	paginationSetUpFn(1,1,1);
	$("#dropDownDepartment").html(dropDownListDepartment());
	$("#dropDownSection").html(dropDownListSection());
	$("#btnSearchAdvance").click(function(){
		//alert("2");
		searchAdvanceFn(
				$("#paramDepartment").val(),
				$("#paramSection").val(),
				$("#paramPosition").val(),
				$("#paramEmpName").val()
				);

		return false;
	});
	$("#btnSearchAdvance").click();
	$("#btnAddRole").click(function() {
		$("#txtAssignEmpName").hide();
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

	
	//Auto Complete Position start
//	$("#paramPosition").autocomplete({
//        source: function (request, response) {
//        	 $.ajax({
//				    url:restfulURL+".......",
//				    type:"get",
//				    dataType:"json",
//					//headers:{Authorization:"Bearer "+tokenID.token},
//					data:{"q":request.term},
//					async:false,
//                    error: function (xhr, textStatus, errorThrown) {
//                        alert('Error: ' + xhr.responseText);
//                    },
//				    success:function(data){
//					
//						response($.map(data, function (item) {
//                            return {
//                                label: item.desc,
//                                value: item.desc
//                            }
//                        }));
//					
//				    }
//				   });
//        	
//        }
//    });
    
  //Auto Complete Employee Name end
	
	//Auto Complete Position start
//	$("#paramEmpName").autocomplete({
//        source: function (request, response) {
//        	 $.ajax({
//				    url:restfulURL+".......",
//				    type:"get",
//				    dataType:"json",
//					//headers:{Authorization:"Bearer "+tokenID.token},
//					data:{"q":request.term},
//					async:false,
//                    error: function (xhr, textStatus, errorThrown) {
//                        alert('Error: ' + xhr.responseText);
//                    },
//				    success:function(data){
//					
//						response($.map(data, function (item) {
//                            return {
//                                label: item.desc,
//                                value: item.desc
//                            }
//                        }));
//					
//				    }
//				   });
//        	
//        }
//    });
    
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
	
	
	
	
	

		$("#fromEmpWSD").datepicker();
	    $("#fromEmpWSD").datepicker( "option", "dateFormat", "dd-mm-yy" );
	    $("#fromEmpPED").datepicker();
	    $("#fromEmpPED").datepicker( "option", "dateFormat", "dd-mm-yy" );
	    $("#fromEmpAED").datepicker();
	    $("#fromEmpAED").datepicker( "option", "dateFormat", "dd-mm-yy" );
	    $(".ui-datepicker").hide();


    
	
});