/*#########################  Main Function Data #######################*/
//Global variable
var globalData=[];

//Get Data
var getDataFn = function(page,rpp) {
	
	
	var appraisal_level_id = $("#embed_appraisal_level_id").val();
	var structure_id= $("#embed_structure_id").val();
	var perspective_id= $("#embed_perspective_id").val();
	var appraisal_item_id= $("#embed_appraisal_item_id").val();
	

	$.ajax({
		url:restfulURL+"/tyw_api/public/appraisal_item",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{
			"page":page,
			"rpp":rpp,
			"appraisal_level_id":appraisal_level_id,
			"structure_id":structure_id,
			"perspective_id":perspective_id,
			"appraisal_item_id":appraisal_item_id
			
		},
		success:function(data){
			
			
			listDataFn(data['group']);
			globalData=data;
			//paginationSetUpFn(1,1,1);
			paginationSetUpFn(globalData['current_page'],globalData['last_page'],globalData['last_page']);
			$(".result_area").show();
		}
	})
	
};


//Embed Parameter 
var embedParam = function(id){
	
}


var displayTypeFn  = function(dataValue,dataType){
	
	//console.log(dataType);
	var displayType="";	
	
	if(dataType=="text"){
		displayType= dataValue;
	}else if(dataType=="checkbox"){
		if(dataValue==1){
			displayType= "<input checked type='checkbox' id='' name='' disabled='disabled'>";
		}else{
			displayType= "<input type='checkbox' id='' name='' disabled='disabled'>";
		}
	}
	return displayType;
}

//List Data
var listDataFn = function(data) {
	
	var  mainContentHTML="";
	$.each(data,function(index,indexEntry){
		//console.log(index);
		//structure_id
		mainContentHTML+="<div class=\"row\">";
		mainContentHTML+="	<div class=\"col-lg-12\">";
		mainContentHTML+="  	<div class=\"ibox-title2\">";
		mainContentHTML+=" 			<input type='hidden' name='structure_name' class='' value='"+index+"'>";
		mainContentHTML+=" 			<input type='hidden' name='structure_id' class='' value='"+indexEntry['structure_id']+"'>";
		mainContentHTML+="          <b style='position:relative;top:7px'>"+index+"</b>&nbsp;&nbsp;<button style='float:right;' data-toggle=\"modal\" data-target=\"#modal-"+indexEntry['form_url']+"\" id=\"btnAddKPI\" class=\"btn btn-info input-sm\" type=\"button\"><i class=\"fa fa-plus-square\"></i>&nbsp;Add "+index+"</button>";
		mainContentHTML+="      </div>";
				
		mainContentHTML+="		<div class=\"ibox-content\">";
		mainContentHTML+="          	<div class=\"table-responsive\">";
		mainContentHTML+="         		<table class=\"table table-striped\" id=\"\">";
        		
		mainContentHTML+="                  <thead>";
		mainContentHTML+="                      <tr>";
		$.each(indexEntry['columns'],function(columns,columnsEntry){
		mainContentHTML+="                          <th >"+columnsEntry['column_display']+"</th>";
		});
		
		/*
		mainContentHTML+="                          <th  style='width:20%'>Appraisal Level </th>";
		mainContentHTML+="                          <th  style='width:20%'>Structure</th>";
		mainContentHTML+="                          <th  style='width:15%'>Perspective</th>";
		mainContentHTML+="                          <th  style='width:10%'>UOM</th>";
		mainContentHTML+="                       	<th  style='width:10%'>IsActive</th>";
		*/
		
		mainContentHTML+="                          <th style='width:10%; text-align:center;'>Manage</th>";
		mainContentHTML+="                      </tr>";
		mainContentHTML+="                  </thead>";
		mainContentHTML+="                  <tbody>";
		
		
		$.each(indexEntry['items'],function(items,itemsEntry){
		
		mainContentHTML+="                  	<tr>";
		$.each(indexEntry['columns'],function(columns,columnsEntry){
		//mainContentHTML+="                			<td>"+itemsEntry[columnsEntry['column_name']]+"</td>";
		
		if(columnsEntry['data_type']=="number"){
			mainContentHTML+="                			<td>"+itemsEntry[columnsEntry['column_name']]+"</td>";
		}else{
			mainContentHTML+="                			<td>"+displayTypeFn(itemsEntry[columnsEntry['column_name']],columnsEntry['data_type'])+"</td>";
		}
		});
		mainContentHTML+="         					<td style=\"text-align:center\">";
		mainContentHTML+="            				<i data-content=\"&lt;button class='btn btn-warning btn-xs btn-gear edit' id=edit-"+itemsEntry['appraisal_item_id']+"-"+itemsEntry['app_url']+" data-target=#addModalRule data-toggle='modal'&gt;Edit&lt;/button&gt;&nbsp;&lt;button id=del-"+itemsEntry['appraisal_item_id']+" class='btn btn-danger btn-xs btn-gear del'&gt;Delete&lt;/button&gt;\" data-placement=\"top\" data-toggle=\"popover\" data-html=\"true\" class=\"fa fa-cog font-gear popover-edit-del\" data-original-title=\"\" title=\"\"></i>";
		mainContentHTML+="          				</td>";
		
		mainContentHTML+="           			</tr>";
		});
                          	
		mainContentHTML+="             </tbody>";
		mainContentHTML+="           </table>";
		mainContentHTML+="          </div>";
		mainContentHTML+="</div>";
		mainContentHTML+="</div>";
		mainContentHTML+="</div>";
		
	});
	
	$("#main_conntent_list_data").html(mainContentHTML);
	

	$(".popover-edit-del").popover();
	$("#main_conntent_list_data").off("click",".popover-edit-del");
	$("#main_conntent_list_data").on("click",".popover-edit-del",function(){
		//Delete Start
		$(".del").on("click",function() {
			
			var id=this.id.split("-");
			id=id[1];
			$("#confrimModal").modal();
			$(this).parent().parent().parent().children().click();
			$(document).off("click","#btnConfirmOK");
			$(document).on("click","#btnConfirmOK",function(){
				//alert(id);
				deleteFn(id);
				
			});
			
		});
		//findOne Start
		$(".edit").on("click",function() {
			var edit=this.id.split("-");
			var id=edit[1];
			var form_url=edit[2];
			//alert(id+"-----"+form_url);
			findOneFn(id,form_url);
			$(this).parent().parent().parent().children().click();
		});
	});	
	
};



