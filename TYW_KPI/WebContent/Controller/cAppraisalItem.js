/*#########################  Main Function Data #######################*/
//Global variable
var golbalData=[];

//Get Data
var getDataFn = function(page,rpp) {
	
};

//Embed Parameter 
var embedParam = function(id){
	
}

//List Data
var listDataFn = function(data) {
	
};

//List Error Function Start
var listErrorFn =function(data){
	
}
//Insert
var insertFn = function() {
	
}
//Update
var updateFn = function() {
	
};

//Delete
var deleteFn = function() {
	
};
//Cleaning
var clearFn = function(){
	
}
//Search for Edit. 
var findOneFn = function(id) {
	
}
//SearchAdvance
var searchAdvanceFn = function() {
	
};
/*#########################  Main Function Data #######################*/
/*#########################  Custom Function Data #######################*/
var appraisalLevelListFn = function(){
	
	$.ajax({
		url:restfulURL+"/tyw_api/public/appraisal_item/al_list",
		type:"get",
		dataType:"json",
		async:false,
		success:function(data){
			console.log(data);
		}
	})
//	var exLevel=['Level11','Level22','Level33'];
//	var htmlOption="";
//	$.each(exLevel,function(index,indexEntry){
//		htmlOption+="<option>"+indexEntry+"</option>";
//	});
	//$("")
}
//Perspective List
var perspectiveListFn = function(){
	
	$.ajax({
		url:restfulURL+"/tyw_api/public/appraisal_item/perspective_list",
		type:"get",
		dataType:"json",
		async:false,
		success:function(data){
			console.log(data);
		}
	})

}


//List Data
var listDataKPIFn = function(data) {
	var rows="";
	$.each(data,function(index,indexEntry){
		rows+="<tr>";
			rows+="<td>"+indexEntry[0]+"</td>";
			rows+="<td>"+indexEntry[1]+"</td>";
			rows+="<td>"+indexEntry[2]+"</td>";
			rows+="<td>"+indexEntry[3]+"</td>";
			rows+="<td>";
			rows+="	"+indexEntry[4]+"";
			rows+="</td>";
			rows+="<td><input type=\"checkbox\"></td>";
			rows+="<td style=\"text-align:center\">";
			rows+="<i title=\"\" data-original-title=\"\" class=\"fa fa-cog font-gear popover-edit-del\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\"&lt;button class='btn btn-warning btn-xs btn-gear edit' id=1 data-target=#addModalRule data-toggle='modal'&gt;Edit&lt;/button&gt;&nbsp;&lt;button id=1 class='btn btn-danger btn-xs btn-gear del'&gt;Delete&lt;/button&gt;\"></i>";
			rows+="</td>";
		rows+="	</tr>";
	});
	//alert(rows);
	$("#listKPI").html(rows);
};
//Get Data
var getDataKPIFn = function() {
	var data=[['ยอดขายสุทธิ 5,000,000,000','ระดับเจ้าหน้าที่','ผลการปฏิบัติงาน(KPI)','Financial','%' ,'1'],
	          ['ยอดขายสุทธิ 5,000,000,000','ระดับเจ้าหน้าที่','ผลการปฏิบัติงาน(KPI)','Financial','%' ,'1'],
	          ['ยอดขายสุทธิ 5,000,000,000','ระดับเจ้าหน้าที่','ผลการปฏิบัติงาน(KPI)','Financial','%' ,'1'],
	          ['ยอดขายสุทธิ 5,000,000,000','ระดับเจ้าหน้าที่','ผลการปฏิบัติงาน(KPI)','Financial','%' ,'1'],
	          ['ยอดขายสุทธิ 5,000,000,000','ระดับเจ้าหน้าที่','ผลการปฏิบัติงาน(KPI)','Financial','%' ,'1']];
	
	listDataKPIFn(data);
};

/*#########################  Custom Function Data #######################*/


//Ready to call Function.
$(document).ready(function(){
	//parameter start
	appraisalLevelListFn();
	perspectiveListFn();
	//parameter end
	
	getDataKPIFn();
	
});
