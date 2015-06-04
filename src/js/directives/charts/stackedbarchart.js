
function D3StackedBarChartController() {
	var self = this;
}

// dc2Directives.controller('navBarController', [navBarController]);

function createD3Chart(scope, element, attrs) {
  console.log('function createD3Chart');
	var margin = 20;
	console.log(element.parent().width());
	console.log(element.parent().height());
	console.log(angular.element(scope.elementId))
	console.log(element.parent());
	var margin = {
		left: 80,
		right: 40,
		top: 30,
		bottom: 30
	};
	var svg_height = element.parent().height();
	var svg_width = element.parent().width();
	var chart_height = svg_height - margin.top - margin.bottom;
	var chart_width = svg_width - margin.left; // margin-left: 20 margin-right: 20
	var xPadding = 30;
	var yPadding = 30;

  scope.$watch('data', function(newVal, oldVal) {
		if (!newVal) {
			console.log('here');
			return;
		}
		nv.addGraph(function() {
			var chart = nv.models.multiBarHorizontalChart();
			chart.stacked(true);
			chart.showControls(false);
			chart.x(function(d) { return d.label; });
			chart.y(function(d) { return d.value; });
			chart.tooltip.enabled(false);
			chart.showValues(true);
			chart.margin(margin);
			d3.select(element[0]).select('svg').remove();
			d3.select(element[0]).append('svg')
				.attr('height', svg_height)
				.attr('width', svg_width)
				.style('background-color','#dddddd')
				.datum(newVal).call(chart);
			return chart;
		});
	},true);
}


function D3StackedBarChart() {
	console.log('D3StackedBarChart');
	return {
		restrict: 'E',
		terminal: true,
		scope:  {
      data: '='
		},
		link: createD3Chart
	}
}

dc2Directives.directive('chartStackedBar', [D3StackedBarChart])