//Delete
var deleteFn = function(id) {
	
	 $.ajax({
      url:restfulURL+"/tyw_api/public/appraisal_item/"+id,
      type:"DELETE",
      dataType:"json",
	  headers:{Authorization:"Bearer "+tokenID.token},
	  success:function(data){ 
		if(data['status']==200){
			
			   callFlashSlide("Delete Successfully.");       
		       getDataFn($("#pageNumber").val(),$("#rpp").val());
			   $("#confrimModal").modal('hide');
			   
		}else if(data['status']=="400"){
			
			callFlashSlide(validationFn(data),"error");  
			
		}
     }
   });
};


//set paginate local start
var paginationSetUpFn2 = function(pageIndex,pageButton,pageTotal){
	if(pageTotal==0){
		pageTotal=1
	}
	$('.pagination_top2,.pagination_bottom2').off("page");
	$('.pagination_top2,.pagination_bottom2').bootpag({
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
		if($("#rpp2").val()==undefined){
			rpp=10;
		}else{
			rpp=$("#rpp2").val();
			
		}
		
		//findOneFn($("#validate_header_id").val(),num,rpp);
		cdsGetFn(num,rpp);
		
	    $(".pagingNumber2").remove();
	    var htmlPageNumber= "<input type='hidden' id='pageNumber2' name='pageNumber2' class='pagingNumber2' value='"+num+"'>";
	    
	    $("#paramPagingCDS").append(htmlPageNumber);
	   
	}); 

	$(".countPagination2").off("change");
	$(".countPagination2").on("change",function(){

		$("#countPaginationTop2").val($(this).val());
		$("#countPaginationBottom2").val($(this).val());
		
		//getDataFn(1,$(this).val());
		
		cdsGetFn(1,$(this).val());
		
		$(".rpp2").remove();
	    var htmlRrp= "<input type='hidden' id='rpp2' name='rpp2' class='rpp2' value='"+$(this).val()+"'>";
	    $("#paramPagingCDS").append(htmlRrp);
	});
}
//set paginate local end

//Search for Edit. 

