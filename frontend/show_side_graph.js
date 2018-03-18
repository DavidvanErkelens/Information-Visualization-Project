
// Function to update the data in the side graphs
function show_side_graph(countries){

  // remove the old graphs
  d3.select(".svg3").remove()
  d3.select(".svg4").remove()

  // select the svg container
  var svg3 = d3.select(".svg-container2").append("svg")
  .attr("class", "svg3")



  console.log(countries);

  // TODO fill with actual server data
  all_groups = [
    {name : "Jochem", nattack : 100},
    {name : "Niek", nattack : 250},
    {name : "David", nattack : 10},
    {name : "Fokke", nattack : 200},
    {name : "ISIS", nattack : 200},
  ]

  // TODO fill with actual server data
  all_attacks = [
    {date : "2017-01-01", nkill : 20050},
    {date : "2017-01-02", nkill : 200100},
    {date : "2017-01-03", nkill : 200100},
    {date : "2017-01-04", nkill : 2009},
    {date : "2017-01-05", nkill : 20067},
    {date : "2017-01-06", nkill : 20024},
    {date : "2017-01-07", nkill : 200},
    {date : "2017-01-08", nkill : 2001},
    {date : "2017-01-09", nkill : 200235},
    {date : "2017-01-10", nkill : 2002},
    {date : "2017-01-11", nkill : 2001},
    {date : "2017-01-12", nkill : 20015},
    {date : "2017-01-13", nkill : 2006},
    {date : "2017-01-14", nkill : 2007},
    {date : "2017-01-15", nkill : 20033},
    {date : "2017-01-16", nkill : 2001}];

    /* Bar plot showing all kill for selected countries */

    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 20, bottom: 50, left: 70},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    // noramlize x scale
    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1)
    x.domain(all_attacks.map(function(d) { return d.date; }));

    // normalize y scale
    var y = d3.scaleLinear().rangeRound([height, 0]);
    y.domain([0, d3.max(all_attacks, function(d) { return d.nkill; })]);

    // create the rectangles for all selected data
    var rects = svg3.selectAll("rect")
    .data(all_attacks)
    .enter()
    .append("rect");

    // set bar atributes and draw them with transitions for smooth chaning between years
    var rect_atributes = rects
    .attr("x", function(d) { return x(d.date); })
    .attr("y", height)
    .attr("height", 0)
    .attr("width", x.bandwidth())
    .style("fill", "rgb(234, 229, 229)")
    .transition()
    .duration(700)
    .attr("height", function(d) { return height - y(d.nkill); })
    .attr("y", function(d) { return y(d.nkill); })
    .attr("class", "bar");

    // Add the x Axis
    svg3.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x)
    .tickFormat(function (d) {return d} ));

    // text label for the x axis
    svg3.append("text")
    .attr("transform",
    "translate(" + (width/2) + " ," +
    (height + margin.top + 20) + ")")
    .style("text-anchor", "middle")
    .text("Month");

    // Add the y Axis
    svg3.append("g")
    .call(d3.axisLeft(y));

    // text label for the y axis
    svg3.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y",0)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Number of kills");

    /* End barplot for selectede countries*/

    /*pie chart for showing perpetrators percentages*/

    var width = 250,
    height = 250,
    radius = Math.min(width, height) / 2;

    var color = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 70);

    var pie = d3.pie()
    .sort(null)
    .value(function (d) {
      return d.nattack;
    });


    var svg4 = d3.select(".svg-container2").append("svg")
    .attr("class", "svg4")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var g = svg4.selectAll(".arc")
    .data(pie(all_groups))
    .enter().append("g")
    .attr("class", "arc");

    g.append("path")
    .attr("d", arc)
    .style("fill", function (d) {
      return color(d.name);
    });

    g.append("text")
    .attr("transform", function (d) {
      return "translate(" + arc.centroid(d) + ")";
    })
    .attr("dy", ".35em")
    .style("text-anchor", "middle")
    .text(function (d) {
      return String(d.name) + " (" + String(d.nattack) + ")";
    });

    /*end pie chart showing perpetrators percentages*/


  }
