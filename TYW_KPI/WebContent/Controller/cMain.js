var tokenID= eval("("+localStorage.getItem("tokenID")+")");
//var restfulURL="http://192.168.1.58";
//58.9.74.76
var restfulURL="http://58.9.74.76";
//Global Parameter Start
var galbaMenuObj=[];
//Global Parameter End


//insert usage log
var insertUsageLogFn = function(menu_id){
	
	$.ajax({
		url:restfulURL+"/dqs_api/public/session/log",
		type:"post",
		dataType:"json",
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"menu":menu_id},
		async:false,
		success:function(data){
			if(data['status']==200){
				console.log("insert to log success.");
			}
		}
	});
}


//DropDownList ContactType
var dropDownListContactType = function(){
	$.ajax({
		url:restfulURL+"/dqs_api/public/dqs_maintenance/contact_type",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){

		var html="";	
		html+="<select class=\"form-control input-sm listContactType\" id=\"listContactType\">";
	
		$.each(data,function(index,indexEntry){
						
				html+="<option  value="+indexEntry["contact_type"]+">"+indexEntry["contact_type"]+"</option>";	
				
		});	
		html+="</select>";
		
		$("#contactTypeArea").html(html);
			
		}
	});
};

//Drop Down Operation Report Start
var dropDownListOperation = function(){
	$.ajax({
		url:restfulURL+"/dqs_api/public/dqs_operation_report/operation_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
	
		var html="";	
		html+="<select class=\"form-control input-sm listOperation\" id=\"listOperation\">";
		html+="<option  value=''>All</option>";
		$.each(data,function(index,indexEntry){
			
				html+="<option  value="+indexEntry["operation_id"]+">"+indexEntry["operation_name"]+"</option>";	
			
		});	
		html+="</select>";
		$("#listOperationArea").html(html);
		
		}
	});
};

var dropDownListRegion = function(operation_id){
	$.ajax({
		url:restfulURL+"/dqs_api/public/dqs_operation_report/region_list",
		type:"get",
		dataType:"json",
		async:false,
		data:{operation_id:operation_id},
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
	
	    var html="";	
		html+="<select class=\"form-control input-sm lisRegion\" id=\"lisRegion\">";
		$.each(data,function(index,indexEntry){
					
			
				html+="<option  value="+indexEntry["region"]+">"+indexEntry["regdesc"]+"</option>";	
				
		});	
		html+="</select>";
		$("#listRegionArea").html(html);
		
		}
	});
};
var dropDownListDistrict = function(region){
	$.ajax({
		url:restfulURL+"/dqs_api/public/dqs_operation_report/district_list",
		type:"get",
		dataType:"json",
		async:false,
		data:{region:region},
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
	
		var html="";	
		html+="<select class=\"form-control input-sm listDistrict\" id=\"listDistrict\">";
		$.each(data,function(index,indexEntry){
			
				html+="<option selected value="+indexEntry["dist"]+">"+indexEntry["distdesc"]+"</option>";			
					
		});	
		html+="</select>";
		$("#listDistrictArea").html(html);
		
		}
	});
};

var dropDownListBranch = function(dist){
	
	$.ajax({
		url:restfulURL+"/dqs_api/public/dqs_operation_report/branch_list",
		type:"get",
		dataType:"json",
		data:{dist:dist},
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
	
		var html="";	
		html+="<select class=\"form-control input-sm listBranch\" id=\"listBranch\">";
		$.each(data,function(index,indexEntry){
			
				html+="<option  value="+indexEntry["brcd"]+">"+indexEntry["desc"]+"</option>";	
				
		});	
		html+="</select>";
		$("#listBranchArea").html(html);
		
		}
	});
};
var dropDownListYear = function(id){
	
		var currentTime = new Date();
		var year = currentTime.getFullYear();
		var html="";	
		html+="<select class=\"form-control input-sm listYear\" id=\"listYear\">";
		for(var i=year; i>=1913;i--){
			
			html+="<option>"+i+"</option>";
			
		}
		html+="</select>";
		$("#listYearArea").html(html);
		
	
};
var dropDownListMonth = function(id){

	
	    var data=[{"id":"1","name":"มกราคม"},
	              {"id":"2","name":"กุมภาพันธ์"},
	              {"id":"3","name":"มีนาคม"},
	              {"id":"4","name":"เมษายน"},
	              {"id":"5","name":"พฤษภาคม"},
	              {"id":"6","name":"มิถุนายน"},
	              {"id":"7","name":"กรกฎาคม"},
	              {"id":"8","name":"สิงหาคม"},
	              {"id":"9","name":"กันยายน"},
	              {"id":"10","name":"ตุลาคม"},
	              {"id":"11","name":"พฤศจิกายน"},
	              {"id":"12","name":"ธันวาคม"},
	              ];
		var html="";	
		html+="<select class=\"form-control input-sm listMonth\" id=\"listMonth\">";
		$.each(data,function(index,indexEntry){
			if(id==indexEntry["id"]){
				html+="<option selected value="+indexEntry["id"]+">"+indexEntry["name"]+"</option>";			
			}else{
				html+="<option  value="+indexEntry["id"]+">"+indexEntry["name"]+"</option>";	
			}		
		});	
		html+="</select>";
		$("#listMonthArea").html(html);
		
	
};
//Drop Down Operation Report End

