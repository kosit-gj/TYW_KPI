 $(document).ready(function(){
    	
    	
    	
    	//alert(createTableFn());
    	var options={
    			"colunms":[
    			           {"colunmsDisplayName":"Connection Name","width":"20%","id":"connection_name","colunmsType":"text"},
    			           {"colunmsDisplayName":"Database Type","width":"65%","id":"database_type","colunmsType":"text"},
    			          ],
    			"form":[{
    					"label":"Connection Name","inputType":"text","default":"DefultText",
    					"id":"connection_name","width":"350px","required":true,
    					},
    			        {
    					"label":"Database Type","inputType":"dropdown","default":"All",
    					"id":"database_type_id","width":"250px","url":""+restfulURL+"/tyw_api/public/database_connection/db_type_list","required":true
    					},
    			        {
    					"label":"IP Address","inputType":"text","default":"All",
    					"id":"ip_address","width":"350px"
    					},
    			        {
    					"label":"Port","inputType":"text","default":"All",
    					"id":"port","width":"250px"
    					},
    			        {
    					"label":"Database Name","inputType":"text","default":"All",
    					"id":"database_name","width":"350px"
    					},
    			        {
    					"label":"User","inputType":"text","default":"All",
    					"id":"user_name","width":"250px"
    					},
    			        {
    					"label":"Password","inputType":"text","default":"All",
    					"id":"password","width":"250px"
    					},
    					{
        					"label":"Test","inputType":"checkbox","default":"1",
        					"id":"test","width":"250px"
        					}
    					
    			     ],
    			 "formDetail":{"formSize":"modal-dialog","formName":"Database Connection","id":"databaseConnection","pk_id":"connection_id"},       
    			 "serviceName":[restfulURL+"/tyw_api/public/database_connection"],
    			 "tokenID":tokenID,
    			 "pagignation":true,
    			 "expressSearch":false
    	}
    	console.log(options['tokenID'].token);
    	createDataTableFn(options);
    	
    	
    	//advance search start
    	
    	
    	
    	//advance search end
    	
    	
    	
    });