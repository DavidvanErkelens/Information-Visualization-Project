// // set the dimensions and margins of the graph
// var margin = {top: 20, right: 20, bottom: 30, left: 50},
//     width = 960 - margin.left - margin.right,
//     height = 500 - margin.top - margin.bottom;

// // parse the date / time
// var parseTime = d3.timeParse("%d-%b-%y");

// // set the ranges
// var x = d3.scaleTime().range([0, width]);
// var y = d3.scaleLinear().range([height, 0]);

// // define the line
// var valueline = d3.line()
//     .x(function(d) { return x(d.year); })
//     .y(function(d) { return y(d.close); });

// // append the svg obgect to the body of the page
// // appends a 'group' element to 'svg'
// // moves the 'group' element to the top left margin
// var svg = d3.select("body").append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform",
//           "translate(" + margin.left + "," + margin.top + ")");

// // Get the data
// function drawTime(data) {

//   // format the data
//   data.forEach(function(d) {
//       d.date = parseTime(d.date);
//       d.close = +d.close;
//   });

//   // Scale the range of the data
//   x.domain(d3.extent(data, function(d) { return d.date; }));
//   y.domain([0, d3.max(data, function(d) { return d.close; })]);

//   // Add the valueline path.
//   svg.append("path")
//       .data([data])
//       .attr("class", "line")
//       .attr("d", valueline);

//   // Add the X Axis
//   svg.append("g")
//       .attr("transform", "translate(0," + height + ")")
//       .call(d3.axisBottom(x));

//   // Add the Y Axis
//   svg.append("g")
//       .call(d3.axisLeft(y));

// };

// var lineData = [{
//   year: 1,
//   close: 5
// }, {
//   year: 20,
//   close: 20
// }, {
//   year: 40,
//   close: 10
// }, {
//   year: 60,
//   close: 40
// }, {
//   yera: 80,
//   close: 5
// }, {
//   year: 100,
//   close: 60
// }];

// drawTime(lineData)
// 
// var dictionary = {0:{1:true, 2:true, 3:true, 4:true, 5:true, 6:true, 7:true, 8: true, 9:true},
// 				  1:{1:true, 2:true, 3:true, 4:true, 5:false, 6:true, 7:true, 8: true, 9:true, 10:true, 11:true, 12:true, 13:true, 14:true, 15:true, 16:true, 17: true, 18:true, 19: true, 20: true, 21: true, 22: true},
// 				  2:{1:true, 2:true, 3:true, 4:true, 5:true, 6:true, 7:true, 8: true, 9:true, 10:true, 11:true, 12:true, 13:true},
// 				  3:{1:true, 2:true, 3:true, 4:true, 5:true, 6:true, 7:true, 8: true, 9:true, 10:true, 11:true, 12:true, 13:true, 14: true},
// 				  4:{1:true, 2:true, 3:true, 4:true, 5:true},
// 					"time" : {"start" : 1970, "end" : 2015},
// 					"number" : 5};
//
// console.log(dictionary)