//check value not null
var notNullFn = function(data){
	var dataNotNull="";
	if((data == '0' || data == '' || data == 'undefinided' || data == null )){
		dataNotNull="";
	}else{
		dataNotNull=data;
	}
	return dataNotNull;
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
var searchFn = function(searchID,tableID){
	
	// Declare variables
	  var input, filter, table, tr, td,id2,id3, i;
	  input = document.getElementById(searchID);
	  filter = input.value.toUpperCase();
	  table = document.getElementById(tableID);
	  tr = table.getElementsByTagName("tr");

	  // Loop through all table rows, and hide those who don't match the search query
	  for (i = 0; i < tr.length; i++) {
	    td = tr[i].getElementsByTagName("td")[0];
	    if (td) {
		      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
		        tr[i].style.display = "";
		      } else {
		        tr[i].style.display = "none";
		      }
	    }
	  }
	  
	 
	
};

var searchMultiFn=function(search){

	 var search = search.trim().toLowerCase();
	 $(".rowSearch").hide();
     $.each( $(".rowSearch"),function(index1,indexEntry1){
    	 console.log(indexEntry1);	
    	 var i=0;
    	 $.each($(".columnSearch",this),function(index2,indexEntry2){
    		 //console.log($(indexEntry2).text());
    		 console.log($(indexEntry2).text().indexOf(search));
    		 if($(indexEntry2).text().trim().toLowerCase().indexOf(search)>=0){
    			 $(this).parent().show();
    			 return false;
    		 }
    	 });
     });
}

var firstDayInMonthFn = function(){
	var d = new Date();
	var month = d.getMonth()+1;
	var day = d.getDate();
	
	var output = d.getFullYear() + '-' +
	    ((''+	month).length<2 ? '0' : '') + month + '-01';
	   
	console.log(output);
	return output;
}
var currentDateFn = function(){
	var d = new Date();
	var month = d.getMonth()+1;
	var day = d.getDate();
	
	var output = d.getFullYear() + '-' +
	    ((''+month).length<2 ? '0' : '') + month + '-';
	    if(day==1){
	    	output+= ((''+day).length<2 ? '0' : '') + day;
	    }else{
	    	 output+= ((''+day).length<2 ? '0' : '') + (day-1);	
	    }
	
	console.log(output);
	return output;
}

var getPastMonthTH = function(){
	var dataReturn;
	var monthTH=["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน",
	             "พฤษาภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน",
	             "ตุลาคม","พฤจิกายน","ธันวาคม"];
	
	var d = new Date();
	var month = d.getMonth();
	var year =d.getFullYear()+543;
	
	if(month==0){
		dataReturn=monthTH[11]+" "+(year-1);
	}else{
		dataReturn=monthTH[month]+" "+year
	}
	return dataReturn;
	
}



if(tokenID==null){
	window.location.href = "login.html"; 
};

$( document ).ajaxStart(function() {
	$("body").mLoading();
});
$( document ).ajaxStop(function() {
	$("body").mLoading('hide');
});
//$.ajaxSetup({ cache: false });

var checkSession = function(){
	$.ajax({
		url:restfulURL+"/dqs_api/public/session",
		type:"GET",
		dataType:"json",
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
		
			if(data['status']!="200"){
				window.location.href = "login.html"; 
			}else{
				$("#mainContent").show();
				$("#fullName").html(tokenID.data['full_name']);
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
		    if('error'==textStatus){
		    	window.location.href = "login.html"; 
		    }
		}
		
	});
}
checkSession();

var logoutFn = function(){
	$.ajax({
		url:restfulURL+"/dqs_api/public/session",
		type:"DELETE",
		dataType:"json",
		headers:{Authorization:"Bearer "+tokenID.token},
		//data:{token:tokenID.token},
		success:function(data){
			
			//console.log(data);
			if(data['status']=="200"){
			
				window.location.href = "login.html"; 
				localStorage.setItem("tokenID","{}");
				
			}
			
			
		},
		error: function(jqXHR, textStatus, errorThrown) {
		    //alert(jqXHR.status);
		    //alert(textStatus);
		    if('error'==textStatus){
		    	window.location.href = "login.html"; 
		    	
		    }
		    //alert(errorThrown);
		   // console.log(jqXHR);
		}
	});
}

