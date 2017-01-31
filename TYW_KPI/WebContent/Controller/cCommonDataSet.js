//Global variable
var galbalDataCDS=[];
//IP Server : 171.96.201.146

var restfulPathCDS="/tyw_api/public/cds";
var restfulPathDropDownAppraisalLevel="/tyw_api/public/cds/al_list";
var restfulPathDropDownConnection="/tyw_api/public/cds/connection_list";
var restfulPathAutocomplete="/tyw_api/public/cds/auto_cds";





	//Check Validation
var validationFn = function(data){
		var validate="";
		if(data['data']['cds_name']!=undefined){
			validate+="<font color='red'>*</font> "+data['data']['cds_name']+"<br>";
		}
		if(data['data']['appraisal_level_id']!=undefined){
			validate+="<font color='red'>*</font> "+data['data']['appraisal_level_id']+"<br>";
		}
		if(data['data']['connection_id']!=undefined){
			validate+="<font color='red'>*</font> "+data['data']['connection_id']+"<br>";
		}
		if(data['data']['cds_sql']!=undefined){
			validate+="<font color='red'>*</font> "+data['data']['cds_sql']+"<br>";
		}
		callFlashSlideInModal(validate);
};	
	
	
	
// --------  Clear Start 
var clearFn = function() {
	$("#modalTitleRole").html("Common Data Set");
	$("#modalDescription").html("Add Common Data Set");
	$("#f_cds_name").val("");
	$("#f_cds_description").val("");
	$("#txtSQL").val("");
	$("#txtSampleData").val("");
	$("#txtSampleData").removeAttr("disabled");
	
	$("#btnExecute").removeAttr("disabled");
	
	$("#checkboxIsSQL").prop("checked",false);
	$("#checkboxIsActive").prop("checked",false);
	
	
	
	$("#action").val("add");
	$("#btnSubmit").val("Add");

}
//--------  Clear End

//--------  GetData Start
var getDataFn = function(page,rpp){
	//alert("Page : "+page+" - Rpp : "+rpp);
	var AppraisalLv= $("#paramAppraisalLv").val();
	var CdsName= $("#paramCdsId").val();
	$.ajax({
		url : restfulURL+restfulPathCDS,
		type : "get",
		dataType : "json",
		data:{"page":page,"rpp":rpp,
			"cds_id":CdsName,
			"appraisal_level_id":AppraisalLv},
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,// w8 data 
		success : function(data) {
			
			listCommonDataSetFn(data['data']);
			//total
			galbalDataCDS=data;
			paginationSetUpFn(galbalDataCDS['current_page'],galbalDataCDS['last_page'],galbalDataCDS['last_page']);
		}
	});
	
	
};
//--------  GetData End

// -------- Search Start
var searchAdvanceFn = function (AppraisalLv,cds_id) {
	//embed parameter start
	
	var htmlParam="";
	htmlParam+="<input type='hidden' class='paramEmbed' id='paramAppraisalLv' name='paramAppraisalLv' value='"+AppraisalLv+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='paramCdsId' name='paramCdsId' value='"+cds_id+"'>";
	$(".paramEmbed").remove();
	$("body").append(htmlParam);
	//embed parameter end
	
	getDataFn($("#pageNumber").val(),$("#rpp").val());
	
}
// -------- Search End

// -------- findOne
var findOneFn = function(id) {
	$.ajax({
		url:restfulURL+restfulPathCDS+"/"+id,
		type : "get",
		dataType : "json",
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {		
	
			$("#f_cds_name").val(data['cds_name']);
			$("#f_cds_description").val(data['cds_desc']);
			
			//Appraisal Level
			//$("#f_app_lv").val(data['appraisal_level_id']);
			$("#dropDownListFromAppraisalLevel").html(dropDownListAppraisalLevel(data['appraisal_level_id'],"f_app_lv"));
			//Connection
			
			//$("#f_connection").val(data['connection_id']);
			$("#dropDownListConnection").html(dropDownListConnection(data['connection_id']));
			
			//IsSQL
			if(data['is_sql']==1){
				$('#checkboxIsSQL').prop('checked', true);
				$("#btnExecute").removeAttr("disabled");
			}else{
				$('#checkboxIsSQL').prop('checked', false);
				$("#btnExecute").attr("disabled","disabled");
			}
			
			//IsAction
			if(data['is_active']==1){
				$('#checkboxIsActive').prop('checked', true);
			}else{
				$('#checkboxIsActive').prop('checked', false);
			}
			
			$("#txtSQL").val(data['cds_sql']);
			//$("#txtSampleData").val(data['txtSampleData']);
			
			


		}
	});
};
//--------- findOne


