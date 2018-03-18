

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin

// Get the data
function drawTime(containerSelector, data) {

	var container = d3.select(containerSelector);
	// set the dimensions and margins of the graph
	var testing = containerSelector.width;
	var margin = {top: 20, right: 20, bottom: 30, left: 50},
	    width = container.node().getBoundingClientRect().width - margin.left - margin.right,
	    height = container.node().getBoundingClientRect().height - margin.top - margin.bottom;

	console.log(container.node().getBoundingClientRect().width)

	// parse the date / time
	// var parseTime = d3.timeParse("%d-%b-%y");

	// set the ranges
	var x = d3.scaleLinear().range([0, width]);
	var y = d3.scaleLinear().range([height, 0]);

	// Define the axes
	// var xAxis = d3.svg.axis().scale(x)
 //    .orient("bottom").ticks(5);

	// var yAxis = d3.svg.axis().scale(y)
 //    .orient("left").ticks(5);

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
	x.domain(d3.extent(data, function(d) { return d.year; }));
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

};

var lineData = [{
  year: "2001",
  close: 5
}, {
  year: "2002",
  close: 20
}, {
  year: "2003",
  close: 10
}, {
  year: "2004",
  close: 40
}, {
  year: "2005",
  close: 5
}, {
  year: "2006",
  close: 60
}];

var dictionary = {0:{1:true, 2:true, 3:true, 4:true, 5:true, 6:true, 7:true, 8: true, 9:true},
				  1:{1:true, 2:true, 3:true, 4:true, 5:false, 6:true, 7:true, 8: true, 9:true, 10:true, 11:true, 12:true, 13:true, 14:true, 15:true, 16:true, 17: true, 18:true, 19: true, 20: true, 21: true, 22: true},
				  2:{1:true, 2:true, 3:true, 4:true, 5:true, 6:true, 7:true, 8: true, 9:true, 10:true, 11:true, 12:true, 13:true},
				  3:{1:true, 2:true, 3:true, 4:true, 5:true, 6:true, 7:true, 8: true, 9:true, 10:true, 11:true, 12:true, 13:true, 14: true},
				  4:{1:true, 2:true, 3:true, 4:true, 5:true},
					"time" : {"start" : 1970, "end" : 2015},
					"number" : 5};

console.log(dictionary)
