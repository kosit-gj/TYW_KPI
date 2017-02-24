 $(document).ready(function(){
    	
    	
    	
    	//alert(createTableFn());

    	var options={
    			"colunms":[
    			           {"colunmsDisplayName":"Connection Name","width":"20%","id":"connection_name","colunmsType":"text"},
    			           {"colunmsDisplayName":"Database Type","width":"65%","id":"database_type","colunmsType":"text"},
    			          ],
    			"form":[{
    					"label":"Connection Name","inputType":"text","placeholder":"DefultText",
    					"id":"connection_name","width":"350px","required":true
    					},
    			        {
    					"label":"Database Type","inputType":"dropdown","default":"All",
    					"id":"database_type_id","width":"250px","url":""+restfulURL+"/tyw_api/public/database_connection/db_type_list","required":true
    					},
    			        {
    					"label":"IP Address","inputType":"text","placeholder":"DefultText",
    					"id":"ip_address","width":"350px","dataTypeInput":"number"
    					},
    			        {
    					"label":"Port","inputType":"text","placeholder":"DefultText",
    					"id":"port","width":"250px","dataTypeInput":"number"
    					},
    			        {
    					"label":"Database Name","inputType":"text","placeholder":"DefultText",
    					"id":"database_name","width":"350px"
    					},
    			        {
    					"label":"User","inputType":"text","placeholder":"DefultText",
    					"id":"user_name","width":"250px"
    					},
    			        {
    					"label":"Password","inputType":"password","placeholder":"DefultText",
    					"id":"password","width":"250px"
    					}
    					
    			     ],
			     "advanceSearch":[{
 					"label":"aaa Name0","inputType":"text","placeholder":"DefultText",
 					"id":"connection_name0","width":"100%",
 					"dataTypeInput":"number"
			     	},{
 					"label":"bbb Name1","inputType":"dropdown",
 					"id":"connection_name1","width":"100%",
 					"url":""+restfulURL+"/tyw_api/public/database_connection/db_type_list",
 					"initValue":"All Data1"
 					},{
 					"label":"ccc Name2","inputType":"dropdown",
 					"id":"connection_name2","width":"100%",
 					"url":""+restfulURL+"/tyw_api/public/database_connection/db_type_list",
 					"initValue":"All Data2"
 					}],
 					
    			 "formDetail":{"formSize":"modal-dialog","formName":"Database Connection","id":"databaseConnection","pk_id":"connection_id"},       
    			 "serviceName":[restfulURL+"/tyw_api/public/database_connection"],
    			 "tokenID":tokenID,
    			 "pagignation":false,
    			 "expressSearch":false,
    			 "advanceSearchSet":true,
    			 "btnManageOption":{"id":"BtnID","name":"BtnName"},
    			 "btnAdvanceSearchOption":{"id":"BtnID","name":"<i class=\"fa fa-plus-square\"></i>&nbsp;Btn"}
    	}
    	
    	createDataTableFn(options);
    	
   
    	
    });