// add tooltip to body
var tooltip = d3.select("body")
.append("div")
.style("position", "absolute")
.style("z-index", "10")
.style("visibility", "hidden")
.style("width", '200')
.attr("class", "tool-tip")

// append svg to body
var svg = d3.select(".svg-container1").append("svg")
.attr("class", "svg1")

// adding title
svg_title = svg.append("text")
.attr("x", "685")
.attr("y", "40")
.attr("font-size", "20px")
.attr("class", "header-title")
.text("Visualizing the terrorism landscape")

var svgw = svg.node().getBoundingClientRect().width;
var svgh = svg.node().getBoundingClientRect().height;

// loading text
svg_load_text = svg.append("text")
  .attr("x", svgw-120)
  .attr("y", svgh-5)
  .attr("font-size", "15px")
  .attr("class", "loading-text")
  .style("visibility", "hidden")
  .style("fill", "grey")
  .style("font-style", "italic")
  .text("fetching data...")

function show_years(){


  // show new timespan
  svg.selectAll(".header-title")
  .text("Visualizing the terrorism landscape ("+ dictionary.time.start + " - " + dictionary.time.end +")")
}

// Projection for map overview
var projection = d3.geoMercator()
.translate([900, 500])

//  list for all currenlty selected countries
selected = []

/* function to calculate new geo json and colors */
get_new_geojson = function (attack_json, resultcallback){

  // open geojson
  var url = "http://enjalot.github.io/wwsd/data/world/world-110m.geojson";
  countries = svg.append("g");

  console.log(attack_json);

  max_attack = 0;

  d3.json(url, function(err, geojson) {

    // clean geojson
    var new_geojson = {type: "FeatureCollection", features : []}

    //  loop through geojson per country and get maximum number of attacks
    for(var i = 0; i< geojson.features.length;i++){

      // select attacks for current country and add them to the geojson
      attack = attack_json.filter(function( obj ) {
        return obj.country_txt == geojson.features[i].properties.name;
      });

      // if number of attack is max save number of attack
      if(attack.length > max_attack){
        max_attack = attack.length;
      }

    }


    //  loop through geojson per country
    for(var i = 0; i< geojson.features.length;i++){

      // remove Antarctica
      if (geojson.features[i].properties.name != "Antarctica")
      {

        if(geojson.features[i].properties.name == "England")
        {
          geojson.features[i].properties.name = "United Kingdom"
        }

        //  get the country features
        country_features = geojson.features[i]

        // select attacks for current country and add them to the geojson
        country_features.properties.attack = attack_json.filter(function( obj ) {
          return obj.country_txt == geojson.features[i].properties.name;
        });

        // get relative number of attacks for country
        rel_num_attack = Math.ceil((country_features.properties.attack.length / max_attack) * 10)

        // colours for map
        colors = ['#fff7ec','#fee8c8','#fdd49e','#fdbb84','#fc8d59','#ef6548','#d7301f','#b30000','#7f0000',"#ce0000"];

        // add color to country based on relative number of attack
        country_features.properties.color = colors[rel_num_attack];

        // add country to new geojson
        new_geojson.features.push(geojson.features[i])
      }
    }

    //  return the result
    resultcallback(new_geojson);

  });
}

/* end calculate new geojson */

