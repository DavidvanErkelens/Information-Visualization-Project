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
.attr("class", "svg1")

// Projection for map overview
var projection = d3.geoMercator()
.translate([960, 500])


// start drawing the map

var drawmap = function(input){

  attack_json = input

  // remove the old drawmap
  d3.selectAll("path").remove();
  d3.selectAll("#attack-circle").remove();

  // create path based on projection
  var path = d3.geoPath()
  .projection(projection);

  // open geojson
  var url = "http://enjalot.github.io/wwsd/data/world/world-110m.geojson";
  countries = svg.append("g");

  d3.json(url, function(err, geojson) {

    // clean geojson
    var new_geojson = {type: "FeatureCollection", features : []}

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

    // draw the map
    svg.selectAll("path")
    .data(new_geojson.features)
    .enter()
    .append("path")
    .attr("d", path)
    .style("fill", function(d){return d.properties.color});

    //  add points for attack locations and tooltip hover for more information on
    // actual attack
    attacks = svg.selectAll("circles.points")
    .data(attack_json)
    .enter()
    .append("circle")
    .attr("r",4)
    .attr("id", "attack-circle")
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
}


/* Slider */
// Create SVG element
var svg2 = d3.select("body").append("svg")
.attr("class", "svg2");

// // Append HTML to display slider information
svg2.append("foreignObject")
.attr("x", "0")
.attr("y", "0")
.attr("width" , "100%")
.attr("height", '30%')
.append("xhtml:div")
  .style("border", "solid black 1px")
  .style("background-color", "rgba(192, 192, 192, 0.4)")
  .style("display", "block")
  .style("overflow", "hidden")
  .style("height", "50px");


// add the slider to to the SVG element
slider_element = svg2.append("foreignObject")
.attr("x", "0")
.attr("y", "30")
.attr("width" , "100%")
.attr("height", '70%')
.append("xhtml:div")
  .attr("id", "slider-container")
  .style("border", "solid black 1px")
  .style("background-color", "rgba(192, 192, 192, 0.4)")
  .style("display", "block")
  .style("overflow", "hidden")
  .style("height", "50px");

// Create slider spanning the range from 0 to 45 to encapsulate all 45 years of the dataset
var slider = createD3RangeSlider(0, 45, "#slider-container", true);

// Slide range to start with showing 2 years per interval
slider.range(0, 2);

// Slider listener
slider.onChange(function(newRange){

  // save the start and and of the sliderRange
  dictionary.time.start = newRange.begin + 1970
  dictionary.time.end = newRange.end + 1970
  console.log(dictionary);

  // call update function to show new selected data
  updatedata()

});
