
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
	var svg_height = element.parent().height();
	var svg_width = element.parent().width();
	var chart_height = svg_height - 60; // margin top: 20 margin bottom: 20
	var chart_width = svg_width - 60; // margin-left: 20 margin-right: 20
	var xPadding = 30;
	var yPadding = 30;
  var svg = d3.select(element[0])
    .append("svg")
    .attr('width', parseInt(svg_width))
    .attr('height', parseInt(svg_height))
		.style('background-color', '#ffffff')
		.append('g').attr('transform', 'translate(30,30)');



  scope.$watch('data', function(newVal, oldVal) {
		svg.selectAll('*').remove();
		if (!newVal) {
			console.log('here');
			return;
		}
		var realData = newVal.map(function(d,i) {
			console.log('mapping');
			console.log(d);
			var y0 = 0;
			return d.values.map(function(d1, i1) {
				return {
					color: d.color,
					label: d1.label,
					value: d1.value,
					y0: y0,
					y1: y0+= +d1['value']
				}
			});
		});
		console.log('realdata')
		console.log(realData);
		var x = d3.scale.ordinal()
			.domain(realData.map(function(d,i) {
				return d.map(function(d1,i1) {
					console.log(d1.label);
						return d1.label;
				});
			}))
			.rangeRoundBands([0, chart_width], .1);
		console.log('after x');
		console.log(x.domain());
		// var y = d3.scale.linear()
		// 	.rangeRound([chart_height, 0]);
		// var xAxis = d3.svg.axis().scale(x).orient('bottom');
		// var yAxis = d3.svg.axis().scale(y).orient('left').tickFormat(d3.format(".0s"));
		//
		// y.domain([0, d3.max(realData, function (d) {
		// 	console.log('in y.domain 1.max');
		// 	console.log(d);
		// 	return d3.max(d, function(d1) {
		// 		console.log('in y.domain 2.max');
		// 		console.log(d1)
		// 		return parseInt(d1.y0);
		// 	});
		// })]);
		// console.log(x('Virt1'));
		// svg.append('g').attr('class','x-axis').attr('transform', 'translate(0, '+chart_height+')').call(xAxis);
		// svg.append('g').attr('class','y-axis').call(yAxis);
		// var series = svg.selectAll('.series')
		// 	.data(realData)
		// 	.enter()
		// 	.append('g')
		// 	.attr('class', 'series')
		// 	.attr('transform', realData.map(function(d,i) {
		// 		return d.map(function(d1) { return d1.label; })}));

		// series.selectAll('rect')
		// 	.data(function(d) { return d;})
		// 	.enter()
		// 	.append('rect')
		// 	.style('fill', function(d) { console.log(d); return d.color;})
		// 	.attr('width', x.rangeBand())
		// 	.attr('y', function(d) { return y(d.y0);})
		// 	.attr('height', function(d) { return y(d.y0)-y(d.y1);});

	},true);
}


function D3StackedBarChart() {
	console.log('D3StackedBarChart');
	return {
		restrict: 'E',
		terminal: true,
		scope:  {
      data: '=',
			elementId: '@'
		},
   link: createD3Chart
	}
}

dc2Directives.directive('chartStackedBar', [D3StackedBarChart])