/* Function to update map color and attack points*/
function update_map_color(attack_json){

  // get new geojson to update colors
   get_new_geojson(attack_json, function(new_geojson) {

    // update country color
    d3.selectAll(".boundary")
    .style("fill", function(d){

      // get new color from new new_geojson
      new_color = new_geojson.features.filter(function( obj ) {
        return obj.id == d.id
      });

      return new_color[0].properties.color})

      // remove old attack points
      d3.selectAll("#attack-circle").remove()

      //  add points for attack locations and tooltip hover for more information on
      // actual attack

      if(toggled){


      attacks = svg.selectAll("circles.points")
      .data(attack_json)
      .enter()
      .append("circle")
      .attr("r",3)
      .attr("id", "attack-circle")
      .attr("class", "attack-circle")
      .attr("transform", function(d) {return "translate(" + projection([d.longitude,d.latitude]) + ")";})
      .on("mouseover", function(d) {

        tooltip.html("Attacktype: "+attacktypes[d.attacktype1]+"<br>"+"Targettype: "+targettypes[d.targtype1]+"<br>"+"Weaptype: "+weaptypes[d.weaptype1]+"<br> Kills: "+d.nkil+"<br> Terkills: "+d.nkillter+"<br> Wounded: "+d.nwound+"<br> Terwounds: "+d.nwoundte+"<br> Propvalue ($): "+d.propvalue+"<br> Pepetrator: "+d.gname);
        return tooltip.style("visibility", "visible");
      })
      .on("mousemove", function() {
        return tooltip.style("top",(420) + "px")
        .style("left", (10) + "px")
        .style("border", "solid 1px")
        .style("border-color", "rgba(234, 242, 255, 1");
      })
      .on("mouseout", function() {
        return tooltip.style("visibility", "hidden");
      });

    }
  });

  }

  /* End update map color */

  // start drawing the map
  var drawmap = function(attack_json){

    // remove the old drawmap and attack circles
    d3.selectAll(".boundary").remove();
    d3.selectAll("#attack-circle").remove();

    // create path based on projection
    var path = d3.geoPath()
    .projection(projection);

    //
    get_new_geojson(attack_json, function(new_geojson) {

      // draw the map
      countries = svg.selectAll("path")
      .data(new_geojson.features)
      .enter()
      .append("path")
      .attr("d", path)
      .style("fill", function(d){return d.properties.color})
      .attr("class", "boundary")
      .on("mouseover", function(d) {
         d3.select(this).style("opacity", "0.5")
      })
      .on("mouseout", function(d) {
         d3.select(this).style("opacity", "1")
      })


      .on("click", function(d) {
        //if clicked
        if(d3.select(this).style("stroke-width") != "1px"){
          selected.push(d.properties.name)
          d3.select(this).style("stroke-width", "1px");


        } else {
          //d3.select(this).style("fill", d.properties.color);
          d3.select(this).style("stroke-width", "0.2px");

          var index = selected.indexOf(d.properties.name);
          selected.splice(index, 1);

        }
        // update the side graphs
        show_side_graph(selected);
      })
      
      console.log('toggled=', toggled)

      if(toggled){

      //  add points for attack locations and tooltip hover for more information on
      // actual attack
      attacks = svg.selectAll("circles.points")
      .data(attack_json)
      .enter()
      .append("circle")
      .attr("r",3)
      .attr("id", "attack-circle")
      .attr("class", "attack-circle")
      .attr("transform", function(d) {return "translate(" + projection([d.longitude,d.latitude]) + ")";})
      .on("mouseover", function(d) {

        tooltip.html("Attacktype: "+attacktypes[d.attacktype1]+"<br>"+"Targettype: "+targettypes[d.targtype1]+"<br>"+"Weaptype: "+weaptypes[d.weaptype1]+"<br> Kills: "+d.nkil+"<br> Terkills: "+d.nkillter+"<br> Wounded: "+d.nwound+"<br> Terwounds: "+d.nwoundte+"<br> Propvalue ($): "+d.propvalue+"<br> Pepetrator: "+d.gname);
        return tooltip.style("visibility", "visible");
      })
      .on("mousemove", function() {
        return tooltip.style("top",(420) + "px")
        .style("left", (10) + "px")
        .style("border", "solid 1px")
        .style("border-color", "rgba(234, 242, 255, 1");
      })
      .on("mouseout", function() {
        return tooltip.style("visibility", "hidden");
      });
}
  

    });
  }

  /* Slider */
  // Create SVG element
  var svg2 = d3.select(".svg-container").append("svg")
  .attr("class", "svg2");

  // Append HTML to display slider information
  svg2.append("foreignObject")
  .attr("x", "0")
  .attr("y", "30")
  .attr("width" , "100%")
  .attr("height", '50%')
  .append("xhtml:div")
  .attr("id", "timegraph")
  .style("background-color", "rgba(234, 242, 255, 0.4)")
  .style("display", "block")
  .style("overflow", "hidden")
  .style("height", "210px");


  // add the slider to to the SVG element
  slider_element = svg2.append("foreignObject")
  .attr("x", "0")
  .attr("y", "240")
  .attr("width" , "100%")
  .attr("height", '50%')
  .append("xhtml:div")
  .attr("id", "slider-container")
  .style("display", "block")
  .style("overflow", "hidden")
  .style("height", "45px");

  // Create slider spanning the range from 0 to 45 to encapsulate all 45 years of the dataset
  var slider = createD3RangeSlider(0, 45, "#slider-container", true);

  // Create year timegraph
  // var yearGraph = drawTime("#timegraph", lineData)

  // Slide range to start with showing 2 years per interval
  slider.range(0, 22);

  // Slider listener
  slider.onChange(function(newRange){

    // save the start and and of the sliderRange
    dictionary.time.start = newRange.begin + 1970
    dictionary.time.end = newRange.end + 1970

});
