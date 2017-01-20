//Global variable
var galbalDataCDS=[];
//IP Server : 171.96.201.146
var restfulURL="http://171.96.201.146";
var restfulPathCdsResult=":3001/api/tyw_cds_result/";

//-------------------  Appraisal Data FN ---------------------
var searchAdvanceFn = function (year,month,app_lv,position,emp_name) {
//embed parameter start
	
	var htmlParam="";
	htmlParam+="<input type='show' class='paramEmbed' id='param_Year' name='param_Year' value='"+year+"'>";
	htmlParam+="<input type='show' class='paramEmbed' id='param_Month' name='param_Month' value='"+month+"'>";
	htmlParam+="<input type='show' class='paramEmbed' id='param_AppLv' name='param_AppLv' value='"+app_lv+"'>";
	htmlParam+="<input type='show' class='paramEmbed' id='param_Position' name='param_Position' value='"+position+"'>";
	htmlParam+="<input type='show' class='paramEmbed' id='param_EmpName' name='param_EmpName' value='"+emp_name+"'>";
	$(".paramEmbed").remove();
	$("body").append(htmlParam);
	//embed parameter end
	
	$.ajax({
		url : restfulURL+restfulPathCdsResult,
		type : "get",
		dataType : "json",
//		data:{
// 			"year":year,
// 			"month":month,
// 			"appraisal_Level":app_lv,
// 			"position":position,
// 			"emp_name":emp_name
//		},
		//headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data,status) {
			listCdsResultFn(data);
			galbalDataCitizen=data;
			//paginationSetUpFn(galbalDataCitizen['current_page'],galbalDataCitizen['last_page'],galbalDataCitizen['last_page']);
			
		}
	});
	
}

var listCdsResultFn = function (data) {
	var htmlTable = "";
	$.each(data,function(index,indexEntry) {
// 		console.log(indexEntry["period"]+indexEntry["structure"]
// 		+indexEntry["appraisal_level"]+indexEntry["appraisal_item"]);
	
		htmlTable += "<tr class='rowSearch'>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["emp_code"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["emp_name"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["appraisal_Level"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["cds_id"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["cds_name"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["year"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["month"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["cds_value"]+ "</td>";
		htmlTable += "</tr>";
	});
	$("#listCdsResult").html(htmlTable);
}

//-------------------  Appraisal Data FN END ---------------------


$(document).ready(function() {
	
	
	$("#btnSearchAdvance").click(function(){
		
		searchAdvanceFn(
				$("#paramYear").val(),
				$("#paramMonth").val(),
				$("#paramApp_lv").val(),
				$("#paramPosition").val(),
				$("#paramEmpName").val());
		
		return false;
	});
	$("#btnSearchAdvance").click();
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
	
	
	
});