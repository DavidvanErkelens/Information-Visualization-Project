// add tooltip to body
var tooltip = d3.select("body")
.append("div")
.style("position", "absolute")
.style("z-index", "10")
.style("visibility", "hidden")
.text("a simple tooltip");

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
  tartypeN_txt : "president", gname : "isis", nkill : 01, nwound :01},
  {"id":37554,"country_txt":"India","region_txt":"South Asia","latitude":"34.08365800","longitude":"74.79736800","db_eventid":"198903170002","year":1989,"month":3,"day":17},
  {"id":31620,"country_txt":"Dominican Republic","region_txt":"Central America & Caribbean","latitude":"18.45679200","longitude":"-69.95116400","db_eventid":"198707280010","year":1987,"month":7,"day":28},{"id":15426,"country_txt":"Colombia","region_txt":"South America","latitude":"4.60248900","longitude":"-74.09303200","db_eventid":"198202180007","year":1982,"month":2,"day":18},{"id":48050,"country_txt":"United Kingdom","region_txt":"Western Europe","latitude":"54.18006000","longitude":"-6.33393000","db_eventid":"199109160004","year":1991,"month":9,"day":16},{"id":49706,"country_txt":"Mexico","region_txt":"North America","latitude":"25.86524700","longitude":"-100.39258900","db_eventid":"199201130006","year":1992,"month":1,"day":13},{"id":2037,"country_txt":"Mexico","region_txt":"North America","latitude":"20.67334300","longitude":"-103.34417700","db_eventid":"197311260001","year":1973,"month":11,"day":26},{"id":26070,"country_txt":"Sri Lanka","region_txt":"South Asia","latitude":"9.66123000","longitude":"80.02558000","db_eventid":"198509040012","year":1985,"month":9,"day":4},{"id":48969,"country_txt":"Liberia","region_txt":"Sub-Saharan Africa","latitude":"6.29074300","longitude":"-10.76052400","db_eventid":"199111120003","year":1991,"month":11,"day":12},{"id":33103,"country_txt":"Colombia","region_txt":"South America","latitude":"8.85768000","longitude":"-73.81579000","db_eventid":"198801180001","year":1988,"month":1,"day":18},{"id":42369,"country_txt":"Spain","region_txt":"Western Europe","latitude":"42.69539100","longitude":"-1.67606900","db_eventid":"199005090008","year":1990,"month":5,"day":9},{"id":24929,"country_txt":"Greece","region_txt":"Western Europe","latitude":"37.94243900","longitude":"23.71472400","db_eventid":"198505080025","year":1985,"month":5,"day":8}];

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
