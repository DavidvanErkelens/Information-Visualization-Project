
// Function to update the data in the side graphs
function show_side_graph(countries){

  // remove the old graphs
  d3.select(".svg3").remove()
  d3.select(".svg4").remove()

  // select the svg container
  var svg3 = d3.select(".svg-container2").append("svg")
  .attr("class", "svg3")


  // get all data to send to server
  payload_line = {"start" : dictionary.start , "end" : dictionary.end , "countries" : countries}

  // send data to server for line graph
  connection.send(JSON.stringify(payload_line))

  //
  //
  // // TODO fill with actual server data
  // all_groups = [
  //   {name : "Jochem", nattack : 100},
  //   {name : "Niek", nattack : 250},
  //   {name : "David", nattack : 10},
  //   {name : "Fokke", nattack : 200},
  //   {name : "ISIS", nattack : 200},
  // ]
  //
  //   // /*line plot showing all kill for selected countries */
  //
  //   data = [
  //     {"country" : "netherlands", "date" : 1970, "nkill" : 200},
  //     {"country" : "netherlands", "date" : 1971, "nkill" : 300},
  //     {"country" : "netherlands", "date" : 1972, "nkill" : 400},
  //     {"country" : "netherlands", "date" : 1973, "nkill" : 500},
  //     {"country" : "netherlands", "date" : 1974, "nkill" : 600},
  //     {"country" : "netherlands", "date" : 1975, "nkill" : 700},
  //     {"country" : "france", "date" : 1970, "nkill" : 2000},
  //     {"country" : "france", "date" : 1971, "nkill" : 3000},
  //     {"country" : "france", "date" : 1972, "nkill" : 4000},
  //     {"country" : "france", "date" : 1973, "nkill" : 5000},
  //     {"country" : "france", "date" : 1974, "nkill" : 6000},
  //     {"country" : "france", "date" : 1975, "nkill" : 7000},
  //     {"country" : "canada", "date" : 1970, "nkill" : 600},
  //     {"country" : "canada", "date" : 1971, "nkill" : 700},
  //     {"country" : "canada", "date" : 1972, "nkill" : 800},
  //     {"country" : "canada", "date" : 1973, "nkill" : 900},
  //     {"country" : "canada", "date" : 1974, "nkill" : 1000},
  //     {"country" : "canada", "date" : 1975, "nkill" : 1100},
  //   ]

}

// function to show the line graphs
function show_line(){


    // Set the dimensions of the canvas / graph
    var margin = {top: 30, right: 20, bottom: 70, left: 50},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;


    // Set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // Define the line
    var nkillline = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.nkill); });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.nkill; })]);

    // Nest the entries by country
    var dataNest = d3.nest()
    .key(function(d) {return d.country;})
    .entries(data);

    // scale for the colors
    var color = d3.scaleOrdinal()
    .range(['#fff7ec','#fee8c8','#fdd49e','#fdbb84','#fc8d59','#ef6548','#d7301f','#b30000','#7f0000',"#ce0000"]);

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

        /* End line graph */

      }

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
          return color(d.data.name);
        }) .transition()
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

        // add text label to each element
        g.append("text")
        .attr("transform", function (d) {
          return "translate(" + arc.centroid(d) + ")";
        })
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .text(function (d) {
          return String(d.data.name) + " (" + String(d.data.nattack) + ")";
        });
      
