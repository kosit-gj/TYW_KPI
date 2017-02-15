//IP Server : 171.96.201.146

var restfulPathReport=":3001/api/tyw_report_score_bonus/";
var restfulURL ="http://192.168.1.100";

var restfulPathDropDownYear="/tyw_api/public/cds_result/year_list";
var restfulPathDropDownBonusPeriod="/tyw_api/public/appraisal_data/period_list";
var restfulPathDropDownDepartment="/tyw_api/public/import_employee/dep_list";
var restfulPathDropDownPositionGroup="/tyw_api/public/cds/connection_list";

//--------  GetData Start
var getDataFn = function(){
	var year= $("#param_year").val();
	var bonusPeriod= $("#param_bonus_period").val();
	var department= $("#param_department").val();
	var positionGroup= $("#param_position_group").val();
	$.ajax({
		url : restfulURL+restfulPathReport,
		type : "get",
		dataType : "json",
		data:{
			"current_appraisal_year":year,
			"appraisal_period_desc":bonusPeriod,
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
var searchAdvanceFn = function (Year,BnPeriod,Department,PsGroup) {
	//embed parameter start
	var htmlParam="";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_year' name='param_year' value='"+Year+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_bonus_period' name='param_bonus_period' value='"+BnPeriod+"'>";
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
	var htmlFootTable = "";
	var saraly=[];
	var sumSaraly=0;
	var totalSaraly=[];
	var sumTotalSaraly=0;

	$.each(data,function(index,indexEntry) {
		//console.log();

		
		htmlTable += "<tr class='rowSearch'>";
		htmlTable += "<td class='columnSearch'>"+(index+1)+ "</td>";
		htmlTable += "<td class='columnSearch'>"+indexEntry["description"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+indexEntry["performance_score"]+"</td>";
		htmlTable += "<td class='objectCenter'>"+indexEntry["total_performance_score"]+"</td>";
		htmlTable += "<td class='objectCenter'>"+indexEntry["saraly"]+"</td>";
		htmlTable += "<td class='objectCenter'>"+indexEntry["bonus"]+"</td>";
		htmlTable += "<td class='objectCenter'>"+indexEntry["total_saraly"]+"</td>";
		htmlTable += "</tr>";
		
		saraly[index]=indexEntry["saraly"];
		totalSaraly[index]=indexEntry["total_saraly"];
		
	});
	$.each(saraly,function(index){
		sumSaraly += saraly[index];
	});
	$.each(totalSaraly,function(index){
		sumTotalSaraly += totalSaraly[index];
	});
	function addCommas(nStr)
	{
	    nStr += '';
	    x = nStr.split('.');
	    x1 = x[0];
	    x2 = x.length > 1 ? '.' + x[1] : '';
	    var rgx = /(\d+)(\d{3})/;
	    while (rgx.test(x1)) {
	        x1 = x1.replace(rgx, '$1' + ',' + '$2');
	    }
	    return x1 + x2;
	}
	
	htmlFootTable += "<tr class='rowSearch'>";
	htmlFootTable += "<td class='objectCenter' colspan=\"3\"><h3>รวมทั้งสิ้น</h3></td>";
	htmlFootTable += "<td class='objectCenter'></td>";
	htmlFootTable += "<td class='objectCenter'><h4>"+sumSaraly+"</h4></td>";
	htmlFootTable += "<td class='objectCenter'></td>";
	htmlFootTable += "<td class='objectCenter'><h4>"+sumTotalSaraly+"</h4></td>";
	htmlFootTable += "</tr>";
	
	//alert("ผ่าน");
	$("#listDataReport").html(htmlTable);
	$("#footDataReport").html(htmlFootTable);
	
	
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

//DropDownList Bonus Period
var dropDownListBonusPeriod = function(year){
	//console.log("Year : "+year);
	var html="";
	html+="<select data-toggle=\"tooltip\" title=\"Bonus Period\" class=\"input form-control input-sm\" id=\"bonus_period\" name=\"bonus_period\" >";
	$.ajax ({
		url:restfulURL+restfulPathDropDownBonusPeriod ,
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
	$("#drop_down_list_bonus_period").html(dropDownListBonusPeriod($("#year").val()));
	$("#drop_down_list_department").html(dropDownListDepartment());
	$("#drop_down_list_position_group").html(dropDownListPositionGroup());
	
	
	$("#year").change(function(){  
		$("#drop_down_list_bonus_period").html(dropDownListBonusPeriod($("#year").val()));
	});
	
	$("#btnSearchAdvance").click(function(){
		searchAdvanceFn(
				$("#year").val(),
				$("#bonus_period").val(),
				$("#department").val(),
				$("#position_group").val()
				);
		$("#txtParamYear").html($("#param_year").val());
		$("#txtParamBnPeriod").html($("#bonus_period option:selected").text());
		$("#report_list_content").show();
		return false;
	});
	//$("#btnSearchAdvance").click();
		
	
	
	
});