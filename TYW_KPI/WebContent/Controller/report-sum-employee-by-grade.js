//IP Server : 171.96.201.146
var restfulPathReport=":3001/api/tyw_report_salary_adjustment_year/";
var restfulURL ="http://192.168.1.100";

var restfulPathDropDownYear="/tyw_api/public/cds_result/year_list";
var restfulPathDropDownAppraisalPeriod="/tyw_api/public/appraisal_data/period_list";
var restfulPathDropDownDepartment="/tyw_api/public/import_employee/dep_list";
var restfulPathDropDownPositionGroup="/tyw_api/public/cds/connection_list";


//--------  GetData Start
var getDataFn = function(){
	var year= $("#param_year").val();
	var appraisalPeriod= $("#param_appraisal_period").val();
	var department= $("#param_department").val();
	var positionGroup= $("#param_position_group").val();
	$.ajax({
		url : restfulURL+restfulPathReport,
		type : "get",
		dataType : "json",
		data:{
			"current_appraisal_year":year,
			"appraisal_period_desc":appraisalPeriod,
			"department_code":department,
			"----------------":positionGroup},
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,// w8 data 
		success : function(data) {
			
			listReportFn(data['data']);
			
		}
	});
	
	
};
//--------  GetData End


//-------- SearchFn Start
var searchAdvanceFn = function (Year,AppraisalPeriod,Department,PsGroup) {
	//embed parameter start
	var htmlParam="";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_year' name='param_year' value='"+Year+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_appraisal_period' name='param_appraisal_period' value='"+AppraisalPeriod+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_department' name='param_department' value='"+Department+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_position_group' name='param_position_group' value='"+PsGroup+"'>";
	$(".paramEmbed").remove();
	$("body").append(htmlParam);
	//embed parameter end
	//getDataFn();	
}
// -------- SearchFn End


//--------  ListData  Start

var listReportFn = function(data) {

	//clear ฟังก์ชัน  data ข้อมูลเก่าทิ้ง 
	$("#listDataReport").empty();
	
	var htmlTable = "";

	$.each(data,function(index,indexEntry) {
		//console.log();

		
		htmlTable += "<tr class='rowSearch'>";
		htmlTable += "<td class='columnSearch'>"+(index+1)+ "</td>";
		htmlTable += "<td class='columnSearch'>"+indexEntry["emp_code"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+indexEntry["emp_name"]+"</td>";
		htmlTable += "<td class='columnSearch'>"+indexEntry["position"]+"</td>";
		htmlTable += "<td class='columnSearch'>"+indexEntry["salary_old"]+"</td>";
		htmlTable += "<td class='columnSearch'>"+indexEntry["salary_adjustment"]+"</td>";
		htmlTable += "</tr>";
	});
	//alert("ผ่าน");
	$("#listDataReport").html(htmlTable);
	
	
}
//--------  ListData  End


//DropDownList Year
var dropDownListYear = function(){
	var html="";
	html+="<select data-toggle=\"tooltip\" title=\"Year\" class=\"input form-control input-sm\" id=\"year\" name=\"year\" >";
	//html+="<option  selected value=''>All</option>";
	$.ajax ({
		url:restfulURL+restfulPathDropDownYear ,
		type:"get" ,
		dataType:"json" ,
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
			$.each(data,function(index,indexEntry){
					html+="<option  value="+indexEntry["current_appraisal_year"]+">"+indexEntry["current_appraisal_year"]+"</option>";	
			});	
		}
	});	
	html+="</select>";
	return html;
};

//DropDownList SalaryPeriod
var dropDownListAppraisalPeriod = function(year){
	//console.log("Year : "+year);
	var html="";
	html+="<select data-toggle=\"tooltip\" title=\"Appraisal Period\" class=\"input form-control input-sm\" id=\"appraisal_period\" name=\"appraisal_period\" >";
	//html+="<option  selected value=''>All</option>";
	$.ajax ({
		url:restfulURL+restfulPathDropDownAppraisalPeriod ,
		type:"get" ,
		dataType:"json" ,
		//data:{"year":year},
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
			$.each(data,function(index,indexEntry){
				html+="<option  value="+indexEntry["period_id"]+">"+indexEntry["appraisal_period_desc"]+"</option>";	
			});	
		}
	});	
	html+="</select>";
	return html;
};


//DropDownList Department
var dropDownListDepartment = function(){
	var html="";
	html+="<select data-toggle=\"tooltip\" title=\"Department\" class=\"input form-control input-sm\" id=\"department\" name=\"department\" >";
	html+="<option  selected value=''>All</option>";
	$.ajax ({
		url:restfulURL+restfulPathDropDownDepartment ,
		type:"get" ,
		dataType:"json" ,
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
			$.each(data,function(index,indexEntry){
				html+="<option  value="+indexEntry["department_code"]+">"+indexEntry["department_name"]+"</option>";		
			});	
		}
	});	
	html+="</select>";
	return html;
};

//DropDownList Position Group
var dropDownListPositionGroup = function(){
	var html="";
	html+="<select data-toggle=\"tooltip\" title=\"Position Group\" class=\"input form-control input-sm\" id=\"position_group\" name=\"position_group\" >";
	html+="<option  selected value=''>All</option>";
	/*$.ajax ({
		url:restfulURL+restfulPathDropDownPositionGroup ,
		type:"get" ,
		dataType:"json" ,
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
			$.each(data,function(index,indexEntry){
				html+="<option  value="+indexEntry["------------"]+">"+indexEntry["-------------"]+"</option>";		
			});	
		}
	});	*/
	html+="</select>";
	return html;
};


$(document).ready(function() {
	$("#report_list_content").hide();
	$("#drop_down_list_year").html(dropDownListYear());
	$("#drop_down_list_appraisal_period").html(dropDownListAppraisalPeriod($("#year").val()));
	$("#drop_down_list_department").html(dropDownListDepartment());
	$("#drop_down_list_position_group").html(dropDownListPositionGroup());
	
	$("#year").change(function(){  
		$("#drop_down_list_appraisal_period").html(dropDownListAppraisalPeriod($("#paramYear").val()));
	});

	
	$("#btnSearchAdvance").click(function(){
		searchAdvanceFn(
				$("#year").val(),
				$("#appraisal_period").val(),
				$("#department").val(),
				$("#position_group").val()
				);
		$("#report_list_content").show();

		return false;
	});
	//$("#btnSearchAdvance").click();
	
	
	
});