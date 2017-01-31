/*#########################  Main Function Data #######################*/
var tokenID= eval("("+localStorage.getItem("tokenID")+")");
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
//Get Data
var getDataFn = function(data) {
	
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
var appraisalLevelFn = function(){
	var data=['Level11','Level22','Level33'];
	var htmlOption="";
	$.each(data,function(index,indexEntry){
		htmlOption+="<option>"+indexEntry+"</option>";
	});
	$("#appraisalLevel").html(htmlOption);
}

var appraisalTypeFn = function(){
	var data=['ทดลองงาน','ประจำปี','รักษาการ'];
	var htmlOption="";
	$.each(data,function(index,indexEntry){
		htmlOption+="<option>"+indexEntry+"</option>";
	});
	$("#appraisalType").html(htmlOption);
}

var periodFrequencyFn = function(){
	var data=['ทุกเดือน','ทุก 3 เดือน','ทุก 6 เดือน','ทุก 12 เดือน'];
	var htmlOption="";
	$.each(data,function(index,indexEntry){
		htmlOption+="<option>"+indexEntry+"</option>";
	});
	$("#periodFrequency").html(htmlOption);
}
var assignFrequencyFn = function(){
	var data=['ครั้งเดียวทุกงวด','ทีละงวด'];
	var htmlOption="";
	$.each(data,function(index,indexEntry){
		htmlOption+="<option>"+indexEntry+"</option>";
	});
	$("#assignFrequency").html(htmlOption);
}


/*#########################  Custom Function Data #######################*/


//Ready to call Function.
$(document).ready(function(){
	
	appraisalLevelFn();
	appraisalTypeFn();
	periodFrequencyFn();
	assignFrequencyFn();
	
	
});