var findOneFn = function(id,form_url) {
	$.ajax({
	      url:restfulURL+"/tyw_api/public/appraisal_item/"+id,
	      type:"GET",
	      dataType:"json",
		  headers:{Authorization:"Bearer "+tokenID.token},
		  success:function(data){ 
			$("#modal-"+form_url).modal();
			if(form_url=="quantity"){
				
				initailQuantityFormFn('edit',data['structure_id'],data['structure_name'],data);
				
			}else if(form_url=="quality"){
				
				initailQualityFormFn('edit',data['structure_id'],data['structure_name'],data);
				
			}else if(form_url=="deduct"){
				
				initailDeductScoreFormFn('edit',data['structure_id'],data['structure_name'],data);
				
			}
			
			
		}
	});
}
//SearchAdvance
var searchAdvanceFn = function() {
	/*
	appraisal_level_id,
	structure_id,
	perspective_id,
	appraisal_item_id
	*/
	
	$(".embed_param_search").remove();
	
	var apraisalItemId=$("#appraisalItemName").val().split("-");
	apraisalItemId=apraisalItemId[0];
	var embedParam="";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_appraisal_level_id' name='embed_appraisal_level_id' value='"+$("#appraisalLevel").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_structure_id' name='embed_structure_id' value='"+$("#structure").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_perspective_id' name='embed_perspective_id' value='"+$("#perspective").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_appraisal_item_id' name='embed_appraisal_item_id' value='"+apraisalItemId+"'>";
	$("#embedParamSearch").append(embedParam);
	
	getDataFn();
};
/*#########################  Main Function Data #######################*/
/*#########################  Custom Function Data #######################*/
var appraisalLevelListFn = function(nameArea,id){
	
	if(nameArea==undefined){
		nameArea="";
	}
	
	$.ajax({
		url:restfulURL+"/tyw_api/public/appraisal_item/al_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['appraisal_level_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['appraisal_level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['appraisal_level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
					
				}
			});
			$("#appraisalLevel"+nameArea).html(htmlOption);
		}
	});
}
//Perspective List
var perspectiveListFn = function(nameArea,id){
	
	
	if(nameArea==undefined){
		nameArea="";
	}
	
	
	$.ajax({
		url:restfulURL+"/tyw_api/public/appraisal_item/perspective_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			
			var htmlOption="";
			
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['perspective_id']){
					htmlOption+="<option selected value='"+indexEntry['perspective_id']+"'>"+indexEntry['perspective_name']+"</option>";
				}else{
					htmlOption+="<option value='"+indexEntry['perspective_id']+"'>"+indexEntry['perspective_name']+"</option>";
				}
				
			});
			$("#perspective"+nameArea).html(htmlOption);
			
		}
	})

}
//http://192.168.1.52/tyw_api/public/appraisal_item/uom_list
var uomListFn = function(nameArea,id){
	if(nameArea==undefined){
		nameArea="";
	}

	$.ajax({
		url:restfulURL+"/tyw_api/public/appraisal_item/uom_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['uom_id']){
					htmlOption+="<option selected value='"+indexEntry['uom_id']+"'>"+indexEntry['uom_name']+"</option>";
				}else{
					htmlOption+="<option  value='"+indexEntry['uom_id']+"'>"+indexEntry['uom_name']+"</option>";
					
				}
			});
			$("#uom"+nameArea).html(htmlOption);
			
		}
	});
	
}

//Structure List
var structureListFn = function(nameArea){
	/*
	    "structure_id": 2,
        "structure_name": "Competency"
	 */
	
	if(nameArea==undefined){
		nameArea="";
	}
	
	$.ajax({
		url:restfulURL+"/tyw_api/public/appraisal_item/structure_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			
			var htmlOption="";
			htmlOption+="<option value=''>All</option>";
			$.each(data,function(index,indexEntry){
				htmlOption+="<option value='"+indexEntry['structure_id']+"'>"+indexEntry['structure_name']+"</option>";
			});
			$("#structure"+nameArea).html(htmlOption);
			
		}
	})

}

/*#########################  Custom Function Data #######################*/


//Ready to call Function.
$(document).ready(function(){
	
	
	
	//load form start
	
//	$.ajax({
//		url:"../Form/deduct-score.html",
//		type:"get",
//		dataType:"html",
//		async:false,
//		headers:{Authorization:"Bearer "+tokenID.token},
//		success:function(data){
//			$('#include_deduct_score').html(data);
//		}
//	});
//	$.ajax({
//		url:"../Form/quality.html",
//		type:"get",
//		dataType:"html",
//		async:false,
//		headers:{Authorization:"Bearer "+tokenID.token},
//		success:function(data){
//			$('#include_quality').html(data);
//		}
//	});
//	$.ajax({
//		url:"../Form/quantity.html",
//		type:"get",
//		dataType:"html",
//		async:false,
//		headers:{Authorization:"Bearer "+tokenID.token},
//		success:function(data){
//			$('#include_quantity_form').html(data);
//		}
//	});
	
	
	$('#include_deduct_score').load('../Form/deduct-score.html');
	$('#include_quality').load('../Form/quality.html');
	$('#include_quantity_form').load('../Form/quantity.html');
	//load form  end
	
	//parameter start
	appraisalLevelListFn();
	perspectiveListFn();
	structureListFn();
	//parameter end
	
	
	

	//Autocomplete Search Start

	$("#appraisalItemName").autocomplete({
        source: function (request, response) {
        	$.ajax({
				 url:restfulURL+"/tyw_api/public/appraisal_item/auto_appraisal_name",
				 type:"post",
				 dataType:"json",
				 headers:{Authorization:"Bearer "+tokenID.token},
				 data:{"appraisal_item_name":request.term,"perspective_id":$("#perspective").val(),"appraisal_level_id":$("#appraisalLevel").val(),"structure_id":$("#structure").val()},
				 //async:false,
                 error: function (xhr, textStatus, errorThrown) {
                        console.log('Error: ' + xhr.responseText);
                    },
				 success:function(data){
						response($.map(data, function (item) {
                            return {
                                label: item.appraisal_item_id+"-"+item.appraisal_item_name,
                                value: item.appraisal_item_id+"-"+item.appraisal_item_name
                            };
                        }));
				},
				beforeSend:function(){
					$("body").mLoading('hide');	
				}
				
				});
        }
    });
	//Autocomplete Search End
	 
	//Search Start
	$("#btnSearchAdvance").click(function(){
		
		searchAdvanceFn();
	});
	//$("#btnSearchAdvance").click();
	//Search End
	
	
	
});
