//Global variable
var galbalDataCDS=[];
//IP Server : 171.96.201.146
var restfulURL="http://171.96.200.20";
var restfulPathCDS=":3001/api/tyw_common_data_set/";

	//Check Validation
var validationFn = function(data){
		var validate="";
		if(data['data']['cdsName']!=undefined){
			validate+="<font color='red'>*</font> "+data['data']['cdsName']+"<br>";
		}
		if(data['data']['appraisalLevel']!=undefined){
			validate+="<font color='red'>*</font> "+data['data']['appraisalLevel']+"<br>";
		}
		if(data['data']['txtConnection']!=undefined){
			validate+="<font color='red'>*</font> "+data['data']['txtConnection']+"<br>";
		}if(data['data']['txtSql']!=undefined){
			validate+="<font color='red'>*</font> "+data['data']['txtSql']+"<br>";
		}
		//callFlashSlideInModal(validate);
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
	
	$("#action").val("add");
	$("#btnSubmit").val("Add");

}
//--------  Clear End

//--------  GetData Start
var getDataFn = function(page,rpp){
	$.ajax({
		url : restfulURL+restfulPathCDS,
		type : "get",
		dataType : "json",
		//data:{"page":page,"rpp":rpp},
		//headers:{Authorization:"Bearer "+tokenID.token},
		async:false,// w8 data 
		success : function(data) {
			
			listCommonDataSetFn(data);
			//total
			galbalDataCitizen=data;
			//paginationSetUpFn(galbalDataCitizen['current_page'],galbalDataCitizen['last_page'],galbalDataCitizen['last_page']);
		}
	});
	
	
};
//--------  GetData End

// -------- Search Start
var searchAdvanceFn = function (AppraisalLv,CdsName) {
	//embed parameter start
	
	var htmlParam="";
	htmlParam+="<input type='hidden' class='paramEmbed' id='paramAppraisalLv' name='paramAppraisalLv' value='"+AppraisalLv+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='paramCdsName' name='paramCdsName' value='"+CdsName+"'>";
	$(".paramEmbed").remove();
	$("body").append(htmlParam);
	//embed parameter end
	
	$.ajax({
		url : restfulURL+restfulPathCDS,
		type : "get",
		dataType : "json",
//		data:{
//		"cdsName":$("#f_cds_name").val(),
//		//"cdsDescription":$("#f_cds_description").val(),
//		"appraisalLevel":$("#f_app_lv").val(),
//		//"txtConnection":$("#f_connection").val(),
//		"isSql":checkboxIsSQL ,
//		//"sql":$("#txtSql").val(),
//		"isActive":checkboxIsActive
//		},
		//headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {

			listCommonDataSetFn(data);
			galbalDataCitizen=data;
			//paginationSetUpFn(galbalDataCitizen['current_page'],galbalDataCitizen['last_page'],galbalDataCitizen['last_page']);
			
		}
	});
	
	
}
// -------- Search End

// -------- findOne
var findOneFn = function(id) {
	$.ajax({
		url:restfulURL+restfulPathCDS+id,
		type : "get",
		dataType : "json",
		//headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {		
	
			$("#f_cds_name").val(data['cdsName']);
			$("#f_cds_description").val(data['cdsDescription']);
			
			//Appraisal Level
			$("#f_app_lv").val(data['appraisalLevel']);
			//Connection
			
			$("#f_connection").val(data['txtConnection']);
			
			//IsSQL
			if(data['isSql']==1){
				$('#checkboxIsSQL').prop('checked', true);
				$("#btnExecute").removeAttr("disabled");
			}else{
				$('#checkboxIsSQL').prop('checked', false);
				$("#btnExecute").attr("disabled","disabled");
			}
			
			//IsAction
			if(data['isActive']==1){
				$('#checkboxIsActive').prop('checked', true);
			}else{
				$('#checkboxIsActive').prop('checked', false);
			}
			
			$("#txtSQL").val(data['txtSql']);
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
		if (indexEntry["isSql"]== "1"){
			IsSQL = "<input disabled type='checkbox' name='is_sql' id='is_sql' checked value='1'>";
		}else if (indexEntry["isSql"]== "0"){
			IsSQL = "<input disabled type='checkbox' name='is_sql' id='is_sql'  value='0'>";
		}
		if (indexEntry["isActive"]=="1"){
			IsActive = "<input disabled type='checkbox' name='is_active' id='is_active' checked value='1'>";
		}else if (indexEntry["isActive"]=="0"){
			IsActive = "<input disabled type='checkbox' name='is_active' id='is_active'  value='0'>";
		}
		htmlTable += "<tr class='rowSearch'>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["cdsName"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["appraisalLevel"]+ "</td>";
		htmlTable += "<td class='objectCenter'>"+IsSQL+"</td>";
		htmlTable += "<td class='objectCenter'>"+IsActive+"</td>";
		
		htmlTable += "<td class='objectCenter'><i class=\"fa fa-cog font-gear popover-edit-del\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\"<button class='btn btn-warning btn-xs edit' id="+ indexEntry["_id"]+ " data-target=#ModalCommonData data-toggle='modal'>Edit</button>&nbsp;" ;
		htmlTable += "<button id="+indexEntry["_id"]+" class='btn btn-danger btn-xs del'>Delete</button>\"></i></td>";
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
					 url:restfulURL+restfulPathCDS+id,
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
		url:restfulURL+restfulPathCDS+$("#id").val(),
		type : "PUT",
		dataType : "json",
		//headers:{Authorization:"Bearer "+tokenID.token},
		data : {
			"cdsName":$("#f_cds_name").val(),
			"cdsDescription":$("#f_cds_description").val(),
			"appraisalLevel":$("#f_app_lv").val(),
			"txtConnection":$("#f_connection").val(),
			"isSql":checkboxIsSQL ,
			"txtSql":$("#txtSql").val(),
			"isActive":checkboxIsActive
		},	
		success : function(data) {
			//if (data['status'] == "200") {
				//alert($("#pageNumber").val());
				//alert($("#rpp").val());
				getDataFn($("#pageNumber").val(),$("#rpp").val());
				clearFn();
				$('#ModalCommonData').modal('hide');
				//callFlashSlide("Update Successfully.");
				
			//}else if (data['status'] == "400") {
				
			//	validationFn(data);
			//}
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
			"cdsName":$("#f_cds_name").val(),
			"cdsDescription":$("#f_cds_description").val(),
			"appraisalLevel":$("#f_app_lv").val(),
			"txtConnection":$("#f_connection").val(),
			"isSql":checkboxIsSQL ,
			"txtSql":$("#txtSql").val(),
			"isActive":checkboxIsActive
		},	
		//headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
			
//			if (data['status'] == "200") {
				 
				   if(param !="saveAndAnother"){
					   //alert("!saveAndAnother" );
					   //callFlashSlide("Insert Successfully.");
				       getDataFn($("#pageNumber").val(),$("#rpp").val());
				       clearFn();
				 	   $('#ModalCommonData').modal('hide');
					}else{
						//alert("saveAndAnother" );
						getDataFn($("#pageNumber").val(),$("#rpp").val());
						clearFn();
						//callFlashSlideInModal("Insert Data is Successfully.");
					}
//			}else if (data['status'] == "400") {
//				
//				validationFn(data);
//			}  
				   
				   
			
		}
	});
	
	

	
}

