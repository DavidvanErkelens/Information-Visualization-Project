

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin

// Get the data
function drawTime(containerSelector, data) {

	var beginDate = 1970,
		endDate = 2015;

	var container = d3.select(containerSelector);
	// set the dimensions and margins of the graph
	var testing = containerSelector.width;
	var margin = {top: 20, right: 20, bottom: 30, left: 50},
	    width = container.node().getBoundingClientRect().width - margin.left - margin.right,
	    height = container.node().getBoundingClientRect().height - margin.top - margin.bottom;

	// parse the date / time
	// var parseTime = d3.timeParse("%y");

	// set the ranges
	var x = d3.scaleLinear().range([0, width]);
	var y = d3.scaleLinear().range([height, 0]);

	// define the line
	var valueline = d3.line()
	    .x(function(d) { return x(d.year); })
	    .y(function(d) { return y(d.close); });

	var svg = container.append("svg").attr("class", "svgTime")
	.attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");

	// format the data
	data.forEach(function(d) {
	  d.year = d.year;
	  d.close = +d.close;
	});

	// Scale the range of the data
	// x.domain(d3.extent(data, function(d) { return d.year; }));
	x.domain([beginDate, endDate]);
	y.domain([0, d3.max(data, function(d) { return d.close; })]);

	// Add the valueline path.
	svg.append("path")
	  .data([data])
	  .attr("class", "line")
	  .attr("d", valueline);

	// Add the X Axis
	svg.append("g")
	  .attr("transform", "translate(0," + height + ")")
	  .call(d3.axisBottom(x));

	// Add the Y Axis
	svg.append("g")
	  .call(d3.axisLeft(y));

	// d3.selectAll(".svgTime").remove();

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

