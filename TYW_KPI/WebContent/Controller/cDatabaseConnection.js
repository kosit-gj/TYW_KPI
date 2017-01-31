 $(document).ready(function(){
    	
    	
    	
    	//alert(createTableFn());
    	var options={
    			"colunms":[
    			           {"colunmsDisplayName":"Connection Name","width":"20%","id":"connectionName","colunmsType":"text"},
    			           {"colunmsDisplayName":"Database Type","width":"65%","id":"databaseType","colunmsType":"text"},
    			          ],
    			"form":[{
    					"label":"Connection Name","inputType":"text","default":"DefultText",
    					"id":"connectionName","width":"350px","required":true
    					},
    			        {
    					"label":"Database Type","inputType":"dropdown","default":"All",
    					"id":"databaseType","width":"250px","url":"../Services/databaseType.txt","required":true
    					},
    			        {
    					"label":"IP Address","inputType":"text","default":"All",
    					"id":"ipAddress","width":"350px"
    					},
    			        {
    					"label":"Port","inputType":"text","default":"All",
    					"id":"port","width":"250px"
    					},
    			        {
    					"label":"Database Name","inputType":"text","default":"All",
    					"id":"databaseName","width":"350px"
    					},
    			        {
    					"label":"User","inputType":"text","default":"All",
    					"id":"user","width":"250px"
    					},
    			        {
    					"label":"Password","inputType":"text","default":"All",
    					"id":"password","width":"250px"
    					}
    			     ],
    			 "formDetail":{"formSize":"modal-dialog","formName":"Database Connection","id":"databaseConnection"},       
    			 "serviceName":["http://192.168.1.42:3001/api/tyw_database_connectoin"],
    	}
    	//console.log(options['colunms'][0]);
    	createDataTableFn(options);
    	
    	
    });