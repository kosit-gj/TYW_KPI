//Global variable
var galbalDataAppData=[];
//IP Server : 171.96.201.146
//Path : :3001/api/tyw_appraisal_data
var restfulURL="http://171.96.200.20";
var restfulPathAppData=":3001/api/tyw_appraisal_data";



//------------------- GetData FN Start ---------------------
var getDataFn = function(page,rpp){
	$.ajax({
		url : restfulURL+restfulPathAppData,
		type : "get",
		dataType : "json",
		//data:{"page":page,"rpp":rpp},
		//headers:{Authorization:"Bearer "+tokenID.token},
		async:false,// w8 data 
		success : function(data) {
			
			listAppraisalDataFn(data);
			//total
			galbalDataAppData=data;
			//paginationSetUpFn(galbalDataAppData['current_page'],galbalDataAppData['last_page'],galbalDataAppData['last_page']);
		}
	});
	
	
};

//------------------- GetData FN END ---------------------

//------------------- Search Appraisal Data FN Start ---------------------

var searchAdvanceFn = function (Structure,AppLv,AppItem,Period,EmpName) {
	//embed parameter start
	
	var htmlParam="";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_Structure' name='param_Structure' value='"+Structure+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_AppLv' name='param_AppLv' value='"+AppLv+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_AppItem' name='param_AppItem' value='"+AppItem+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_Period' name='param_Period' value='"+Period+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_EmpName' name='param_EmpName' value='"+EmpName+"'>";
	$(".paramEmbed").remove();
	$("body").append(htmlParam);
	//embed parameter end
	
	$.ajax({
		url : restfulURL+restfulPathAppData,
		type : "get",
		dataType : "json",
//		data:{
//			"structure":$("#param_Structure").val(),
//			"appraisal_level":$("#param_AppLv").val(),
//			"appraisal_item":$("#param_AppItem").val(),
//			"period":$("#param_Period").val(),
//			"emp_name":$("#param_EmpName").val()
//		},
		//headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data,status) {
			//alert(data);
			listAppraisalDataFn(data);
			//galbalDataAppData=data;
			//paginationSetUpFn(galbalDataAppData['current_page'],galbalDataAppData['last_page'],galbalDataAppData['last_page']);
			
		}
	});
	
}

//------------------- Search Appraisal Data FN END ---------------------

//------------------- List Appraisal Data FN Start ---------------------

var listAppraisalDataFn = function (data) {
	var htmlTable = "";
	$.each(data,function(index,indexEntry) {
		console.log(indexEntry["period"]+indexEntry["structure"]
		+indexEntry["appraisal_level"]+indexEntry["appraisal_item"]);
		htmlTable += "<tr class='rowSearch'>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["period"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["structure"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["appraisal_item"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["emp_code"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["emp_name"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["cds_value"]+ "</td>";
		htmlTable += "</tr>";
	});
	$("#listAppraisalData").html(htmlTable);
}

//------------------- List Appraisal Data FN END ---------------------

//-------------------  Drop Down List Structure FN Strart ---------------------

var dropDownListStructure = function(){
	var html="";
	
	
	html+="<select id=\"paramStructure\" class=\"input form-control input-sm col-lg-9\" data-toggle=\"tooltip\" title=\"Structure\" name=\"paramStructure\">";
	html+="<option  selected value=''>All</option>";
	$.ajax ({
		url:restfulURL+restfulPathAppData,
		
		type:"get" ,
		dataType:"json" ,
		//headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
				//galbalDqsRoleObj=data;
			$.each(data,function(index,indexEntry){

					html+="<option  value="+indexEntry["structure"]+">"+indexEntry["structure"]+"</option>";	
		
			});	

		}
	});	
	html+="</select>";
	return html;
};
//-------------------  Drop Down List Structure FN END ---------------------


//-------------------  Drop Down List Appraisal Level FN Strart ---------------------

var dropDownListAppraisalLevel = function(){
	var html="";
	
	
	html+="<select id=\"paramAppLv\" class=\"input form-control input-sm col-lg-9\" data-toggle=\"tooltip\" title=\"Appraisal Level\" name=\"paramAppLv\">";
	html+="<option  selected value=''>All</option>";
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
//-------------------  Drop Down List Appraisal Level FN END ---------------------

//-------------------  Drop Down List Appraisal Item FN Strart ---------------------

var dropDownListAppraisalItem = function(){
	var html="";
	
	
	html+="<select id=\"paramAppItem\" class=\"input form-control input-sm col-lg-9\" data-toggle=\"tooltip\" title=\"Appraisal Item\" name=\"paramAppItem\">";
	html+="<option  selected value=''>All</option>";
	$.ajax ({
		url:restfulURL+restfulPathAppData,
		type:"get" ,
		dataType:"json" ,
		//headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
				//galbalDqsRoleObj=data;
			$.each(data,function(index,indexEntry){

					html+="<option  value="+indexEntry["appraisal_item"]+">"+indexEntry["appraisal_item"]+"</option>";	
		
			});	

		}
	});	
	html+="</select>";
	return html;
};
//-------------------  Drop Down List Appraisal Item FN END ---------------------

//-------------------  Drop Down List Period FN Strart ---------------------

var dropDownListPeriod = function(){
	var html="";
	
	
	html+="<select id=\"paramPeriod\" class=\"input form-control input-sm col-lg-9\" data-toggle=\"tooltip\" title=\"Period\" name=\"paramPeriod\">";
	html+="<option  selected value=''>All</option>";
	$.ajax ({
		url:restfulURL+restfulPathAppData,
		type:"get" ,
		dataType:"json" ,
		//headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
				//galbalDqsRoleObj=data;
			$.each(data,function(index,indexEntry){

					html+="<option  value="+indexEntry["period"]+">"+indexEntry["period"]+"</option>";	
		
			});	

		}
	});	
	html+="</select>";
	return html;
};
//-------------------  Drop Down List Appraisal Item FN END ---------------------
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
	// -------------------  Appraisal Data  ---------------------	
	paginationSetUpFn(1,1,1);
	$("#dropDownListStructure").html(dropDownListStructure());
	$("#dropDownListAppraisalLevel").html(dropDownListAppraisalLevel());
	$("#dropDownListAppraisalItem").html(dropDownListAppraisalItem());
	$("#dropDownListPeriod").html(dropDownListPeriod());
	
	$("#btnSearchAdvance").click(function(){
		
		searchAdvanceFn(
				$("#paramStructure").val(),
				$("#paramAppLv").val(),
				$("#paramAppItem").val(),
				$("#paramPeriod").val(),
				$("#paramEmployeeName").val());
		
		return false;
	});
	$("#btnSearchAdvance").click();
	
    // -------------------  Appraisal Data END ---------------------	
	
	//#### Call Export User Function Start ####
//	$("#exportToExcel").click(function(){
//		$("form#formExportToExcel").attr("action",restfulURL+"/dqs_api/public/dqs_user/export?token="+tokenID.token);
//		
//
// 		
//		$("#export_employee_Code").val($("#").val());
//		$("#export_structure_id").val($("#").val());
//		$("#export_structure_name").val($("#").val());
//		$("#export_period_id").val($("#").val());
//		$("#export_period_name").val($("#").val());
//		$("#export_appraisal_item_id").val($("#").val());
//		$("#export_appraisal_item_name").val($("#").val());
//		$("#export_data_value").val($("#").val());
//
//		$("form#formExportToExcel").submit();
//	});
    //#### Call Export User Function End ####	

	
});