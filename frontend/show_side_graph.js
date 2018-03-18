
// Function to update the data in the side graphs
function show_side_graph(country){

  // select the svg container
  var svg3 = d3.select(".svg-container2").append("svg")
  .attr("class", "svg3")

  console.log(country);

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

    // experimental

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

    svgContainer = svg3
    console.log(all_attacks);
    // create the rectangles for all selected data
    var rects = svgContainer.selectAll("rect")
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


    // // add textlabel for average temp to bar
    // text = svgContainer.selectAll("text")
    // .data(all_attacks)
    // .enter()
    // .append("text");
    //
    // // add atributes to labels
    // var textLabels = text
    // .attr("x", function(d) {return x(d.month)  + (x.bandwidth()/2)})
    // .attr("text-anchor", "middle")
    // .attr("y", function(d) { return y(d.average_temp) + 20; })
    // .text(function(d) {return Math.round(d.average_temp * 100)/100})
    // .attr("font-family", "sans-serif")
    // .attr("font-size", "20px")
    // .attr("fill", "white");
    //
    // // array to translate number into month
    // numToMonth = {"01" : "jan", "02" : "feb", "03": "mar", "04" : "apr", "05" : "may",
    //  "06" : "jun", "07" : "jul", "08" : "aug", "09" : "sep", "10": "okt", "11" : "nov",
    //  "12" : "dec"};
    //
    // // Add the x Axis
    // svgContainer.append("g")
    // .attr("transform", "translate(0," + height + ")")
    // .call(d3.axisBottom(x)
    // .tickFormat(function (d) {return numToMonth[d]} ));
    //
    // // text label for the x axis
    // svgContainer.append("text")
    // .attr("transform",
    // "translate(" + (width/2) + " ," +
    // (height + margin.top + 20) + ")")
    // .style("text-anchor", "middle")
    // .text("Month");

    // Add the y Axis
    svgContainer.append("g")
    .call(d3.axisLeft(y));

    // text label for the y axis
    svgContainer.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y",0)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Number of kills");

    // // add element for current year
    // var header_text = svgContainer.selectAll("text2")
    // .data([year_shown])
    // .enter()
    // .append("text");
    //
    // // show the current year in the yearbox
    // var header_text_attr = header_text
    // .attr("x", width/2)
    // .text(function(d) {return d})
    // .attr("font-weight", "bold")
    // .attr("font-size", "20px");


    // experimental



  }
