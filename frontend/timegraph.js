
// Get the data
function drawTime(containerSelector, data) {

	// Remove previous info so we can reinstantiate the chart
	d3.selectAll(".svgTime").remove();

	// Hardcoded begin and enddate for the graph
	var beginDate = 1970,
		endDate = 2016;

	var container = d3.select(containerSelector);

	// set the dimensions and margins of the graph
	var testing = containerSelector.width;
	var margin = {top: 30, right: 20, bottom: 20, left: 50},
	    width = parseInt(container.style('width'),10) - margin.left - margin.right,
	    height = parseInt(container.style('height'),10) - margin.top - margin.bottom;

	// set the ranges
	var x = d3.scaleLinear().range([0, width]);
	var y = d3.scaleLinear().range([height, 0]);

	// define the line
	var valueline = d3.line()
	    .x(function(d) { return x(d.iyear); })
	    .y(function(d) { return y(d.kills); });

	// Add the actual line graph svg container
	var svg = container.append("svg").attr("class", "svgTime")
	.attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

	// format the data
	data.forEach(function(d) {
	  d.iyear = d.iyear;
	  d.kills = +d.kills;
	});

	// Scale the range of the data
	// x.domain(d3.extent(data, function(d) { return d.year; }));
	x.domain([beginDate, endDate]);
	y.domain([0, d3.max(data, function(d) { return d.kills; })]);

	// Add the valueline path.
	svg.append("path")
	  .data([data])
	  .attr("class", "line")
	  .attr("d", valueline);

	// define the area
	var area = d3.area()
    .x(function(d) { return x(d.iyear); })
    .y0(height)
    .y1(function(d) { return y(d.kills); });

	// add the area
    svg.append("path")
       .data([data])
       .attr("class", "area")
       .attr("d", area);

	// Add the X Axis
	svg.append("g")
	  .attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(x).tickFormat(d3.format("d")));

	// Add the Y Axis
	svg.append("g")
	  .call(d3.axisLeft(y));

	// add title for graph
	svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (10 / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Number of casualties per year");

};

// Timegraph request dictionary with static start and end
var timeDict = {0:{1:true, 2:true, 3:true, 4:true, 5:true, 6:true, 7:true, 8: true, 9:true},
				  1:{1:true, 2:false, 3:false, 4:false, 5:false, 6:false, 7:false, 8: false, 9:false, 10:false, 11:false, 12:false, 13:false, 14:true, 15:false, 16:false, 17: false, 18:false, 19: false, 20: false, 21: false, 22: false},
				  2:{1:false, 2:false, 3:false, 4:false, 5:false, 6:true, 7:false, 8: false, 9:false, 10:true, 11:false, 12:false, 13:false},
				  3:{1:false, 2:false, 3:false, 4:false, 5:false, 6:false, 7:false, 8: false, 9:false, 10:false, 11:false, 12:false, 13:false, 14: false, 15: true},
				  4:{1:true, 2:false, 3:false, 4:false, 5:false},
					"time" : {"start" : 1970, "end" : 2015},
					"ranges": {0: {"start":1, "end":1501}, 1: {"start":0, "end":7367}, 2: {"start":0, "end":501}, 3: {"start":0, "end":201}},
					"type": "time"};
