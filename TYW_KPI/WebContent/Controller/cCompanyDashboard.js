$(document).ready(function(){
	$(".sparkline").sparkline([10,12,12,9,7], {
	    type: 'bullet'});
	
	//chart1 binding start
	 var s1 = [2, 6, 7, 10];
     var s2 = [7, 5, 3, 2];
     var ticks = ['a', 'b', 'c', 'd'];
      
     plot2 = $.jqplot('chart1', [s1, s2], {
         seriesDefaults: {
             renderer:$.jqplot.BarRenderer,
             pointLabels: { show: true }
         },
         axes: {
             xaxis: {
                 renderer: $.jqplot.CategoryAxisRenderer,
                 ticks: ticks
             }
         }
     });
  
     $('#chart1').bind('jqplotDataHighlight', 
         function (ev, seriesIndex, pointIndex, data) {
             $('#info2').html('series: '+seriesIndex+', point: '+pointIndex+', data: '+data);
         }
     );
          
     $('#chart1').bind('jqplotDataUnhighlight', 
         function (ev) {
             $('#info2').html('Nothing');
         }
     );
	//chart1 binding end
     
   //chart2 binding start
	 var s1 = [2, 6, 7, 10];
     var s2 = [7, 5, 3, 2];
     var ticks = ['a', 'b', 'c', 'd'];
      
     plot2 = $.jqplot('chart2', [s1, s2], {
         seriesDefaults: {
             renderer:$.jqplot.BarRenderer,
             pointLabels: { show: true }
         },
         axes: {
             xaxis: {
                 renderer: $.jqplot.CategoryAxisRenderer,
                 ticks: ticks
             }
         }
     });
  
     $('#chart2').bind('jqplotDataHighlight', 
         function (ev, seriesIndex, pointIndex, data) {
             $('#info2').html('series: '+seriesIndex+', point: '+pointIndex+', data: '+data);
         }
     );
          
     $('#chart2').bind('jqplotDataUnhighlight', 
         function (ev) {
             $('#info2').html('Nothing');
         }
     );
	//chart2 binding end
     
   //chart3 binding start
	 var s1 = [2, 6, 7, 10];
     var s2 = [7, 5, 3, 2];
     var ticks = ['a', 'b', 'c', 'd'];
      
     plot2 = $.jqplot('chart3', [s1, s2], {
         seriesDefaults: {
             renderer:$.jqplot.BarRenderer,
             pointLabels: { show: true }
         },
         axes: {
             xaxis: {
                 renderer: $.jqplot.CategoryAxisRenderer,
                 ticks: ticks
             }
         }
     });
  
     $('#chart3').bind('jqplotDataHighlight', 
         function (ev, seriesIndex, pointIndex, data) {
             $('#info2').html('series: '+seriesIndex+', point: '+pointIndex+', data: '+data);
         }
     );
          
     $('#chart3').bind('jqplotDataUnhighlight', 
         function (ev) {
             $('#info2').html('Nothing');
         }
     );
	//chart3 binding end
     
   //chart4 binding start
	 var s1 = [2, 6, 7, 10];
     var s2 = [7, 5, 3, 2];
     var ticks = ['a', 'b', 'c', 'd'];
      
     plot2 = $.jqplot('chart4', [s1, s2], {
         seriesDefaults: {
             renderer:$.jqplot.BarRenderer,
             pointLabels: { show: true }
         },
         axes: {
             xaxis: {
                 renderer: $.jqplot.CategoryAxisRenderer,
                 ticks: ticks
             }
         }
     });
  
     $('#chart4').bind('jqplotDataHighlight', 
         function (ev, seriesIndex, pointIndex, data) {
             $('#info2').html('series: '+seriesIndex+', point: '+pointIndex+', data: '+data);
         }
     );
          
     $('#chart4').bind('jqplotDataUnhighlight', 
         function (ev) {
             $('#info2').html('Nothing');
         }
     );
	//chart4 binding end
});