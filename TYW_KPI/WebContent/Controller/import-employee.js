//Global variable
var galbalDataImportEmp=[];
//IP Server : 171.96.201.146
var restfulURL="http://171.96.201.146";
var restfulPathImportEmployee=":3001/api/tyw_import_employee/";

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
	
	 $(".from_data_rule").prop('checked', false); 

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
			//galbalDataImportEmp=data;
			//paginationSetUpFn(galbalDataImportEmp['current_page'],galbalDataImportEmp['last_page'],galbalDataImportEmp['last_page']);
		}
	});
	
	
};
//--------  GetData End


//-------- findOne
var findOneFn = function(id) {
	$.ajax({
		url:restfulURL+restfulPathImportEmployee+id,
		type : "get",
		dataType : "json",
		//headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {		
			
			
			
			
	
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
		//<button class='btn btn-primary btn-xs btn-gear rule' id="+ indexEntry["_id"]+ " data-target=#ModalRule data-toggle='modal'>Ruld</button>&nbsp;
		//&lt;button class='btn btn-primary btn-xs btn-gear add' id=1 data-target=#ModalRule data-toggle='modal'&gt;Rule&lt;/button&gt;
		htmlTable += "<td class='objectCenter'><i class=\"fa fa-cog font-gear popover-edit-del\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\" " +
				"<button class='btn btn-primary btn-xs btn-gear rule' id="+ indexEntry["_id"]+ " data-target=#ModalRule data-toggle='modal'>Ruld</button>&nbsp;" +
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
			$(".rule").on("click",function(){
				$("#txtAssignEmpName").show();
				
				
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

var AssignRuleFn = function() {
	
	
	
	var rules = [];
	  $.each(golbalDataRole['data'],function(index,indexEntry){
	  
	  
	  var initial_flag_inline = "";
	  var update_flag_inline = "";
	  var last_contact_flag_inline = "";
	  var inform_flag_inline = "";
	  var edit_rule_release_flag_inline = "";
	 
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

$(document).ready(function() {
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
	$("#btnAddRule").click(function() {
		$("#txtAssignEmpName").hide();
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

	
	
	
	
	$("#form_rule_item_all").change(function(){  //"select all" change 
	    $(".from_data_rule").prop('checked', $(this).prop("checked")); //change all ".from_data_rule" checked status
	});
	
	//".from_data_rule" change 
	$('.from_data_rule').change(function(){ 
	    //uncheck "select all", if one of the listed from_data_rule item is unchecked
	    if(false == $(this).prop("checked")){ //if this item is unchecked
	        $("#form_rule_item_all").prop('checked', false); //change "select all" checked status to false
	    }
	    //check "select all" if all from_data_rule items are checked
	    if ($('.from_data_rule:checked').length == $('.from_data_rule').length ){
	        $("#form_rule_item_all").prop('checked', true);
	    }
	});

		$("#fromEmpWSD").datepicker();
	    $("#fromEmpWSD").datepicker( "option", "dateFormat", "dd-mm-yy" );
	    $("#fromEmpPED").datepicker();
	    $("#fromEmpPED").datepicker( "option", "dateFormat", "dd-mm-yy" );
	    $("#fromEmpAED").datepicker();
	    $("#fromEmpAED").datepicker( "option", "dateFormat", "dd-mm-yy" );
	    $(".ui-datepicker").hide();


    
	
});