// --------  ListData  Start

var listCommonDataSetFn = function(data) {
	//alert("listCommonDataSetFn");
	var htmlTable = "";
	var IsSQL ="";
	var IsActive ="";
	$.each(data,function(index,indexEntry) {
		console.log(indexEntry["cdsName"]+indexEntry["appraisalLevel"]+indexEntry["isSql"]+indexEntry["isActive"]);
		if (indexEntry["is_sql"]== "1"){
			IsSQL = "<input disabled type='checkbox' name='is_sql' id='is_sql' checked value='1'>";
		}else if (indexEntry["is_sql"]== "0"){
			IsSQL = "<input disabled type='checkbox' name='is_sql' id='is_sql'  value='0'>";
		}
		if (indexEntry["is_active"]=="1"){
			IsActive = "<input disabled type='checkbox' name='is_active' id='is_active' checked value='1'>";
		}else if (indexEntry["is_active"]=="0"){
			IsActive = "<input disabled type='checkbox' name='is_active' id='is_active'  value='0'>";
		}
		htmlTable += "<tr class='rowSearch'>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["cds_name"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["appraisal_level_name"]+ "</td>";
		htmlTable += "<td class='objectCenter'>"+IsSQL+"</td>";
		htmlTable += "<td class='objectCenter'>"+IsActive+"</td>";
		
		htmlTable += "<td class='objectCenter'><i class=\"fa fa-cog font-gear popover-edit-del\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\"<button class='btn btn-warning btn-xs edit' id="+ indexEntry["cds_id"]+ " data-target=#ModalCommonData data-toggle='modal'>Edit</button>&nbsp;" ;
		htmlTable += "<button id="+indexEntry["cds_id"]+" class='btn btn-danger btn-xs del'>Delete</button>\"></i></td>";
		htmlTable += "</tr>";
	});
	//alert("ผ่าน");
	$("#listCommonDataSet").html(htmlTable);
//	$("#tableCommonDataSet_wrapper").click(function(){
//		$(".popover-edit-del").popover();
//	});
	
	//function popover
	$(".popover-edit-del").popover();
	
	$("#tableCommonDataSet").off("click",".popover-edit-del");
	$("#tableCommonDataSet").on("click",".popover-edit-del",function(){
		
			$(".edit").on("click",function() {
			
			$("#modalTitleRole").html("Common Data Set");
			$("#modalDescription").html("Edit Common Data Set");
			
			$(this).parent().parent().parent().children().click();
			//alert($(this).parent().parent().parent().children().click());
			$("#btnAddAnother").hide();
			//$("#txtSampleData").attr("disabled","disabled"); 
			clearFn();
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
					 url:restfulURL+restfulPathCDS+"/"+id,
					 type : "delete",
					 dataType:"json",
					 headers:{Authorization:"Bearer "+tokenID.token},
					success:function(data){    
				    	 
					     if(data['status']==200){
					    	 
					       callFlashSlide("Delete Successfully.");  
					       getDataFn($("#pageNumber").val(),$("#rpp").val());
					       clearFn();
					       $("#confrimModal").modal('hide');
					       
					     }
					 }
				});
				
			});
			
		});	
		
	});
	
	
}

// --------  ListData  End

