// add tooltip to body
var tooltip = d3.select("body")
.append("div")
.style("position", "absolute")
.style("z-index", "10")
.style("visibility", "hidden")
.text("a simple tooltip")
.attr("class", "tool-tip")

// append svg to body
var svg = d3.select("body").append("svg")

// Projection for map overview
var projection = d3.geoMercator()
.translate([960, 500])

// create path based on projection
var path = d3.geoPath()
.projection(projection);

// open geojson
var url = "http://enjalot.github.io/wwsd/data/world/world-110m.geojson";
countries = svg.append("g");

d3.json(url, function(err, geojson) {

  // clean geojson
  var new_geojson = {type: "FeatureCollection", features : []}

  // get attack attack json now uses fake data
  var attack_json = [{latitude : 43, longitude : -75, country_txt : "USA", region_txt: 01, iyear : 2018, imonth : 01, "iday" :
  01, attacktypeN : 01, attacktypeN_txt : "bombing1", targtypeN : 01,
  tartypeN_txt : "president", gname : "isis", nkill : 01, nwound :01}, {latitude : 50, longitude : -90, country_txt : "Canada", region_txt: 01, iyear : 2018, imonth : 01, "iday" :
  01, attacktypeN : 01, attacktypeN_txt : "bombing2", targtypeN : 01,
  tartypeN_txt : "president", gname : "isis", nkill : 01, nwound :01}, {latitude : 60, longitude : -110, country_txt : "Canada", region_txt: 01, iyear : 2018, imonth : 01, "iday" :
  01, attacktypeN : 01, attacktypeN_txt : "bombing3", targtypeN : 01,
  tartypeN_txt : "president", gname : "isis", nkill : 01, nwound :01}];

  //  loop through geojson per country
  for(var i = 0; i< geojson.features.length;i++){

    // remove Antarctica
    if (geojson.features[i].properties.name != "Antarctica"){

      //  get the country features
      country_features = geojson.features[i]

      // select attacks for current country and add them to the geojson
      country_features.properties.attack = attack_json.filter(function( obj ) {
        return obj.country_txt == geojson.features[i].properties.name;
      });

      // get relative number of attacks for country
      rel_num_attack = Math.floor((country_features.properties.attack.length / attack_json.length) * 10)

      // colours for map
      colors = ['#fff7ec','#fee8c8','#fdd49e','#fdbb84','#fc8d59','#ef6548','#d7301f','#b30000','#7f0000',"#ce0000"];

      // add color to country based on relative number of attack
      country_features.properties.color = colors[rel_num_attack];

      // add country to new geojson
      new_geojson.features.push(geojson.features[i])
    }
  }

  console.log(new_geojson)

  // draw the map
  svg.selectAll("path")
  .data(new_geojson.features)
  .enter()
  .append("path")
  .attr("d", path)
  .style("fill", function(d){return d.properties.color});


  //  add points for attack locations and styles for tooltip on hover
  attacks = svg.selectAll("circles.points")
  .data(attack_json)
  .enter()
  .append("circle")
  .attr("r",4)
  .attr("transform", function(d) {return "translate(" + projection([d.longitude,d.latitude]) + ")";})
  .on("mouseover", function(d) {
    tooltip.text(d.attacktypeN_txt);
    return tooltip.style("visibility", "visible");
  })
  .on("mousemove", function() {
    return tooltip.style("top",
    (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
  })
  .on("mouseout", function() {
    return tooltip.style("visibility", "hidden");
  });


})
