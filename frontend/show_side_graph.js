// select the svg container
var svg3 = d3.select(".svg-container2").append("svg")
.attr("class", "svg3")


// svg3.append("foreignObject")
//    .attr("x", 0)
//    .attr("y", 0)
//    .attr("width", "100%")
//    .attr("height", "100%")
//     .append("xhtml:div")
//     .attr("class", "side-graph")
//     .style("background-color", "red")
//     .style("display", "block")
//     .style("width", "100%")
//     .style("height", "100%")




// Function to update the data in the side graphs
function show_side_graph(country){

  all_selected_attacks = []

  // loop through all selected countries
  for(var i = 0; i < country.length; i++){

    // filter to only show attacks of current selected country
    attacks_selected = attack_json.filter(function( obj ) {
      return obj.country_txt == country[i];
    });

    all_selected_attacks.push(attacks_selected);

  }

  console.log(all_selected_attacks);

  // experimental
  // 
  // var margin = {top: 20, right: 20, bottom: 30, left: 50},
  //     width = +svg.attr("width") - margin.left - margin.right,
  //     height = +svg.attr("height") - margin.top - margin.bottom,
  //     g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  //
  // var parseTime = d3.timeParse("%d-%b-%y");
  //
  // var x = d3.scaleTime()
  //     .rangeRound([0, width]);
  //
  // var y = d3.scaleLinear()
  //     .rangeRound([height, 0]);
  //
  // var line = d3.line()
  //     .x(function(d) { return x(d.date); })
  //     .y(function(d) { return y(d.close); });
  //
  // d3.tsv("data.tsv", function(d) {
  //   d.date = parseTime(d.date);
  //   d.close = +d.close;
  //   return d;
  // }, function(error, data) {
  //   if (error) throw error;
  //
  //   x.domain(d3.extent(data, function(d) { return d.date; }));
  //   y.domain(d3.extent(data, function(d) { return d.close; }));
  //
  //   g.append("g")
  //       .attr("transform", "translate(0," + height + ")")
  //       .call(d3.axisBottom(x))
  //     .select(".domain")
  //       .remove();
  //
  //   g.append("g")
  //       .call(d3.axisLeft(y))
  //     .append("text")
  //       .attr("fill", "#000")
  //       .attr("transform", "rotate(-90)")
  //       .attr("y", 6)
  //       .attr("dy", "0.71em")
  //       .attr("text-anchor", "end")
  //       .text("Price ($)");
  //
  //   g.append("path")
  //       .datum(data)
  //       .attr("fill", "none")
  //       .attr("stroke", "steelblue")
  //       .attr("stroke-linejoin", "round")
  //       .attr("stroke-linecap", "round")
  //       .attr("stroke-width", 1.5)
  //       .attr("d", line);
  // });

  // experimental



}