// -------- Update Start
var updateFn = function () {

	
	var IsSQL = "";
	var IsAction="";
	
	if($("#checkboxIsSQL:checked").is(":checked")){
		checkboxIsSQL="1";
	}else{
		checkboxIsSQL="0";
	}
	if($("#checkboxIsActive:checked").is(":checked")){
		checkboxIsActive="1";
	}else{
		checkboxIsActive="0";
	}
	
	$.ajax({
		url:restfulURL+restfulPathCDS+"/"+$("#id").val(),
		type : "PATCH",
		dataType : "json",
		data : {
			"cds_name":$("#f_cds_name").val(),
			"cds_desc":$("#f_cds_description").val(),
			"appraisal_level_id":$("#f_app_lv").val(),
			"connection_id":$("#f_connection").val(),
			"is_sql":checkboxIsSQL ,
			"cds_sql":$("#txtSQL").val(),
			"is_active":checkboxIsActive
		},	
		//headers:{Authorization:"Bearer "+tokenID.token},
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
			if (data['status'] == "200") {
				getDataFn($("#pageNumber").val(),$("#rpp").val());
				clearFn();
				$('#ModalCommonData').modal('hide');
				callFlashSlide("Update Successfully.");
				
			}else if (data['status'] == "400") {
				alert("Error ?");
				//validationFn(data);
			}
		}
	});
	return false;
}
// -------- Update End


// --------  Insert  Start
var insertFn = function (param) {
	 var checkboxIsSQL = "";
	 var checkboxIsActive = "";
	 
	if($("#checkboxIsSQL:checked").is(":checked")){
		checkboxIsSQL="1";
	}else{
		checkboxIsSQL="0";
	}
	if($("#checkboxIsActive:checked").is(":checked")){
		checkboxIsActive="1";
	}else{
		checkboxIsActive="0";
	}
	
	$.ajax({
		url:restfulURL+restfulPathCDS,
		type : "POST",
		dataType : "json",
		data : {
			"cds_name":$("#f_cds_name").val(),
			"cds_desc":$("#f_cds_description").val(),
			"appraisal_level_id":$("#f_app_lv").val(),
			"connection_id":$("#f_connection").val(),
			"is_sql":checkboxIsSQL ,
			"cds_sql":$("#txtSQL").val(),
			"is_active":checkboxIsActive
		},	
		//headers:{Authorization:"Bearer "+tokenID.token},
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
			
			if (data['status'] == "200") {
				 
				   if(param !="saveAndAnother"){
					   //alert("!saveAndAnother" );
					   callFlashSlide("Insert Successfully.");
				       getDataFn($("#pageNumber").val(),$("#rpp").val());
				       clearFn();
				 	   $('#ModalCommonData').modal('hide');
					}else{
						//alert("saveAndAnother" );
						getDataFn($("#pageNumber").val(),$("#rpp").val());
						clearFn();
						$("#checkboxIsSQL").prop("checked",true);
						$("#checkboxIsActive").prop("checked",true);
						callFlashSlideInModal("Insert Data is Successfully.");
					}
			}else if (data['status'] == "400") {
				alert("Error ?");
				validationFn(data);
			}  
				   
				   
			
		}
	});
	
	

	
}

//--------  Insert  End

// --------------- DropDownList Appraisal Level ----------------
var dropDownListAppraisalLevel = function(id,inputId){
	//id = f_app_lv
	//id = app_lv
	var html="";
	html+="<select data-toggle=\"tooltip\" title=\"Appraisal Level\" class=\"input form-control input-sm\" id=\""+inputId+"\" name=\""+inputId+"\">";
	//html+="<option selected value=''>All</option>";
	$.ajax ({
		url:restfulURL+restfulPathDropDownAppraisalLevel,
		type:"get" ,
		dataType:"json" ,
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
				
				//galbalDqsRoleObj=data;
			$.each(data,function(index,indexEntry){
				if(id==indexEntry["appraisal_level_id"]){
					html+="<option selected value="+indexEntry["appraisal_level_id"]+">"+indexEntry["appraisal_level_name"]+"</option>";			
				}else{
					html+="<option  value="+indexEntry["appraisal_level_id"]+">"+indexEntry["appraisal_level_name"]+"</option>";	
				}
			});	

		}
	});	
	html+="</select>";
	return html;
};
 
