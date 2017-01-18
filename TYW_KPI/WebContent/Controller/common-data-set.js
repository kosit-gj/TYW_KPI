//Global variable
var galbalDataCDS=[];
//IP Server : 171.96.201.146
var restfulURL="http://171.96.201.146";

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
		url : restfulURL+":3001/api/tyw_common_data_set/",
		type : "get",
		dataType : "json",
//		data:{
//		"cdsName":$("#f_cds_name").val(),
//		//"cdsDescription":$("#f_cds_description").val(),
//		"appraisalLevel":$("#f_app_lv").val(),
//		//"connection":$("#txtConnection").val(),
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
//	$("#tableCommonDataSet").on("click",".popover-edit-del",function(){
//		
//			$(".edit").on("click",function() {
//			
//			$("#modalTitleRole").html("Common Data Set");
//			$("#modalDescription").html("Edit Common Data Set");
//			
//			$(this).parent().parent().parent().children().click();
//			//alert($(this).parent().parent().parent().children().click());
//			$("#btnAddAnother").hide();
//			$("#txtSampleData").attr("disabled","disabled"); 
//			
//			findOneCDSFn(this.id);
//			$("#id").val(this.id);
//			$("#action").val("edit");
//			$("#btnSubmit").val("Edit");		
//			
//			
//		});
//		
//		
//		$(".del").on("click",function(){
//			var id = this.id;
//			$(this).parent().parent().parent().children().click();
//			 
//			$("#confrimModal").modal();
//			$(document).off("click","#btnConfirmOK");
//			$(document).on("click","#btnConfirmOK",function(){
//			
//				$.ajax({
//					 url:restfulURL+":3001/api/dqs_common_data_set/"+id,
//					 type : "delete",
//					 dataType:"json",
//					 //headers:{Authorization:"Bearer "+tokenID.token},
//				     success:function(data){    
//				    	 
//					     //if(data['status']==200){
//					    	 
//					       callFlashSlide("Delete Successfully.");  
//					       getDataCDSFn($("#pageNumber").val(),$("#rpp").val());
//					       clearFn();
//					       $("#confrimModal").modal('hide');
//					       
//					     //}
//					 }
//				});
//				
//			});
//			
//		});	
//		
//	});
	
	
}

// --------  ListData  End





$(document).ready(function() {
	
	
	// ------------------- Common Data Set -------------------
	$("#btnSearchAdvance").click(function(){
		//alert("2");
		searchAdvanceFn($("#app_lv").val(),$("#cds_name").val());

		return false;
	});
	$("#btnSearchAdvance").click();
	
	
	
//	
//	$("#btnAddCommonDataSet").click(function(){
//		clearCDSFn();
//		$("#btnAddAnother").show();
//		$("#checkboxIsSQL").prop("checked",true);
//		$("#checkboxIsActive").prop("checked",true);
//	    
//	  //Number Only Text Fields.
//		$(".numberOnly").keydown(function (e) {
//			        // Allow: backspace, delete, tab, escape, enter and .
//				
//			        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
//			             // Allow: Ctrl+A, Command+A
//			            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
//			             // Allow: home, end, left, right, down, up
//			            (e.keyCode >= 35 && e.keyCode <= 40)) {
//			                 // let it happen, don't do anything
//			                 return;
//			        }
//			        // Ensure that it is a number and stop the keypress
//			        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
//			            e.preventDefault();
//			        }
//			});
//		
//		
//	});
//	
//	$("#btnSubmit").click(function(){
//		if ($("#action").val() == "add"|| $("#action").val() == "") {
//			//insertFn();
//			insertCDSFn();
//		}else{
//			updateCDSFn();
//		}
//		return false;
//	});
//	
//	$("#btnAddAnother").click(function(){
//		insertCDSFn("saveAndAnother");
//	});
//	
//	$(".btnCancle").click(function() {
//		clearCDSFn();
//	});
//	
//	
//	
	
	
	
	
	
	
	// ------------------- Common Data Set END -------------------
	
	
});