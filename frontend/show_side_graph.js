
// Function to update the data in the side graphs
function show_side_graph(countries){

  // remove the old graphs
  d3.select(".svg3").remove()
  d3.select(".svg4").remove()

  if(countries.length > 0){

  // get all data for line to send to server
  payload_line = {"start" : dictionary.start , "end" : dictionary.end , "countries" : countries, type : "kills"};

  // send data to server for line graph
  conn.send(JSON.stringify(payload_line));

  // get all data for pie to send to server
  payload_pie = {"type" : "group", "start": dictionary.start, "end" : dictionary.end, "countries" : countries};

  // send data to server for pie chart
  conn.send(JSON.stringify(payload_pie));
}

}

// function to show the line graphs
function show_line(data){

  // select the svg container
  var svg3 = d3.select(".svg-container2").append("svg")
  .attr("class", "svg3")

  // Set the dimensions of the canvas / graph
  var margin = {top: 30, right: 20, bottom: 70, left: 50},
  width = 600 - margin.left - margin.right,
  height = 300 - margin.top - margin.bottom;


  // Set the ranges
  var x = d3.scaleTime().range([0, width]);
  var y = d3.scaleLinear().range([height, 0]);

  // Define the line
  var nkillline = d3.line()
  .x(function(d) { return x(d.iyear); })
  .y(function(d) { return y(d.kills); });

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.iyear; }));
  y.domain([0, d3.max(data, function(d) { return d.kills; })]);

  // Nest the entries by country
  var dataNest = d3.nest()
  .key(function(d) {return d.country_txt;})
  .entries(data);

  // scale for the colors
  var color = d3.scaleOrdinal()
  .range(['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a','#ffff99','#b15928']);

  legendSpace = width/dataNest.length;

  // Loop through each country / key
  dataNest.forEach(function(d,i) {

    svg3.append("path")
    .attr("class", "line")
    .style("stroke", function() {
      return d.color = color(d.key); })
      .attr("d", nkillline(d.values));

      // Add the Legend
      svg3.append("text")
      .attr("x", (legendSpace/2)+i*legendSpace)
      .attr("y", height + (margin.bottom/2)+ 5)
      .attr("class", "legend")
      .style("fill", function() {
        return d.color = color(d.key); })
        .text(d.key);

        // Add the X Axis
        svg3.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

        // Add the Y Axis
        svg3.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y));

      });
    }

    // function to show piechart
    function show_piechart(all_groups){

      /*pie chart for showing perpetrators percentages*/

      // set width heihgt and radius of chart
      var width = 300,
      height = 300,
      radius = Math.min(width, height) / 2;

      // scale for the colors
      var color = d3.scaleOrdinal()
      .range(['#fff7ec','#fee8c8','#fdd49e','#fdbb84','#fc8d59','#ef6548','#d7301f','#b30000','#7f0000',"#ce0000"]);

      // set the outer and inner radius of the arcs creating a hole in the middle
      var arc = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(radius - 70);

      // create pie chart
      var pie = d3.pie()
      .sort(null)
      .value(function (d) {
        return d.nattack;
      });

      // create new svg element and add pie chart
      var svg4 = d3.select(".svg-container2").append("svg")
      .attr("class", "svg4")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      // add arcs for each data element
      var g = svg4.selectAll(".arc")
      .data(pie(all_groups))
      .enter().append("g")
      .attr("class", "arc");

      // draw for each data element
      g.append("path")
      .attr("d", arc)
      .style("fill", function (d) {
        return color(d.data.gname);
      })
      .on("mouseover", function(d){
        console.log("test");
        add_group_name(d.data.gname, d.data.nattack, svg4);
      })
      .transition()
      .duration(function(d, i) {
        return i * 800;
      })
      .attrTween('d', function(d) {
        var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
        return function(t) {
          d.endAngle = i(t);
          return arc(d);
        }
      });
    }


function add_group_name(name, nattack, svg4){

  //  remove old name
  d3.selectAll(".attack-group-name").remove()

  // add group name to graph
  svg4.append("text")
  .attr("x", "0")
  .attr("y", "0")
  .attr("class", "attack-group-name")
  .attr("font-size", "12px")
  .text(String(name) + " (" + String(nattack)+")");
}