// --------------- DropDownList Connection ---------------
var dropDownListConnection = function(id){
	var html="";
	
	html+="<select data-toggle=\"tooltip\" title=\"Connection\" class=\"input form-control input-sm\" id=\"f_connection\" name=\"f_connection\">";
	//html+="<option  value=''>All</option>";
	$.ajax ({
		url:restfulURL+restfulPathDropDownConnection ,
		type:"get" ,
		dataType:"json" ,
		//headers:{Authorization:"Bearer "+tokenID.token},
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
				//galbalDqsRoleObj=data;
			$.each(data,function(index,indexEntry){
				if(id==indexEntry["connection_id"]){
					html+="<option selected value="+indexEntry["connection_id"]+">"+indexEntry["connection_name"]+"</option>";			
				}else{
					html+="<option  value="+indexEntry["connection_id"]+">"+indexEntry["connection_name"]+"</option>";	
				}
			});	
		}
	});	
	html+="</select>";
	return html;
};

var executeFn = function (txtSQL) {
	$.ajax({
		url : restfulURL + "...............",
		type : "put",
		dataType : "json",
		headers:{Authorization:"Bearer "+tokenID.token},
		async : false,
		success : function(data) {
			// galbalDqsRoleObj=data;
			if (data['status'] == "200") {
				$("#txtSampleData").val(data['txtExecute']);

			} else if (data['status'] == "400") {

				validationFn(data);
			}
		}
	});
}


$(document).ready(function() {
	
	// ------------------- Common Data Set -------------------
	
	$("#dropDownListAppraisalLevel").html(dropDownListAppraisalLevel("","app_lv"));
	$("#dropDownListFromAppraisalLevel").html(dropDownListAppraisalLevel("","f_app_lv"));
	$("#dropDownListConnection").html(dropDownListConnection());
	
	$("#cds_name").val("");
	$("#cds_id").val("");
	$("#btnSearchAdvance").click(function(){
		///alert($("#cds_name").val().split("-", 1));
		searchAdvanceFn($("#app_lv").val(),$("#cds_name").val().split("-", 1));
		
		return false;
	});
	$("#btnSearchAdvance").click();
	
	
	
	
	$("#btnAddCommonDataSet").click(function(){
		clearFn();
		$("#btnAddAnother").show();
		$("#checkboxIsSQL").prop("checked",true);
		$("#checkboxIsActive").prop("checked",true);
		
	});
	
	$("#btnSubmit").click(function(){
		if ($("#action").val() == "add"|| $("#action").val() == "") {
			insertFn();
		}else{
			updateFn();
		}
		return false;
	});
	
	$("#btnAddAnother").click(function(){
		insertFn("saveAndAnother");
	});
	
	$(".btnCancle").click(function() {
		clearFn();
	});
	$("#checkboxIsSQL").change(function name() {
		if($("#checkboxIsSQL:checked").is(":checked")){
			$("#btnExecute").removeAttr("disabled");
			//executeFn();
		}else{
			$("#btnExecute").attr("disabled","disabled");
		}
	});
	
//	$("#btnExecute").attr("disabled","disabled");
//	 $("#btnExecute").click(function () {
//		if ($("#checkboxIsSQL:checked").is(":checked")) {
//			alert("Execute");
//			//executeFn();
//		} else {
//			alert("กรุณาคลิกเลือก \"IsSQL\" ");
//		}		
//		 
//	});
	

	
	//Autocomplete Search Start
	$("#cds_name").autocomplete({
        source: function (request, response) {
        	$.ajax({
				 url:restfulURL+restfulPathAutocomplete,
				 type:"post",
				 dataType:"json",
				 headers:{Authorization:"Bearer "+tokenID.token},
				 data:{"appraisal_level_id":$("#app_lv").val(),"cds_name":request.term},
				 //async:false,
                 error: function (xhr, textStatus, errorThrown) {
                        console.log('Error: ' + xhr.responseText);
                    },
				 success:function(data){
					  
						response($.map(data, function (item) {
							console.log(item.cds_id);
							//alert(item.cds_id);
                            return {
                                label: item.cds_name,
                                value: item.cds_id+"-"+item.cds_name
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
	
	
	
	
	
	
	
	
	// ------------------- Common Data Set END -------------------
	
	
});