//--------  Insert  End

// --------------- DropDownList Appraisal Level ----------------
var dropDownListAppraisalLevel = function(id){
	//id = f_app_lv
	//id = app_lv
	var html="";
	html+="<select data-toggle=\"tooltip\" title=\"Appraisal Level\" class=\"input form-control input-sm\" id=\""+id+"\" name=\""+id+"\">";
	//html+="<option selected value=''>All</option>";
	$.ajax ({
		url:restfulURL+":3001/api/tyw_appraisal_level" ,
		type:"get" ,
		dataType:"json" ,
		//headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
				
				//galbalDqsRoleObj=data;
			$.each(data,function(index,indexEntry){
				html+="<option  value="+indexEntry["appraisal_level_name"]+">"+indexEntry["appraisal_level_name"]+"</option>";		
			});	

		}
	});	
	html+="</select>";
	return html;
};
 
// --------------- DropDownList Connection ---------------
var dropDownListConnection = function(){
	var html="";
	var htmlTmp="";
	html+="<select data-toggle=\"tooltip\" title=\"Connection\" class=\"input form-control input-sm\" id=\"f_connection\" name=\"f_connection\">";
	//html+="<option  value=''>All</option>";
	$.ajax ({
		url:restfulURL+":3001/api/tyw_database_connection" ,
		type:"get" ,
		dataType:"json" ,
		//headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
				//galbalDqsRoleObj=data;
			$.each(data,function(index,indexEntry){
				html+="<option  value="+indexEntry["database_type"]+">"+indexEntry["database_type"]+"</option>";
				htmlTmp+="<option  value="+indexEntry["database_type"]+">"+indexEntry["database_type"]+"</option>";
			});	
			

		}
	});	
	html+="</select>";
	return html;
};

var executeFn = function (txtSQL) {
	$.ajax ({
		url:restfulURL+"..............." ,
		type:"put" ,
		dataType:"json" ,
		//headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
				//galbalDqsRoleObj=data;
//			if (data['status'] == "200") {
				$("#txtSampleData").val(data['txtExecute']);
				
				}
//		}else if (data['status'] == "400") {
//			
//			validationFn(data);
//		}  

		});	
}
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
	
	// ------------------- Common Data Set -------------------
	
	$("#dropDownListAppraisalLevel").html(dropDownListAppraisalLevel("app_lv"));
	$("#dropDownListFromAppraisalLevel").html(dropDownListAppraisalLevel("f_app_lv"));
	$("#dropDownListConnection").html(dropDownListConnection());
	
	
	$("#btnSearchAdvance").click(function(){
		//alert("2");
		searchAdvanceFn($("#app_lv").val(),$("#cds_name").val());

		return false;
	});
	$("#btnSearchAdvance").click();
	
	
	
	
	$("#btnAddCommonDataSet").click(function(){
		clearFn();
		$("#btnAddAnother").show();
		$("#checkboxIsSQL").prop("checked",true);
		
	});
	
	$("#btnSubmit").click(function(){
		if ($("#action").val() == "add"|| $("#action").val() == "") {
			//insertFn();
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
	
	//Auto Complete Cds Name start
//	$("#cds_name").autocomplete({
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
    
  //Auto Complete Cds Name end
	
	
	
	
	
	
	
	
	// ------------------- Common Data Set END -------------------
	
	
});