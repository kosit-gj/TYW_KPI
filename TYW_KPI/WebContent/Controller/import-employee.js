$(document).ready(function() {
	

	$("#form_rule_item_all").change(function(){  //"select all" change 
	    $(".from_data_rule").prop('checked', $(this).prop("checked")); //change all ".from_data_rule" checked status
	});
	//".from_data_rule" change 
	$('.from_data_rule').change(function(){ 
	    //uncheck "select all", if one of the listed from_data_rule item is unchecked
	    if(false == $(this).prop("checked")){ //if this item is unchecked
	        $("#form_rule_item_all").prop('checked', false); //change "select all" checked status to false
	    }
	    //check "select all" if all from_data_rule items are checked
	    if ($('.from_data_rule:checked').length == $('.from_data_rule').length ){
	        $("#form_rule_item_all").prop('checked', true);
	    }
	});

		$("#fromEmpWSD").datepicker();
	    $("#fromEmpWSD").datepicker( "option", "dateFormat", "dd-mm-yy" );
	    $("#fromEmpPED").datepicker();
	    $("#fromEmpPED").datepicker( "option", "dateFormat", "dd-mm-yy" );
	    $("#fromEmpAED").datepicker();
	    $("#fromEmpAED").datepicker( "option", "dateFormat", "dd-mm-yy" );
	    $(".ui-datepicker").hide();


    
	
});