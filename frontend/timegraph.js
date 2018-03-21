
// Get the data
function drawTime(containerSelector, data) {

	// Remove previous info so we can reinstantiate the chart
	d3.selectAll(".svgTime").remove();

	// Hardcoded begin and enddate for the graph
	var beginDate = 1970,
		endDate = 2015;

	var container = d3.select(containerSelector);
	// set the dimensions and margins of the graph
	var testing = containerSelector.width;
	var margin = {top: 50, right: 20, bottom: 350, left: 50},
	    width = d3.select(".svg2").node().getBoundingClientRect().width - margin.right*4,
	    height = container.node().getBoundingClientRect().height - margin.top*3;

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
	  .call(d3.axisBottom(x));

	// Add the Y Axis
	svg.append("g")
	  .call(d3.axisLeft(y));

	// add title for graph
	svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text("Number of casualties per year");

};

var lineData = [{
  year: 2001,
  close: 5
}, {
  year: 2002,
  close: 20
}, {
  year: 2003,
  close: 10
}, {
  year: 2004,
  close: 40
}, {
  year: 2005,
  close: 5
}, {
  year: 2006,
  close: 60
}];

// Timegraph request dictionary with static start and end
var timeDict = {0:{1:true, 2:true, 3:true, 4:true, 5:true, 6:true, 7:true, 8: true, 9:true},
				  1:{1:true, 2:true, 3:true, 4:true, 5:false, 6:true, 7:true, 8: true, 9:true, 10:true, 11:true, 12:true, 13:true, 14:true, 15:true, 16:true, 17: true, 18:true, 19: true, 20: true, 21: true, 22: true},
				  2:{1:true, 2:true, 3:true, 4:true, 5:true, 6:true, 7:true, 8: true, 9:true, 10:true, 11:true, 12:true, 13:true},
				  3:{1:true, 2:true, 3:true, 4:true, 5:true, 6:true, 7:true, 8: true, 9:true, 10:true, 11:true, 12:true, 13:true, 14: true},
				  4:{1:true, 2:true, 3:true, 4:true, 5:true},
					"time" : {"start" : 1970, "end" : 2015},
					"type": "time"};
