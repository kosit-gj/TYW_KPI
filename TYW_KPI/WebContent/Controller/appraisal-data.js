//Global variable
var galbalDataAppData=[];
//IP Server : 171.96.201.146
//Path : :3001/api/tyw_appraisal_data
var restfulURL="http://171.96.201.146";
var restfulPathAppData=":3001/api/tyw_appraisal_data";

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
//			"structure":Structure,
//			"appraisal_level":AppLv,
//			"appraisal_item":AppItem,
//			"period":Period,
//			"emp_name":EmpName
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




$(document).ready(function() {
	// -------------------  Appraisal Data  ---------------------	
	
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