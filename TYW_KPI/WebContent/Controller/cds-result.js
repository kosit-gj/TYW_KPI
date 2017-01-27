//Global variable
var galbalDataCDSResult=[];
//IP Server : 171.96.201.146
var restfulURL="http://171.96.200.20";
var restfulPathCdsResult=":3001/api/tyw_cds_result/";

//------------------- GetData FN Start ---------------------
var getDataFn = function(page,rpp){
	$.ajax({
		url : restfulURL+restfulPathCdsResult,
		type : "get",
		dataType : "json",
		//data:{"page":page,"rpp":rpp},
		//headers:{Authorization:"Bearer "+tokenID.token},
		async:false,// w8 data 
		success : function(data) {
			
			listCdsResultFn(data);
			//total
			galbalDataCDSResult=data;
			//paginationSetUpFn(galbalDataCDSResult['current_page'],galbalDataCDSResult['last_page'],galbalDataCDSResult['last_page']);
		}
	});
	
	
};

//------------------- GetData FN END ---------------------

//-------------------  Appraisal Data FN ---------------------
var searchAdvanceFn = function (year,month,app_lv,position,emp_name) {
//embed parameter start
	
	var htmlParam="";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_Year' name='param_Year' value='"+year+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_Month' name='param_Month' value='"+month+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_AppLv' name='param_AppLv' value='"+app_lv+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_Position' name='param_Position' value='"+position+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_EmpName' name='param_EmpName' value='"+emp_name+"'>";
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
			galbalDataCDSResult=data;
			//paginationSetUpFn(galbalDataCDSResult['current_page'],galbalDataCDSResult['last_page'],galbalDataCDSResult['last_page']);
			
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


//-------------------  Drop Down List Month FN Strart ---------------------

var dropDownListMonth = function(){
	var html="";
	
	
	html+="<select id=\"paramMonth\" class=\"input form-control input-sm col-lg-9\" data-toggle=\"tooltip\" title=\"Month\" name=\"paramMonth\">";
	//html+="<option  selected value=''>All</option>";
	$.ajax ({
		url:restfulURL+":3001/api/tyw_month" ,
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
					html+="<option  value="+indexEntry["month"]+">"+indexEntry["month"]+"</option>";	
//				}		
			});	

		}
	});	
	html+="</select>";
	return html;
};
//-------------------  Drop Down List Month FN END ---------------------

//-------------------  Drop Down List Year FN Strart ---------------------

var dropDownListYear = function(){
	var html="";
	
	
	html+="<select id=\"paramYear\" class=\"input form-control input-sm col-lg-9\" data-toggle=\"tooltip\" title=\"Year\" name=\"paramYear\">";
	//html+="<option  selected value=''>All</option>";
	$.ajax ({
		url:restfulURL+":3001/api/tyw_year" ,
		type:"get" ,
		dataType:"json" ,
		//headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
				//galbalDqsRoleObj=data;
			$.each(data,function(index,indexEntry){

					html+="<option  value="+indexEntry["year"]+">"+indexEntry["year"]+"</option>";	
		
			});	

		}
	});	
	html+="</select>";
	return html;
};
//-------------------  Drop Down List Year FN END ---------------------

//-------------------  Drop Down List Appraisal Level FN Strart ---------------------

var dropDownListAppraisalLevel = function(){
	var html="";
	
	
	html+="<select id=\"paramApp_lv\" class=\"input form-control input-sm col-lg-9\" data-toggle=\"tooltip\" title=\"Appraisal Level\" name=\"paramApp_lv\">";
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
	paginationSetUpFn(1,1,1)
	
	$("#dropDownListYear").html(dropDownListYear());
	$("#dropDownListMonth").html(dropDownListMonth());
	$("#dropDownListAppraisalLevel").html(dropDownListAppraisalLevel());
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