$("#logOut").click(function(){
	logoutFn();
});

var getMainMenu = function(role_id){
	//galbaMenuObj
	$.ajax({
		url:restfulURL+"/dqs_api/public/dqs_role/"+role_id+"/authorize",
		type:"GET",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			//console.log(data);
			galbaMenuObj=data;
		}
	});
};
//getMainMenu(1);

var listMenuFn = function(){
	
	var DQManagementMenuCate="";
	var DQMonitoringMenuCate="";
	var reportMenuCate="";
	
	$.each(tokenID.data.menu,function(index,indexEntry){
		//console.log(indexEntry['menu_id']);
		if(indexEntry['app_url']!=null){
			var URLNotExtension=indexEntry['app_url'].split(".");
			URLNotExtension=URLNotExtension[0];
			
			//console.log(indexEntry['menu_category']);
			//console.log(indexEntry['role_active']);//menu_category
			if(indexEntry['menu_category']=="MM"){
				DQManagementMenuCate+="<li><a class=\"mainMenu\" id=\"menu-"+indexEntry['menu_id']+"\" href=\"#/pages/"+URLNotExtension+"\"><div class=\"menu_name\">"+indexEntry['menu_name']+"</div><div class=\"app_url app_url_hidden\">"+indexEntry['app_url']+"</div></a></li>";
			}else if(indexEntry['menu_category']=="MN"){
				DQMonitoringMenuCate+="<li><a class=\"mainMenu\" id=\"menu-"+indexEntry['menu_id']+"\" href=\"#/pages/"+URLNotExtension+"\"><div class=\"menu_name\">"+indexEntry['menu_name']+"</div><div class=\"app_url app_url_hidden\">"+indexEntry['app_url']+"</div></a></li>";
			}else if(indexEntry['menu_category']=="RP"){
				reportMenuCate+="<li><a class=\"mainMenu\" id=\"menu-"+indexEntry['menu_id']+"\" href=\"#/pages/"+URLNotExtension+"\"><div class=\"menu_name\">"+indexEntry['menu_name']+"</div><div class=\"app_url app_url_hidden\">"+indexEntry['app_url']+"</div></a></li>";
			}
		}
	});
	$("#DQManagementMenuCate").html(DQManagementMenuCate);
	$("#DQMonitoringMenuCate").html(DQMonitoringMenuCate);
	$("#reportMenuCate").html(reportMenuCate);
	//console.log(tokenID.data.menu);
};
listMenuFn();

var callFlashSlide = function(text){
	
		//setTimeout(function(){
		$("#slide_status").html(text).slideDown("slow");
		//},1000);
		setTimeout(function(){
			$("#slide_status").slideUp();
		},3000);
}
var callFlashSlideInModal =function(text,id){
	if(id!=undefined){
		$(id).html(text).show();
	}else{
		$("#information").html(text).show();
	}
	
	setTimeout(function(){
		if(id!=undefined){
			$(id).hide("slow");
		}else{
			$("#information").hide("slow");
		}
	},2000);
}

var includeFileFn = function(paramUrl){
	
	$.ajax({
		url:paramUrl,
		type:"GET",
		dataType:"html",
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			//console.log(data);
			$("#includePage").html(data);
		},
		error: function(jqXHR, textStatus, errorThrown) {
		    if('error'==textStatus){
		    	window.location.reload(true);
		    }
		    //alert(errorThrown);
		   // console.log(jqXHR);
		}
		
	});
}



$(".mainMenu").click(function(){
	$("ul.dropdown-menu li").removeClass("active");
	$(this).parent().addClass("active");
	var menu_id=this.id
	menu_id=menu_id.split("-");
	menu_id=menu_id[1];
	insertUsageLogFn(menu_id);
	
});
$("#btnHome").click(function(){
	window.location.replace("./");
	//location.reload();
});

var app = angular.module("myApp", ["ngRoute"]);



app.config(function($routeProvider) {
	$routeProvider
	.when("/", {
        templateUrl : "home.html"
    })
    .when("/pages/:url", {
        templateUrl : "home.html",
        controller:"pageController"
    	
    })
    
    .otherwise({
    	templateUrl : "home.html"
    });
});

app.controller("pageController",function($scope, $route, $routeParams){

	$route.current.templateUrl = './Views/' + $routeParams.url + ".html";
	//$route.current.controller = $routeParams.url;
	  $.get($route.current.templateUrl, function (data){
	      // console.log(data);
	       $("#includePage").html(data);
	      // $("#naviLabelMenu").html("<i class=\"fa fa-share-alt\"></i> "+menuName+"");
	   	   $("#naviTitle").show();
	    });
});
















